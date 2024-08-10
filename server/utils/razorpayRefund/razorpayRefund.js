export const calculateRemainingAmount=(amount)=> {
    // Razorpay charges
    const razorpayFeePercentage = 3 / 100; // 3%
    const razorpayFee = amount * razorpayFeePercentage;
    
    // GST on Razorpay charges (18% of Razorpay fee)
    const gstOnRazorpayFee = razorpayFee * 18 / 100;
    
    // Total deductions (Razorpay fee + GST on Razorpay fee)
    const totalDeductions = razorpayFee + gstOnRazorpayFee;
    
    // Final remaining amount
    const remainingAmount = amount - totalDeductions;
    
    return remainingAmount;
}