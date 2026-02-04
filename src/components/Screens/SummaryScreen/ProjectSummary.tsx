import React from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { CheckCircle, RefreshCw, TrendingUp, Award, Package, CreditCard, FileCheck } from 'lucide-react';
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
                    className="text-center mb-8 relative"
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
                    </div>
                    
                    <motion.div 
                        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full mb-4 relative border-2 border-green-400/40 shadow-2xl shadow-green-500/50"
                        animate={{ 
                            scale: [1, 1.05, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <CheckCircle size={56} className="text-green-400" strokeWidth={2.5} />
                    </motion.div>
                    
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent mb-3">
                        Project MnM Complete!
                    </h2>
                    <p className="text-slate-300 text-base font-medium">End-to-end procurement workflow executed successfully</p>
                    <div className="mt-2 inline-block px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                        <span className="text-green-400 text-sm font-semibold">✓ All Steps Verified</span>
                    </div>
                </motion.div>

                {/* Summary Stats Grid */}
                <div className="grid grid-cols-4 gap-5 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-600/50 rounded-xl p-5 text-center relative overflow-hidden group shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-500/10 rounded-lg mb-2">
                                <FileCheck size={20} className="text-indigo-400" />
                            </div>
                            <div className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wide">Total Value</div>
                            <div className="text-3xl font-bold text-white">₹ 4.35 Cr</div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-slate-600/50 rounded-xl p-5 text-center relative overflow-hidden group shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-500/10 rounded-lg mb-2">
                                <Package size={20} className="text-blue-400" />
                            </div>
                            <div className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wide">Items</div>
                            <div className="text-3xl font-bold text-white">4</div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-slate-800/80 to-slate-800/40 border border-green-600/50 rounded-xl p-5 text-center relative overflow-hidden group shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500/10 rounded-lg mb-2">
                                <CreditCard size={20} className="text-green-400" />
                            </div>
                            <div className="text-slate-400 text-xs mb-2 font-medium uppercase tracking-wide">Payments</div>
                            <div className="text-3xl font-bold text-green-400">2 / 2 ✓</div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-gradient-to-br from-emerald-900/40 to-slate-800/40 border-2 border-emerald-500/50 rounded-xl p-5 text-center relative overflow-hidden group shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-500/20 rounded-lg mb-2">
                                <Award size={20} className="text-emerald-400" />
                            </div>
                            <div className="text-emerald-300 text-xs mb-2 font-bold uppercase tracking-wide flex items-center justify-center gap-1">
                                <TrendingUp size={14} />
                                Savings
                            </div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">₹ 21 L</div>
                        </div>
                    </motion.div>
                </div>

                {/* Workflow Steps Completed */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-800/30 border border-slate-600/50 rounded-xl p-6 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-white font-bold text-base flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                <CheckCircle size={18} className="text-green-400" />
                            </div>
                            Workflow Completed
                        </h3>
                        <div className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                            <span className="text-green-400 text-xs font-semibold">8/8 Steps</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        {[
                            'Customer Nomination',
                            'Vendor Negotiation',
                            'PR Release',
                            'PO Release',
                            'Stage Payment',
                            'Goods Receipt',
                            'Final Payment',
                            'PO Closure'
                        ].map((step, idx) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + idx * 0.05 }}
                                className="flex items-center gap-3 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg hover:bg-slate-800/60 hover:border-green-500/30 transition-all group"
                            >
                                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                                    <CheckCircle size={16} className="text-green-400" strokeWidth={2.5} />
                                </div>
                                <span className="text-slate-200 group-hover:text-white transition-colors font-medium">{step}</span>
                            </motion.div>
                        ))}
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
                        className="relative group bg-gradient-to-r from-sky-600 via-blue-600 to-sky-600 hover:from-sky-500 hover:via-blue-500 hover:to-sky-500 text-white px-10 py-4 rounded-xl font-bold text-base flex items-center gap-3 mx-auto transition-all duration-300 shadow-2xl shadow-sky-900/50 hover:shadow-sky-800/60 hover:scale-[1.05] active:scale-[0.98] border border-sky-400/20 hover:border-sky-400/40"
                    >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <RefreshCw size={20} className="relative z-10" />
                        <span className="relative z-10">Restart Demo</span>
                    </button>
                </motion.div>

            </div>
        </ScreenLayout>
    );
};
