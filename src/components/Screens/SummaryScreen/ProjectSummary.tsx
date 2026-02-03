import React from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { FileText, CheckCircle, CreditCard, ShoppingCart, RefreshCw, Briefcase } from 'lucide-react';
import styles from './ProjectSummary.module.css';
import { motion } from 'framer-motion';

interface ProjectSummaryProps {
    onRestart: () => void;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ onRestart }) => {
    return (
        <ScreenLayout role="PM" title="End-to-End Project Traceability (GAP-07)">
            <div className={styles.container}>

                {/* Visual Timeline */}
                <div className={styles.timeline}>
                    <div className={styles.stages}>
                        <div className={styles.stageNode}>
                            <div className={`${styles.nodeCircle} ${styles.active}`}>
                                <FileText size={20} />
                            </div>
                            <span className={styles.nodeTitle}>Nomination</span>
                        </div>
                        <div className={styles.stageNode}>
                            <div className={`${styles.nodeCircle} ${styles.active}`}>
                                <ShoppingCart size={20} />
                            </div>
                            <span className={styles.nodeTitle}>Purchasing</span>
                        </div>
                        <div className={styles.stageNode}>
                            <div className={`${styles.nodeCircle} ${styles.active}`}>
                                <CheckCircle size={20} />
                            </div>
                            <span className={styles.nodeTitle}>Delivery</span>
                        </div>
                        <div className={styles.stageNode}>
                            <div className={`${styles.nodeCircle} ${styles.active}`}>
                                <CreditCard size={20} />
                            </div>
                            <span className={styles.nodeTitle}>Settlement</span>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className={styles.detailsGrid}>
                    {/* Nomination Card - REVENUE */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className={styles.card}
                        style={{ borderLeft: '4px solid #4ade80' }} // Green for Revenue
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}><Briefcase size={18} className="text-green-400" /> Customer Nomination (Inflow)</h3>
                            <span className={styles.statusBadge} style={{ background: '#4ade8022', color: '#4ade80' }}>Received</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>OEM Customer</span>
                            <span className={styles.value}>Mahindra Automotive</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Contract Value</span>
                            <span className={`${styles.value} ${styles.mono} text-green-400`}>₹ 2,00,00,000</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Project Scope</span>
                            <span className={styles.value}>XUV700 Interior Trims</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Payment Status</span>
                            <span className={styles.value}>received 100%</span>
                        </div>
                    </motion.div>

                    {/* Procurement Card - COST */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className={styles.card}
                        style={{ borderLeft: '4px solid #f472b6' }} // Pink/Red for Cost
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}><ShoppingCart size={18} className="text-pink-400" /> Supplier Contracts (Outflow)</h3>
                            <span className={styles.statusBadge} style={{ background: '#f472b622', color: '#f472b6' }}>Active</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Purchase Req's</span>
                            <span className={styles.value}>5 PRs <span className="text-xs text-slate-500">(RM, Tooling, Logs)</span></span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Purchase Orders</span>
                            <span className={styles.value}>3 POs Released</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Primary Vendor</span>
                            <span className={`${styles.value}`}>Polymers Inc</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Total PO Value</span>
                            <span className={`${styles.value} text-pink-400 font-bold`}>₹ 1,40,00,000</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Negotiated Savings</span>
                            <span className={`${styles.value} text-green-400`}>₹ 10 Lakhs (6.6%)</span>
                        </div>
                    </motion.div>

                    {/* Financials Card - PROFIT */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className={styles.card}
                        style={{ borderLeft: '4px solid #38bdf8' }}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}><CreditCard size={18} className="text-sky-400" /> Project Profitability</h3>
                            <span className={styles.statusBadge}>Closed</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Total Revenue</span>
                            <span className={`${styles.value} text-green-400`}>₹ 200 Lakhs</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Total Cost (PO)</span>
                            <span className={`${styles.value} text-pink-400`}>(-₹ 140 Lakhs)</span>
                        </div>
                        <div className={styles.row} style={{ borderTop: '1px solid #334155', paddingTop: '8px', marginTop: '8px' }}>
                            <span className={styles.label}>Net Margin</span>
                            <span className={`${styles.value} ${styles.mono} text-sky-400 font-bold text-lg`}>₹ 60,00,000</span>
                        </div>
                        <div className={styles.row}>
                            <span className={styles.label}>Margin %</span>
                            <span className={`${styles.value} text-slate-300`}>30.0%</span>
                        </div>
                    </motion.div>

                    {/* Final Status */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className={`${styles.card} ${styles.finalStatus}`}
                    >
                        <div>
                            <h3 className={styles.cardTitle}>Project Completion Status</h3>
                            <p className="text-slate-300 text-sm mt-1">
                                <span className="text-green-400">✔ Customer Paid</span> •
                                <span className="text-green-400 ml-2">✔ Supplier Paid</span> •
                                <span className="text-sky-400 ml-2">✔ Project Closed</span>
                            </p>
                        </div>
                        <button onClick={onRestart} className={styles.restartBtn}>
                            <RefreshCw size={18} /> Restart Simulation
                        </button>
                    </motion.div>
                </div>

            </div>
        </ScreenLayout>
    );
};
