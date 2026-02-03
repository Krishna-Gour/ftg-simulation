import React from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { AlertCircle, ArrowRight, Factory, CheckCircle, UploadCloud } from 'lucide-react';
import styles from './Dashboard.module.css';

import ConsoleLog from '../../UI/ConsoleLog';

import { DocumentModal } from '../../UI/DocumentModal';

interface PMScreenProps {
    onNext: () => void;
    stepId: number;
}

export const PMScreen: React.FC<PMScreenProps> = ({ onNext, stepId }) => {
    // Step 3: Scope Review (Simplified)
    // Step 4: PR Creation & POrg Select (New Requirement)
    // Step 6: Price Validation
    // Step 7: PO Release (20-40-40 Term)

    const isScopeStep = stepId === 3;
    const isPRStep = stepId === 4;
    const isValidationStep = stepId === 6;
    const isReleaseStep = stepId === 7;

    const [pOrgStatus, setPOrgStatus] = React.useState<'idle' | 'error' | 'success'>('idle');
    const [selectedTerm] = React.useState('Z002'); // Default to 20-40-40
    const [showDoc, setShowDoc] = React.useState(false);
    const [approvalState, setApprovalState] = React.useState<'draft' | 'sending' | 'approved'>('draft');
    const [poApprovalState, setPoApprovalState] = React.useState<'draft' | 'internal' | 'vendor' | 'approved'>('draft');

    React.useEffect(() => {
        setPOrgStatus('idle');
    }, [stepId]);

    const handlePOrgSelect = (valid: boolean) => {
        if (!valid) {
            setPOrgStatus('error');
            setTimeout(() => setPOrgStatus('idle'), 2000);
        } else {
            setPOrgStatus('success');
            // No auto-advance, show PR preview instead
        }
    };

    // Step 3: Simple Scope Review
    if (isScopeStep) {
        return (
            <ScreenLayout role="PM" title="Program Scope Review">
                <div className={styles.stack}>
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>New Program Alert: Project Raptor</h3>
                        </div>
                        <div className={styles.panelBody}>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 mb-6">
                                <ul className="space-y-3 text-sm text-slate-300">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span><strong className="text-white">Scope:</strong> Interior Trims (XUV700)</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span><strong className="text-white">Budget:</strong> 1.60 Cr</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                                        <span><strong className="text-white">Target PO Date:</strong> Immediate</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Milestone Status Bar */}
                            <div className="bg-slate-800/70 rounded-lg border border-slate-600 mb-6 shadow-lg">
                                <div className="p-4 border-b border-slate-700">
                                    <h4 className="text-slate-200 font-semibold text-sm">Project Milestone Status</h4>
                                    <p className="text-slate-400 text-xs mt-1">Visual progress tracking across project phases</p>
                                </div>
                                <div className="p-6">
                                    {/* Fallback: inline-styled progress bar (avoids relying on Tailwind classes) */}
                                    <div style={{ padding: 8 }}>
                                        <div style={{ position: 'relative', marginBottom: 20 }}>
                                            {/* Background track */}
                                            <div
                                                style={{
                                                    height: 28,
                                                    background: '#374151',
                                                    borderRadius: 9999,
                                                    overflow: 'hidden',
                                                    border: '1px solid #4b5563'
                                                }}
                                            >
                                                {/* Progress fill - inline gradient */}
                                                <div
                                                    style={{
                                                        height: '100%',
                                                        width: '16.67%',
                                                        background: 'linear-gradient(90deg, #34d399 0%, #3b82f6 50%, #7c3aed 100%)',
                                                        borderRadius: 9999,
                                                        transition: 'width 600ms ease'
                                                    }}
                                                />
                                            </div>

                                            {/* Markers (absolute, horizontally spaced) */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    right: 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '0 8px',
                                                    pointerEvents: 'none'
                                                }}
                                            >
                                                {/* Current */}
                                                <div style={{ position: 'relative', pointerEvents: 'auto' }}>
                                                    <div
                                                        style={{
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 9999,
                                                            background: '#3b82f6',
                                                            border: '3px solid #fff',
                                                            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#fff',
                                                            fontWeight: 700
                                                        }}
                                                    >
                                                        1
                                                    </div>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            left: -6,
                                                            top: -6,
                                                            width: 44,
                                                            height: 44,
                                                            borderRadius: 9999,
                                                            background: 'rgba(59,130,246,0.35)',
                                                            animation: 'progressPing 1500ms infinite'
                                                        }}
                                                    />
                                                </div>

                                                {/* Pending markers */}
                                                {[2, 3, 4, 5, 6].map((n) => (
                                                    <div
                                                        key={n}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                            borderRadius: 9999,
                                                            background: '#cbd5e1',
                                                            border: '2px solid #e6eef8',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#0f172a',
                                                            fontSize: 12,
                                                            fontWeight: 600
                                                        }}
                                                    >
                                                        {n}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Milestone labels with status */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, padding: '0 8px', marginTop: 8, marginBottom: 12 }}>
                                        {[
                                            { title: 'PR Creation', status: 'Current', highlight: true },
                                            { title: 'PO Negotiation', status: 'Pending' },
                                            { title: 'Tooling Kick-off', status: 'Pending' },
                                            { title: 'PPAP Approval', status: 'Pending' },
                                            { title: 'Bulk Delivery', status: 'Pending' },
                                            { title: 'Final Settlement', status: 'Pending' }
                                        ].map((m, i) => (
                                            <div key={i} style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: 12, fontWeight: 600, color: m.highlight ? '#60a5fa' : '#94a3b8' }}>{m.title}</div>
                                                <div style={{ fontSize: 12, marginTop: 6, color: m.highlight ? '#3b82f6' : '#64748b' }}>{m.status}</div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                            <button onClick={onNext} className={styles.actionBtn}>
                                Proceed to PR Release <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Step 4: PR Creation & POrg Validation (Combined)
    if (isPRStep) {
        const handleReleasePR = () => {
            setApprovalState('sending');
            // Simulate Approval Workflow
            setTimeout(() => setApprovalState('approved'), 2500);
            setTimeout(onNext, 4000);
        };

        if (approvalState !== 'draft') {
            return (
                <ScreenLayout role="PM" title="PR Approval Workflow">
                    <div className={styles.stack}>
                        <div className={styles.panel}>
                            <div className={styles.panelBody}>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    {approvalState === 'sending' && (
                                        <div className="animate-pulse">
                                            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-indigo-400">
                                                <UploadCloud size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Routing for Approval...</h3>
                                            <p className="text-slate-400">Sending Email Notification to Plant Head (L1)</p>
                                        </div>
                                    )}
                                    {approvalState === 'approved' && (
                                        <div className="animate-in zoom-in duration-300">
                                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-green-400">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">PR Approved</h3>
                                            <p className="text-green-300">Authority: A. Sharma (Plant Manager) confirmed.</p>
                                            <p className="text-xs text-slate-500 mt-4">Redirecting to Sourcing...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <h4 className="text-slate-400 text-sm uppercase font-semibold mb-3">Approval Console</h4>
                            <ConsoleLog
                                lines={approvalState === 'sending' ? [
                                    'Sending approval email to Plant Head (L1)...',
                                    'Email delivered to a.sharma@plant.example.com',
                                    'Awaiting response from Plant Head...',
                                    'Plant Head approved PR-2026-001'
                                ] : [
                                    'PR Approved: A. Sharma (Plant Manager) confirmed',
                                    'Redirecting to Sourcing...'
                                ]}
                                interval={800}
                                autoStart={true}
                                height={140}
                            />
                        </div>
                    </div>
                </ScreenLayout>
            );
        }

        return (
            <ScreenLayout role="PM" title="PR Creation & POrg Check (GAP-03)">
                <div className={styles.stack}>
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>Draft Purchase Requisition (New)</h3>
                            <span className="text-xs text-slate-400">Step 1: Review Line Items</span>
                        </div>
                        <div className={styles.panelBody}>
                            {/* 1. Line Items Table */}
                            <div className="bg-slate-900/60 rounded-lg border-2 border-indigo-600/40 shadow-lg overflow-hidden mb-6">
                                <div className="p-4 bg-slate-800 border-b border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-slate-300 font-bold text-sm">Purchase Requisition Items</h4>
                                        <span className="text-slate-500 text-xs bg-slate-700 px-2 py-1 rounded">PR-2026-001</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Review and validate line items before proceeding</p>
                                </div>
                                <div className="overflow-x-auto" style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                                    <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                                        <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase font-semibold">
                                            <tr>
                                                <th className="p-4 text-left font-semibold">Item</th>
                                                <th className="p-4 text-left font-semibold">Material Description</th>
                                                <th className="p-4 text-right font-semibold">Quantity</th>
                                                <th className="p-4 text-right font-semibold">Est. Unit Price</th>
                                                <th className="p-4 text-right font-semibold">Total Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50 text-slate-300">
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4 text-slate-500 font-mono">10</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-white">Polypropylene Granules</div>
                                                    <div className="text-xs text-slate-500">Raw Material - PP Granules</div>
                                                </td>
                                                <td className="p-4 text-right font-mono">5,000 kg</td>
                                                <td className="p-4 text-right font-mono">₹ 95.00</td>
                                                <td className="p-4 text-right font-semibold text-indigo-300">₹ 4,75,000</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4 text-slate-500 font-mono">20</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-white">Mould Tooling: Dash_V2</div>
                                                    <div className="text-xs text-slate-500">Capital Equipment - Tooling</div>
                                                </td>
                                                <td className="p-4 text-right font-mono">1 AU</td>
                                                <td className="p-4 text-right font-mono">₹ 40,00,000</td>
                                                <td className="p-4 text-right font-semibold text-indigo-300">₹ 40,00,000</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-slate-800/60 border-t border-slate-700">
                                            <tr>
                                                <td colSpan={4} className="p-4 text-right text-slate-400 font-semibold">Total PR Value</td>
                                                <td className="p-4 text-right font-bold text-lg text-indigo-300">₹ 44,75,000</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            {/* 2. POrg Selection */}
                            <h4 className="text-sm font-bold text-slate-500 uppercase mb-3">Step 2: Assign Purchasing Org</h4>
                            <div className={styles.statsGrid} style={{ gridTemplateColumns: '1fr 1fr', marginBottom: '24px' }}>
                                <button
                                    onClick={() => handlePOrgSelect(false)}
                                    className={`${styles.statCard} ${styles.statSecondary} hover:bg-slate-700/50 transition-colors`}
                                    style={{ textAlign: 'left', cursor: 'pointer', border: pOrgStatus === 'error' ? '1px solid #ef4444' : '1px solid rgba(51, 65, 85, 1)' }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-slate-700/50 rounded-lg text-slate-400"><Factory size={20} /></div>
                                        <span className="font-semibold text-white">POrg 1000</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Corporate (Central)</p>
                                    {pOrgStatus === 'error' && <div className="mt-2 text-red-400 text-xs font-bold">⛔ Access Denied</div>}
                                </button>

                                <button
                                    onClick={() => handlePOrgSelect(true)}
                                    className={`${styles.statCard} ${styles.statPrimary} hover:bg-indigo-900/20 transition-colors`}
                                    style={{ textAlign: 'left', cursor: 'pointer', border: pOrgStatus === 'success' ? '1px solid #22c55e' : '1px solid rgba(99, 102, 241, 0.4)' }}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Factory size={20} /></div>
                                        <span className="font-semibold text-white">POrg 2000</span>
                                    </div>
                                    <p className="text-sm text-indigo-300">Local Plant (Pune)</p>
                                    {pOrgStatus === 'success' && <div className="mt-2 text-green-400 text-xs font-bold">✔ Authorized</div>}
                                </button>
                            </div>

                            {/* 3. Release Action */}
                            <div className="border-t border-slate-700 pt-6">
                                <button
                                    onClick={handleReleasePR}
                                    disabled={pOrgStatus !== 'success'}
                                    className={`${styles.actionBtn} ${pOrgStatus !== 'success' ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                                >
                                    Step 3: Release PR for Approval <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Step 6: PO Validation & Approval Simulation
    if (isValidationStep) {
        const handleReleasePO = () => {
            setPoApprovalState('internal');
            // 1. Simulate Internal Approval (Authorities)
            setTimeout(() => setPoApprovalState('vendor'), 3000);
            // 2. Simulate Vendor Email
            setTimeout(() => {
                setPoApprovalState('approved');
                // 3. Move Next
                setTimeout(onNext, 2000);
            }, 6000);
        };

        if (poApprovalState !== 'draft') {
            return (
                <ScreenLayout role="PM" title="PO Release Simulation">
                    <div className={styles.stack}>
                        <div className={styles.panel}>
                            <div className={styles.panelBody}>
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    {poApprovalState === 'internal' && (
                                        <div className="animate-pulse">
                                            <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-amber-400">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Routing for Internal Approval...</h3>
                                            <p className="text-slate-400">Awaiting Digital Signatures: CFO, Plant Head</p>
                                        </div>
                                    )}
                                    {poApprovalState === 'vendor' && (
                                        <div className="animate-in fade-in duration-300">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-blue-400">
                                                <UploadCloud size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">Sending to Vendor</h3>
                                            <p className="text-blue-300">Auto-emailing PO to: sales@polygraph-ind.com</p>
                                        </div>
                                    )}
                                    {poApprovalState === 'approved' && (
                                        <div className="animate-in zoom-in duration-300">
                                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-green-400">
                                                <CheckCircle size={32} />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">PO Successfully Released</h3>
                                            <p className="text-green-300">Vendor Acknowledgment Pending...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <h4 className="text-slate-400 text-sm uppercase font-semibold mb-3">PO Release Console</h4>
                            <ConsoleLog
                                lines={poApprovalState === 'internal' ? [
                                    'Initiating internal approvals...',
                                    'Notifying CFO (cfo@example.com)',
                                    'Notifying Plant Head (a.sharma@plant.example.com)',
                                    'Awaiting digital signatures...'
                                ] : poApprovalState === 'vendor' ? [
                                    'Sending PO to vendor: sales@polygraph-ind.com',
                                    'Vendor received PO, preparing acknowledgement...'
                                ] : [
                                    'PO Released: PO-AUTO-9921',
                                    'Vendor Acknowledgment Pending...'
                                ]}
                                interval={800}
                                autoStart={true}
                                height={140}
                            />
                        </div>
                    </div>
                </ScreenLayout>
            );
        }

        return (
            <ScreenLayout role="PM" title="PO Negotiation Simulation">
                <div className={styles.stack}>
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>Purchase Order Review (PO-AUTO-9921)</h3>
                            <button
                                onClick={() => setShowDoc(true)}
                                className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded border border-indigo-500/30 transition-colors"
                            >
                                View Full PO 📄
                            </button>
                        </div>
                        <DocumentModal type="PO" isOpen={showDoc} onClose={() => setShowDoc(false)} />

                        <div className={styles.panelBody}>
                            {/* PO Line Items Table (Clean) */}
                            <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden mb-6">
                                <div className="p-4 bg-slate-800 border-b border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-slate-300 font-bold text-sm">Purchase Order Items</h4>
                                        <span className="text-slate-500 text-xs bg-slate-700 px-2 py-1 rounded">PO-AUTO-9921</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Final validation before release to vendor</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase font-semibold">
                                            <tr>
                                                <th className="p-4 text-left font-semibold">Line</th>
                                                <th className="p-4 text-left font-semibold">Material Description</th>
                                                <th className="p-4 text-right font-semibold">Quantity</th>
                                                <th className="p-4 text-right font-semibold">Unit Rate</th>
                                                <th className="p-4 text-right font-semibold">Line Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-700/50 text-slate-300">
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4 text-slate-500 font-mono">10</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-white">Polypropylene Granules</div>
                                                    <div className="text-xs text-slate-500">Raw Material - Negotiated Rate</div>
                                                </td>
                                                <td className="p-4 text-right font-mono">5,000 kg</td>
                                                <td className="p-4 text-right font-mono">₹ 95.00</td>
                                                <td className="p-4 text-right font-semibold text-green-300">₹ 4,75,000</td>
                                            </tr>
                                            <tr className="hover:bg-slate-800/30 transition-colors">
                                                <td className="p-4 text-slate-500 font-mono">20</td>
                                                <td className="p-4">
                                                    <div className="font-medium text-white">Mould Tooling: Dash_V2</div>
                                                    <div className="text-xs text-slate-500">Capital Equipment - Tooling</div>
                                                </td>
                                                <td className="p-4 text-right font-mono">1 AU</td>
                                                <td className="p-4 text-right font-mono">₹ 38,50,000</td>
                                                <td className="p-4 text-right font-semibold text-green-300">₹ 38,50,000</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="bg-slate-800/60 border-t border-slate-700">
                                            <tr>
                                                <td colSpan={4} className="p-4 text-right text-slate-400 font-semibold">Net Order Value</td>
                                                <td className="p-4 text-right font-bold text-lg text-green-300">₹ 43,25,000</td>
                                            </tr>
                                            <tr className="bg-slate-800/40">
                                                <td colSpan={4} className="p-4 text-right text-slate-500 text-sm">Negotiated Savings</td>
                                                <td className="p-4 text-right text-sm text-emerald-400 font-semibold">₹ 1,50,000 (3.3%)</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <button onClick={handleReleasePO} className={styles.actionBtn}>
                                Submit for Approval & Release <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Milestone Updates
    if (stepId === 11 || stepId === 13) {
        const isTooling = stepId === 11;
        return (
            <ScreenLayout role="PM" title="Milestone Completion Update">
                <div className={styles.stack}>
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>
                                {isTooling ? "Milestone: Tooling Kick-off (T0)" : "Milestone: Bulk Supply & GRN"}
                            </h3>
                            <span className="text-xs text-sky-400 font-bold uppercase tracking-wider">Action Required</span>
                        </div>

                        <div className={styles.panelBody}>
                            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
                                <h4 className="text-sm font-bold text-slate-400 uppercase mb-4">Verification Checklist</h4>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors">
                                        <div className="w-5 h-5 rounded border border-indigo-500 bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="text-slate-300 text-sm">
                                            {isTooling ? "T0 Inspection Report Uploaded (QC-Ref-99)" : "Goods Receipt Note (GRN) Verified"}
                                        </span>
                                    </label>
                                    <label className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors">
                                        <div className="w-5 h-5 rounded border border-indigo-500 bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                            <CheckCircle size={14} />
                                        </div>
                                        <span className="text-slate-300 text-sm">
                                            {isTooling ? "Vendor Tooling Asset Tagged" : "Quality Clearance Certificate (QCC) Signed"}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 mb-6">
                                <AlertCircle className="text-yellow-400 shrink-0" size={20} />
                                <p className="text-xs text-yellow-200">
                                    Confirming this milestone will automatically trigger the
                                    <strong> {isTooling ? "40% Interim Payment" : "40% Final Settlement"} </strong>
                                    workflow in SAP.
                                </p>
                            </div>

                            <button onClick={onNext} className={styles.submitBtn}>
                                Verify & Approve Milestone <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Step 7: PO Release
    if (isReleaseStep) {
        return (
            <ScreenLayout role="PM" title="Purchase Order Release (GAP-01)">
                <div className={styles.stack}>
                    <div className={styles.panel}>
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>Finalize Purchase Order: PO-AUTO-9921</h3>
                            <button
                                onClick={() => setShowDoc(true)}
                                className="text-xs bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded border border-indigo-500/30 transition-colors"
                            >
                                Preview PDF 📄
                            </button>
                        </div>
                        <DocumentModal type="PO" isOpen={showDoc} onClose={() => setShowDoc(false)} />

                        <div className={styles.panelBody}>
                            {/* Vendor & Payment Info Header */}
                            <div className="flex justify-between items-start bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-6">
                                <div>
                                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Vendor Details</span>
                                    <h4 className="text-white font-semibold text-lg mt-1">Polygraph Private Ltd.</h4>
                                    <p className="text-slate-500 text-sm">Pune Industrial Estate, MH</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Payment Terms</span>
                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded border border-green-500/30">
                                            {selectedTerm} (Selected)
                                        </div>
                                    </div>
                                    <p className="text-slate-500 text-xs mt-1">40% Advance / 40% Delivery / 20% Install</p>
                                </div>
                            </div>

                            {/* PO Line Items Table */}
                            <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden mb-6">
                                <div className="p-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                                    <span className="text-slate-300 font-bold text-sm">Order Items</span>
                                    <span className="text-slate-500 text-xs">Currency: INR</span>
                                </div>
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
                                        <tr>
                                            <th className="p-3">Ln</th>
                                            <th className="p-3">Material / Service</th>
                                            <th className="p-3">Delivery Date</th>
                                            <th className="p-3 text-right">Qty</th>
                                            <th className="p-3 text-right">Net Price</th>
                                            <th className="p-3 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800 text-slate-300">
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="p-3 text-slate-500">10</td>
                                            <td className="p-3">
                                                <div className="font-medium text-white">Polypropylene Granules</div>
                                                <div className="text-xs text-slate-500">Grade: Industrial Black</div>
                                            </td>
                                            <td className="p-3">Feb 28, 2026</td>
                                            <td className="p-3 text-right">5,000 kg</td>
                                            <td className="p-3 text-right">₹ 95.00</td>
                                            <td className="p-3 text-right font-medium text-white">₹ 4,75,000</td>
                                        </tr>
                                        <tr className="hover:bg-slate-800/50 transition-colors">
                                            <td className="p-3 text-slate-500">20</td>
                                            <td className="p-3">
                                                <div className="font-medium text-white">Mould Tooling: Dash_V2</div>
                                                <div className="text-xs text-slate-500">Asset Tag: FX-992</div>
                                            </td>
                                            <td className="p-3">Mar 15, 2026</td>
                                            <td className="p-3 text-right">1 AU</td>
                                            <td className="p-3 text-right">₹ 38,50,000</td>
                                            <td className="p-3 text-right font-medium text-white">₹ 38,50,000</td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-slate-800/80 text-white font-bold">
                                        <tr>
                                            <td colSpan={5} className="p-3 text-right text-slate-400">Grand Total (Excl. Tax)</td>
                                            <td className="p-3 text-right text-indigo-300">₹ 43,25,000</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            <button onClick={onNext} className={styles.actionBtn}>
                                Release Purchase Order <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </ScreenLayout>
        );
    }

    // Default Fallback (Step 4 Fallback is handled above, so this is mostly legacy safety)
    return (
        <ScreenLayout role="PM" title="Program Manager Dashboard">
            <div className={styles.stack}>
                <div className={styles.panel}>
                    <div className={styles.panelHeader}>
                        <h3 className={styles.panelTitle}>Action Items</h3>
                        <span className={styles.badgeNew}>New</span>
                    </div>
                    <div className={styles.panelBody}>
                        <button onClick={onNext} className={styles.actionBtn} style={{ opacity: 1, transform: 'none' }}>
                            View Action <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </ScreenLayout>
    );
};
