import React, { useState, useEffect } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { UploadCloud, Check, ArrowRight, TrendingDown, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react';
import styles from './NominationForm.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectStatusTimeline } from '../../UI/ProjectStatusTimeline';

interface BDScreenProps {
    onNext: () => void;
    stepId: number;
}

// Project MnM Line Items with target costs
const lineItemsData = [
    { name: 'IP Carrier Injection Molding Tool', targetCost: 320, unit: 'L' },
    { name: 'Chute Chanel Vibration', targetCost: 38, unit: 'L' },  // This one will be over budget (40 > 38)
    { name: 'Cockpit Checking Fixture', targetCost: 28, unit: 'L' },
    { name: 'Laser Scoring Fixture', targetCost: 65, unit: 'L' },
];

// Vendors with their quotes
const vendorQuotes = [
    { vendor: 'Tooling Solutions Ltd', quotes: [295, 42, 24, 68] },
    { vendor: 'Precision Tools Inc', quotes: [310, 39, 27, 72] },
    { vendor: 'AutoParts Manufacturing', quotes: [300, 40, 25, 70] },  // 40 > 38 for item 2
];

const finalNominatedCosts = [300, 40, 25, 70];  // Only index 1 (40) exceeds target (38)

const formatValue = (val: number, unit: string) => {
    if (val >= 100) return `₹ ${(val / 100).toFixed(1)} Cr`;
    return `₹ ${val} ${unit}`;
};

const totalTarget = lineItemsData.reduce((sum, item) => sum + item.targetCost, 0);
const totalNominated = finalNominatedCosts.reduce((sum, val) => sum + val, 0);

export const BDScreen: React.FC<BDScreenProps> = ({ onNext, stepId }) => {
    // Step 3: Purchase Nomination states
    const [negotiationPhase, setNegotiationPhase] = useState<'vendors' | 'comparing' | 'filling' | 'complete'>('vendors');
    const [currentVendorIdx, setCurrentVendorIdx] = useState(0);
    const [filledItems, setFilledItems] = useState<number[]>([]);
    const [overriddenItems, setOverriddenItems] = useState<number[]>([]);

    // Reset states when step changes
    useEffect(() => {
        if (stepId === 2) {  // Vendor negotiation happens in Step 2 now
            setNegotiationPhase('vendors');
            setCurrentVendorIdx(0);
            setFilledItems([]);
            setOverriddenItems([]);
        }
    }, [stepId]);

    // Auto-advance vendor animation for Step 2
    useEffect(() => {
        if (stepId === 2 && negotiationPhase === 'vendors' && currentVendorIdx < vendorQuotes.length) {
            const timer = setTimeout(() => {
                if (currentVendorIdx < vendorQuotes.length - 1) {
                    setCurrentVendorIdx(prev => prev + 1);
                } else {
                    setNegotiationPhase('comparing');
                    setTimeout(() => setNegotiationPhase('filling'), 1200);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [stepId, negotiationPhase, currentVendorIdx]);

    // Fill items animation for Step 2
    useEffect(() => {
        if (stepId === 2 && negotiationPhase === 'filling') {
            lineItemsData.forEach((_, idx) => {
                setTimeout(() => {
                    setFilledItems(prev => [...prev, idx]);
                }, (idx + 1) * 500);
            });
            setTimeout(() => setNegotiationPhase('complete'), lineItemsData.length * 500 + 400);
        }
    }, [stepId, negotiationPhase]);

    // Auto-proceed after negotiation complete - Skip Step 3 and go to Step 4
    useEffect(() => {
        if (stepId === 2 && negotiationPhase === 'complete') {
            if (allItemsValid()) {
                // Auto-advance after 2 seconds, calling onNext twice to skip Step 3
                setTimeout(() => {
                    onNext(); // Goes to Step 3
                    setTimeout(() => onNext(), 100); // Immediately goes to Step 4
                }, 2000);
            }
        }
    }, [stepId, negotiationPhase, overriddenItems, onNext]);

    const handleOverride = (idx: number) => {
        setOverriddenItems(prev => [...prev, idx]);
    };

    const allItemsValid = () => {
        return lineItemsData.every((item, idx) => {
            const nominated = finalNominatedCosts[idx];
            return nominated <= item.targetCost || overriddenItems.includes(idx);
        });
    };

    // Step 1: Nomination (Customer project nomination)
    if (stepId === 1) {
        return (
            <ScreenLayout role="Customer" title="Nomination">
                <ProjectStatusTimeline currentStepId={1} />
                <div className={styles.container}>
                    <div className={styles.card}>
                        <h3 className={styles.title}>Customer Project Nomination</h3>
                        <div className={styles.stack}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', alignItems: 'start' }}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>OEM Customer</label>
                                    <input type="text" className={styles.input} defaultValue="OEM Automotive" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Project Code</label>
                                    <input type="text" className={styles.input} defaultValue="MNM-2026-INT" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Estimated Budget</label>
                                    <input type="text" className={styles.input} defaultValue="₹ 4.5 Cr" readOnly style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }} />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Target Completion</label>
                                    <input type="text" className={styles.input} defaultValue="Q2 2026" />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', alignItems: 'start' }}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Project Description</label>
                                    <textarea className={styles.textarea} defaultValue="Project MnM: Interior Trims (Scope: Cockpit, Door Trims, Floor Console)" style={{ height: '70px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div className={styles.uploadBox}>
                                        <UploadCloud size={20} />
                                        <span style={{ fontSize: '11px' }}>Upload Documents</span>
                                    </div>
                                    <button onClick={onNext} className={styles.submitBtn} style={{ width: '100%' }}>
                                        <Check size={16} /> Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Step 2: Sales Master Data - Target (with inline Purchase Nomination)
    if (stepId === 2) {
        return (
            <ScreenLayout role="BD" title="Sales Master Data - Target & Purchase Nomination">
                <ProjectStatusTimeline currentStepId={negotiationPhase === 'complete' ? 3 : 2} />
                <div className={styles.container}>
                    <div className={styles.card} style={{ maxWidth: '1000px' }}>
                        <h3 className={styles.title}>Line Items - Target Cost & Vendor Negotiation</h3>
                        <p style={{ color: '#94a3b8', fontSize: '11px', marginBottom: '12px' }}>
                            Target costs from sales master data + Purchase nomination from vendor quotes
                        </p>
                        <div className={styles.stack}>
                            {/* Combined Table Header */}
                            <div style={{ 
                                display: 'grid', gridTemplateColumns: '45px 2fr 1fr 1fr 1fr', gap: '10px', padding: '8px 12px',
                                background: 'rgba(51, 65, 85, 0.5)', borderRadius: '8px 8px 0 0',
                                fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', color: '#94a3b8'
                            }}>
                                <span>Item</span>
                                <span>Description</span>
                                <span style={{ textAlign: 'right' }}>Target Cost</span>
                                <span style={{ textAlign: 'right' }}>Nominated Cost</span>
                                <span style={{ textAlign: 'center' }}>Status</span>
                            </div>
                            
                            {/* Line Items */}
                            <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0 0 8px 8px' }}>
                                {lineItemsData.map((item, idx) => {
                                    const isFilled = filledItems.includes(idx);
                                    const nominated = finalNominatedCosts[idx];
                                    const isOverBudget = nominated > item.targetCost;
                                    const isOverridden = overriddenItems.includes(idx);
                                    const isValid = !isOverBudget || isOverridden;

                                    return (
                                        <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                                            style={{ display: 'grid', gridTemplateColumns: '45px 2fr 1fr 1fr 1fr', gap: '10px', padding: '10px 12px',
                                                borderBottom: idx < lineItemsData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'center' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.2)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 600, fontSize: '12px' }}>
                                                {(idx + 1) * 10}
                                            </div>
                                            <div>
                                                <span style={{ color: '#e2e8f0', fontSize: '12px' }}>{item.name}</span>
                                                <span style={{ display: 'block', color: '#64748b', fontSize: '9px', marginTop: '1px' }}>Capital Equipment / Tooling</span>
                                            </div>
                                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 + 0.2 }}
                                                style={{ textAlign: 'right', color: '#60a5fa', fontWeight: 600, fontFamily: 'monospace', fontSize: '13px' }}>
                                                {formatValue(item.targetCost, item.unit)}
                                            </motion.span>
                                            <div style={{ textAlign: 'right' }}>
                                                {isFilled ? (
                                                    <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                        style={{ color: isOverBudget && !isOverridden ? '#f87171' : '#4ade80', fontWeight: 600, fontFamily: 'monospace', fontSize: '15px' }}>
                                                        {formatValue(nominated, item.unit)}
                                                    </motion.span>
                                                ) : <span style={{ color: '#475569' }}>—</span>}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                                {!isFilled ? <span style={{ color: '#475569' }}>—</span>
                                                : isValid ? (
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckCircle size={18} className="text-green-400" /></motion.div>
                                                ) : (
                                                    <>
                                                        <XCircle size={16} className="text-red-400" />
                                                        <button onClick={() => handleOverride(idx)}
                                                            style={{ background: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.4)', color: '#fbbf24',
                                                                padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, cursor: 'pointer', 
                                                                display: 'flex', alignItems: 'center', gap: '3px' }}>
                                                            <AlertTriangle size={10} /> Override
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Totals */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                                style={{ display: 'grid', gridTemplateColumns: '50px 2fr 1fr 1fr 1fr', gap: '12px', padding: '16px',
                                    background: 'rgba(51, 65, 85, 0.8)', borderRadius: '8px', marginTop: '8px' }}>
                                <span></span>
                                <span style={{ color: '#fff', fontWeight: 600 }}>Total</span>
                                <span style={{ textAlign: 'right', color: '#60a5fa', fontWeight: 700, fontFamily: 'monospace', fontSize: '16px' }}>
                                    {formatValue(totalTarget, 'L')}
                                </span>
                                <span style={{ textAlign: 'right', color: '#4ade80', fontWeight: 700, fontFamily: 'monospace', fontSize: '16px' }}>
                                    {negotiationPhase === 'complete' ? formatValue(totalNominated, 'L') : '—'}
                                </span>
                                <div style={{ textAlign: 'center' }}>
                                    {negotiationPhase === 'complete' && allItemsValid() && (
                                        <span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}>✓</span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Vendor Negotiation Status */}
                            <AnimatePresence mode="wait">
                                {negotiationPhase === 'vendors' && (
                                    <motion.div key="receiving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ padding: '8px 10px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)',
                                            borderRadius: '6px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Users size={14} className="text-blue-400" />
                                        <span style={{ color: '#93c5fd', fontSize: '11px' }}>
                                            Negotiating with vendors ({currentVendorIdx + 1}/3)...
                                        </span>
                                    </motion.div>
                                )}
                                {negotiationPhase === 'comparing' && (
                                    <motion.div key="comparing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ padding: '8px 10px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)',
                                            borderRadius: '6px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <TrendingDown size={14} className="text-amber-400" />
                                        <span style={{ color: '#fcd34d', fontSize: '11px' }}>
                                            Selecting best vendor...
                                        </span>
                                    </motion.div>
                                )}
                                {negotiationPhase === 'filling' && (
                                    <motion.div key="filling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{ padding: '8px 10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)',
                                            borderRadius: '6px', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <CheckCircle size={14} className="text-green-400" />
                                        <span style={{ color: '#4ade80', fontSize: '11px' }}>
                                            Selected: AutoParts Manufacturing - Filling nominated costs...
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Auto-proceeding message */}
                            {negotiationPhase === 'complete' && allItemsValid() && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    style={{ marginTop: '16px', textAlign: 'center', color: '#4ade80', fontSize: '13px', fontWeight: 600 }}>
                                    ✓ Purchase Nomination Complete - Proceeding to PR Release...
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Default fallback (shouldn't reach here with current flow)
    return (
        <ScreenLayout role="BD" title="Business Development">
            <div className={styles.container}>
                <div className={styles.card}>
                    <button onClick={onNext} className={styles.submitBtn}>
                        Continue <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </ScreenLayout>
    );
};
