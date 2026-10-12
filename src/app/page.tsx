import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { aja, agendaNacional, news, partners, provinces } from "@/lib/aja";

export default function HomePage() {
  return (
    <div className="overflow-x-hidden bg-navy">
      <SiteHeader />

      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <Image
          src="/hero-palacio.png"
          alt="Magistrados da AJA no Palácio da Justiça"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_32%] scale-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:px-8 md:pb-24">
          <Image
            src="/aja-logo.png"
            alt="AJA"
            width={164}
            height={152}
            priority
            className="animate-rise mb-6 h-[4.25rem] w-auto object-contain md:h-[4.75rem]"
          />
          <p className="animate-rise animate-rise-delay-1 mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {aja.short} · desde 2015 · mandato {aja.mandate}
          </p>
          <h1 className="animate-rise animate-rise-delay-2 max-w-[14ch] font-[family-name:var(--font-syne)] text-[clamp(2.5rem,6.8vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {aja.slogan}.
          </h1>
          <p className="animate-rise animate-rise-delay-3 mt-5 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg">
            A plataforma da associação que congrega magistrados de todas as instâncias — nas{" "}
            {provinces.length} províncias — com identidade digital, governação, formação e
            comunicação oficial. O WhatsApp coexiste; deixa de ser o arquivo.
          </p>
          <div className="animate-rise animate-rise-delay-4 mt-9 flex flex-wrap gap-3">
            <Link
              href="/entrar"
              className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-navy hover:brightness-110"
            >
              Entrar na área reservada
            </Link>
            <Link
              href="/#agenda"
              className="rounded-full border border-cream/25 bg-cream/5 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm hover:border-cream/45"
            >
              Agenda nacional da AJA
            </Link>
          </div>
        </div>
      </section>

      {/* Direcção */}
      <section className="border-t border-gold/10 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Direcção</p>
          <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            Quem conduz a associação neste triénio.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { role: "Presidente", name: "Esmael Diogo da Silva" },
              { role: "Vice-Presidente", name: "Elisandra Manuel" },
              { role: "Vice-Presidente", name: "Neide Sebastião" },
              { role: "Secretário-Geral", name: "Jacinto Figueira" },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-gold/20 bg-navy-2/70 p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
                  {p.role}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight">{p.name}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-cream/45">
            Organigrama completo — comissões e representantes nas 18 províncias — na área reservada,
            editável pela Direcção.
          </p>
        </div>
      </section>

      {/* Agenda / dores estratégicas */}
      <section id="agenda" className="border-t border-gold/10 bg-navy-2/35 py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Agenda nacional</p>
          <h2 className="mt-3 max-w-[16ch] font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-5xl">
            O que a AJA já está a empurrar.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {agendaNacional.map((item, i) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gold/15 bg-navy/60 p-7 transition hover:border-gold/35"
              >
                <span className="text-xs font-semibold tabular-nums text-gold/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/55">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dores operacionais */}
      <section id="dores" className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Operação</p>
          <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            A missão é nacional. A ferramenta também tem de ser.
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/15 md:grid-cols-3">
            {[
              {
                t: "WhatsApp ≠ arquivo",
                d: "Grupos chegam ao público — mas não guardam histórico institucional, quotas nem atas.",
              },
              {
                t: "Ética sem logística",
                d: "Auscultações em Luanda e Benguela; chegar às restantes províncias esbarra em custo e distância.",
              },
              {
                t: "Defesa discreta",
                d: "Independência e apoio ao magistrado exigem canal confidencial — não um chat aberto.",
              },
            ].map((x) => (
              <div key={x.t} className="bg-navy-2 p-7">
                <h3 className="text-lg font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm text-cream/55">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section id="connect" className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#25D366]">Connect</p>
          <h2 className="mt-3 max-w-[18ch] font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-5xl">
            Publica uma vez. O WhatsApp continua.
          </h2>
          <p className="mt-5 max-w-2xl text-cream/55">
            A Direcção não é forçada a abandonar os canais. A plataforma é a fonte oficial; o
            WhatsApp replica quando fizer sentido.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-semibold">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-gold-bright">
              1 · Portal AJA Digital
            </span>
            <span className="rounded-full border border-cream/15 px-4 py-2 text-cream/50">→</span>
            <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-gold-bright">
              2 · Associados notificados
            </span>
            <span className="rounded-full border border-cream/15 px-4 py-2 text-cream/50">→</span>
            <span className="rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-4 py-2 text-[#25D366]">
              3 · WhatsApp opcional
            </span>
          </div>
        </div>
      </section>

      {/* Notícias reais */}
      <section className="border-t border-gold/10 bg-navy-2/30 py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Em destaque</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            Da UIJLP ao Código de Ética.
          </h2>
          <ul className="mt-10 space-y-0 divide-y divide-gold/10 border-y border-gold/10">
            {news.slice(0, 5).map((n) => (
              <li key={n.id} className="grid gap-2 py-6 md:grid-cols-[7rem_1fr]">
                <span className="text-xs text-cream/40">{n.date}</span>
                <div>
                  <span className="text-[0.65rem] font-semibold uppercase tracking-wide text-gold">
                    {n.tag}
                  </span>
                  <h3 className="mt-1 font-semibold">{n.title}</h3>
                  <p className="mt-1 text-sm text-cream/50">{n.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plataforma */}
      <section id="plataforma" className="border-t border-gold/10 py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Plataforma</p>
          <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            Tudo o que a associação precisa — padronizável.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Members", "Cadastro, cartão digital, quotas, segmentos por província"],
              ["Connect", "Comunicados + ponte WhatsApp controlada"],
              ["Governance", "Assembleias, atas, CONMAJ, deliberações"],
              ["Academy", "Dialéctica, ética, certificados, biblioteca"],
              ["Protect", "Apoio confidencial e defesa institucional"],
              ["Organigrama", "Direcção, comissões, 18 representantes — editável"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-gold/15 bg-navy-2/50 p-5">
                <h3 className="font-semibold text-gold-bright">{t}</h3>
                <p className="mt-1.5 text-sm text-cream/55">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <section className="border-t border-gold/10 py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Parceiros</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <div key={p.name} className="rounded-xl border border-gold/12 px-4 py-5">
                <p className="font-semibold">{p.name}</p>
                <p className="mt-1 text-xs text-cream/45">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-gold/10 bg-navy-2/30 py-24 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">FAQ</p>
            <h2 className="mt-3 font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
              Perguntas frequentes
            </h2>
            <p className="mt-4 text-sm text-cream/55">
              Respostas rápidas sobre a plataforma, o WhatsApp e a área reservada.
            </p>
          </div>

          <div className="mt-10 divide-y divide-gold/15 border-y border-gold/15">
            {[
              {
                q: "A AJA Digital substitui o WhatsApp?",
                a: "Não. A plataforma é a fonte oficial (comunicados, quotas, atas, cartão). O WhatsApp continua a existir e pode receber réplicas — sem ser o arquivo da associação.",
              },
              {
                q: "O que é o cartão digital de associado?",
                a: "É a identidade do magistrado na AJA: nome, nº, validade e estado da quota. Tem QR de verificação em tempo real e pode ser apresentado ou impresso em assembleias e actos.",
              },
              {
                q: "Quem vê o quê na área reservada?",
                a: "O acesso é por cargo (Presidente, Secretário-Geral, Tesoureiro, Comissão, Associado…). Cada perfil gere apenas o que lhe compete — associados, finanças, Protect, votações, etc.",
              },
              {
                q: "Podemos importar as listas Excel que já temos?",
                a: "Sim. Nas listas de associados, eventos, quotas, finanças e outros registos há importação de planilha (.xlsx / CSV), para não recomeçar do zero.",
              },
              {
                q: "Como funcionam as votações em assembleia?",
                a: "A Direcção convoca o evento, define a ordem de trabalhos e abre as deliberações. Os associados votam na área reservada; o quórum e o resultado actualizam-se em tempo real.",
              },
              {
                q: "O Protect é confidencial?",
                a: "Sim. Pedidos de apoio institucional ou defesa da independência ficam numerados, com linha temporal. Só cargos autorizados acedem ao conteúdo.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group py-5 open:bg-transparent [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                  <span className="font-semibold tracking-tight text-cream group-open:text-gold-bright">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 text-sm text-gold transition group-open:rotate-45 group-open:bg-gold/15"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl pr-10 text-sm leading-relaxed text-cream/55">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gold/10 py-28">
        <Image src="/hero-palacio.png" alt="" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-navy/88" />
        <div className="relative mx-auto max-w-2xl px-5 text-center">
          <Image
            src="/aja-logo.png"
            alt=""
            width={164}
            height={152}
            className="mx-auto mb-8 h-14 w-auto object-contain"
          />
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-semibold tracking-tight md:text-4xl">
            A casa digital dos magistrados associados.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream/55">{aja.mission}</p>
          <Link
            href="/entrar"
            className="mt-10 inline-flex rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-navy hover:brightness-110"
          >
            Entrar na AJA Digital
          </Link>
        </div>
      </section>

      <footer className="border-t border-gold/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-sm text-cream/40 md:flex-row md:items-center md:justify-between md:px-8">
          <span>
            {aja.name} · {aja.legal.slice(0, 80)}…
          </span>
          <span>
            {aja.founded} · {provinces.length} províncias
          </span>
        </div>
      </footer>
    </div>
  );
}
