import Image from "next/image";
import Link from "next/link";

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  return (
    <header
      className={`absolute inset-x-0 top-0 z-40 ${
        solid ? "border-b border-gold/15 bg-navy/90 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/aja-logo.png"
            alt="AJA — Associação dos Juízes de Angola"
            width={164}
            height={152}
            priority
            className="h-11 w-auto object-contain"
          />
          <div className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-tight text-gold-bright">
              AJA Digital
            </span>
            <span className="block text-[0.65rem] text-cream/50">Área institucional</span>
          </div>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/#agenda"
            className="hidden rounded-full px-3 py-2 text-sm text-cream/70 transition hover:text-cream md:inline"
          >
            Agenda
          </Link>
          <Link
            href="/#plataforma"
            className="hidden rounded-full px-3 py-2 text-sm text-cream/70 transition hover:text-cream md:inline"
          >
            Plataforma
          </Link>
          <Link
            href="/#connect"
            className="hidden rounded-full px-3 py-2 text-sm text-cream/70 transition hover:text-cream lg:inline"
          >
            WhatsApp
          </Link>
          <Link
            href="/#faq"
            className="hidden rounded-full px-3 py-2 text-sm text-cream/70 transition hover:text-cream md:inline"
          >
            FAQ
          </Link>
          <Link
            href="/entrar"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition hover:brightness-110"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  );
}
