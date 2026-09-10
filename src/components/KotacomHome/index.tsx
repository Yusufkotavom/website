import React from 'react'

import { Reveal } from './Reveal'
import classes from './index.module.scss'

const WA_TEXT = encodeURIComponent(
  'Halo Kotacom, saya ingin konsultasi mengenai kebutuhan digital bisnis saya.',
)
const WA = `https://wa.me/6285799520350?text=${WA_TEXT}`

const stats = [
  { k: 'Sejak', v: '2008', s: 'Pengalaman 17+ tahun' },
  { k: 'Proyek', v: '150+', s: 'Terkirim & terawat' },
  { k: 'Basis', v: 'Surabaya', s: 'Melayani seluruh Indonesia' },
  { k: 'Respon', v: '< 24 jam', s: 'Dukungan teknis aktif' },
]

const services = [
  {
    n: '01',
    title: 'Website Profesional',
    desc: 'Company profile, landing page, e-commerce, dan portal yang cepat, rapi, dan mudah dikelola.',
    items: ['Next.js / Astro', 'SEO teknis', 'CMS terintegrasi', 'Core Web Vitals'],
  },
  {
    n: '02',
    title: 'Software Development',
    desc: 'Aplikasi custom untuk operasional bisnis — dari POS, inventory, sampai sistem internal.',
    items: ['Web app & dashboard', 'Mobile (Flutter)', 'Integrasi API', 'Otomasi proses'],
  },
  {
    n: '03',
    title: 'IT Support & Infrastruktur',
    desc: 'Kelola server, jaringan, dan perangkat kantor supaya operasional tidak pernah berhenti.',
    items: ['Setup & migrasi server', 'Jaringan & VPN', 'Monitoring', 'Backup terjadwal'],
  },
  {
    n: '04',
    title: 'Percetakan & Branding',
    desc: 'Cetak buku, kemasan, dan materi promosi dengan kontrol kualitas end-to-end.',
    items: ['Offset & digital', 'Buku & katalog', 'Kemasan', 'Desain grafis'],
  },
]

const steps = [
  {
    n: '01',
    t: 'Pahami kebutuhan',
    d: 'Kami petakan tujuan bisnis, alur kerja, dan kendala teknis sebelum menyentuh baris kode pertama.',
  },
  {
    n: '02',
    t: 'Susun solusi realistis',
    d: 'Rencana kerja, arsitektur, dan estimasi yang jujur — tanpa fitur berlebihan yang tidak terpakai.',
  },
  {
    n: '03',
    t: 'Eksekusi & dampingi',
    d: 'Bangun, uji, rilis, lalu dampingi operasional harian beserta dokumentasi dan pelatihan.',
  },
]

const tech = [
  'TypeScript', 'Next.js', 'React', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Tailwind', 'Payload CMS',
  'Docker', 'Linux', 'AWS', 'Cloudflare',
]

const projects = [
  {
    tag: 'Retail',
    t: 'POS System — Butik Cantik',
    d: 'Kasir, stok multi-outlet, dan laporan penjualan real-time untuk jaringan butik di Jawa Timur.',
    m: ['Next.js', 'PostgreSQL', 'Prisma'],
  },
  {
    tag: 'Infrastruktur',
    t: 'IT Upgrade — CV Maju Bersama',
    d: 'Migrasi server lama ke VPS terkelola, VPN kantor, dan backup otomatis harian.',
    m: ['Linux', 'Docker', 'WireGuard'],
  },
  {
    tag: 'Koperasi',
    t: 'Koperasi Digital',
    d: 'Simpan pinjam, anggota, dan pembukuan otomatis dengan alur persetujuan berjenjang.',
    m: ['Laravel', 'MySQL', 'Redis'],
  },
]

const quotes = [
  {
    q: 'Tim Kotacom paham kebutuhan operasional kami, bukan cuma tampilan. Sistemnya dipakai setiap hari tanpa drama.',
    n: 'Rina Wijaya',
    r: 'Owner, Butik Cantik',
  },
  {
    q: 'Server kami akhirnya rapi dan terdokumentasi. Gangguan turun drastis setelah serah terima.',
    n: 'Agus Santoso',
    r: 'Direktur, CV Maju Bersama',
  },
  {
    q: 'Prosesnya jelas dari awal. Estimasi sesuai, komunikasi enak, hasilnya bisa kami kelola sendiri.',
    n: 'Dewi Kartika',
    r: 'Manajer, Koperasi Sejahtera',
  },
]

const faqs = [
  {
    q: 'Berapa lama proses pengerjaan website?',
    a: 'Tergantung cakupan. Landing page sederhana biasanya 1–2 minggu, company profile 3–4 minggu, dan aplikasi custom 6–12 minggu termasuk pengujian.',
  },
  {
    q: 'Apakah saya bisa mengelola konten sendiri?',
    a: 'Bisa. Kami integrasikan CMS (Payload) sehingga tim Anda dapat mengubah halaman, artikel, dan gambar tanpa menyentuh kode.',
  },
  {
    q: 'Bagaimana skema pembayarannya?',
    a: 'Bertahap: 40% di awal sebagai komitmen, 40% saat proses rilis, dan 20% setelah serah terima serta pelatihan.',
  },
  {
    q: 'Apakah termasuk dukungan setelah rilis?',
    a: 'Ya. Ada masa garansi perbaikan bug 30 hari, dan tersedia paket dukungan bulanan untuk pemeliharaan serta monitoring.',
  },
  {
    q: 'Apakah bisa menangani infrastruktur & server?',
    a: 'Bisa. Kami mengelola VPS, jaringan kantor, VPN, backup, dan monitoring — all-in-one dengan pengembangan aplikasinya.',
  },
  {
    q: 'Apakah melayani klien di luar Surabaya?',
    a: 'Tentu. Basis kami di Surabaya, tetapi seluruh alur kerja bisa dilakukan remote via Google Meet, WhatsApp, dan repositori bersama.',
  },
]

const Arrow = () => (
  <svg className={classes.arrow} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

const Plus = () => (
  <svg className={classes.plus} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
)

export default function KotacomHome() {
  return (
    <main className={classes.page}>
      {/* ── Titik nol: strip meta ─────────────────────────────── */}
      <div className={classes.ticker}>
        <div className={classes.tickerTrack}>
          {[0, 1].map((dup) => (
            <div className={classes.tickerRow} key={dup} aria-hidden={dup === 1}>
              {[
                'EST. 2008 — SURABAYA, ID',
                'WEBSITE',
                'SOFTWARE',
                'IT SUPPORT',
                'PERCETAKAN',
                'BRANDING',
                '150+ PROYEK',
                'RESPON < 24 JAM',
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className={classes.hero}>
        <p className={classes.eyebrow}>
          <span className={classes.marker}>◆</span> Digital studio — Surabaya
        </p>
        <h1 className={classes.h1}>
          Bangun fondasi digital
          <br />
          yang rapi, stabil, dan siap tumbuh.
        </h1>
        <div className={classes.heroFoot}>
          <p className={classes.lead}>
            Kotacom membantu bisnis merancang, membangun, dan merawat sistem digital —
            dari website dan aplikasi custom hingga infrastruktur IT dan percetakan.
          </p>
          <div className={classes.actions}>
            <a className={classes.btnPrimary} href={WA} target="_blank" rel="noopener noreferrer">
              Konsultasi gratis <Arrow />
            </a>
            <a className={classes.btnGhost} href="#layanan">
              Lihat layanan
            </a>
          </div>
        </div>
      </section>

      {/* ── Stat grid ─────────────────────────────────────────── */}
      <div className={classes.stats} data-reveal>
        {stats.map((s) => (
          <div className={classes.stat} key={s.k}>
            <span className={classes.statKey}>{s.k}</span>
            <span className={classes.statVal}>{s.v}</span>
            <span className={classes.statSub}>{s.s}</span>
          </div>
        ))}
      </div>

      {/* ── 01 Layanan ────────────────────────────────────────── */}
      <section className={classes.section} id="layanan" data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>01</span>
            <span className={classes.label}>Layanan</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Empat pilar yang menopang operasional bisnis Anda.</h2>
            <p className={classes.sub}>
              Bukan daftar jasa yang terpisah — setiap pilar dirancang supaya saling menopang
              dan bisa bertambah sesuai pertumbuhan bisnis.
            </p>
          </div>
        </header>
        <div className={classes.svcGrid}>
          {services.map((s) => (
            <article className={classes.svc} key={s.n}>
              <div className={classes.svcTop}>
                <span className={classes.svcNum}>{s.n}</span>
                <Arrow />
              </div>
              <h3 className={classes.h3}>{s.title}</h3>
              <p className={classes.svcDesc}>{s.desc}</p>
              <ul className={classes.svcList}>
                {s.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── 02 Cara kerja ─────────────────────────────────────── */}
      <section className={classes.section} data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>02</span>
            <span className={classes.label}>Cara kerja</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Tiga langkah, tanpa kejutan di tengah jalan.</h2>
          </div>
        </header>
        <ol className={classes.steps}>
          {steps.map((s) => (
            <li className={classes.step} key={s.n}>
              <span className={classes.stepNum}>{s.n}</span>
              <h3 className={classes.h3}>{s.t}</h3>
              <p className={classes.stepDesc}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 03 Teknologi ──────────────────────────────────────── */}
      <section className={classes.section} data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>03</span>
            <span className={classes.label}>Teknologi</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Perangkat yang kami kuasai.</h2>
            <p className={classes.sub}>
              Dipilih karena stabil dan banyak dipakai — supaya sistem Anda mudah dirawat
              oleh tim mana pun setelahnya.
            </p>
          </div>
        </header>
        <ul className={classes.techGrid}>
          {tech.map((t) => (
            <li className={classes.tech} key={t}>
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 04 Portfolio ──────────────────────────────────────── */}
      <section className={classes.section} data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>04</span>
            <span className={classes.label}>Portfolio</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Sebagian pekerjaan terbaru.</h2>
          </div>
        </header>
        <div className={classes.projGrid}>
          {projects.map((p) => (
            <article className={classes.proj} key={p.t}>
              <div className={classes.projTag}>{p.tag}</div>
              <div className={classes.projBody}>
                <h3 className={classes.h3}>{p.t}</h3>
                <p className={classes.projDesc}>{p.d}</p>
                <ul className={classes.chips}>
                  {p.m.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── 05 Testimoni ──────────────────────────────────────── */}
      <section className={classes.section} data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>05</span>
            <span className={classes.label}>Testimoni</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Kata mereka yang sudah bekerja dengan kami.</h2>
          </div>
        </header>
        <div className={classes.quoteGrid}>
          {quotes.map((q) => (
            <figure className={classes.quote} key={q.n}>
              <blockquote>{q.q}</blockquote>
              <figcaption>
                <span className={classes.qName}>{q.n}</span>
                <span className={classes.qRole}>{q.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 06 FAQ ────────────────────────────────────────────── */}
      <section className={classes.section} data-reveal>
        <header className={classes.sectionHead}>
          <div className={classes.sectionMeta}>
            <span className={classes.num}>06</span>
            <span className={classes.label}>FAQ</span>
          </div>
          <div className={classes.sectionIntro}>
            <h2 className={classes.h2}>Pertanyaan yang paling sering muncul.</h2>
          </div>
        </header>
        <div className={classes.faq}>
          {faqs.map((f) => (
            <details className={classes.faqItem} key={f.q}>
              <summary>
                <span>{f.q}</span>
                <Plus />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── 07 CTA ────────────────────────────────────────────── */}
      <section className={classes.cta} data-reveal>
        <div className={classes.ctaMeta}>
          <span className={classes.num}>07</span>
          <span className={classes.label}>Mulai</span>
        </div>
        <div className={classes.ctaBody}>
          <h2 className={classes.h2}>Punya rencana? Mari kita rapikan bersama.</h2>
          <p className={classes.sub}>
            Ceritakan kebutuhan Anda — kami balas dengan penilaian jujur soal cakupan,
            biaya, dan waktu. Tanpa biaya konsultasi.
          </p>
          <div className={classes.actions}>
            <a className={classes.btnPrimary} href={WA} target="_blank" rel="noopener noreferrer">
              Chat via WhatsApp <Arrow />
            </a>
            <a className={classes.btnGhost} href="mailto:halo@kotacom.id">
              halo@kotacom.id
            </a>
          </div>
        </div>
      </section>

      <Reveal />
    </main>
  )
}
