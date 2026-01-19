import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-bgs text-texts pt-14 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* ======= COLUMN 1: BRAND ======= */}
        <div>
          <h2 className="text-2xl font-bold mb-4">TecVibe</h2>
          <p className="text-texts/80 leading-relaxed">
            Shop smart, shop fast. Best deals on electronics, fashion, and home
            essentials.
          </p>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Facebook */}
            <a href="https://www.facebook.com/md.tareq.48930"  className="hover:text-primarys transition">
              <Facebook size={22} />
            </a>
            <a href="https://www.linkedin.com/in/joynal-abedin-web-dev/" className="hover:text-primarys transition">
              <Linkedin size={22} />
            </a>
            <a href="https://www.linkedin.com/in/joynal-abedin-web-dev/"  className="hover:text-primarys transition">
              <Youtube size={22} />
            </a>
          </div>
        </div>

        {/* ======= COLUMN 2: QUICK LINKS ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">
            Quick Links
          </h3>
          <ul className="space-y-2 text-texts/80">
            <li>
              <a href="/about" className="hover:text-primarys transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primarys transition">
                Contact
              </a>
            </li>
            <li>
              <a href="/offers" className="hover:text-primarys transition">
                Offers & Deals
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-primarys transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-primarys transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* ======= COLUMN 3: CUSTOMER CARE ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">
            Customer Care
          </h3>
          <ul className="space-y-2 text-texts/80">
            <li>
              <a href="#" className="hover:text-primarys transition">
                My Account
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primarys transition">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primarys transition">
                Returns
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primarys transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-primarys transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* ======= COLUMN 4: NEWSLETTER ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">
            Newsletter
          </h3>
          <p className="text-texts/80 mb-4">
            Subscribe to get updates on new arrivals & special offers.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-texts/20 pt-4 text-center text-texts/80 text-sm">
        © {new Date().getFullYear()} TecVibe — All Rights Reserved.
      </div>
    </footer>
  );
}
