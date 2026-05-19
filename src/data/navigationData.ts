export interface NavLink {
  name: string;
  path: string;
}

/**
 * Main navigation links used in Navbar and Footer
 */
export const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Tech Buzz", path: "/tech-buzz" },
  { name: "Shop", path: "/shop" },
];

/**
 * Quick links for footer (same as navLinks for consistency)
 */
export const quickLinks: NavLink[] = navLinks;
