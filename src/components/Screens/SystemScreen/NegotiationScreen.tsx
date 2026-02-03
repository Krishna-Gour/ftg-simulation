import React, { useState, useEffect } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { RefreshCw, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
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
    const [status, setStatus] = useState<'processing' | 'ready' | 'approved'>('processing');

    useEffect(() => {
        // Auto-convert PR to PO
        const t1 = setTimeout(() => setStatus('ready'), 2000);
        return () => clearTimeout(t1);
    }, []);

    useEffect(() => {
        if (status === 'approved') {
            setTimeout(onNext, 2000);
        }
    }, [status, onNext]);

    return (
        <ScreenLayout role="System" title="PO Release">
            <div className={dashboardStyles.stack} style={{ maxWidth: '100%', margin: '0 auto', gap: '8px' }}>
                <ProjectStatusTimeline currentStepId={5} />

                {/* Main Content - Horizontal Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                    {/* Left: PO Summary */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelHeader}>
                                <h3 className={dashboardStyles.panelTitle} style={{ fontSize: '11px' }}>PO-MNM-2026-001</h3>
                                {status === 'processing' && <RefreshCw className="animate-spin text-sky-400" size={14} />}
                                {status === 'ready' && <CheckCircle className="text-green-400" size={14} />}
                                {status === 'approved' && <CheckCircle className="text-green-400" size={14} />}
                            </div>
                            <div className={dashboardStyles.panelBody}>
                                <div className="space-y-2 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Value:</span>
                                        <span className="text-white font-bold">₹ 4.35 Cr</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Vendor:</span>
                                        <span className="text-slate-200">Tooling Solutions</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Items:</span>
                                        <span className="text-slate-200">4</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Terms */}
                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelBody}>
                                <h4 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Payment</h4>
                                <div className="space-y-1.5 text-[11px]">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Stage (20%):</span>
                                        <span className="text-white">₹ 87 L</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Final (80%):</span>
                                        <span className="text-white">₹ 3.48 Cr</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        {status === 'ready' && (
                            <button
                                onClick={() => setStatus('approved')}
                                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                Release PO <ArrowRight size={14} />
                            </button>
                        )}
                    </div>

                    {/* Right: Line Items Table */}
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelHeader}>
                            <h3 className={dashboardStyles.panelTitle}>Line Items</h3>
                        </div>
                        <div className={dashboardStyles.panelBody}>
                            <table className="w-full text-xs">
                                <thead className="bg-slate-800/80 text-slate-400 uppercase">
                                    <tr>
                                        <th className="p-2 text-left text-[10px]">Item</th>
                                        <th className="p-2 text-right text-[10px]">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {poLineItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/30">
                                            <td className="p-2 text-white text-[11px]">{item.name}</td>
                                            <td className="p-2 text-right font-mono text-green-400 text-[11px]">{item.shortValue}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-800/60 border-t border-slate-700">
                                    <tr>
                                        <td className="p-2 text-right text-slate-400 font-semibold text-[11px]">Total</td>
                                        <td className="p-2 text-right font-bold text-green-300 text-sm">₹ 4.35 Cr</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Approval Confirmation */}
                {status === 'approved' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg text-center"
                    >
                        <CheckCircle size={24} className="text-green-400 mx-auto mb-2" />
                        <h3 className="text-white font-bold text-sm">PO Approved & Released</h3>
                        <p className="text-green-300 text-xs mt-1">Sent to vendor: Tooling Solutions Ltd</p>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
