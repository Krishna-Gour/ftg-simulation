
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

// Project: Project MnM: Interior Trims (Scope: Cockpit, Door Trims, Floor Console)
// Line Items:
// - IP Carrier Injection Molding Tool: ₹ 3 Cr
// - Chute Chanel Vibration: ₹ 40 L
// - Cockpit Checking Fixture: ₹ 25 L
// - Laser Scoring Fixture: ₹ 70 L
// Total: ₹ 4.35 Cr

export const steps: Step[] = [
    {
        id: 1,
        title: "Nomination",
        actor: "Customer",
        description: "Customer nominates project with cost description.",
        type: "manual",
        details: ["Customer: OEM Automotive", "Project Nomination", "Enter Cost Description"],
        blueprintId: "NOM-01",
        blueprintTitle: "Customer Nomination",
        blueprintDesc: "Initial entry point for customer project nomination."
    },
    {
        id: 2,
        title: "Sales Master Data - Target",
        actor: "BD",
        description: "Enter line items with target cost from sales master data.",
        type: "manual",
        details: ["Enter Line Items", "Set Target Costs", "Define Budget"],
        blueprintId: "SMD-01",
        blueprintTitle: "Sales Master Data",
        blueprintDesc: "Define target costs for each line item from sales master data."
    },
    {
        id: 3,
        title: "Purchase Nomination",
        actor: "BD",
        description: "Purchase team reviews negotiated quotes and nominates final costs.",
        type: "manual",
        details: ["Review Quotes", "Validate Pricing", "Nominate Final Costs"],
        blueprintId: "PN-01",
        blueprintTitle: "Purchase Nomination",
        blueprintDesc: "Purchase team reviews and validates the nominated costs after negotiation."
    },
    {
        id: 4,
        title: "PR Release",
        actor: "PM",
        description: "Program Manager reviews status and releases Purchase Requisition.",
        type: "manual",
        details: ["Review PR Status", "Validate Costs", "Release PR"],
        blueprintId: "PR-REL-01",
        blueprintTitle: "PR Release",
        blueprintDesc: "Formal release of purchase requisition."
    },
    {
        id: 5,
        title: "PO Release",
        actor: "System",
        description: "System processes Purchase Order release with vendor allocation.",
        type: "automated",
        details: ["Convert PR to PO", "Vendor Allocation", "Send PO to Vendor"],
        blueprintId: "PO-REL-01",
        blueprintTitle: "PO Release",
        blueprintDesc: "Automated conversion and release of Purchase Order to selected vendor."
    },
    {
        id: 6,
        title: "Stage Payment",
        actor: "System",
        description: "Process stage payment (Advance 20%) against Purchase Order.",
        type: "automated",
        details: ["Process Advance Payment (20%)", "Amount: ₹ 87 L", "Update Payment Status"],
        blueprintId: "PAY-STG-01",
        blueprintTitle: "Stage Payment",
        blueprintDesc: "Initial advance payment to vendor for project kickoff."
    },
    {
        id: 7,
        title: "GRN",
        actor: "System",
        description: "Record Goods Receipt Note for delivered items.",
        type: "automated",
        details: ["Verify Delivery", "Create GRN", "Update Inventory"],
        blueprintId: "GRN-01",
        blueprintTitle: "Goods Receipt",
        blueprintDesc: "Recording physical receipt of goods against Purchase Order."
    },
    {
        id: 8,
        title: "Final Payment",
        actor: "System",
        description: "Process final settlement payment (80%) after goods receipt.",
        type: "automated",
        details: ["Process Final Payment (80%)", "Amount: ₹ 3.48 Cr", "Close PO"],
        blueprintId: "PAY-FIN-01",
        blueprintTitle: "Final Payment",
        blueprintDesc: "Final settlement against verified goods receipt."
    },
];
