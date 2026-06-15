import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-card-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand/Copyright */}
          <div className="text-sm text-muted-text font-medium">
            &copy; {currentYear} Skill Bridge. All rights reserved.
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-text hover:text-brand-accent transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-text hover:text-brand-accent transition-colors font-medium"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-text hover:text-brand-accent transition-colors font-medium"
            >
              Support Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
