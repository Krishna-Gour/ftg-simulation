import React, { useEffect, useRef } from 'react';
import { Step } from '../../data/steps';
import { Info, Activity, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuidePanelProps {
    step: Step;
}

// Real-life process descriptions for each step
const getStepLog = (stepId: number): string => {
    switch (stepId) {
        case 1: return "Customer submits project nomination with estimated budget ₹4.6Cr, project code MNM-2026-INT for Interior Trims (Cockpit, Door Trims, Floor Console). Target completion Q2 2026.";
        case 2: return "Business Development team receives target costs and feed in Sales Master Data: IP Carrier ₹3.2Cr, Chute Chanel ₹38L, Cockpit Fixture ₹28L, Laser Scoring ₹70L. Total target: ₹4.56Cr.";
        case 3: return "Purchase Team negotiates with vendor Tooling Solutions Ltd. Final nominated costs: IP Carrier ₹3Cr, Chute Chanel ₹40L (requires override), Cockpit Fixture ₹25L, Laser Scoring ₹70L. Total: ₹4.35Cr, saving ₹21L.";
        case 4: return "Program Team reviews the purchase nomination and releases Purchase Requisition PR-MNM-2026-001. Email sent to Plant Head for approval. Plant Head approved. PR approved and released to procurement system.";
        case 5: return "SAP System automatically generates Purchase Order PO-MNM-2026-001 based on approved PR. System validates vendor details, payment terms (Z001), and line items. PO sent to Plant Head for final approval. PO released to vendor Tooling Solutions Ltd.";
        case 6: return "Automated Stage Payment Entry (20% advance) of ₹87L processed via RTGS to vendor's ICICI Bank account. Payment authorized by finance team. Transaction reference generated. Payment confirmation sent to vendor.";
        case 7: return "Vendor delivers all 4 items: IP Carrier Tool, Chute Chanel Vibration, Cockpit Fixture, and Laser Scoring Fixture. Quality team verifies items against PO. Goods Receipt Note GRN-MNM-2026-001 created in SAP. Material received confirmation sent to all stakeholders.";
        case 8: return "Automated Final Payment Entry (80% on GRN) of ₹3.48Cr processed. Invoice verified against GRN. Payment authorized and processed via RTGS. Project financial closure completed. PO status updated to 'Closed'. Vendor payment completed successfully.";
        default: return "Process step in progress...";
    }
};

export const GuidePanel: React.FC<GuidePanelProps> = ({ step }) => {
    const currentStepId = step.id;
    const logEndRef = useRef<HTMLDivElement>(null);
    
    // Build log of all completed and current steps
    const processLog = [];
    for (let i = 1; i <= Math.min(currentStepId, 8); i++) {
        processLog.push({
            id: i,
            description: getStepLog(i),
            isActive: i === currentStepId,
            timestamp: `Step ${i}`
        });
    }

    // Auto-scroll to the latest log entry when step changes
    useEffect(() => {
        if (logEndRef.current) {
            logEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [currentStepId]);

    return (
        <div className="h-full bg-slate-900/60 backdrop-blur-md border-l border-white/10 p-6 flex flex-col rounded-xl border border-slate-700/50 shadow-2xl">
            <div className="mb-6 flex items-center gap-2 text-sky-400">
                <Info size={20} />
                <span className="font-bold tracking-wider uppercase text-sm">Simulation Guide</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {/* Process Log */}
                <div className="space-y-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Activity size={16} className="text-green-400" />
                        Process Log
                    </h3>
                    
                    <div className="space-y-3">
                        {processLog.map((logEntry, idx) => (
                            <motion.div
                                key={logEntry.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`p-3 rounded-lg border ${
                                    logEntry.isActive 
                                        ? 'bg-sky-500/10 border-sky-500/30' 
                                        : 'bg-slate-800/40 border-slate-700/50'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                        logEntry.isActive 
                                            ? 'bg-sky-500/20' 
                                            : 'bg-green-500/20'
                                    }`}>
                                        {logEntry.isActive ? (
                                            <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
                                        ) : (
                                            <CheckCircle size={14} className="text-green-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-xs font-semibold mb-1 ${
                                            logEntry.isActive ? 'text-sky-400' : 'text-green-400'
                                        }`}>
                                            {logEntry.timestamp} {logEntry.isActive && '• In Progress'}
                                        </div>
                                        <p className={`text-xs leading-relaxed ${
                                            logEntry.isActive ? 'text-slate-200' : 'text-slate-400'
                                        }`}>
                                            {logEntry.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {/* Invisible element at the end for scrolling */}
                        <div ref={logEndRef} />
                    </div>
                </div>
            </div>

            {/* Project Data Context - Sticky Bottom */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Active Context</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                        <span className="block text-slate-500">Project</span>
                        <span className="text-white font-medium">Project MnM</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">PR Number</span>
                        <span className="text-mono text-sky-400 font-medium">PR-MNM-2026-001</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">OEM Customer</span>
                        <span className="text-white font-medium">Mahindra & Mahindra</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">Value</span>
                        <span className="text-green-400 font-medium">₹ 4.35 Cr</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
