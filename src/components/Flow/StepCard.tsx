import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Monitor } from 'lucide-react';
import { Step } from '../../data/steps';
import { Badge } from '../UI/Badge';
import { clsx } from 'clsx';

interface StepCardProps {
    step: Step;
    isActive: boolean;
    isCompleted: boolean;
    index: number;
}

export const StepCard: React.FC<StepCardProps> = ({ step, isActive, isCompleted, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
                "relative p-6 rounded-xl border transition-all duration-300 w-full max-w-2xl mx-auto glass-panel",
                isActive ? "border-sky-500 shadow-[0_0_30px_-5px_rgba(14,165,233,0.3)] scale-[1.02]" : "border-slate-800",
                isCompleted ? "opacity-60" : "opacity-100"
            )}
        >
            <div className="flex items-start gap-4">
                {/* Step Indicator */}
                <div className={clsx(
                    "flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 mt-1 transition-colors",
                    isActive ? "border-sky-500 bg-sky-500/20 text-sky-400" :
                        isCompleted ? "border-green-500 bg-green-500/20 text-green-400" : "border-slate-600 text-slate-600"
                )}>
                    {isCompleted ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{step.id}</span>}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={clsx(
                            "text-lg font-semibold",
                            isActive ? "text-sky-400" : "text-slate-200"
                        )}>
                            {step.title}
                        </h3>
                        <div className="flex gap-2">
                            <Badge type={step.actor} />
                            <Badge type={step.type} />
                        </div>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                        {step.description}
                    </p>

                    {/* Details / Sub-steps */}
                    {(isActive || isCompleted) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="space-y-2"
                        >
                            {step.details?.map((detail, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                                    <div className={clsx(
                                        "w-1.5 h-1.5 rounded-full",
                                        isActive ? "bg-sky-500" : "bg-slate-600"
                                    )} />
                                    {detail}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>

                {/* Dynamic Icon based on Actor/Type */}
                <div className="hidden sm:flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-slate-800/50 text-slate-500">
                    {step.type === 'automated' ? <Monitor size={20} /> : <User size={20} />}
                    <span className="text-[10px] mt-1 uppercase">{step.actor}</span>
                </div>
            </div>
        </motion.div>
    );
};
