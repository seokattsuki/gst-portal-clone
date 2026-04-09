import Invoice from "../models/invoice.js";
import { calculateGST } from "../utils/taxCalculator.js";

// CREATE INVOICE
export const createInvoice = async(req, res) => {
    try {
        const {amount, section, buyerGSTIN, sameState} =  req.body;

        const taxes = calculateGST(amount, sameState );
        const newInvoice  = new Invoice({
            amount,
            section,
            buyerGSTIN,
            cgst: taxes.cgst,
            sgst: taxes.sgst,
            igst: taxes.igst,
            total: amount + taxes.cgst+ taxes.igst
        });

        const savedInvoice = await newInvoice.save();
        res.status(201)
        .json(savedInvoice);
    } catch (error) {
        console.error(error);
        res.status(500)
        .json({ message: "Server Error creating invoice" });
    }
};

export const getInvoices = async(req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200)
        .json(invoices)
    } catch (error) {
        res.status(500)
        .json({message: "Server Error fetching invoices"})
    }
};