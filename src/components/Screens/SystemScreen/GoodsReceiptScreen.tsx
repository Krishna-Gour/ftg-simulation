import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { Scale, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardStyles from '../PMScreen/Dashboard.module.css';
import { ProjectStatusTimeline } from '../../UI/ProjectStatusTimeline';

interface GoodsReceiptScreenProps {
    onNext: () => void;
    stepId: number;
}

// Project MnM Line Items for GRN
const grnLineItems = [
    { name: 'IP Carrier Injection Molding Tool', shortValue: '₹ 3 Cr' },
    { name: 'Chute Chanel Vibration', shortValue: '₹ 40 L' },
    { name: 'Cockpit Checking Fixture', shortValue: '₹ 25 L' },
    { name: 'Laser Scoring Fixture', shortValue: '₹ 70 L' },
];

export const GoodsReceiptScreen: React.FC<GoodsReceiptScreenProps> = ({ onNext }) => {
    const [scanned, setScanned] = useState(false);

    const handleScan = () => {
        setScanned(true);
    };

    return (
        <ScreenLayout role="System" title="GRN (Goods Receipt Note)">
            <div className={dashboardStyles.stack} style={{ maxWidth: '100%', margin: '0 auto', gap: '8px' }}>
                <ProjectStatusTimeline currentStepId={7} />

                {/* Main Content - Horizontal 2-column */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    {/* Left: Items List */}
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelHeader}>
                            <h3 className={dashboardStyles.panelTitle} style={{ fontSize: '11px' }}>Delivery Items - PO-MNM-2026-001</h3>
                            <span className="text-[9px] text-emerald-400 font-mono">Tooling Solutions Ltd</span>
                        </div>
                        <div className={dashboardStyles.panelBody}>
                            <table className="w-full text-xs">
                                <thead className="bg-slate-800/80 text-slate-400 uppercase">
                                    <tr>
                                        <th className="p-2 text-left text-[10px]">Item</th>
                                        <th className="p-2 text-right text-[10px]">Value</th>
                                        <th className="p-2 text-center text-[10px]">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {grnLineItems.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-800/30">
                                            <td className="p-2 text-white text-[11px]">{item.name}</td>
                                            <td className="p-2 text-right font-mono text-indigo-300 text-[11px]">{item.shortValue}</td>
                                            <td className="p-2 text-center">
                                                {scanned ? (
                                                    <span className="text-green-400 text-[10px]">✓ Verified</span>
                                                ) : (
                                                    <span className="text-slate-500 text-[10px]">—</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-800/60 border-t border-slate-700">
                                    <tr>
                                        <td className="p-2 text-right text-slate-400 font-semibold text-[11px]">Total</td>
                                        <td className="p-2 text-right font-bold text-indigo-300 text-sm">₹ 4.35 Cr</td>
                                        <td className="p-2 text-center">
                                            {scanned && <span className="text-green-400 text-[10px] font-bold">All ✓</span>}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Right: Verification & Action */}
                    <div className="space-y-2">
                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelBody}>
                                <h4 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Expected</h4>
                                <div className="text-xl font-bold text-slate-300">4 Items</div>
                                <p className="text-[10px] text-slate-500 mt-1">₹ 4.35 Cr</p>
                            </div>
                        </div>

                        <div className={dashboardStyles.panel} style={{ borderColor: scanned ? '#22c55e' : undefined }}>
                            <div className={dashboardStyles.panelBody}>
                                <h4 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Verified</h4>
                                <div className="text-xl font-bold text-white">
                                    {scanned ? "4 Items" : "—"}
                                </div>
                                {scanned && <p className="text-[10px] text-green-400 mt-1">✓ Complete</p>}
                            </div>
                        </div>

                        {!scanned && (
                            <button
                                onClick={handleScan}
                                className="w-full relative group bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-sky-900/50 hover:shadow-sky-800/60 hover:scale-[1.03] active:scale-[0.97] border border-sky-400/20 hover:border-sky-400/40"
                            >
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Scale size={20} className="relative z-10" />
                                <span className="relative z-10">Verify & Create GRN</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Completion */}
                {scanned && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 p-5 rounded-xl flex items-center justify-between backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl">
                                <CheckCircle className="text-green-400" size={28} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base mb-1">GRN Created - GRN-MNM-2026-001</h3>
                                <p className="text-green-300 text-sm">Ready for final payment</p>
                            </div>
                        </div>
                        <button 
                            onClick={onNext} 
                            className="relative group bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-500 hover:via-blue-500 hover:to-sky-500 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3 transition-all duration-300 shadow-2xl shadow-sky-900/50 hover:shadow-sky-800/60 hover:scale-[1.03] active:scale-[0.97] border border-sky-400/20 hover:border-sky-400/40"
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <span className="relative z-10">Continue</span>
                            <ArrowRight size={20} className="relative z-10" />
                        </button>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
