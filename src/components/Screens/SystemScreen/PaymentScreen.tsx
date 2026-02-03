import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { CreditCard, Landmark, ArrowRight, ShieldCheck, Banknote, CheckCircle, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardStyles from '../PMScreen/Dashboard.module.css';

interface PaymentScreenProps {
    onNext: () => void;
    stepId: number;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ onNext, stepId }) => {
    // 3-Stage Payment Flow
    // Step 10: Advance (20%)
    // Step 12: Milestone (40%)
    // Step 14: Final (40%)
    const isAdvance = stepId === 10;
    const isMilestone = stepId === 12;
    // Step 14 is Final (implicit else)

    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);

    const handleProcess = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setDone(true);
        }, 2000);
    };

    // Derived Visuals
    const title = isAdvance ? "Advance Payment (Z002: 20%)" :
        isMilestone ? "Milestone Payment (Z002: 40%)" : "Final Settlement (Z002: 40%)";
    const amount = isAdvance ? "₹ 28,00,000" : isMilestone ? "₹ 56,00,000" : "₹ 56,00,000";
    const desc = isAdvance ? "Tooling Kick-off Advance" : isMilestone ? "PPAP / Quality Milestone" : "Final Balance against GRN";
    const statusUpdate = isAdvance ? "Tooling Kick-off Confirmed (T0)" : isMilestone ? "PPAP Quality Approved" : "Project Financial Closure";

    return (
        <ScreenLayout role="System" title="Financial Clearing House (SAP F110)">
            <div className={dashboardStyles.stack} style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Bank Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3 rounded-lg">
                            <Landmark size={32} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg">Corporate Treasury</h3>
                            <p className="text-slate-400 text-sm">HDFC Bank (Corp Account ***9921)</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-400 text-xs uppercase">Available Liquidity</p>
                        <p className="text-green-400 font-mono text-xl">₹ 50,00,00,000.00</p>
                    </div>
                </div>

                {/* Invoice Context */}
                <div className={dashboardStyles.panel}>
                    <div className={dashboardStyles.panelHeader}>
                        <h3 className={dashboardStyles.panelTitle}>Payment Run Proposal: {new Date().toLocaleDateString()}</h3>
                    </div>
                    <div className={dashboardStyles.panelBody}>
                        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg mb-2">
                            <div className="flex items-center gap-4">
                                {isAdvance ? <ShieldCheck className="text-amber-400" /> :
                                    isMilestone ? <Package className="text-indigo-400" /> : <Banknote className="text-sky-400" />}
                                <div>
                                    <h4 className="text-white font-medium">{title}</h4>
                                    <p className="text-slate-500 text-sm">{desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-white font-mono font-bold">{amount}</p>
                                <p className="text-slate-500 text-xs">Due Immediately</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Area */}
                {!done ? (
                    <div className="flex flex-col items-center gap-4 mt-8">
                        {processing ? (
                            <div className="w-full max-w-md bg-slate-800 rounded-full h-4 overflow-hidden">
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
                                className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-lg shadow-green-900/20 transition-all transform hover:scale-105"
                            >
                                <CreditCard />
                                Authorize Payment
                            </button>
                        )}
                        {processing && <p className="text-slate-400 text-sm animate-pulse">Communicating with Banking Gateway...</p>}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl text-center"
                    >
                        <div className="inline-block p-3 bg-green-500/20 rounded-full mb-4">
                            <CheckCircle size={32} className="text-green-400" />
                        </div>
                        <h3 className="text-white font-bold text-xl mb-2">Transaction Successful</h3>
                        <p className="text-green-300 mb-6">Ref: TXN-{Math.floor(Math.random() * 1000000)}</p>

                        {/* Status Update Feedback */}
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 mb-6 text-left flex items-center gap-3">
                            <div className="h-2 w-2 bg-sky-400 rounded-full animate-pulse"></div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold">Program Status Updated</p>
                                <p className="text-sky-300 text-sm">{statusUpdate}</p>
                            </div>
                        </div>

                        <button onClick={onNext} className={dashboardStyles.submitBtn} style={{ margin: '0 auto' }}>
                            Continue <ArrowRight size={16} />
                        </button>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
