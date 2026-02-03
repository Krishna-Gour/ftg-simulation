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
                                className="w-full bg-sky-600 hover:bg-sky-500 text-white px-4 py-3 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                <Scale size={16} />
                                Verify & Create GRN
                            </button>
                        )}
                    </div>
                </div>

                {/* Completion */}
                {scanned && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-400" size={20} />
                            <div>
                                <h3 className="text-green-400 font-bold text-sm">GRN Created - GRN-MNM-2026-001</h3>
                                <p className="text-green-300/80 text-xs">Ready for final payment</p>
                            </div>
                        </div>
                        <button 
                            onClick={onNext} 
                            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-all"
                        >
                            Continue <ArrowRight size={14} />
                        </button>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
