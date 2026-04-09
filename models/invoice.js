import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  
  sellerGSTIN: {
    type: String,
    required: true
  },

  buyerGSTIN: {
    type: String
  },

  sellerState: String,
  buyerState: String,

  amount: {
    type: Number,
    required: true
  },

  taxableValue: Number, // same as amount (for clarity)

  rate: {
    type: Number,
    default: 0.18 // 18%
  },

  cgst: Number,
  sgst: Number,
  igst: Number,

  total: Number,

  section: {
    type: String,
    enum: ["B2B", "B2C_SMALL", "B2C_LARGE", "EXPORT"],
    default: "B2C_SMALL"
  },

  hsnCode: {
    type: String,
    default: "9983" // services (web dev)
  },

  supplyType: {
    type: String,
    enum: ["INTRA", "INTER"],
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;