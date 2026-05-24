import { profile, socials } from "@/data/portfolio";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="bg-lime"
    >
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-12 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/70">
          Get in touch
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-5 inline-block break-all font-display text-[10vw] leading-[0.95] tracking-tight transition-opacity hover:opacity-70 sm:text-[6vw]"
        >
          {profile.email}
        </a>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t-2 border-ink pt-8 text-sm">
          <ul className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border-2 border-ink px-5 py-2 font-semibold transition-colors hover:bg-ink hover:text-paper"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-ink/70">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
