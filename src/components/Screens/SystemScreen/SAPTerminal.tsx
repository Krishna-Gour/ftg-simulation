import React, { useEffect, useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { Terminal, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './SAPTerminal.module.css';

interface SystemScreenProps {
    onNext: () => void;
    stepId: number;
}

export const SystemScreen: React.FC<SystemScreenProps> = ({ onNext, stepId }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const [complete, setComplete] = useState(false);

    const timeoutRefs = React.useRef<any[]>([]);

    useEffect(() => {
        setLogs([]);
        setComplete(false);
        timeoutRefs.current.forEach(clearTimeout);
        timeoutRefs.current = [];

        const getSequence = (id: number) => {
            switch (id) {
                case 8: // GR Invoice Visibility (GAP-09)
                    return [
                        { msg: "[SAP] Transaction MIGO: Goods Receipt for PO-AUTO-9988...", delay: 500 },
                        { msg: "[CHECK] Material: 3000-11-PP (Polypropylene Black)...", delay: 1500 },
                        { msg: "[GAP-09] Checking Weighbridge Qty vs Invoice Qty...", delay: 2500 },
                        { msg: "[VALIDATE] Qty Matches: 5000 KG. Quality Batch #9921 OK.", delay: 3500 },
                        { msg: "[DONE] Material Document 5000001122 Posted.", delay: 4500 }
                    ];
                case 9: // Service PO Invoicing
                    return [
                        { msg: "[SAP] Monitoring Service Entry Sheet (SES) status...", delay: 500 },
                        { msg: "[GAP-10] Validating Transport & Logistics Charges...", delay: 1500 },
                        { msg: "[CHECK] 3-Way Match: SES 10029 vs PO vs Invoice", delay: 2500 },
                        { msg: "[AUTO] Posting Logistics Invoice (MIRO)...", delay: 3500 },
                        { msg: "[DONE] Invoice 5105666677 Posted.", delay: 4500 }
                    ];
                case 10: // Payment Advice (GAP-11)
                    return [
                        { msg: "[SAP] F-110: Starting Automatic Payment Run...", delay: 500 },
                        { msg: "[SELECT] Vendor Polymers Inc (10022)... Found 2 open items.", delay: 1500 },
                        { msg: "[POST] Clearing Document 2000000099 posted.", delay: 2500 },
                        { msg: "[GAP-11] Sending Payment Advice to vendor_finance@polymers.com", delay: 3500 },
                        { msg: "[DONE] Payment Run Completed.", delay: 4500 }
                    ];
                case 11: // Down Payment (GAP-12)
                    return [
                        { msg: "[SAP] Scanning PO for Capital Goods (Mould Tooling)...", delay: 500 },
                        { msg: "[GAP-12] Executing ME2DP (Down Payment Monitor)...", delay: 1500 },
                        { msg: "[FOUND] Tooling Advance: 20% Required for Asset 400021.", delay: 2500 },
                        { msg: "[POST] Auto-posting Tooling Advance Request (F-47)", delay: 3500 },
                        { msg: "[DONE] Advance Payment Request Created.", delay: 4500 }
                    ];
                case 12: // Payment Terms (GAP-13)
                    return [
                        { msg: "[SAP] Configuring Payment Terms for Tooling Amortization...", delay: 500 },
                        { msg: "[GAP-13] Deriving Due Date from Z001 Terms...", delay: 1500 },
                        { msg: "[CALC] Baseline Date: 2024-02-05 + 45 Days = 2024-03-22", delay: 2500 },
                        { msg: "[UPDATE] Cash Management Forecast Updated.", delay: 3500 },
                        { msg: "[DONE] Sequence Complete.", delay: 4500 }
                    ];

                default: // Default (Step 5 - Auto PO Creation - GAP-01)
                    return [
                        { msg: "[SAP] Initializing Mass Conversion Run (ME59N)...", delay: 500 },
                        { msg: "[GAP-01] Validating PR Release Strategy Status...", delay: 1200 },
                        { msg: "[CHECK] Source List: Polymers Inc (Preferred Vendor)...", delay: 2000 },
                        { msg: "[NEGOTIATION] Applying Annual Volume Discount (2%)...", delay: 2800 },
                        { msg: "[SUCCESS] PO Created: 4500009988. Value: ₹ 1.4 Cr (Savings: ₹ 10 L)", delay: 3500 },
                        { msg: "[GAP-02] Triggering 'PO Issued' Email to Vendor...", delay: 4200 },
                        { msg: "[DONE] Process completed successfully.", delay: 5000 },
                    ];
            }
        };

        const sequence = getSequence(stepId);

        sequence.forEach(({ msg, delay }) => {
            const w = setTimeout(() => {
                setLogs(prev => {
                    if (prev.includes(msg)) return prev;
                    return [...prev, msg];
                });
                if (msg.includes("[DONE]")) setComplete(true);
            }, delay);
            timeoutRefs.current.push(w);
        });

        return () => {
            timeoutRefs.current.forEach(clearTimeout);
            timeoutRefs.current = [];
        };
    }, [stepId]);

    const getTitle = (id: number) => {
        switch (id) {
            case 5: return "Automated PO Creation (GAP-01)";
            case 8: return "MIGO Goods Receipt (GAP-09)";
            case 9: return "Service Entry Automation (GAP-10)";
            case 10: return "Payment Advice (GAP-11)";
            case 11: return "Capital Down Payments (GAP-12)";
            case 12: return "Payment Terms (GAP-13)";
            default: return "SAP S/4HANA Automation Core";
        }
    };

    return (
        <ScreenLayout role="System" title={getTitle(stepId)}>
            <div className={styles.terminal}>
                <div className={styles.scanline} />
                <div className={styles.header}>
                    <Terminal size={16} />
                    <span>System Console Output</span>
                </div>
                <div className={styles.logs}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={styles.logEntry}
                        >
                            <span className={styles.timestamp}>{new Date().toLocaleTimeString()}</span>
                            <span className={
                                log.includes('SUCCESS') ? styles.msgSuccess :
                                    log.includes('ERROR') ? styles.msgError :
                                        styles.msgDefault
                            }>{log}</span>
                        </motion.div>
                    ))}
                    {!complete && (
                        <div className={styles.processing}>
                            <span className={styles.cursor} />
                            Processing...
                        </div>
                    )}
                </div>
                {complete && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onNext}
                        className={styles.confirmBtn}
                    >
                        <CheckCircle size={18} />
                        Confirm & Continue
                    </motion.button>
                )}
            </div>
        </ScreenLayout>
    );
};
