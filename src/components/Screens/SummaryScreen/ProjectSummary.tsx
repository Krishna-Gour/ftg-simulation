import React from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { CheckCircle, RefreshCw, TrendingUp } from 'lucide-react';
import styles from './ProjectSummary.module.css';
import { motion } from 'framer-motion';

interface ProjectSummaryProps {
    onRestart: () => void;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ onRestart }) => {
    return (
        <ScreenLayout role="PM" title="Procurement Complete">
            <div className={styles.container}>

                {/* Success Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-4">
                        <CheckCircle size={48} className="text-green-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Project MnM Complete!</h2>
                    <p className="text-slate-400 text-sm">End-to-end procurement workflow executed successfully</p>
                </motion.div>

                {/* Summary Stats Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                    >
                        <div className="text-slate-400 text-xs mb-1">Total Value</div>
                        <div className="text-2xl font-bold text-white">₹ 4.35 Cr</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                    >
                        <div className="text-slate-400 text-xs mb-1">Items</div>
                        <div className="text-2xl font-bold text-white">4</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 text-center"
                    >
                        <div className="text-slate-400 text-xs mb-1">Payments</div>
                        <div className="text-2xl font-bold text-green-400">2 / 2 ✓</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-slate-800/50 border border-emerald-700 rounded-lg p-4 text-center"
                    >
                        <div className="text-emerald-400 text-xs mb-1 flex items-center justify-center gap-1">
                            <TrendingUp size={12} />
                            Savings
                        </div>
                        <div className="text-2xl font-bold text-emerald-400">₹ 16 L</div>
                    </motion.div>
                </div>

                {/* Workflow Steps Completed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
                >
                    <h3 className="text-white font-semibold text-sm mb-4">Workflow Completed</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>Customer Nomination</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>Vendor Negotiation</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>PR Release</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>PO Release</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>Stage Payment</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>Goods Receipt</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>Final Payment</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>PO Closure</span>
                        </div>
                    </div>
                </motion.div>

                {/* Restart Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-8"
                >
                    <button
                        onClick={onRestart}
                        className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white px-10 py-4 rounded-xl font-bold text-base flex items-center gap-3 mx-auto transition-all shadow-2xl shadow-sky-900/50 hover:shadow-sky-800/60 hover:scale-[1.05] active:scale-[0.98]"
                    >
                        <RefreshCw size={20} /> Restart Demo
                    </button>
                </motion.div>

            </div>
        </ScreenLayout>
    );
};
