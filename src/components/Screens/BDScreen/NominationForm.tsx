import React, { useState, useEffect } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { UploadCloud, Check, ArrowRight, TrendingDown, CheckCircle, XCircle, Users } from 'lucide-react';
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
    { name: 'Laser Scoring Fixture', targetCost: 70, unit: 'L' },
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

    // override functionality removed from compact UI; keep overriddenItems state for compatibility

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
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '12px' }}>
                                {/* Left: Compact Line Items Table */}
                                <div>
                                    {/* Header */}
                                    <div style={{ 
                                        display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px 64px', gap: '8px', padding: '6px 10px',
                                        background: 'rgba(51, 65, 85, 0.5)', borderRadius: '6px', fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', color: '#94a3b8'
                                    }}>
                                        <span>Item</span>
                                        <span>Description</span>
                                        <span style={{ textAlign: 'right' }}>Target</span>
                                        <span style={{ textAlign: 'right' }}>Nominated</span>
                                        <span style={{ textAlign: 'center' }}>Status</span>
                                    </div>

                                    {/* Items list - compact rows */}
                                    <div style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0 0 6px 6px', overflow: 'hidden' }}>
                                        {lineItemsData.map((item, idx) => {
                                            const isFilled = filledItems.includes(idx);
                                            const nominated = finalNominatedCosts[idx];
                                            const isOverBudget = nominated > item.targetCost;
                                            const isOverridden = overriddenItems.includes(idx);
                                            const isValid = !isOverBudget || isOverridden;

                                            return (
                                                <motion.div key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
                                                    style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px 64px', gap: '8px', padding: '8px 10px',
                                                        borderBottom: idx < lineItemsData.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center' }}>
                                                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(59,130,246,0.12)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa', fontWeight: 600, fontSize: '11px' }}>
                                                        {(idx + 1) * 10}
                                                    </div>
                                                    <div>
                                                        <span style={{ color: '#e2e8f0', fontSize: '11px' }}>{item.name}</span>
                                                        <span style={{ display: 'block', color: '#64748b', fontSize: '9px', marginTop: '2px' }}>{item.unit || 'Capital Equipment / Tooling'}</span>
                                                    </div>
                                                    <motion.span style={{ textAlign: 'right', color: '#60a5fa', fontWeight: 600, fontFamily: 'monospace', fontSize: '12px' }}>
                                                        {formatValue(item.targetCost, item.unit)}
                                                    </motion.span>
                                                    <div style={{ textAlign: 'right' }}>
                                                        {isFilled ? (
                                                            <motion.span style={{ color: isOverBudget && !isOverridden ? '#f87171' : '#4ade80', fontWeight: 600, fontFamily: 'monospace', fontSize: '13px' }}>
                                                                {formatValue(nominated, item.unit)}
                                                            </motion.span>
                                                        ) : <span style={{ color: '#475569' }}>—</span>}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        {!isFilled ? <span style={{ color: '#475569', fontSize: '11px' }}>—</span>
                                                        : isValid ? (<CheckCircle size={16} className="text-green-400" />) : (<XCircle size={16} className="text-red-400" />)}
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Totals - compact */}
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                        style={{ display: 'grid', gridTemplateColumns: '40px 1fr 80px 80px 64px', gap: '8px', padding: '10px',
                                            background: 'rgba(51,65,85,0.8)', borderRadius: '6px', marginTop: '8px', fontSize: '12px' }}>
                                        <span></span>
                                        <span style={{ color: '#fff', fontWeight: 600 }}>Total</span>
                                        <span style={{ textAlign: 'right', color: '#60a5fa', fontWeight: 700, fontFamily: 'monospace' }}>{formatValue(totalTarget, 'L')}</span>
                                        <span style={{ textAlign: 'right', color: '#4ade80', fontWeight: 700, fontFamily: 'monospace' }}>{negotiationPhase === 'complete' ? formatValue(totalNominated, 'L') : '—'}</span>
                                        <div style={{ textAlign: 'center' }}>{negotiationPhase === 'complete' && allItemsValid() && (<span style={{ color: '#4ade80', fontSize: '11px', fontWeight: 600 }}>✓</span>)}</div>
                                    </motion.div>
                                </div>

                                {/* Right: Negotiation / Vendor Panel (compact) */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(41, 45, 50, 0.6)', borderRadius: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                            <div>
                                                <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 700 }}>Current Vendor</div>
                                                <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>AutoParts Manufacturing</div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ color: '#94a3b8', fontSize: '10px' }}>Quotes</div>
                                                <div style={{ color: '#60a5fa', fontWeight: 700 }}>3</div>
                                            </div>
                                        </div>
                                        <div style={{ color: '#64748b', fontSize: '11px' }}>Selected based on best pricing & delivery terms.</div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {negotiationPhase === 'vendors' && (
                                            <motion.div key="receiving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                style={{ padding: '8px', background: 'rgba(59,130,246,0.08)', borderRadius: '6px', color: '#93c5fd', fontSize: '12px' }}>
                                                <Users size={14} className="text-blue-400" /> Negotiating with vendors ({currentVendorIdx + 1}/3)...
                                            </motion.div>
                                        )}
                                        {negotiationPhase === 'comparing' && (
                                            <motion.div key="comparing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                style={{ padding: '8px', background: 'rgba(251,191,36,0.08)', borderRadius: '6px', color: '#fcd34d', fontSize: '12px' }}>
                                                <TrendingDown size={14} className="text-amber-400" /> Selecting best vendor...
                                            </motion.div>
                                        )}
                                        {negotiationPhase === 'filling' && (
                                            <motion.div key="filling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                style={{ padding: '8px', background: 'rgba(34,197,94,0.08)', borderRadius: '6px', color: '#4ade80', fontSize: '12px' }}>
                                                <CheckCircle size={14} className="text-green-400" /> Filling nominated costs...
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Auto-proceed message */}
                                    {negotiationPhase === 'complete' && allItemsValid() && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '8px', background: 'rgba(34,197,94,0.06)', borderRadius: '6px', textAlign: 'center', color: '#4ade80', fontWeight: 600 }}>
                                            ✓ Purchase Nomination Complete - Proceeding to PR Release...
                                        </motion.div>
                                    )}
                                </div>
                            </div>
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
