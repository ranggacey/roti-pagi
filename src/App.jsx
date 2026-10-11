import { useState, useEffect } from 'react'

const WA = 'https://wa.me/6281234567890?text=Halo%20Roti%20Pagi,%20saya%20mau%20pesan%20roti.'

const PRODUCTS = [
  { img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop', tag: 'Best Seller', name: 'Sourdough Klasik', desc: 'Ragi alami fermentasi 24 jam, crust renyah dan aroma khas.', price: 'Rp 45rb' },
  { img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop', tag: 'Fresh Daily', name: 'Croissant Butter', desc: 'Lapisan renyah dengan butter premium, lumer di mulut.', price: 'Rp 18rb' },
  { img: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop', tag: 'Favorit Anak', name: 'Roti Sobek Cokelat', desc: 'Lembut berserat dengan isian cokelat lumer yang melimpah.', price: 'Rp 35rb' },
  { img: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=800&auto=format&fit=crop', tag: 'Sehat', name: 'Roti Gandum Madu', desc: 'Gandum utuh dengan madu asli, cocok buat sarapan sehat.', price: 'Rp 38rb' },
]

const FEATURES = [
  { icon: 'leaf', title: 'Ragi Alami', desc: 'Semua roti memakai starter alami yang kami rawat tiap hari. Tanpa ragi instan, tanpa pengawet.' },
  { icon: 'oven', title: 'Oven Batu', desc: 'Dipanggang di oven batu bersuhu tinggi biar matangnya merata dan aromanya keluar maksimal.' },
  { icon: 'sun', title: 'Fresh Setiap Pagi', desc: 'Adonan disiapkan malam hari dan dipanggang mulai jam 4 pagi. Yang kamu beli selalu fresh hari itu.' },
]

const TESTIS = [
  { name: 'Maya Anggraini', role: 'Ibu Rumah Tangga', text: 'Sourdough-nya enak banget, anak-anak di rumah juga suka. Tiap minggu pasti mampir beli buat stok sarapan.' },
  { name: 'Fajar Nugroho', role: 'Karyawan Kantoran', text: 'Croissantnya juara, masih anget pas saya beli jam 7 pagi. Sekarang jadi ritual tiap berangkat kerja.' },
  { name: 'Lina Hartono', role: 'Pemilik Kafe', text: 'Kami suplai roti dari Roti Pagi untuk kafe. Kualitasnya konsisten dan pelayanannya profesional banget.' },
]

const PRICES = [
  { name: 'Paket Sarapan', desc: 'Buat sarapan keluarga 2 sampai 3 orang.', val: 'Rp 75rb', feats: ['1 sourdough klasik', '4 croissant butter', 'Selai stroberi homemade', 'Gratis antar area Tembalang'], featured: false },
  { name: 'Hampers Roti', desc: 'Bingkisan cantik isi roti premium.', val: 'Rp 150rb', per: '/ box', feats: ['6 varian roti premium', 'Box eksklusif + kartu ucapan', 'Bisa tambah pita & pesan', 'Cocok untuk hadiah'], featured: true },
  { name: 'Langganan', desc: 'Roti fresh diantar tiap pagi.', val: 'Rp 450rb', per: '/ bulan', feats: ['Roti fresh tiap hari kerja', 'Bisa pilih varian mingguan', 'Prioritas pre-order', 'Diskon 10% semua produk'], featured: false },
]

const FAQS = [
  { q: 'Jam berapa rotinya keluar dari oven?', a: 'Batch pertama keluar jam 6 pagi, batch kedua jam 10 pagi, dan batch sore jam 3 sore. Datang pagi biar pilihannya masih lengkap.' },
  { q: 'Apakah bisa pre-order untuk acara?', a: 'Bisa banget. Untuk acara seperti arisan, rapat, atau hajatan, pesan minimal H-2 via WhatsApp biar kami siapkan.' },
  { q: 'Apakah ada roti untuk yang alergi gluten?', a: 'Saat ini belum ada varian gluten-free. Tapi kami punya pilihan roti gandum yang lebih ringan dan berserat.' },
  { q: 'Berapa lama roti bertahan?', a: 'Sourdough tahan 3 sampai 4 hari di suhu ruang kalau disimpan di wadah tertutup. Croissant paling enak dimakan di hari yang sama.' },
  { q: 'Apakah melayani pengiriman luar kota?', a: 'Untuk area Semarang kami antar sendiri. Luar kota bisa via ekspedisi same-day untuk roti kering seperti cookies.' },
]

function Icon({ name }) {
  const paths = {
    bread: <path d="M4 10a8 8 0 0 1 16 0c0 2-1 3-2 4H6c-1-1-2-2-2-4zm2 4v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />,
    leaf: <path d="M5 19C5 9 13 5 20 4c0 8-4 15-13 15m0 0c3-5 7-9 11-11" />,
    oven: <path d="M4 10h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9zm0-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V8zm7 8h2" />,
    sun: <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-15v2m0 16v2M4.2 4.2l1.4 1.4m11.2 11.2l1.4 1.4M2 12h2m16 0h2M4.2 19.8l1.4-1.4M17.8 6.4l1.4-1.4" />,
    star: <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
    check: <path d="M4 12l5 5L20 6" />,
    clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13v5l3 2" />,
    pin: <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
    arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    wa: <path d="M21 12a9 9 0 1 1-16.6 4.8L3 21l4.3-1.3A9 9 0 1 1 21 12zm-4.3 2.5c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.2z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [faq, setFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <div className="site">
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="logo" href="#"><span className="logo-mark"><Icon name="bread" /></span>Roti Pagi</a>
          <div className={`nav-links ${open ? 'show' : ''}`}>
            <a href="#produk" onClick={() => setOpen(false)}>Produk</a>
            <a href="#proses" onClick={() => setOpen(false)}>Proses</a>
            <a href="#testimoni" onClick={() => setOpen(false)}>Testimoni</a>
            <a href="#paket" onClick={() => setOpen(false)}>Paket</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          </div>
          <div className="nav-cta">
            <a href={WA} className="btn btn-primary">Pesan Sekarang</a>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">Artisan Bakery · Semarang</p>
            <h1 className="reveal">Hangat dari Oven, <em>Setiap Pagi.</em></h1>
            <p className="lead reveal">Roti sourdough, croissant, dan kue-kue lembut yang dipanggang fresh tiap subuh. Bahan alami, tanpa pengawet, rasa rumahan yang bikin kangen.</p>
            <div className="hero-actions reveal">
              <a href={WA} className="btn btn-primary"><Icon name="wa" /> Pre-order via WhatsApp</a>
              <a href="#produk" className="btn btn-ghost">Lihat Produk</a>
            </div>
            <div className="hero-stats reveal">
              <div><strong>4.9</strong><span>Rating Google</span></div>
              <div><strong>40+</strong><span>Varian Roti</span></div>
              <div><strong>15rb+</strong><span>Roti Terjual</span></div>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="float-chip">Fresh dari oven jam 6 pagi</div>
            <div className="hero-frame">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop" alt="Roti sourdough fresh dari oven" />
            </div>
            <div className="hero-badge">
              <div className="oven"><Icon name="oven" /></div>
              <div><strong>Dipanggang 3x sehari</strong><span>Jam 6 pagi, 10 pagi, 3 sore</span></div>
            </div>
          </div>
        </div>
      </header>

      <section className="section" id="produk">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow reveal">Produk Andalan</p>
            <h2 className="reveal">Favorit <em>Pelanggan</em></h2>
            <p className="section-sub reveal">Empat produk yang paling sering habis duluan setiap harinya.</p>
          </div>
          <div className="prod-grid">
            {PRODUCTS.map((p, i) => (
              <article key={i} className="prod-card reveal">
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="prod-body">
                  <span className="prod-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="prod-foot">
                    <span className="prod-price">{p.price}</span>
                    <a href={WA}>Pesan <Icon name="arrow" /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="proses">
        <div className="container feat-grid">
          <div className="feat-photo reveal">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&auto=format&fit=crop" alt="Croissant butter Roti Pagi" />
          </div>
          <div>
            <p className="eyebrow reveal">Proses Kami</p>
            <h2 className="reveal">Dibuat <em>Pelan-pelan,</em> Biar Enak</h2>
            <p className="section-sub reveal">Roti enak butuh waktu. Kami nggak pakai jalan pintas biar rasanya maksimal.</p>
            <div className="feat-list">
              {FEATURES.map((f, i) => (
                <div key={i} className="feat-item reveal">
                  <div className="feat-icon"><Icon name={f.icon} /></div>
                  <div><h3>{f.title}</h3><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="testimoni">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Testimoni</p>
            <h2 className="reveal">Kata <em>Pelanggan</em></h2>
            <p className="section-sub reveal">Cerita dari mereka yang sudah jadi langganan.</p>
          </div>
          <div className="testi-grid">
            {TESTIS.map((t, i) => (
              <article key={i} className="testi-card reveal">
                <div className="stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p>"{t.text}"</p>
                <div className="testi-who">
                  <div className="testi-ava">{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="paket">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Paket & Langganan</p>
            <h2 className="reveal">Lebih <em>Hemat,</em> Lebih Praktis</h2>
            <p className="section-sub reveal">Buat keluarga, acara, atau sekadar stok di rumah.</p>
          </div>
          <div className="price-grid">
            {PRICES.map((p, i) => (
              <article key={i} className={`price-card reveal ${p.featured ? 'featured' : ''}`}>
                {p.featured && <span className="price-flag">Paling Laris</span>}
                <h3>{p.name}</h3>
                <p className="pdesc">{p.desc}</p>
                <div className="price-val">{p.val} <small>{p.per || ''}</small></div>
                <ul className="price-list">
                  {p.feats.map((f, j) => <li key={j}><Icon name="check" />{f}</li>)}
                </ul>
                <a href={WA} className="btn btn-primary" style={{ justifyContent: 'center' }}>Pesan {p.name}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal">Sering <em>Ditanyakan</em></h2>
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item reveal ${faq === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setFaq(faq === i ? -1 : i)}>
                  {f.q}<Icon name="plus" />
                </button>
                <div className="faq-a" style={{ maxHeight: faq === i ? '220px' : '0' }}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="cta-box reveal">
            <p className="eyebrow" style={{ justifyContent: 'center', color: 'var(--caramel)' }}>Jangan Sampai Kehabisan</p>
            <h2>Pre-order <em>Buat Besok Pagi</em></h2>
            <p>Stok harian terbatas karena semua fresh dari oven. Pesan malam ini, ambil besok pagi masih hangat.</p>
            <a href={WA} className="btn btn-primary"><Icon name="wa" /> Pesan via WhatsApp <Icon name="arrow" /></a>
            <div className="cta-meta">
              <div><Icon name="clock" /> Buka 06.00 - 20.00 setiap hari</div>
              <div><Icon name="pin" /> Jl. Tembalang Raya No. 12, Semarang</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#"><span className="logo-mark"><Icon name="bread" /></span>Roti Pagi</a>
              <p>Artisan bakery di Semarang. Roti fresh dari oven setiap pagi sejak 2019.</p>
            </div>
            <div>
              <h4>Produk</h4>
              <ul>
                <li><a href="#produk">Sourdough</a></li>
                <li><a href="#produk">Croissant</a></li>
                <li><a href="#produk">Roti Sobek</a></li>
                <li><a href="#paket">Hampers</a></li>
              </ul>
            </div>
            <div>
              <h4>Navigasi</h4>
              <ul>
                <li><a href="#proses">Proses Kami</a></li>
                <li><a href="#testimoni">Testimoni</a></li>
                <li><a href="#paket">Paket</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontak</h4>
              <ul>
                <li><a href={WA}>WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">GoFood / GrabFood</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Roti Pagi. Seluruh hak cipta dilindungi.</span>
            <span>Semarang, Jawa Tengah</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
