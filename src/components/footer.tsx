export default function Footer() {
  return (
    <footer className="w-full bg-bgs text-texts pt-14 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ======= COLUMN 1: BRAND ======= */}
        <div>
          <h2 className="text-2xl font-bold mb-4">TecVibe</h2>
          <p className="text-texts/80 leading-relaxed">
            Shop smart, shop fast. Best deals on electronics, fashion, and
            home essentials.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            {/* Facebook */}
            <a href="#" className="hover:text-primarys transition">
              <svg width="22" height="22" fill="currentColor">
                <path d="M13 8h3V4h-3c-2.2 0-4 1.8-4 4v2H7v4h2v8h4v-8h3l1-4h-4V8c0-.6.4-1 1-1z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="hover:text-primarys transition">
              <svg width="22" height="22" fill="currentColor">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm8 3a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 100 10 5 5 0 000-10z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a href="#" className="hover:text-primarys transition">
              <svg width="22" height="22" fill="currentColor">
                <path d="M10 15l5.2-3L10 9v6zm12-6c0-3-2.4-5.5-5.4-5.8C13.2 3 11 3 10 3H9c-1 0-3.2 0-6.6.2C-1.4 3.5-4 6-4 9v4c0 3 2.4 5.5 5.4 5.8C5.8 19 8 19 9 19h1c1 0 3.2 0 6.6-.2 3-.3 5.4-2.8 5.4-5.8V9z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ======= COLUMN 2: QUICK LINKS ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">Quick Links</h3>
          <ul className="space-y-2 text-texts/80">
            <li><a href="#" className="hover:text-primarys transition">About Us</a></li>
            <li><a href="#" className="hover:text-primarys transition">Contact</a></li>
            <li><a href="#" className="hover:text-primarys transition">Offers & Deals</a></li>
            <li><a href="#" className="hover:text-primarys transition">Blog</a></li>
            <li><a href="#" className="hover:text-primarys transition">FAQ</a></li>
          </ul>
        </div>

        {/* ======= COLUMN 3: CUSTOMER CARE ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">Customer Care</h3>
          <ul className="space-y-2 text-texts/80">
            <li><a href="#" className="hover:text-primarys transition">My Account</a></li>
            <li><a href="#" className="hover:text-primarys transition">Track Order</a></li>
            <li><a href="#" className="hover:text-primarys transition">Returns</a></li>
            <li><a href="#" className="hover:text-primarys transition">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primarys transition">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* ======= COLUMN 4: NEWSLETTER ======= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primarys">Newsletter</h3>
          <p className="text-texts/80 mb-4">Subscribe to get updates on new arrivals & special offers.</p>

          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-text text-texts outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-primarys text-texts font-semibold rounded-xl hover:bg-primarys/90 transition"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-texts/20 pt-4 text-center text-texts/80 text-sm">
        © {new Date().getFullYear()} TecVibe — All Rights Reserved.
      </div>
    </footer>
  );
}
