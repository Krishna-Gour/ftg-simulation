import React from 'react';
import { Step } from '../../data/steps';
import { Info, User, Activity, ArrowRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuidePanelProps {
    step: Step;
}

export const GuidePanel: React.FC<GuidePanelProps> = ({ step }) => {
    return (
        <div className="h-full bg-slate-900/60 backdrop-blur-md border-l border-white/10 p-6 flex flex-col rounded-xl border border-slate-700/50 shadow-2xl">
            <div className="mb-6 flex items-center gap-2 text-sky-400">
                <Info size={20} />
                <span className="font-bold tracking-wider uppercase text-sm">Simulation Guide</span>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                {/* Context Card */}
                <div className="space-y-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <User size={16} className="text-purple-400" />
                        Current Role
                    </h3>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm">
                        <p className="font-medium">
                            {step.actor === 'BD' ? 'Business Development Manager' :
                                step.actor === 'PM' ? 'Program Manager' :
                                    step.actor === 'System' ? 'SAP S/4HANA Automation' : 'Customer'}
                        </p>
                        <p className="mt-1 text-xs opacity-70">
                            {step.actor === 'BD' ? 'Responsible for sales & initiating projects.' :
                                step.actor === 'PM' ? 'Oversees execution & validates financials.' :
                                    'Automated background processing.'}
                        </p>
                    </div>
                </div>

                {/* Blueprint Insight */}
                {step.blueprintId && (
                    <div className="space-y-3">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <FileText size={16} className="text-blue-400" />
                            Blueprint Insight
                        </h3>
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-xs uppercase tracking-wider text-blue-300">{step.blueprintTitle}</span>
                                <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded text-blue-300 border border-blue-500/30">{step.blueprintId}</span>
                            </div>
                            <p className="opacity-90 text-xs leading-relaxed">
                                {step.blueprintDesc}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Card */}
                <div className="space-y-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <Activity size={16} className="text-green-400" />
                        What is happening?
                    </h3>
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-slate-300 text-sm leading-relaxed"
                    >
                        {step.description}
                    </motion.div>
                </div>

                {/* Instruction */}
                <div className="space-y-3">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <ArrowRight size={16} className="text-yellow-400" />
                        Your Task
                    </h3>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-100 text-sm">
                        {getInstruction(step.actor, step.id)}
                    </div>
                </div>
            </div>

            {/* Project Data Context - Sticky Bottom */}
            <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Active Context</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                        <span className="block text-slate-500">Project</span>
                        <span className="text-white font-medium">Project Raptor</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">PO Number</span>
                        <span className="text-mono text-sky-400 font-medium">PO-AUTO-9921</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">OEM Customer</span>
                        <span className="text-white font-medium">Mahindra Auto</span>
                    </div>
                    <div>
                        <span className="block text-slate-500">Value</span>
                        <span className="text-green-400 font-medium">₹ 2,00,00,000</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function getInstruction(actor: string, id: number): string {
    if (actor === 'System') return "Watch as the System executes the transaction logic automatically.";

    switch (id) {
        case 1: return "Enter the Project Revenue details received from the OEM.";
        case 2: return "Define the Budget WBS and Milestones.";
        case 3: return "Select the correct Purchasing Org (POrg 2000) allowed for this Plant.";
        case 4: return "Generate the Purchase Requisition (PR) for the identified materials.";
        case 6: return "Validate the PO Price against the PR Estimate. Click 'Override' if within tolerance.";
        case 7: return "Review Payment Terms (Select Z001) and Release the PO to the Vendor.";
        case 11: return "Verify the Tooling Milestone completion to unlock the next payment tranche.";
        case 13: return "Confirm the Goods Receipt (GRN) to authorize the Final Settlement.";
        case 15: return "Review the Final P&L Statement to close the project.";
        default: return "Review the action items on the dashboard to proceed.";
    }
}
