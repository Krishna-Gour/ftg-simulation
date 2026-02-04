import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { ArrowRight, CheckCircle } from 'lucide-react';
import styles from './Dashboard.module.css';
import { ProjectStatusTimeline } from '../../UI/ProjectStatusTimeline';

interface PMScreenProps {
    onNext: () => void;
    stepId: number;
}

const lineItems = [
    { name: 'IP Carrier Injection Molding Tool', targetCost: '₹ 3.2 Cr', nominatedCost: '₹ 3 Cr', targetNum: 320, nominatedNum: 300 },
    { name: 'Chute Chanel Vibration', targetCost: '₹ 38 L', nominatedCost: '₹ 40 L', targetNum: 38, nominatedNum: 40 },
    { name: 'Cockpit Checking Fixture', targetCost: '₹ 28 L', nominatedCost: '₹ 25 L', targetNum: 28, nominatedNum: 25 },
    { name: 'Laser Scoring Fixture', targetCost: '₹ 65 L', nominatedCost: '₹ 70 L', targetNum: 65, nominatedNum: 70 },
];

export const PMScreen: React.FC<PMScreenProps> = ({ onNext, stepId }) => {
    const [approvalState, setApprovalState] = useState<'draft' | 'approved'>('draft');
    const [flowStep, setFlowStep] = useState<number>(0); // 0=idle,1=email sent,2=plant head approved,3=pr approved
    const [flowRunning, setFlowRunning] = useState(false);
    const timersRef = React.useRef<number[]>([]);

    if (stepId === 4) {
        const handleReleasePR = () => {
            // start compact approval flow on same screen
            setFlowRunning(true);
            setFlowStep(1); // email sent
            // email sent -> plant head approves -> PR approved -> proceed
            timersRef.current.push(window.setTimeout(() => setFlowStep(2), 900));
            timersRef.current.push(window.setTimeout(() => setFlowStep(3), 2200));
            timersRef.current.push(window.setTimeout(() => {
                setApprovalState('approved');
                setFlowRunning(false);
                setTimeout(onNext, 900);
            }, 3000));
        };

        React.useEffect(() => {
            return () => {
                // cleanup timers
                timersRef.current.forEach(t => clearTimeout(t));
                timersRef.current = [];
            };
        }, []);

        if (approvalState !== 'draft') {
            return (
                <ScreenLayout role="PM" title="PR Release">
                    <div className={styles.stack}>
                        <ProjectStatusTimeline currentStepId={4} />
                        <div className={styles.panel}>
                            <div className={styles.panelBody}>
                                {/* Compact approval flow - all steps on one screen */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560, margin: '0 auto', padding: '8px 0' }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,197,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <CheckCircle size={20} className="text-green-400" />
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff', fontWeight: 700 }}>PR Submitted</div>
                                            <div style={{ color: '#94a3b8', fontSize: 12 }}>PR-MNM-2026-001 sent to approver</div>
                                        </div>
                                    </div>

                                    {/* Steps */}
                                    <div style={{ display: 'grid', gap: 6 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 14 }}>
                                                {flowStep > 0 ? <CheckCircle size={14} className="text-green-400" /> : flowRunning ? <div className="h-3 w-3 rounded-full bg-sky-400 animate-pulse" /> : <div className="h-3 w-3 rounded-full bg-slate-600" />}
                                            </div>
                                            <div style={{ color: flowStep > 0 ? '#fff' : '#94a3b8', fontSize: 13 }}>Email sent to Plant Head</div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 14 }}>
                                                {flowStep > 1 ? <CheckCircle size={14} className="text-green-400" /> : flowStep === 1 ? <div className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" /> : <div className="h-3 w-3 rounded-full bg-slate-600" />}
                                            </div>
                                            <div style={{ color: flowStep > 1 ? '#fff' : '#94a3b8', fontSize: 13 }}>Plant Head approved</div>
                                        </div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 14 }}>
                                                {flowStep > 2 ? <CheckCircle size={14} className="text-green-400" /> : flowStep === 2 ? <div className="h-3 w-3 rounded-full bg-amber-400 animate-pulse" /> : <div className="h-3 w-3 rounded-full bg-slate-600" />}
                                            </div>
                                            <div style={{ color: flowStep > 2 ? '#fff' : '#94a3b8', fontSize: 13 }}>PR Approved & Released</div>
                                        </div>
                                    </div>

                                    <div style={{ textAlign: 'right', marginTop: 6 }}>
                                        <div style={{ color: '#94a3b8', fontSize: 12 }}>{approvalState === 'approved' ? 'Proceeding to PO Release...' : 'Processing approval...'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScreenLayout>
            );
        }

        return (
            <ScreenLayout role="PM" title="PR Release">
                <div className={styles.stack}>
                    <ProjectStatusTimeline currentStepId={4} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        {/* Left: Summary Cards + Vendor */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className={styles.panel}>
                                <div className={styles.panelHeader}>
                                    <h3 className={styles.panelTitle}>PR Summary</h3>
                                </div>
                                <div className={styles.panelBody}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                        <div style={{ flex: 1, padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                            <div style={{ color: '#94a3b8', fontSize: '8px', textTransform: 'uppercase', marginBottom: '3px' }}>Target</div>
                                            <div style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>₹ 4.51 Cr</div>
                                        </div>
                                        <div style={{ flex: 1, padding: '10px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                            <div style={{ color: '#94a3b8', fontSize: '8px', textTransform: 'uppercase', marginBottom: '3px' }}>Nominated</div>
                                            <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>₹ 4.35 Cr</div>
                                        </div>
                                        <div style={{ flex: 1, padding: '10px', background: 'rgba(251, 191, 36, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                            <div style={{ color: '#94a3b8', fontSize: '8px', textTransform: 'uppercase', marginBottom: '3px' }}>Savings</div>
                                            <div style={{ color: '#fbbf24', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>₹ 16 L</div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '8px 10px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                            <span style={{ color: '#94a3b8' }}>Vendor:</span>
                                            <span style={{ color: '#fff' }}>AutoParts Manufacturing</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleReleasePR} className={styles.actionBtn} style={{ width: '100%' }}>
                                        Release PR <ArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right: Line Items Table */}
                        <div className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h3 className={styles.panelTitle}>Line Items</h3>
                            </div>
                            <div className={styles.panelBody}>
                                <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden p-1">
                                    {/* Compact header */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 56px', gap: 8, padding: '8px 12px', fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>
                                        <div>Item</div>
                                        <div style={{ textAlign: 'right' }}>Target</div>
                                        <div style={{ textAlign: 'right' }}>Nominated</div>
                                        <div style={{ textAlign: 'center' }}>Status</div>
                                    </div>

                                    <div>
                                        {lineItems.map((item, idx) => {
                                            const over = item.nominatedNum > item.targetNum;
                                            return (
                                                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 56px', gap: 8, padding: '8px 12px', alignItems: 'center', borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                                                    <div>
                                                        <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600 }}>{item.name}</div>
                                                        <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>Capital Equipment</div>
                                                    </div>
                                                    <div style={{ textAlign: 'right', fontFamily: 'monospace', color: '#60a5fa', fontWeight: 700 }}>{item.targetCost}</div>
                                                    <div style={{ textAlign: 'right', fontFamily: 'monospace', color: over ? '#fb7185' : '#4ade80', fontWeight: 700 }}>{item.nominatedCost}</div>
                                                    <div style={{ textAlign: 'center' }}>
                                                        {over ? <span style={{ color: '#fb7185', fontSize: 12, fontWeight: 700 }}>!</span> : <CheckCircle size={14} className="text-green-400" />}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout role="PM" title="Program Manager Dashboard">
            <div className={styles.stack}>
                <div className={styles.panel}>
                    <div className={styles.panelBody}>
                        <button onClick={onNext} className={styles.actionBtn}>
                            Continue <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </ScreenLayout>
    );
};
