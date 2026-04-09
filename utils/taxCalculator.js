export const calculateGST = (amount, sameState) => {
    const rate = 0.18;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;

    if (sameState){
        // Intra-state transaction
        cgst = amount * (rate / 2);
        sgst = amount * (rate / 2);
    } else {
        // Inter-state transaction
        igst = amount * rate;
    }

    const total = amount + cgst + sgst + igst;

    return{
        cgst: Number(cgst.toFixed(2)),
        sgst: Number(sgst.toFixed(2)),
        igst: Number(igst.toFixed(2)),
        total: Number(total.toFixed(2))
    };


}