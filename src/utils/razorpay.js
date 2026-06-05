// Placeholder - real integration will use Firebase Cloud Function
export const createRazorpayOrder = async (amount, receipt) => {
  // In production, call backend to create order
  console.log('Create order:', amount, receipt);
  return { order_id: 'dummy', amount };
};

export const verifyPayment = (response) => {
  // Verify payment signature
  console.log('Verify payment:', response);
  return true;
};