export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} PYQHub Rajasthan. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <button className="hover:text-blue-300 bg-transparent border-none text-white cursor-pointer">
          Privacy Policy
        </button>
        <button className="hover:text-blue-300 bg-transparent border-none text-white cursor-pointer">
          Terms
        </button>
        <button className="hover:text-blue-300 bg-transparent border-none text-white cursor-pointer">
          Contact
        </button>
      </div>
    </footer>
  );
}