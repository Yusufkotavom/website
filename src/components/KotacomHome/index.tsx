import React from 'react'

import classes from './index.module.scss'

const WA = 'https://wa.me/6285799520350?text=' +
  encodeURIComponent('Halo, saya ingin konsultasi tentang layanan Kotacom')

/* ----------------------------- inline icon set (no emoji) ----------------------------- */

type IconProps = { className?: string }

const IconGlobe = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
  </svg>
)

const IconCpu = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="7" y="7" width="10" height="10" rx="2" />
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M10 1.5v2M14 1.5v2M10 20.5v2M14 20.5v2M1.5 10h2M1.5 14h2M20.5 10h2M20.5 14h2" />
  </svg>
)

const IconShield = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5l7.5 3v6c0 4.4-3 8.3-7.5 9.5-4.5-1.2-7.5-5.1-7.5-9.5v-6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </svg>
)

const IconPrinter = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 9V3h10v6" />
    <rect x="3.5" y="9" width="17" height="8" rx="2" />
    <path d="M7 14h10v7H7z" />
  </svg>
)

const IconArrow = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h13M13 6.5l5.5 5.5-5.5 5.5" />
  </svg>
)

const IconPlus = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
)

const IconWhatsapp = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.54 3.75 1.5 5.29L2 22l5.02-1.66a9.85 9.85 0 004.99 1.34c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2zm5.7 13.9c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.02.24-3.44-.72-2.9-1.16-4.72-4.15-4.86-4.34-.14-.2-1.15-1.55-1.1-2.94.05-1.4.77-2.07 1.04-2.36.27-.29.58-.34.78-.34h.55c.18 0 .42-.02.64.5.24.58.8 2 .87 2.14.07.15.11.32.01.5-.1.2-.2.31-.39.53-.19.22-.3.32-.44.53-.14.2-.3.42-.13.72.17.3.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.66-.08.19-.2.75-.87.95-1.17.2-.3.4-.25.68-.15.28.1 1.75.83 2.05.98.3.15.5.22.58.35.07.13.07.76-.17 1.44z" />
  </svg>
)

/* ----------------------------- data ----------------------------- */

const NAV_LINKS = [
  { label: 'Layanan', href: '/layanan' },
  { label: 'Portfolio', href: '/projects' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kontak', href: '/kontak' },
]

const SERVICES = [
  {
    tag: 'Company profile · Landing · E-commerce',
    title: 'Website Development',
    desc: 'Website yang jelas, cepat, dan siap mendukung penjualan — dari profil perusahaan sampai toko online.',
    points: ['Next.js', 'CMS', 'SEO'],
    href: '/layanan',
    icon: <IconGlobe className={classes.tileIcon} />,
    span: 'lg' as const,
    tone: 'blue' as const,
  },
  {
    tag: 'POS · Dashboard · ERP',
    title: 'Software Development',
    desc: 'Sistem custom untuk proses bisnis yang tidak bisa diselesaikan template umum.',
    points: ['Web App', 'Integrasi'],
    href: '/layanan',
    icon: <IconCpu className={classes.tileIcon} />,
    span: 'sm' as const,
    tone: 'violet' as const,
  },
  {
    tag: 'Maintenance · Jaringan · Keamanan',
    title: 'IT Support & Infrastruktur',
    desc: 'Support teknis dan infrastruktur agar operasional tetap stabil setiap hari.',
    points: ['Monitoring', 'Backup'],
    href: '/layanan',
    icon: <IconShield className={classes.tileIcon} />,
    span: 'sm' as const,
    tone: 'green' as const,
  },
  {
    tag: 'Buku · Brosur · Kemasan · Seminar kit',
    title: 'Printing & Design',
    desc: 'Percetakan dan materi promosi berkualitas yang membangun trust dan siap distribusi.',
    points: ['Cetak buku', 'Offset', 'Digital'],
    href: '/layanan',
    icon: <IconPrinter className={classes.tileIcon} />,
    span: 'wide' as const,
    tone: 'warm' as const,
  },
]

const STEPS = [
  { n: '01', title: 'Pahami kebutuhan bisnis', desc: 'Kami mulai dari tujuan, hambatan operasional, dan target yang ingin dicapai.' },
  { n: '02', title: 'Susun solusi yang realistis', desc: 'Setelah arahnya jelas, kami petakan prioritas, scope kerja, timeline, dan implementasi.' },
  { n: '03', title: 'Eksekusi & pendampingan', desc: 'Pekerjaan tidak berhenti saat rilis — kami lanjutkan dengan support dan evaluasi.' },
]

const TECH = [
  'React', 'Next.js', 'Astro.js', 'Node.js', 'Laravel', 'Python',
  'PostgreSQL', 'MongoDB', 'AWS', 'Google Cloud', 'Flutter', 'Docker',
]

const PROJECTS = [
  { tag: 'Retail Fashion · 2025', title: 'Fashion Retail POS System Butik Cantik', desc: 'Sistem Point of Sales terintegrasi penuh untuk manajemen stok dan penjualan.', tone: 'blue' as const },
  { tag: 'Manufacturing · 2025', title: 'IT Infrastructure Upgrade CV Maju Bersama', desc: 'Pembaruan infrastruktur IT menyeluruh untuk keamanan, stabilitas, dan performa jaringan.', tone: 'green' as const },
  { tag: 'Koperasi · 2025', title: 'Sistem Manajemen Koperasi Digital', desc: 'Digitalisasi simpan pinjam, anggota, dan laporan keuangan koperasi.', tone: 'violet' as const },
]

const QUOTES = [
  { text: 'Implementasinya rapi dan tepat waktu. Tim Kotacom paham kebutuhan operasional kami, bukan sekadar bikin aplikasi.', name: 'Butik Cantik', role: 'Retail Fashion' },
  { text: 'Jaringan kantor jadi jauh lebih stabil. Support-nya responsif setiap kali kami butuh bantuan.', name: 'CV Maju Bersama', role: 'Manufacturing' },
  { text: 'Sekarang laporan koperasi bisa kami lihat real-time. Pekerjaan manual berkurang drastis.', name: 'Koperasi Digital', role: 'Koperasi' },
]

const FAQ = [
  { q: 'Berapa lama waktu pembuatan website?', a: 'Tergantung kompleksitas. Company profile umumnya 2–4 minggu; sistem custom dengan integrasi bisa 6–12 minggu. Kami berikan timeline jelas setelah sesi discovery.' },
  { q: 'Apakah ada garansi untuk layanan IT support?', a: 'Ya. Setiap paket support mencakup garansi penanganan dan SLA respons yang disepakati, plus dokumentasi pekerjaan.' },
  { q: 'Apakah Kotacom melayani klien di luar Surabaya?', a: 'Ya, basis kami di Surabaya namun jangkauan nasional. Pekerjaan bisa dilakukan remote maupun on-site sesuai kebutuhan.' },
  { q: 'Berapa biaya pembuatan website dan software?', a: 'Biaya disesuaikan dengan scope. Kami susun penawaran realistis berdasarkan prioritas bisnis Anda — tanpa biaya tersembunyi.' },
  { q: 'Apakah website yang dibuat mobile-friendly?', a: 'Semua website kami responsif dan dioptimalkan untuk mobile, tablet, maupun desktop.' },
  { q: 'Apakah saya bisa update konten website sendiri?', a: 'Bisa. Kami sertakan CMS agar Anda mengelola konten kapan saja tanpa perlu developer.' },
]

/* ----------------------------- page ----------------------------- */

export const KotacomHome: React.FC = () => {
  return (
    <main className={classes.home}>
      {/* ============================ HERO ============================ */}
      <section className={classes.hero}>
        <div className={classes.heroGlow} aria-hidden="true" />
        <div className={classes.heroAurora} aria-hidden="true" />
        <div className={classes.heroGrid} aria-hidden="true" />

        <div className={classes.container}>
          <span className={classes.badge}>
            <span className={classes.dot} />
            Mitra IT &amp; Percetakan sejak 2008
          </span>

          <h1 className={classes.title}>
            Bangun fondasi digital bisnis yang <em className={classes.accent}>rapi, stabil</em>, dan siap tumbuh.
          </h1>

          <p className={classes.lead}>
            Website, software development, IT support, hingga percetakan profesional.
            Satu partner terpercaya — tanpa repot koordinasi antar vendor.
          </p>

          <div className={classes.actions}>
            <a className={classes.btnPrimary} href={WA} target="_blank" rel="noopener noreferrer">
              Konsultasi Gratis <IconArrow className={classes.btnIcon} />
            </a>
            <a className={classes.btnGhost} href="/layanan">
              Jelajahi Solusi
            </a>
          </div>

          <dl className={classes.stats}>
            <div className={classes.stat}>
              <dt>2008</dt>
              <dd>Berdiri sejak</dd>
            </div>
            <div className={classes.stat}>
              <dt>150+</dt>
              <dd>Proyek selesai</dd>
            </div>
            <div className={classes.stat}>
              <dt>4</dt>
              <dd>Layanan terpadu</dd>
            </div>
            <div className={classes.stat}>
              <dt>Nasional</dt>
              <dd>Jangkauan klien</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ============================ MARQUEE ============================ */}
      <div className={classes.marqueeBand} aria-hidden="true">
        <div className={classes.marqueeTrack}>
          {[0, 1].map((dup) => (
            <div className={classes.marqueeGroup} key={dup}>
              {['IT Support', 'Website', 'Software', 'Percetakan', 'Infrastruktur', 'Branding', 'Konsultasi IT', 'Cetak Buku'].map((w) => (
                <span className={classes.marqueeItem} key={`${dup}-${w}`}>
                  {w}
                  <span className={classes.marqueeSep}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ============================ 01 LAYANAN (BENTO) ============================ */}
      <section className={classes.section} id="layanan">
        <div className={classes.container}>
          <header className={`${classes.head} k-reveal`}>
            <span className={classes.eyebrow}>01 — Layanan</span>
            <h2 className={classes.h2}>
              Empat layanan utama yang saling melengkapi.
            </h2>
            <p className={classes.sub}>
              Mulai dari website, software, support, hingga percetakan — setiap layanan dirancang
              agar bisa berdiri sendiri atau digabung menjadi sistem kerja yang lebih utuh.
            </p>
          </header>

          <div className={`${classes.bento} k-reveal`}>
            {SERVICES.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className={`${classes.tile} ${classes[`tile_${s.span}`]} ${classes[`tone_${s.tone}`]}`}
              >
                <div className={classes.tileTop}>
                  <span className={classes.tileIconWrap}>{s.icon}</span>
                  <IconArrow className={classes.tileArrow} />
                </div>
                <span className={classes.tileTag}>{s.tag}</span>
                <h3 className={classes.tileTitle}>{s.title}</h3>
                <p className={classes.tileDesc}>{s.desc}</p>
                <ul className={classes.tilePoints}>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 02 PROSES ============================ */}
      <section className={classes.sectionPanel}>
        <div className={classes.container}>
          <header className={`${classes.head} k-reveal`}>
            <span className={classes.eyebrow}>02 — Cara Kami Bekerja</span>
            <h2 className={classes.h2}>Tiga langkah yang membuat pekerjaan lebih terarah.</h2>
          </header>

          <ol className={`${classes.steps} k-reveal`}>
            {STEPS.map((s) => (
              <li className={classes.step} key={s.n}>
                <span className={classes.stepNo}>{s.n}</span>
                <h3 className={classes.stepTitle}>{s.title}</h3>
                <p className={classes.stepDesc}>{s.desc}</p>
              </li>
            ))}
          </ol>

          <div className={classes.stepCta}>
            <a className={classes.btnPrimary} href={WA} target="_blank" rel="noopener noreferrer">
              <IconWhatsapp className={classes.btnIcon} /> Konsultasi via WhatsApp
            </a>
            <a className={classes.btnGhost} href="/layanan">
              Lihat semua layanan <IconArrow className={classes.btnIcon} />
            </a>
          </div>
        </div>
      </section>

      {/* ============================ 03 TEKNOLOGI ============================ */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={`${classes.head} k-reveal`}>
            <span className={classes.eyebrow}>03 — Teknologi</span>
            <h2 className={classes.h2}>Stack yang dipilih untuk performa dan stabilitas.</h2>
            <p className={classes.sub}>
              Kami memakai teknologi yang relevan dengan kebutuhan proyek, bukan sekadar mengikuti tren.
            </p>
          </header>

          <ul className={`${classes.tech} k-reveal`}>
            {TECH.map((t) => (
              <li className={classes.techItem} key={t}>
                <span className={classes.techDot} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ 04 PORTFOLIO ============================ */}
      <section className={classes.sectionPanel} id="portfolio">
        <div className={classes.container}>
          <header className={`${classes.headRow} k-reveal`}>
            <div>
              <span className={classes.eyebrow}>04 — Portfolio</span>
              <h2 className={classes.h2}>Proyek terbaru yang kami selesaikan.</h2>
            </div>
            <a className={classes.headLink} href="/projects">
              Semua portfolio <IconArrow className={classes.btnIcon} />
            </a>
          </header>

          <div className={`${classes.projects} k-reveal`}>
            {PROJECTS.map((p) => (
              <article className={`${classes.project} ${classes[`tone_${p.tone}`]}`} key={p.title}>
                <div className={classes.projectVisual} aria-hidden="true">
                  <span className={classes.projectMesh} />
                  <span className={classes.projectBadge}>{p.tag}</span>
                </div>
                <div className={classes.projectBody}>
                  <h3 className={classes.projectTitle}>{p.title}</h3>
                  <p className={classes.projectDesc}>{p.desc}</p>
                  <span className={classes.projectLink}>
                    Lihat detail <IconArrow className={classes.btnIcon} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 05 TESTIMONI ============================ */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={`${classes.head} k-reveal`}>
            <span className={classes.eyebrow}>05 — Testimoni</span>
            <h2 className={classes.h2}>Apa kata klien tentang layanan kami.</h2>
          </header>

          <div className={`${classes.quotes} k-reveal`}>
            {QUOTES.map((q) => (
              <figure className={classes.quote} key={q.name}>
                <span className={classes.quoteMark} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={classes.quoteText}>{q.text}</blockquote>
                <figcaption className={classes.quoteBy}>
                  <span className={classes.quoteName}>{q.name}</span>
                  <span className={classes.quoteRole}>{q.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 06 FAQ ============================ */}
      <section className={classes.sectionPanel} id="faq">
        <div className={classes.container}>
          <header className={`${classes.head} k-reveal`}>
            <span className={classes.eyebrow}>06 — FAQ</span>
            <h2 className={classes.h2}>Ada pertanyaan? Kami punya jawabannya.</h2>
          </header>

          <div className={`${classes.faqList} k-reveal`}>
            {FAQ.map((f) => (
              <details className={classes.faqItem} key={f.q}>
                <summary className={classes.faqQ}>
                  <span>{f.q}</span>
                  <IconPlus className={classes.faqIcon} />
                </summary>
                <div className={classes.faqA}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ 07 CTA ============================ */}
      <section className={classes.ctaSection}>
        <div className={classes.container}>
          <div className={`${classes.ctaPanel} k-reveal`}>
            <div className={classes.ctaGlow} aria-hidden="true" />
            <span className={classes.eyebrow}>Mari Berkolaborasi</span>
            <h2 className={classes.ctaTitle}>
              Siap mengubah cara bisnis Anda bekerja hari ini?
            </h2>
            <p className={classes.ctaLead}>
              Diskusikan tantangan operasional dan teknis Anda bersama kami. Tim konsultan
              KOTACOM membantu menemukan strategi yang tepat sasaran dengan budget paling realistis.
            </p>
            <div className={classes.ctaActions}>
              <a className={classes.btnPrimaryLight} href={WA} target="_blank" rel="noopener noreferrer">
                <IconWhatsapp className={classes.btnIcon} /> Chat WhatsApp
              </a>
              <a className={classes.btnGhostLight} href="/kontak">
                Hubungi Kami <IconArrow className={classes.btnIcon} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
