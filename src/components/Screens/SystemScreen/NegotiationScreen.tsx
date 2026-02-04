import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { ArrowRight, CheckCircle } from 'lucide-react';
// framer-motion not required here
import { ProjectStatusTimeline } from '../../UI/ProjectStatusTimeline';
// Reusing Dashboard styles for consistency + inline overrides
import dashboardStyles from '../PMScreen/Dashboard.module.css';

interface NegotiationScreenProps {
    onNext: () => void;
    stepId: number;
}

// Project MnM Line Items for PO (used in table below)
const poLineItems = [
    { name: 'IP Carrier Injection Molding Tool', shortValue: '₹ 3 Cr', value: '₹ 3,00,00,000' },
    { name: 'Chute Chanel Vibration', shortValue: '₹ 40 L', value: '₹ 40,00,000' },
    { name: 'Cockpit Checking Fixture', shortValue: '₹ 25 L', value: '₹ 25,00,000' },
    { name: 'Laser Scoring Fixture', shortValue: '₹ 70 L', value: '₹ 70,00,000' },
];

export const NegotiationScreen: React.FC<NegotiationScreenProps> = ({ onNext }) => {
    const [approvalState, setApprovalState] = useState<'draft' | 'approved'>('draft');
    const [flowStep, setFlowStep] = useState<number>(0); // 0=idle,1=email sent,2=plant head approved,3=po approved
    const [flowRunning, setFlowRunning] = useState(false);
    const timersRef = React.useRef<number[]>([]);
    const approvalRef = React.useRef<HTMLDivElement | null>(null);

    const handleReleasePO = () => {
        // start compact approval flow on same screen
        // clear any previous timers
        timersRef.current.forEach(t => clearTimeout(t));
        timersRef.current = [];

        setFlowRunning(true);
        setFlowStep(1); // email sent

        // scroll approval panel into view
        setTimeout(() => approvalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);

        // email sent -> plant head approves -> PO approved -> proceed
        timersRef.current.push(window.setTimeout(() => setFlowStep(2), 900));
        timersRef.current.push(window.setTimeout(() => setFlowStep(3), 2200));
        timersRef.current.push(window.setTimeout(() => {
            setApprovalState('approved');
            setFlowRunning(false);
            setTimeout(onNext, 900);
        }, 3000));
    };

    // cleanup timers if component unmounts
    React.useEffect(() => {
        return () => {
            timersRef.current.forEach(t => clearTimeout(t));
            timersRef.current = [];
        };
    }, []);

    if (approvalState !== 'draft' || flowRunning) {
        return (
            <ScreenLayout role="System" title="PO Release">
                <div className={dashboardStyles.stack} style={{ maxWidth: '100%', margin: '0 auto', gap: '8px' }}>
                    <ProjectStatusTimeline currentStepId={5} />
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelBody}>
                            {/* Compact approval flow - all steps on one screen */}
                            <div ref={approvalRef} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 560, margin: '0 auto', padding: '8px 0' }}>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(34,197,94,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CheckCircle size={20} className="text-green-400" />
                                    </div>
                                    <div>
                                        <div style={{ color: '#fff', fontWeight: 700 }}>PO Submitted</div>
                                        <div style={{ color: '#94a3b8', fontSize: 12 }}>PO-MNM-2026-001 sent to approver</div>
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
                                        <div style={{ color: flowStep > 2 ? '#fff' : '#94a3b8', fontSize: 13 }}>PO Approved & Released</div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', marginTop: 6 }}>
                                    <div style={{ color: '#94a3b8', fontSize: 12 }}>{approvalState === 'approved' ? 'Proceeding to Stage Payment...' : 'Processing approval...'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout role="System" title="PO Release">
            <div className={dashboardStyles.stack} style={{ maxWidth: '100%', margin: '0 auto', gap: '8px' }}>
                <ProjectStatusTimeline currentStepId={5} />

                {/* Main Content - Horizontal Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {/* Left: PO Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelHeader}>
                                <h3 className={dashboardStyles.panelTitle}>PO Summary</h3>
                            </div>
                            <div className={dashboardStyles.panelBody}>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                    <div style={{ flex: 1, padding: '10px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ color: '#94a3b8', fontSize: '8px', textTransform: 'uppercase', marginBottom: '3px' }}>PO Value</div>
                                        <div style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>₹ 4.35 Cr</div>
                                    </div>
                                    <div style={{ flex: 1, padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ color: '#94a3b8', fontSize: '8px', textTransform: 'uppercase', marginBottom: '3px' }}>Items</div>
                                        <div style={{ color: '#60a5fa', fontFamily: 'monospace', fontSize: '14px', fontWeight: 700 }}>4</div>
                                    </div>
                                </div>
                                <div style={{ padding: '8px 10px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '8px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                                        <span style={{ color: '#94a3b8' }}>Vendor:</span>
                                        <span style={{ color: '#fff' }}>Tooling Solutions Ltd</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleReleasePO}
                                    disabled={flowRunning}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-900/30 hover:shadow-green-800/40 hover:scale-[1.02] active:scale-[0.98]"
                                    style={{ width: '100%' }}
                                >
                                    <ArrowRight size={16} />
                                    Release PO
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Line Items Table */}
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelHeader}>
                            <h3 className={dashboardStyles.panelTitle}>Line Items</h3>
                        </div>
                        <div className={dashboardStyles.panelBody}>
                            <div className="bg-slate-900/60 rounded-lg border border-slate-700 overflow-hidden p-1">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8, padding: '8px 12px', fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>
                                    <div>Item</div>
                                    <div style={{ textAlign: 'right' }}>Value</div>
                                </div>

                                <div>
                                    {poLineItems.map((item, idx) => (
                                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8, padding: '8px 12px', alignItems: 'center', borderTop: idx === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)' }}>
                                            <div>
                                                <div style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 600 }}>{item.name}</div>
                                                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>PO Line</div>
                                            </div>
                                            <div style={{ textAlign: 'right', fontFamily: 'monospace', color: '#4ade80', fontWeight: 700 }}>{item.shortValue}</div>
                                        </div>
                                    ))}

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 8, padding: '10px 12px', background: 'rgba(51,65,85,0.8)', borderRadius: 6, marginTop: 8 }}>
                                        <div style={{ color: '#fff', fontWeight: 700 }}>Total</div>
                                        <div style={{ textAlign: 'right', fontWeight: 800, color: '#4ade80' }}>₹ 4.35 Cr</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </ScreenLayout>
    );
};
