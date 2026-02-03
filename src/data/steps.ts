
export type Actor = 'BD' | 'PM' | 'System' | 'Customer' | 'Vendor';

export interface Step {
    id: number;
    title: string;
    actor: Actor;
    description: string;
    type: 'manual' | 'automated';
    details?: string[];
    blueprintId?: string;
    blueprintTitle?: string;
    blueprintDesc?: string;
}

export const steps: Step[] = [
    {
        id: 1,
        title: "OEM Nomination (Revenue)",
        actor: "BD",
        description: "Receive Nomination from OEM (Mahindra) for Interior Trims.",
        type: "manual",
        details: ["Receive OEM Nomination", "Enter Revenue Details (₹ 2 Cr)", "Initiate Project"],
        blueprintId: "Context",
        blueprintTitle: "OEM Intake",
        blueprintDesc: "Entry of the Income-generating Automotive Project."
    },
    {
        id: 2,
        title: "Project Setup & Budgeting",
        actor: "BD",
        description: "Define Project Budget and Payment Milestones for the OEM.",
        type: "manual",
        details: ["Enter OEM PO", "Set Target Profit Margin (20%)", "Calculate Estimated Project Cost", "Define Tooling/PPAP Milestones"],
        blueprintId: "Data Foundation",
        blueprintTitle: "Project Structure",
        blueprintDesc: "Establishes the Link between OEM Revenue and Project WBS."
    },
    {
        id: 3,
        title: "Program Scope Review",
        actor: "PM",
        description: "Program Manager reviews new Auto Project scope.",
        type: "manual", // Changed to manual for Dashboard flow
        details: ["Scope: Interior Trims (XUV700)", "Budget: 1.60 Cr", "Target PO Date: Immediate and give an proceed to PR Release button"],
        blueprintId: "GAP-03 / 4.3",
        blueprintTitle: "Scope Validation",
        blueprintDesc: "Initial review of project parameters."
    },
    {
        id: 4,
        title: "PR Creation & POrg Check",
        actor: "PM",
        description: "Select Purchasing Organization and Release PR to Sourcing.",
        type: "manual",
        details: ["1st: Give list of line items for which PR will be raised", "2nd: POrg Selection", "3rd: Release PR", "Simulate screen of PR Approval by relevant authorities via auto email", "Show: PO Negotiation Simulation"],
        blueprintId: "GAP-03 / 4.3",
        blueprintTitle: "Org Structure Validation",
        blueprintDesc: "Ensures PR is assigned to the correct plant purchasing group."
    },
    {
        id: 5,
        title: "PO Negotiation Simulation",
        actor: "System",
        description: "System converts PR to PO with negotiated savings (PO < PR).",
        type: "automated",
        details: ["Purchase Price Validation: Always show full PO and release button", "Simulate screen of PO Approval by relevant authorities via auto email", "On approval vendor receiving PO via auto mail"],
        blueprintId: "GAP-01 / 4.1",
        blueprintTitle: "Auto PO Conversion",
        blueprintDesc: "Converts PR to PO. Logic handles value changes due to negotiation/contracts."
    },
    {
        id: 6,
        title: "Purchase Price Validation",
        actor: "PM",
        description: "Validation ensuring Negotiated PO price doesn't exceed approved PR budget.",
        type: "manual",
        details: ["Compare PO vs PR", "Validate Savings", "Approve Cost"],
        blueprintId: "GAP-05 / 4.5",
        blueprintTitle: "Price/Aging Alerts",
        blueprintDesc: "Ensures Cost Control before releasing the order to the supplier."
    },
    {
        id: 7,
        title: "Indirect PO Release Strategy",
        actor: "PM",
        description: "Release Purchase Order after technical and commercial review. Select Payment Terms (e.g., Z002) to finalize.",
        type: "manual",
        details: ["Review Final PO Value", "Select Payment Policy (20-40-40)", "Trigger Vendor Notification"],
        blueprintId: "GAP-04 / 4.4",
        blueprintTitle: "Execution Monitoring",
        blueprintDesc: "Milestone confirmation drives both AP (Vendor) and AR (Customer) workflows."
    },
    {
        id: 8,
        title: "Payment Reminders (AR/AP)",
        actor: "System",
        description: "Monitoring due dates for Supplier Payments and Customer Receivables.",
        type: "automated",
        details: ["Monitor AP Aging (Vendor)", "Monitor AR Aging (Customer)", "Send Reminders"],
        blueprintId: "GAP-09 / 4.9",
        blueprintTitle: "MIGO Invoice Visibility",
        blueprintDesc: "Visibility into liability (Vendor) vs asset (Customer Work) value."
    },
    {
        id: 9,
        title: "Service Confirmation",
        actor: "System",
        description: "Confirming Logistics/Handling Services to allow invoicing.",
        type: "automated",
        details: ["Confirm Service Entry", "Update Project Cost", "Ready for Billing"],
        blueprintId: "GAP-07 / 4.7",
        blueprintTitle: "Spend Analysis Report",
        blueprintDesc: "Consolidated view of Project Cost vs Revenue."
    },
    {
        id: 10,
        title: "Payment 1: Advance (20%)",
        actor: "System",
        description: "Processing Tooling Advance (Z002 Term: 20-40-40).",
        type: "automated",
        details: ["Pay Advance (₹ 28 L)", "Update Status: Tooling Kick-off Confirmed (T0)", "Debit Asset Account"],
        blueprintId: "GAP-12 / 4.12",
        blueprintTitle: "Capital Advance",
        blueprintDesc: "Initial liquidity for vendor tooling kickoff."
    },
    {
        id: 11,
        title: "Milestone Update: Tooling",
        actor: "PM",
        description: "Program Team updates the completion of next milestone.",
        type: "manual",
        details: ["Verify Tooling Trial", "Upload T0 Inspection Report", "Approve for Milestone Payment"],
        blueprintId: "GAP-06 / 4.6",
        blueprintTitle: "Milestone Confirmation",
        blueprintDesc: "Technical verification required to unlock next payment tranche."
    },
    {
        id: 12,
        title: "Payment 2: Milestone (40%)",
        actor: "System",
        description: "Processing PPAP/Interim Milestone Payment.",
        type: "automated",
        details: ["Pay Milestone (₹ 56 L)", "Update Status: PPAP Quality Approved", "Check Quality Mgmt"],
        blueprintId: "GAP-10 / 4.10",
        blueprintTitle: "Progress Payment",
        blueprintDesc: "Payment against verified quality milestones."
    },
    {
        id: 13,
        title: "Milestone Update: Delivery",
        actor: "PM",
        description: "Program Team updates the completion of next milestone.",
        type: "manual",
        details: ["Verify Bulk Supply", "Check GRN (Goods Receipt)", "Approve Final Settlement"],
        blueprintId: "GAP-06 / 4.6",
        blueprintTitle: "Delivery Confirmation",
        blueprintDesc: "Confirming physical receipt of goods to authorize final payment."
    },
    {
        id: 14,
        title: "Payment 3: Final (40%)",
        actor: "System",
        description: "Final Settlement against Goods Receipt.",
        type: "automated",
        details: ["Pay Balance (₹ 56 L)", "Update Status: Project Financial Closure", "Close PO"],
        blueprintId: "GAP-11 / 4.11",
        blueprintTitle: "Final Settlement",
        blueprintDesc: "Closing vendor liability."
    },
    {
        id: 15,
        title: "Project P&L Summary",
        actor: "PM",
        description: "Final Profit & Loss view: Customer Revenue - Supplier Cost = Margin.",
        type: "manual",
        details: ["View Revenue (₹ 2 Cr)", "View Cost (₹ 1.4 Cr)", "Net Margin (₹ 60 L)", "Status: Closed"],
        blueprintId: "GAP-07 / 4.7",
        blueprintTitle: "Consolidated Profitability",
        blueprintDesc: "End-to-end traceability of Project Profitability."
    }
];
