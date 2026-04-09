import express from "express";
import express from "../models/invoice.js";
import { calculateGST } from "../utils/taxCalculator.js";
import invoice from "../models/invoice.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { amount, section, buyerGSTIN, sameState } = req.body;

        //calculate the taxes before saving
        const taxes = calculateGST(amount, sameState);

        const newInvoice = new invoice({
            amount,
            section,
            buyerGSTIN,
            cgst: taxes.cgst,
            sgst: taxes.sgst,
            igst: taxes.igst,
            total: taxes.total
        });

        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error){
        console.error(error);
        res.status(500).json({message: "Server Error creating invoice" });
    }
});

// @route   GET /api/invoice
router.get("/", async (req, res) => {
    try {
        const invoices = await invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching invoices" });
    }
});

export default router;
