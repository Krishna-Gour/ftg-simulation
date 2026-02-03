import React from 'react';
import { clsx } from 'clsx';
import { Actor } from '../../data/steps';

interface BadgeProps {
    type: Actor | 'manual' | 'automated';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className }) => {
    const getColors = () => {
        switch (type) {
            case 'BD':
            case 'PM':
                return 'bg-blue-500/20 text-blue-200 border-blue-500/30';
            case 'System':
                return 'bg-yellow-500/20 text-yellow-200 border-yellow-500/30';
            case 'Customer':
                return 'bg-green-500/20 text-green-200 border-green-500/30';
            case 'manual':
                return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
            case 'automated':
                return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30';
            default:
                return 'bg-slate-500/20 text-slate-200';
        }
    };

    return (
        <span className={clsx(
            'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
            getColors(),
            className
        )}>
            {type}
        </span>
    );
};
