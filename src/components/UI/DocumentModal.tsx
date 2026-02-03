import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DocumentModalProps {
    type: 'PR' | 'PO' | 'INVOICE';
    isOpen: boolean;
    onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ type, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-900 text-slate-300 w-full max-w-2xl h-[85vh] rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-700"
            >
                {/* PDF Header - Simulation */}
                <div className="bg-slate-800/50 border-b border-slate-700 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 bg-red-500/20 text-red-400 rounded flex items-center justify-center font-bold text-xs border border-red-500/30">PDF</div>
                        <span className="font-semibold text-sm text-slate-300">
                            {type === 'PR' ? 'Purchase_Req_10002.pdf' :
                                type === 'PO' ? 'Purchase_Order_4500009921.pdf' : 'Invoice_INV-2024-001.pdf'}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><Printer size={18} /></button>
                        <button className="p-2 hover:bg-slate-700 rounded text-slate-400"><Download size={18} /></button>
                        <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded text-slate-400"><X size={18} /></button>
                    </div>
                </div>

                {/* Print View */}
                <div className="flex-1 overflow-y-auto p-8 font-mono bg-[#0b1120]">
                    {/* Doc Header */}
                    <div className="flex justify-between items-start mb-8 border-b-2 border-slate-700 pb-6">
                        <div>
                            <h1 className="text-3xl font-bold uppercase tracking-widest text-white mb-2">
                                {type === 'PR' ? 'Purchase Requisition' : type === 'PO' ? 'Purchase Order' : 'Tax Invoice'}
                            </h1>
                            <p className="text-sm text-slate-500">
                                {type === 'PR' ? 'Internal Document' : 'Legal Binding Document'}
                            </p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-sky-400">
                                {type === 'PR' ? '#10000442' : type === 'PO' ? '#4500009921' : '#INV-9921-001'}
                            </h2>
                            <p className="text-sm text-slate-500">Date: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Parties */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">From</h3>
                            <p className="font-bold text-slate-200">Mahindra Automotive Ltd</p>
                            <p className="text-sm text-slate-600">Plant: Chakan, Pune</p>
                            <p className="text-sm text-slate-600">GSTIN: 27AAACM1234A1Z5</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase text-slate-500 mb-2">To Vendor</h3>
                            <p className="font-bold text-slate-200">Polymers Inc.</p>
                            <p className="text-sm text-slate-600">Industrial Estate, Bhosari</p>
                            <p className="text-sm text-slate-600">Vendor ID: 100022</p>
                        </div>
                    </div>

                    {/* Line Items */}
                    <table className="w-full mb-8 text-sm">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-2 font-bold text-slate-500">Item</th>
                                <th className="text-left py-2 font-bold text-slate-500">Description</th>
                                <th className="text-right py-2 font-bold text-slate-500">Qty</th>
                                <th className="text-right py-2 font-bold text-slate-500">Unit Price</th>
                                <th className="text-right py-2 font-bold text-slate-500">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-800/50">
                                <td className="py-3 text-slate-600">10</td>
                                <td className="py-3 font-medium text-slate-300">Polypropylene Granules (Black)</td>
                                <td className="py-3 text-right text-slate-400">5,000 KG</td>
                                <td className="py-3 text-right text-slate-400">
                                    {type === 'PR' ? '₹ 105.00' : '₹ 98.00'}
                                    {type === 'PR' && <span className="block text-[10px] text-red-400">(Est)</span>}
                                </td>
                                <td className="py-3 text-right font-medium text-slate-200">
                                    {type === 'PR' ? '₹ 5,25,000' : '₹ 4,90,000'}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-800/50">
                                <td className="py-3 text-slate-600">20</td>
                                <td className="py-3 font-medium text-slate-300">Mould Tooling: Dash_Right_V2 (Asset)</td>
                                <td className="py-3 text-right text-slate-400">1 AU</td>
                                <td className="py-3 text-right text-slate-400">₹ 38,50,000</td>
                                <td className="py-3 text-right font-medium text-slate-200">₹ 38,50,000</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Footer Conditions */}
                    <div className="bg-slate-800/30 p-4 rounded text-xs text-slate-500 border border-slate-800">
                        <h4 className="font-bold mb-1 text-slate-400">Terms & Conditions (Z001)</h4>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Payment Terms: 20% Advance against Tooling, Balance 80% on Delivery.</li>
                            <li>Delivery as per JIT Schedule.</li>
                            <li>Quality Standards: ISO 9001:2015 Compliance Required for PPAP.</li>
                        </ul>
                    </div>

                    {/* Signatures */}
                    <div className="mt-12 pt-8 border-t border-slate-700 flex justify-between items-end">
                        <div className="text-center">
                            <div className="h-12 w-32 border-b border-slate-600 mb-2"></div>
                            <p className="text-xs text-slate-500 uppercase">Authorized Signatory</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-white">Total Value: ₹ {type === 'PR' ? '1.50 Cr' : '1.40 Cr'}</p>
                            <p className="text-xs text-slate-500">(Inclusive of Taxes)</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
