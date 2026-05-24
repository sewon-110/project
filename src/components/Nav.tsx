import { profile } from "@/data/portfolio";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-3 sm:px-12 sm:py-4">
        <a
          href="#top"
          className="grid h-9 place-content-center rounded-full border-2 border-paper px-4 text-sm font-bold tracking-tight"
        >
          {profile.name}
        </a>
        <ul className="hidden items-center gap-7 text-sm font-medium sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="text-right font-mono text-[9px] uppercase leading-tight tracking-[0.15em] sm:text-[10px]">
          Maker of
          <br />
          visuals ✺
        </span>
      </nav>
    </header>
  );
}
