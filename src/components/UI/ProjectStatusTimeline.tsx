import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ShoppingCart, Users, CheckCircle, Truck, CreditCard, Package, DollarSign } from 'lucide-react';

interface ProjectStatusTimelineProps {
    currentStepId: number;
}

export const ProjectStatusTimeline: React.FC<ProjectStatusTimelineProps> = ({ currentStepId }) => {
    const timelineSteps = [
        { id: 1, icon: FileText, label: 'Nomination' },
        { id: 2, icon: ShoppingCart, label: 'Sales Master Data - Target' },
        { id: 3, icon: Users, label: 'Purchase Nomination' },
        { id: 4, icon: CheckCircle, label: 'PR Release' },
        { id: 5, icon: Truck, label: 'PO Release' },
        { id: 6, icon: CreditCard, label: 'Stage Payment' },
        { id: 7, icon: Package, label: 'GRN' },
        { id: 8, icon: DollarSign, label: 'Final Payment' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
                marginBottom: '12px', 
                padding: '12px 16px', 
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)', 
                borderRadius: '12px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                boxShadow: '0 2px 16px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                        boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)'
                    }} />
                    <h3 style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700, margin: 0, letterSpacing: '0.3px' }}>
                        Project MnM - Progress Timeline
                    </h3>
                </div>
                <span style={{ 
                    fontSize: '9px', 
                    color: '#60a5fa', 
                    background: 'rgba(59, 130, 246, 0.15)', 
                    padding: '4px 10px', 
                    borderRadius: '6px',
                    fontWeight: 600,
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    letterSpacing: '0.3px'
                }}>
                    PR-MNM-2026-001
                </span>
            </div>
            
            <div style={{ padding: '12px 4px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Progress Line */}
                    <div style={{
                        position: 'absolute',
                        top: '14px',
                        left: '30px',
                        right: '30px',
                        height: '3px',
                        background: '#1e293b',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                                width: `${((currentStepId - 1) / 7) * 100}%`,
                            }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
                                boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
                                position: 'relative'
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                bottom: 0,
                                width: '20px',
                                background: 'linear-gradient(90deg, transparent 0%, #3b82f6 100%)',
                            }} />
                        </motion.div>
                    </div>

                    {/* Timeline Steps */}
                    {timelineSteps.map((step, idx) => {
                        const status = step.id < currentStepId ? 'done' : step.id === currentStepId ? 'current' : 'pending';
                        
                        return (
                            <motion.div 
                                key={step.id} 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ delay: idx * 0.06, duration: 0.3 }}
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    minWidth: '70px',
                                    flex: 1,
                                    zIndex: 1 
                                }}
                            >
                                <motion.div 
                                    animate={status === 'current' ? {
                                        scale: [1, 1.08, 1],
                                        boxShadow: [
                                            '0 0 12px rgba(59, 130, 246, 0.5)',
                                            '0 0 18px rgba(59, 130, 246, 0.8)',
                                            '0 0 12px rgba(59, 130, 246, 0.5)'
                                        ]
                                    } : {}}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        borderRadius: '50%',
                                        background: status === 'done' 
                                            ? 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' 
                                            : status === 'current' 
                                            ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' 
                                            : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                        border: status === 'current' ? '2px solid rgba(255, 255, 255, 0.9)' : '1.5px solid rgba(51, 65, 85, 0.5)',
                                        boxShadow: status === 'current' ? '0 0 15px rgba(59, 130, 246, 0.6), 0 2px 8px rgba(0, 0, 0, 0.4)' : '0 2px 6px rgba(0, 0, 0, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: status === 'pending' ? '#64748b' : '#fff',
                                        position: 'relative'
                                    }}
                                >
                                    <step.icon size={14} strokeWidth={2.5} />
                                    {status === 'done' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            style={{
                                                position: 'absolute',
                                                top: -1,
                                                right: -1,
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                background: '#22c55e',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '1.5px solid #0f172a'
                                            }}
                                        >
                                            <CheckCircle size={8} fill="#fff" stroke="#fff" />
                                        </motion.div>
                                    )}
                                </motion.div>
                                <span style={{
                                    marginTop: '8px',
                                    fontSize: '8px',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    color: status === 'current' ? '#60a5fa' : status === 'done' ? '#4ade80' : '#64748b',
                                    lineHeight: '1.2',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.3px',
                                    textShadow: status === 'current' || status === 'done' ? '0 0 6px rgba(59, 130, 246, 0.3)' : 'none'
                                }}>
                                    {step.label}
                                </span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};
