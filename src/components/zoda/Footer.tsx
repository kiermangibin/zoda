
export function Footer() {
  return (
    <footer className="zoda-footer" role="contentinfo">
      <div className="zoda-footer__inner">
        <div className="zoda-footer__brand">
          <img
            src="https://zoda.sg/cdn/shop/files/ZODA_logo.svg?v=1741773590&width=352"
            alt="ZODA"
            loading="lazy"
          />
          <p className="zoda-footer__tag">
            Performance activewear engineered for athletes moving with intent.
            Train harder. Recover sharper. Move with intent.
          </p>
        </div>

        <div className="zoda-footer__col">
          <h4>Shop</h4>
          <ul>
            <li><a href="/collections/new-arrivals">New Arrivals</a></li>
            <li><a href="/collections/womens-collection">Women</a></li>
            <li><a href="/collections/mens-collection">Men</a></li>
            <li><a href="/collections/unisex">Unisex</a></li>
            <li><a href="/collections">All Collections</a></li>
          </ul>
        </div>

        <div className="zoda-footer__col">
          <h4>Company</h4>
          <ul>
            <li><a href="/collections/core-performance">Core Performance</a></li>
            <li><a href="/collections/endurance">Endurance</a></li>
            <li><a href="/collections/24-7-wear">24/7 Wear</a></li>
            <li><a href="/collections/accessories">Accessories</a></li>
            <li><a href="mailto:hello@zoda.sg">Contact</a></li>
          </ul>
        </div>

        <div className="zoda-footer__col">
          <h4>Stay in the loop</h4>
          <ul>
            <li><a href="mailto:hello@zoda.sg?subject=Partnership%20Inquiry">Partner With Us</a></li>
            <li><a href="https://www.instagram.com/zoda.sg" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
          <form
            className="zoda-footer__newsletter"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Newsletter signup"
          >
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="submit">Join</button>
          </form>
        </div>
      </div>

      <div className="zoda-footer__bottom">
        <span>© {new Date().getFullYear()} ZODA Holdings Pte Ltd. All rights reserved.</span>
        <div className="zoda-footer__social">
          <a href="https://www.instagram.com/zoda.sg" target="_blank" rel="noopener">Instagram</a>
          <a href="mailto:hello@zoda.sg">Email</a>
        </div>
      </div>
    </footer>
  );
}
