import React from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { UploadCloud, Check } from 'lucide-react';
import styles from './NominationForm.module.css';

interface BDScreenProps {
    onNext: () => void;
    stepId: number;
}

export const BDScreen: React.FC<BDScreenProps> = ({ onNext, stepId }) => {
    const isStep2 = stepId === 2;

    return (
        <ScreenLayout role="BD" title={isStep2 ? "Financials & PO Entry" : "New Program Nomination"}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h3 className={styles.title}>{isStep2 ? "Customer PO Details" : "Customer Information"}</h3>

                    <div className={styles.stack}>
                        {isStep2 ? (
                            /* Step 2: PO & Financials */
                            <div className={styles.grid}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Customer PO Number</label>
                                    <input type="text" className={styles.input} defaultValue="PO-AUTO-2024-9921" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Customer PO Value (Revenue)</label>
                                    <input type="text" className={styles.input} defaultValue="₹ 2,00,00,000.00" />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Target Profit Margin</label>
                                    <input type="text" className={styles.input} defaultValue="20%" readOnly style={{ background: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)' }} />
                                </div>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>Estimated Project Cost</label>
                                    <input type="text" className={styles.input} defaultValue="₹ 1,60,00,000.00" readOnly style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)' }} />
                                </div>
                                <div className={styles.fieldGroup} style={{ gridColumn: 'span 2' }}>
                                    <label className={styles.label}>Payment Milestones</label>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#94a3b8' }}>
                                            <span>M1: Tooling Advance</span>
                                            <span>20%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', color: '#94a3b8' }}>
                                            <span>M2: PPAP Approval</span>
                                            <span>40%</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94a3b8' }}>
                                            <span>M3: SOP / Batch Delivery</span>
                                            <span>40%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Step 1: Initial Nomination */
                            <div className={styles.grid}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label}>OEM Customer</label>
                                    <input type="text" className={styles.input} defaultValue="Mahindra Automotive" />
                                </div>
                                <div>
                                    <label className={styles.label}>OEM Project Code</label>
                                    <input type="text" className={styles.input} defaultValue="WIN-2025-XUV" />
                                </div>
                                <div className={styles.fieldGroup} style={{ gridColumn: 'span 2' }}>
                                    <label className={styles.label}>Program Description</label>
                                    <textarea className={styles.textarea} defaultValue="Project Raptor: XUV700 Interior Trims (Scope: Dashboard, Door Trims, Center Console)" />
                                </div>
                            </div>
                        )}

                        {!isStep2 && (
                            <div className={styles.uploadBox}>
                                <UploadCloud size={24} />
                                <span style={{ fontSize: '14px' }}>Drag & Drop Supporting Documents</span>
                            </div>
                        )}

                        <div className={styles.actions}>
                            <button
                                onClick={onNext}
                                className={styles.submitBtn}
                            >
                                <Check size={18} />
                                {isStep2 ? "Confirm Financials" : "Submit Nomination"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ScreenLayout>
    );
};
