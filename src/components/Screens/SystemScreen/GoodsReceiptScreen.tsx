import React, { useState } from 'react';
import { ScreenLayout } from '../Layout/ScreenLayout';
import { Truck, PackageCheck, Scale, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import dashboardStyles from '../PMScreen/Dashboard.module.css';

interface GoodsReceiptScreenProps {
    onNext: () => void;
    stepId: number;
}

export const GoodsReceiptScreen: React.FC<GoodsReceiptScreenProps> = ({ onNext, stepId }) => {
    // Determine if we are doing Goods Receipt (Step 8) or Service Entry (Step 9)
    // Step 8 in steps.ts is "Payment Reminders" in the old desc, but in my "Auto" update I mapped it to MIGO.
    // Let's check steps.ts logic. 
    // Step 8: "Payment Reminders (AR/AP)" -> Description "MIGO Invoice Visibility".
    // Step 9: "Service Confirmation".

    // I will use this screen for Step 8. 
    // For Step 9, I might reuse it or just let the user click through.

    const isService = stepId === 9;
    const [scanned, setScanned] = useState(false);

    const handleScan = () => {
        setScanned(true);
    };

    return (
        <ScreenLayout role="System" title={isService ? "Service Entry Sheet (GAP-10)" : "Digital Weighbridge (GAP-09)"}>
            <div className={dashboardStyles.stack} style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Truck / Service Info */}
                <div className={dashboardStyles.panel}>
                    <div className={dashboardStyles.panelHeader}>
                        <h3 className={dashboardStyles.panelTitle}>
                            {isService ? "Logistics Service Provider" : "Inbound Delivery: TRUCK-9921"}
                        </h3>
                        <span className="text-xs text-sky-400 font-mono">PO-AUTO-2024-9921</span>
                    </div>
                    <div className={dashboardStyles.panelBody}>
                        <div className="flex items-center gap-6 p-4">
                            <div className="p-4 bg-slate-700/50 rounded-lg">
                                {isService ? <Truck size={40} className="text-indigo-400" /> : <PackageCheck size={40} className="text-emerald-400" />}
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-lg">{isService ? "DHL Logistics Global" : "Polymers Inc (Material: PP Granules)"}</h4>
                                <p className="text-slate-400">{isService ? "Route: Mumbai Port -> Pune Plant" : "Batch: #2291 // Mfg Date: 01-FEB-2026"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Verification Grid */}
                <div className={dashboardStyles.statsGrid} style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {/* Expected */}
                    <div className={`${dashboardStyles.statCard} ${dashboardStyles.statSecondary}`}>
                        <span className={dashboardStyles.statLabel}>Ordered Quantity</span>
                        <div className="text-2xl font-bold text-slate-300 mt-2">
                            {isService ? "1 Trip" : "5,000 KG"}
                        </div>
                    </div>

                    {/* Actual */}
                    <div className={`${dashboardStyles.statCard} ${dashboardStyles.statSecondary}`}
                        style={{ border: scanned ? '1px solid #22c55e' : undefined }}
                    >
                        <span className={dashboardStyles.statLabel}>Received / Verified</span>
                        <div className="text-2xl font-bold text-white mt-2">
                            {scanned ? (isService ? "Trip Verified" : "5,000 KG") : "---"}
                        </div>
                        {scanned && <span className="text-xs text-green-400">Match Confirmed ✔</span>}
                    </div>
                </div>

                {/* Scan Action */}
                {!scanned && (
                    <div className="flex justify-center p-8 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/20">
                        <button
                            onClick={handleScan}
                            className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
                        >
                            {isService ? <CheckCircle /> : <Scale />}
                            {isService ? "Confirm Delivery & Mileage" : "Read Weighbridge Data"}
                        </button>
                    </div>
                )}

                {/* Completion */}
                {scanned && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={dashboardStyles.alertBox} style={{ background: 'rgba(34,197,94,0.1)', borderColor: '#22c55e' }}>
                        <CheckCircle className="text-green-400" />
                        <div>
                            <h3 className="text-green-400 font-bold">Verification Successful</h3>
                            <p className="text-green-300/80 text-sm">
                                {isService ? "Service Entry Sheet 1000293 created." : "Goods Receipt Document 5000001122 posted to SAP S/4HANA."}
                            </p>
                        </div>
                        <button onClick={onNext} className={dashboardStyles.submitBtn} style={{ marginLeft: 'auto' }}>
                            Next Step <ArrowRight size={16} />
                        </button>
                    </motion.div>
                )}

            </div>
        </ScreenLayout>
    );
};
