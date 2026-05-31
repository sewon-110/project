const links = [{ label: "Work", href: "#work" }];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-[#0a0a0b]">
      <nav className="mx-auto flex max-w-[2560px] items-center justify-center gap-8 px-5 py-3.5 text-sm font-medium sm:px-12 sm:py-4">
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
