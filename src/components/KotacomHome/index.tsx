import React from 'react'

import classes from './index.module.scss'

const WA_LINK =
  'https://wa.me/6285799520350?text=' +
  encodeURIComponent('Halo, saya ingin konsultasi tentang layanan Kotacom')

/* ----------------------------- data ----------------------------- */

type Service = {
  no: string
  tag: string
  title: string
  desc: string
  points: string[]
  href: string
}

const services: Service[] = [
  {
    no: '01',
    tag: 'Website Development',
    title: 'Website profesional yang jelas, cepat, dan siap mendukung penjualan.',
    desc: 'Untuk company profile, landing page, sekolah, toko online, dan kebutuhan promosi yang perlu struktur informasi rapi serta alur konversi yang kuat.',
    points: ['Company profile', 'Landing page', 'Toko online'],
    href: '/pembuatan-website',
  },
  {
    no: '02',
    tag: 'Software Development',
    title: 'Software custom untuk proses bisnis yang tidak bisa diselesaikan template umum.',
    desc: 'Cocok untuk dashboard bisnis, POS, CRM, otomasi operasional, dan integrasi proses yang membutuhkan sistem kerja sendiri.',
    points: ['POS & dashboard', 'CRM & operasional', 'Integrasi proses'],
    href: '/software',
  },
  {
    no: '03',
    tag: 'IT Support & Infra',
    title: 'Support teknis dan infrastruktur agar operasional tetap stabil setiap hari.',
    desc: 'Layanan support, network setup, administrasi server, dan konsultasi teknis untuk menjaga ritme kerja tim tetap lancar.',
    points: ['IT support', 'Network setup', 'System administration'],
    href: '/services',
  },
  {
    no: '04',
    tag: 'Printing & Design',
    title: 'Percetakan dan materi promosi yang siap dipakai untuk membangun trust dan distribusi.',
    desc: 'Buku, brosur, kalender, seminar kit, dan materi promosi lain yang dirancang untuk kebutuhan bisnis, event, dan branding.',
    points: ['Cetak buku', 'Brosur & kalender', 'Materi promosi'],
    href: '/percetakan',
  },
]

const steps = [
  {
    no: 'Step 1',
    title: 'Pahami kebutuhan bisnis',
    desc: 'Kami mulai dari tujuan, hambatan operasional, dan target yang ingin dicapai agar solusi yang dibuat benar-benar relevan.',
  },
  {
    no: 'Step 2',
    title: 'Susun solusi yang realistis',
    desc: 'Setelah arahnya jelas, kami bantu memetakan prioritas, scope kerja, timeline, dan bentuk implementasi yang paling masuk akal.',
  },
  {
    no: 'Step 3',
    title: 'Eksekusi dan pendampingan',
    desc: 'Pekerjaan tidak berhenti saat rilis. Kami lanjutkan dengan support, evaluasi, dan penyesuaian agar hasilnya tetap berguna di lapangan.',
  },
]

const tech = [
  'React',
  'Next.js',
  'Astro.js',
  'Node.js',
  'Laravel',
  'Python',
  'PostgreSQL',
  'MongoDB',
  'AWS',
  'Google Cloud',
  'Flutter',
  'Docker',
]

const projects = [
  {
    tag: 'Software Development · Retail Fashion · 2025',
    title: 'Fashion Retail POS System Butik Cantik',
    desc: 'Implementasi Sistem Point of Sales (POS) yang terintegrasi penuh untuk manajemen stok dan penjualan di Butik Cantik.',
    href: '/projects/fashion-retail-pos-system-butik-cantik',
  },
  {
    tag: 'IT Support · Manufacturing · 2025',
    title: 'IT Infrastructure Upgrade CV Maju Bersama',
    desc: 'Pembaruan infrastruktur IT menyeluruh untuk meningkatkan keamanan, stabilitas, dan performa jaringan internal.',
    href: '/projects/it-infrastructure-upgrade-cv-maju-bersama',
  },
  {
    tag: 'Software Development · Financial Services · 2024',
    title: 'Sistem Manajemen Koperasi Digital',
    desc: 'Efisiensi operasional naik 70%, akurasi pembukuan 99%, proses pinjaman 60% lebih cepat, dan kepuasan anggota meningkat 85%.',
    href: '/projects/cooperative-management-system-surabaya',
  },
]

const testimonials = [
  {
    quote:
      'Website baru dari KOTACOM benar-benar mengubah cara kami mendapatkan klien. Tampilannya profesional dan sangat cepat. Timnya juga sangat responsif.',
    initial: 'B',
    name: 'Budi Santoso',
    role: 'Business Owner, PT Maju Bersama',
  },
  {
    quote:
      'Masalah laptop kantor yang sering error sangat mengganggu produktivitas. Sejak pakai jasa maintenance KOTACOM, semua berjalan lancar.',
    initial: 'S',
    name: 'Siti Rahayu',
    role: 'Operational Manager, CV Digital Sejahtera',
  },
  {
    quote:
      'Kualitas cetak brosur dan buku profil perusahaan kami sangat tajam dan warnanya akurat. Benar-benar meningkatkan citra perusahaan kami.',
    initial: 'A',
    name: 'Ahmad Wijaya',
    role: 'Marketing Director, PT Karya Mandiri',
  },
]

const faqs = [
  {
    q: 'Berapa lama waktu pembuatan website?',
    a: 'Tergantung kompleksitas. Company profile biasanya 1–3 minggu, sedangkan sistem custom seperti POS atau dashboard bisa 4–12 minggu. Kami beri timeline jelas sejak awal.',
  },
  {
    q: 'Apakah ada garansi untuk layanan IT support?',
    a: 'Ya. Setiap pekerjaan bergaransi, dan paket support bulanan mencakup monitoring serta respons cepat saat ada kendala operasional.',
  },
  {
    q: 'Apakah Kotacom melayani klien di luar Surabaya?',
    a: 'Tentu. Berbasis di Surabaya, kami melayani klien dari berbagai kota di Indonesia secara remote maupun on-site untuk kebutuhan tertentu.',
  },
  {
    q: 'Berapa biaya pembuatan website dan software?',
    a: 'Kami berikan penawaran transparan sesuai kebutuhan. Tidak ada biaya tersembunyi — semua dijelaskan di awal sebelum proyek dimulai.',
  },
  {
    q: 'Apakah website yang dibuat mobile-friendly?',
    a: 'Semua website kami dibangun mobile-first, cepat diakses, dan dioptimalkan untuk SEO serta performa di perangkat mobile.',
  },
  {
    q: 'Apakah saya bisa update konten website sendiri?',
    a: 'Bisa. Kami sertakan CMS sehingga Anda dapat mengelola konten, halaman, dan artikel tanpa perlu menyentuh kode.',
  },
]

/* ----------------------------- icons ----------------------------- */

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

const icons: React.ReactNode[] = [
  <Icon key="web">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
  </Icon>,
  <Icon key="sw">
    <path d="M8 6 3 12l5 6M16 6l5 6-5 6" />
  </Icon>,
  <Icon key="it">
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Icon>,
  <Icon key="print">
    <path d="M6 9V4h12v5M6 18H4v-6h16v6h-2" />
    <rect x="6" y="14" width="12" height="7" rx="1" />
  </Icon>,
]

/* ----------------------------- page ----------------------------- */

export const KotacomHome: React.FC = () => {
  return (
    <main className={classes.home}>
      {/* ---------------- HERO ---------------- */}
      <section className={classes.hero}>
        <div className={classes.glow} aria-hidden="true" />
        <div className={classes.heroGrid} aria-hidden="true" />
        <div className={classes.container}>
          <span className={classes.badge}>
            <span className={classes.dot} />
            Solusi IT &amp; Percetakan Terintegrasi
          </span>

          <h1 className={classes.title}>
            Bangun fondasi digital bisnis yang{' '}
            <span className={classes.accent}>rapi, stabil, dan siap tumbuh.</span>
          </h1>

          <p className={classes.lead}>
            Kami membantu bisnis melalui layanan pembuatan website, software development, IT
            support, hingga percetakan profesional. Satu partner terpercaya yang memastikan
            infrastruktur online dan offline Anda sejalan — tanpa repot koordinasi antar vendor.
          </p>

          <div className={classes.actions}>
            <a className={classes.btnPrimary} href="/layanan">
              Jelajahi Solusi
              <span aria-hidden="true">→</span>
            </a>
            <a className={classes.btnGhost} href={WA_LINK} target="_blank" rel="noopener noreferrer">
              Konsultasi Gratis
            </a>
          </div>

          <dl className={classes.stats}>
            <div className={classes.stat}>
              <dt>2008</dt>
              <dd>Berdiri Sejak</dd>
            </div>
            <div className={classes.stat}>
              <dt>150+</dt>
              <dd>Proyek Selesai</dd>
            </div>
            <div className={classes.stat}>
              <dt>Surabaya</dt>
              <dd>Jangkauan Nasional</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Layanan Utama Kotacom</span>
            <h2 className={classes.h2}>
              Empat layanan utama yang saling melengkapi untuk bisnis yang lebih rapi.
            </h2>
            <p className={classes.sub}>
              Mulai dari website, software, support, hingga percetakan — setiap layanan dirancang
              agar bisa berdiri sendiri atau digabung menjadi sistem kerja yang lebih utuh.
            </p>
          </header>

          <div className={classes.cards}>
            {services.map((s, i) => (
              <a className={classes.card} href={s.href} key={s.no}>
                <div className={classes.cardTop}>
                  <span className={classes.cardIcon}>{icons[i]}</span>
                  <span className={classes.cardNo}>{s.no}</span>
                </div>
                <span className={classes.cardTag}>{s.tag}</span>
                <h3 className={classes.cardTitle}>{s.title}</h3>
                <p className={classes.cardDesc}>{s.desc}</p>
                <ul className={classes.cardPoints}>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <span className={classes.cardLink}>
                  Pelajari<span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Cara kami bekerja</span>
            <h2 className={classes.h2}>Tiga langkah yang membuat pekerjaan lebih terarah.</h2>
          </header>

          <ol className={classes.steps}>
            {steps.map((s) => (
              <li className={classes.step} key={s.no}>
                <span className={classes.stepNo}>{s.no}</span>
                <h3 className={classes.stepTitle}>{s.title}</h3>
                <p className={classes.stepDesc}>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- TECH ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Teknologi yang Kami Gunakan</span>
            <h2 className={classes.h2}>
              Stack yang dipilih untuk performa, stabilitas, dan kemudahan pengembangan.
            </h2>
          </header>
          <ul className={classes.tech}>
            {tech.map((t) => (
              <li className={classes.techItem} key={t}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- PORTFOLIO ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Portfolio &amp; Case Studies</span>
            <h2 className={classes.h2}>Proyek terbaru yang kami selesaikan.</h2>
          </header>
          <div className={classes.projects}>
            {projects.map((p) => (
              <a className={classes.project} href={p.href} key={p.title}>
                <span className={classes.projectTag}>{p.tag}</span>
                <h3 className={classes.projectTitle}>{p.title}</h3>
                <p className={classes.projectDesc}>{p.desc}</p>
                <span className={classes.cardLink}>
                  View Details<span aria-hidden="true">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Kepercayaan Klien</span>
            <h2 className={classes.h2}>Apa kata klien tentang layanan kami.</h2>
          </header>
          <div className={classes.quotes}>
            {testimonials.map((t) => (
              <figure className={classes.quote} key={t.name}>
                <blockquote className={classes.quoteText}>&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className={classes.quoteMeta}>
                  <span className={classes.avatar}>{t.initial}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className={classes.note}>* Nama klien telah diubah untuk menjaga privasi</p>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className={classes.section}>
        <div className={classes.container}>
          <header className={classes.head}>
            <span className={classes.eyebrow}>Pertanyaan yang Sering Diajukan</span>
            <h2 className={classes.h2}>Ada pertanyaan? Kami punya jawabannya.</h2>
          </header>
          <div className={classes.faq}>
            {faqs.map((f) => (
              <details className={classes.faqItem} key={f.q}>
                <summary className={classes.faqQ}>
                  {f.q}
                  <span className={classes.faqIcon} aria-hidden="true" />
                </summary>
                <div className={classes.faqA}>{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className={classes.ctaWrap}>
        <div className={classes.container}>
          <div className={classes.cta}>
            <div className={classes.ctaGlow} aria-hidden="true" />
            <span className={classes.eyebrow}>Siap Mulai</span>
            <h2 className={classes.ctaTitle}>
              Bangun solusi yang lebih rapi, stabil, dan siap dipakai untuk tumbuh.
            </h2>
            <p className={classes.ctaSub}>
              Jika bisnis Anda butuh partner untuk website, software, support, atau percetakan,
              Kotacom siap membantu memetakan kebutuhan dan menyiapkan langkah paling relevan.
            </p>
            <div className={classes.actions}>
              <a
                className={classes.btnPrimary}
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                Konsultasi Sekarang
                <span aria-hidden="true">→</span>
              </a>
              <a className={classes.btnGhost} href="/contact">
                Kirim Brief Kebutuhan
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default KotacomHome
