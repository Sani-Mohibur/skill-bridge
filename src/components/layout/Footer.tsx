import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 bg-neutral-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand/Copyright */}
          <div className="text-sm text-neutral-500">
            &copy; {currentYear} Skill Bridge. All rights reserved.
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-neutral-500 hover:text-neutral-950 transition-colors"
            >
              Support Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
