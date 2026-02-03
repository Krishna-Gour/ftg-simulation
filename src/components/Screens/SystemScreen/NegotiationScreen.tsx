import React, { useState, useEffect } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { RefreshCw, ArrowRight, TrendingDown, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsoleLog from '../../UI/ConsoleLog';
// Reusing Dashboard styles for consistency + inline overrides
import dashboardStyles from '../PMScreen/Dashboard.module.css';

interface NegotiationScreenProps {
    onNext: () => void;
    stepId: number;
}

export const NegotiationScreen: React.FC<NegotiationScreenProps> = ({ onNext }) => {
    const [status, setStatus] = useState<'analyzing' | 'negotiating' | 'finalized' | 'releasing' | 'approved'>('analyzing');
    const [currentValue, setCurrentValue] = useState(15000000); // 1.5 Cr
    const targetValue = 14000000; // 1.4 Cr

    useEffect(() => {
        // Auto-start analysis
        const t1 = setTimeout(() => setStatus('negotiating'), 1500);
        return () => clearTimeout(t1);
    }, []);

    useEffect(() => {
        if (status === 'negotiating' && currentValue > targetValue) {
            const interval = setInterval(() => {
                setCurrentValue(prev => {
                    const next = prev - 50000;
                    if (next <= targetValue) {
                        clearInterval(interval);
                        setStatus('finalized');
                        return targetValue;
                    }
                    return next;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [status, currentValue]);

    useEffect(() => {
        if (status === 'releasing') {
            setTimeout(() => setStatus('approved'), 3000);
            setTimeout(onNext, 5000);
        }
    }, [status, onNext]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <ScreenLayout role="System" title="PO Negotiation Simulation">
            <div className={dashboardStyles.stack} style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Status Header */}
                <div className={dashboardStyles.panel}>
                    <div className={dashboardStyles.panelHeader}>
                        <h3 className={dashboardStyles.panelTitle}>
                            {status === 'analyzing' && "Analyzing Vendor History..."}
                            {status === 'negotiating' && "Applying Volume Discounts..."}
                            {status === 'finalized' && "Purchase Price Validation Complete"}
                            {status === 'releasing' && "Routing PO for Approval..."}
                            {status === 'approved' && "PO Approved & Released"}
                        </h3>
                        {status === 'negotiating' && <RefreshCw className="animate-spin text-sky-400" size={18} />}
                        {status === 'finalized' && <CheckCircle className="text-green-400" size={18} />}
                        {status === 'releasing' && <RefreshCw className="animate-spin text-amber-400" size={18} />}
                        {status === 'approved' && <CheckCircle className="text-green-400" size={18} />}
                    </div>
                </div>

                {/* Main Visualization */}
                <div className={dashboardStyles.statsGrid} style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                    {/* PR Box */}
                    <div className={`${dashboardStyles.statCard} ${dashboardStyles.statSecondary}`}>
                        <span className={dashboardStyles.statLabel}>Initial PR Value</span>
                        <div className="text-2xl font-bold text-slate-400 mt-2">₹ 1.50 Cr</div>
                        <p className="text-xs text-slate-500 mt-1">Based on Index Price</p>
                    </div>

                    {/* Animation Box */}
                    <div className="flex flex-col items-center justify-center">
                        <motion.div
                            animate={{ scale: status === 'negotiating' ? [1, 1.1, 1] : 1 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="bg-sky-500/10 p-4 rounded-full"
                        >
                            <TrendingDown size={32} className="text-sky-400" />
                        </motion.div>
                        {status === 'finalized' && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-green-400 text-sm font-bold bg-green-900/30 px-2 py-1 rounded"
                            >
                                Saved ₹ 10 Lakhs
                            </motion.div>
                        )}
                    </div>

                    {/* PO Box */}
                    <div className={`${dashboardStyles.statCard} ${dashboardStyles.statPrimary}`}
                        style={{ borderColor: status === 'finalized' ? '#22c55e' : undefined, background: status === 'finalized' ? 'rgba(34, 197, 94, 0.1)' : undefined }}>
                        <span className={dashboardStyles.statLabel}>Final PO Value</span>
                        <div className="text-2xl font-bold text-white mt-2">
                            {formatCurrency(currentValue)}
                        </div>
                        <p className="text-xs text-indigo-300 mt-1">Vendor: Polymers Inc</p>
                    </div>
                </div>

                {/* Contract Details Panel */}
                <div className={dashboardStyles.panel}>
                    <div className={dashboardStyles.panelBody}>
                        <h4 className="text-slate-400 text-sm uppercase font-semibold mb-3">Policy Applied: Global Material Agreement (GMA-2024)</h4>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Index Price (PP Granules):</span>
                                <span className="text-white">₹ 105.00 / kg</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Contract Rate:</span>
                                <span className="text-green-400 font-mono">₹ 98.00 / kg (-7%)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hacker-style Console Simulation */}
                <div style={{ marginTop: 12 }}>
                    <h4 className="text-slate-400 text-sm uppercase font-semibold mb-3">Simulation Console</h4>
                    <ConsoleLog
                        lines={[
                            'PR Created: PR-2026-001',
                            'PR Routed for Approval: sent to Plant Head (L1)',
                            'PR Approved: L1 Authority confirmed',
                            '',
                            'Converting PR -> PO: Draft PO-AUTO-9921',
                            'Negotiation started: Opening vendor offer ₹1,50,00,000',
                            'Negotiation: System counter -₹5,00,000',
                            'Negotiation: Vendor reduces to ₹1,45,00,000',
                            'Final Agreement: ₹1,40,00,000 (Target met)',
                            'Routing PO for Approval',
                            'PO Approved & Released: PO-AUTO-9921'
                        ]}
                        interval={900}
                        autoStart={true}
                        height={180}
                    />
                </div>

                {/* PO Display when finalized */}
                {status === 'finalized' && (
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelHeader}>
                            <h3 className={dashboardStyles.panelTitle}>Purchase Order Review</h3>
                            <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded">PO-AUTO-9921</span>
                        </div>
                        <div className={dashboardStyles.panelBody}>
                            <div className="bg-slate-900/50 rounded-lg border border-slate-700 overflow-hidden mb-6">
                                <div className="p-4 bg-slate-800 border-b border-slate-700">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-slate-300 font-bold text-sm">Order Line Items</h4>
                                        <span className="text-slate-500 text-xs">Vendor: Polygraph Pvt Ltd</span>
                                    </div>
                                    <p className="text-slate-400 text-xs">Negotiated prices applied - ready for approval</p>
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
                                                <td colSpan={4} className="p-4 text-right text-slate-500 text-sm">Savings vs PR</td>
                                                <td className="p-4 text-right text-sm text-emerald-400 font-semibold">₹ 1,50,000 (3.3%)</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Approval Simulation */}
                {status === 'releasing' && (
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelBody}>
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="animate-pulse">
                                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-amber-400">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Routing for Approval...</h3>
                                    <p className="text-slate-400">Sending Email Notification to Managing Director</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {status === 'approved' && (
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelBody}>
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 mx-auto text-green-400">
                                    <CheckCircle size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">PO Approved</h3>
                                <p className="text-green-300">Authority: R. Kumar (Managing Director) confirmed.</p>
                                <p className="text-xs text-slate-500 mt-4">Vendor receiving PO via auto-email...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {status === 'finalized' && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => setStatus('releasing')}
                        className={dashboardStyles.submitBtn}
                        style={{ alignSelf: 'flex-end' }}
                    >
                        Release PO <ArrowRight size={16} />
                    </motion.button>
                )}

            </div>
        </ScreenLayout>
    );
};
