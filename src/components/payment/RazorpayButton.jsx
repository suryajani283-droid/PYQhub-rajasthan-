export default function RazorpayButton({ paper, onSuccess }) {
  // Future: real Razorpay integration
  const handleClick = () => {
    alert(`Redirecting to payment for ${paper.name} (₹${paper.price})`);
    // onSuccess() can be called after mock success
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Buy Now
    </button>
  );
} 