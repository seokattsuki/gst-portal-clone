import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    section: {
    type: String,
    enum: ["B2B", "B2C_SMALL", "B2C_LARGE", "EXPORT"],
    default: "B2C_SMALL"
    },
    buyerGSTIN: {
        type: String
    },
    cgst: Number,
    sgst: Number,
    igst: Number,
    total: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const invoice = mongoose.model("Invoice", invoiceSchema);

export default invoice;
