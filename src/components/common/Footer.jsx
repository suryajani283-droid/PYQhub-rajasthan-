export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-8">
      <p className="text-sm">
        © {new Date().getFullYear()} PYQHub Rajasthan. All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:text-blue-300">Privacy Policy</a>
        <a href="#" className="hover:text-blue-300">Terms</a>
        <a href="#" className="hover:text-blue-300">Contact</a>
      </div>
    </footer>
  );
} 