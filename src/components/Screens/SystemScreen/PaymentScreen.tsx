import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { CreditCard, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardStyles from '../PMScreen/Dashboard.module.css';
import { ProjectStatusTimeline } from '../../UI/ProjectStatusTimeline';

interface PaymentScreenProps {
    onNext: () => void;
    stepId: number;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onNext, stepId }) => {
    // 2-Stage Payment Flow for Project MnM
    // Step 6: Stage Payment (20% Advance)
    // Step 8: Final Payment (80% on GRN)
    const isStagePayment = stepId === 6;
    // Step 8 is Final Payment (implicit else)

    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);

    const handleProcess = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setDone(true);
        }, 2000);
    };

    // Derived Visuals for Project MnM
    const title = isStagePayment ? "Stage Payment (20%)" : "Final Payment (80%)";
    const amountShort = isStagePayment ? "₹ 87 L" : "₹ 3.48 Cr";
    const statusUpdate = isStagePayment ? "Stage Payment Completed - Awaiting Delivery" : "Project Financial Closure - PO Closed";

    return (
        <ScreenLayout role="System" title={isStagePayment ? "Stage Payment" : "Final Payment"}>
            <div className={dashboardStyles.stack} style={{ maxWidth: '100%', margin: '0 auto', gap: '8px' }}>
                <ProjectStatusTimeline currentStepId={isStagePayment ? 6 : 8} />

                {/* Main Content - Horizontal */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                    {/* Left: Payment Details */}
                    <div className={dashboardStyles.panel}>
                        <div className={dashboardStyles.panelHeader}>
                            <h3 className={dashboardStyles.panelTitle} style={{ fontSize: '11px' }}>
                                {title} - PO-MNM-2026-001
                            </h3>
                            <span className="text-white font-mono text-sm font-bold">{amountShort}</span>
                        </div>
                        <div className={dashboardStyles.panelBody}>
                            <div className="grid grid-cols-3 gap-3 text-xs">
                                <div className="text-center p-2 bg-slate-800/50 rounded">
                                    <div className="text-slate-400 text-[10px]">Total PO</div>
                                    <div className="text-white font-semibold mt-1">₹ 4.35 Cr</div>
                                </div>
                                <div className="text-center p-2 bg-slate-800/50 rounded">
                                    <div className="text-slate-400 text-[10px]">Stage (20%)</div>
                                    <div className={isStagePayment ? "text-amber-400 font-semibold mt-1" : "text-green-400 mt-1"}>
                                        ₹ 87 L {!isStagePayment && "✓"}
                                    </div>
                                </div>
                                <div className="text-center p-2 bg-slate-800/50 rounded">
                                    <div className="text-slate-400 text-[10px]">Final (80%)</div>
                                    <div className={!isStagePayment ? "text-amber-400 font-semibold mt-1" : "text-slate-500 mt-1"}>
                                        ₹ 3.48 Cr {isStagePayment && "(GRN)"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Vendor & Bank */}
                    <div className="space-y-2">
                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelBody}>
                                <h5 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Vendor</h5>
                                <div className="text-xs space-y-1">
                                    <p className="text-white font-medium">Tooling Solutions Ltd</p>
                                    <p className="text-slate-400 text-[10px]">GST: 24AABCT1234F1Z2</p>
                                </div>
                            </div>
                        </div>

                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelBody}>
                                <h5 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Bank</h5>
                                <div className="text-xs space-y-1">
                                    <p className="text-white">ICICI Bank</p>
                                    <p className="text-slate-400 text-[10px]">A/C: 002305500123</p>
                                    <p className="text-slate-400 text-[10px]">IFSC: ICIC0000023</p>
                                </div>
                            </div>
                        </div>

                        <div className={dashboardStyles.panel}>
                            <div className={dashboardStyles.panelBody}>
                                <h5 className="text-slate-400 text-[10px] uppercase font-semibold mb-2">Method</h5>
                                <p className="text-white text-xs">RTGS</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Area */}
                {!done ? (
                    <div className="flex justify-center">
                        {processing ? (
                            <div className="w-full max-w-sm bg-slate-800 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                        ) : (
                            <button
                                onClick={handleProcess}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-3 transition-all shadow-xl shadow-green-900/40 hover:shadow-green-800/50 hover:scale-[1.03] active:scale-[0.98]"
                            >
                                <CreditCard size={20} />
                                Authorize Payment
                            </button>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/40 p-5 rounded-xl flex items-center justify-between backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-green-500/20 p-3 rounded-xl">
                                <CheckCircle size={28} className="text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base mb-1">Payment Successful</h3>
                                <p className="text-green-300 text-sm">{statusUpdate}</p>
                            </div>
                        </div>
                        <button 
                            onClick={onNext} 
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-green-900/30 hover:shadow-green-800/40 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Continue <ArrowRight size={16} />
                        </button>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
