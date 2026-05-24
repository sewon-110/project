import { profile, socials } from "@/data/portfolio";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28"
    >
      <div className="border-t pt-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Get in touch
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 inline-block text-3xl font-semibold tracking-tight transition-opacity hover:opacity-70 sm:text-5xl"
        >
          {profile.email}
        </a>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 text-sm text-muted">
          <ul className="flex gap-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
