const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 text-fg backdrop-blur">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-center gap-8 px-5 py-3.5 text-sm font-medium sm:px-12 sm:py-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-opacity hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
