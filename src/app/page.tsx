"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type Material = {
  name: string;
  type: string;
  origin: string;
  image: string;
  description: string;
};

const materials: Material[] = [
  {
    name: "Bianco Carrara",
    type: "Mramor",
    origin: "Italija",
    image: "/images/materials/bianco-carrara.png",
    description: "Klasičan bijeli mramor s nježnim sivim venama.",
  },
  {
    name: "Nero Assoluto",
    type: "Granit",
    origin: "Zimbabve",
    image: "/images/materials/nero-assoluto.png",
    description: "Duboka crna struktura za snažne, suvremene interijere.",
  },
  {
    name: "Calacatta Gold",
    type: "Mramor",
    origin: "Italija",
    image: "/images/materials/calacatta-gold.png",
    description: "Raskošan bijeli mramor s toplim zlatnim akcentima.",
  },
  {
    name: "Dekton Kreta",
    type: "Dekton",
    origin: "Španjolska",
    image: "/images/materials/dekton-kreta.png",
    description: "Matirana mineralna površina nadahnuta toplim cementom.",
  },
  {
    name: "Verde Guatemala",
    type: "Mramor",
    origin: "Indija",
    image: "/images/materials/verde-guatemala.png",
    description: "Ekspresivan zeleni kamen za upečatljive detalje.",
  },
  {
    name: "Onyx White",
    type: "Oniks",
    origin: "Iran",
    image: "/images/materials/onyx-white.png",
    description: "Translucentna struktura stvorena za dekorativnu rasvjetu.",
  },
];

const projects = [
  {
    title: "Rezidencijalna kupaonica",
    location: "Split, Hrvatska",
    image: "/images/projekt1.jpeg",
    category: "Interijer",
  },
  {
    title: "Poslovno stubište",
    location: "Zagreb, Hrvatska",
    image: "/images/projekt2.jpeg",
    category: "Poslovni prostor",
  },
  {
    title: "Granitne stepenice",
    location: "Dubrovnik, Hrvatska",
    image: "/images/projekt3.jpeg",
    category: "Privatna vila",
  },
  {
    title: "Kuhinja po mjeri",
    location: "Opatija, Hrvatska",
    image: "/images/projekt4.jpeg",
    category: "Interijer",
  },
];

const process = [
  ["01", "Konzultacija", "Razumijemo prostor, tehničke zahtjeve i vašu viziju."],
  ["02", "Odabir materijala", "Biramo kamen prema estetici, namjeni i uvjetima korištenja."],
  ["03", "Tehnička razrada", "Pripremamo precizne nacrte, mjere i detalje izvedbe."],
  ["04", "CNC obrada", "Digitalna preciznost susreće iskustvo naših majstora."],
  ["05", "Montaža", "Kontrolirana isporuka i pažljiva završna instalacija."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeType, setActiveType] = useState("Sve");
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredMaterials = useMemo(
    () =>
      materials.filter(
        (material) =>
          (activeType === "Sve" || material.type === activeType) &&
          `${material.name} ${material.origin}`
            .toLocaleLowerCase("hr")
            .includes(query.toLocaleLowerCase("hr")),
      ),
    [activeType, query],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  async function downloadCatalog() {
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF();

    pdf.setFillColor(0, 62, 116);
    pdf.rect(0, 0, 210, 297, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("times", "normal");
    pdf.setFontSize(32);
    pdf.text("DUNOLIT", 24, 52);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("KATALOG MATERIJALA", 24, 65);
    pdf.setDrawColor(168, 203, 255);
    pdf.line(24, 76, 186, 76);
    pdf.setFontSize(10);
    pdf.text(
      `Generirano: ${new Intl.DateTimeFormat("hr-HR").format(new Date())}`,
      24,
      267,
    );

    materials.forEach((material, index) => {
      pdf.addPage();
      pdf.setTextColor(0, 62, 116);
      pdf.setFont("times", "normal");
      pdf.setFontSize(25);
      pdf.text(material.name, 24, 39);
      pdf.setDrawColor(18, 85, 151);
      pdf.line(24, 48, 186, 48);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text(`${material.type.toUpperCase()} / ${material.origin.toUpperCase()}`, 24, 62);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(66, 71, 80);
      pdf.setFontSize(12);
      const description = pdf.splitTextToSize(material.description, 154);
      pdf.text(description, 24, 82);
      pdf.setFillColor(240, 237, 237);
      pdf.rect(24, 112, 162, 92, "F");
      pdf.setTextColor(0, 62, 116);
      pdf.setFontSize(10);
      pdf.text("PREPORUCENA PRIMJENA", 34, 130);
      pdf.setTextColor(66, 71, 80);
      pdf.text("Kuhinjske plohe / kupaonice / obloge / detalji po mjeri", 34, 143);
      pdf.setTextColor(114, 119, 130);
      pdf.setFontSize(9);
      pdf.text(`${String(index + 1).padStart(2, "0")} / ${materials.length}`, 176, 276);
    });

    pdf.save("dunolit-katalog-materijala.pdf");
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#pocetna" aria-label="Dunolit početna">
          DUNOLIT
          <span>STONE CRAFT</span>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#materijali" onClick={() => setMenuOpen(false)}>Materijali</a>
          <a href="#projekti" onClick={() => setMenuOpen(false)}>Projekti</a>
          <a href="#proces" onClick={() => setMenuOpen(false)}>Proces</a>
          <a href="#o-nama" onClick={() => setMenuOpen(false)}>O nama</a>
          <a href="#kontakt" onClick={() => setMenuOpen(false)}>Kontakt</a>
        </nav>
        <div className="header-actions">
          <button className="language" aria-label="Odaberi jezik">
            HR <ChevronDown size={14} />
          </button>
          <a className="header-cta" href="#kontakt">Zatraži ponudu</a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Otvori izbornik"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="pocetna">
          <Image
            className="hero-image"
            src="/images/stone.jpeg"
            alt="Suvremena kuhinja s izražajnim kamenim otokom"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow light">Prirodni kamen. Precizna izvedba.</p>
            <h1>Majstorstvo u svakom komadu kamena.</h1>
            <p className="hero-copy">
              Pretvaramo prirodnu snagu kamena u bezvremenska arhitektonska
              rješenja, od prvog nacrta do završne montaže.
            </p>
            <div className="hero-buttons">
              <a className="button button-light" href="#materijali">
                Istražite katalog <ArrowRight size={17} />
              </a>
              <a className="button button-ghost" href="#kontakt">Zatražite ponudu</a>
            </div>
          </div>
          <a className="scroll-cue" href="#o-nama" aria-label="Pomakni se niže">
            <span>Istražite Dunolit</span>
            <ArrowDown size={18} />
          </a>
        </section>

        <section className="intro section" id="o-nama">
          <div>
            <p className="eyebrow">Baština i inovacija</p>
            <h2>Kamen oblikujemo za prostore koji traju.</h2>
          </div>
          <div className="intro-copy">
            <p>
              DUNOLIT spaja iskustvo tradicionalne obrade kamena s preciznošću
              suvremene CNC tehnologije. Svaki projekt vodimo kao jedinstvenu
              cjelinu, uz pažljiv odabir materijala i kontrolu svakog detalja.
            </p>
            <a className="text-link" href="#proces">
              Otkrijte naš proces <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <section className="feature-image">
          <Image
            src="/images/projekt2.jpeg"
            alt="Precizno izvedeno kameno stubište u poslovnom prostoru"
            fill
            sizes="100vw"
          />
          <div className="feature-note">
            <span>01</span>
            <p>Prirodni materijal, obrađen s mjerom i tehničkom preciznošću.</p>
          </div>
        </section>

        <section className="stats">
          <div><strong>7</strong><span>europskih tržišta</span></div>
          <div><strong>1500+</strong><span>realiziranih suradnji</span></div>
          <div><strong>90+</strong><span>vrsta kamena</span></div>
          <div><strong>360°</strong><span>podrška projektu</span></div>
        </section>

        <section className="catalog section" id="materijali">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Kolekcija</p>
              <h2>Ekskluzivni katalog materijala</h2>
            </div>
            <p>
              Od bezvremenskog mramora do izrazito otpornog granita i
              suvremenih sinteriranih površina.
            </p>
          </div>

          <div className="catalog-tools">
            <div className="filters" aria-label="Filtriraj materijale">
              {["Sve", "Mramor", "Granit", "Dekton", "Oniks"].map((type) => (
                <button
                  key={type}
                  className={activeType === type ? "active" : ""}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <label className="search">
              <Search size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Pretraži materijal..."
                aria-label="Pretraži materijal"
              />
            </label>
          </div>

          <div className="materials-grid">
            {filteredMaterials.map((material, index) => (
              <article className="material-card" key={material.name}>
                <div className="material-image">
                  <Image
                    src={material.image}
                    alt={`Uzorak materijala ${material.name}`}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                  <div className="material-index">{String(index + 1).padStart(2, "0")}</div>
                  <a href="#kontakt">Zatraži uzorak <ArrowRight size={16} /></a>
                </div>
                <div className="material-info">
                  <div>
                    <h3>{material.name}</h3>
                    <p>{material.description}</p>
                  </div>
                  <span>{material.type}<br />{material.origin}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="catalog-download">
            <div>
              <p className="eyebrow">Tehničke informacije</p>
              <h3>Cijela kolekcija, uvijek pri ruci.</h3>
            </div>
            <button className="button button-dark" type="button" onClick={downloadCatalog}>
              Preuzmi katalog PDF <Download size={17} />
            </button>
          </div>
        </section>

        <section className="projects section" id="projekti">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Odabrane realizacije</p>
              <h2>Projekti koji pokazuju karakter kamena</h2>
            </div>
            <a className="text-link" href="#kontakt">Razgovarajmo o projektu <ArrowRight size={17} /></a>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className={index === 0 ? "project-card large" : "project-card"} key={project.title}>
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 800px) 100vw, 50vw" />
                <div className="project-overlay">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.location}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="proces">
          <div className="process-intro">
            <p className="eyebrow light">Od ideje do montaže</p>
            <h2>Proces bez nepoznanica.</h2>
            <p>
              Jedan stručni tim vodi vaš projekt kroz svaki korak, uz jasnu
              komunikaciju i dokumentiranu kontrolu kvalitete.
            </p>
          </div>
          <div className="process-list">
            {process.map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="testimonial section">
          <p className="quote-mark">“</p>
          <blockquote>
            Preciznost obrade omogućila nam je realizaciju detalja koji su
            postali središnji element prostora.
          </blockquote>
          <p className="quote-author">Arhitektonski studio, Zagreb</p>
        </section>

        <section className="contact section" id="kontakt">
          <div className="contact-copy">
            <p className="eyebrow light">Započnimo razgovor</p>
            <h2>Imate projekt u planu?</h2>
            <p>
              Pošaljite osnovne informacije. Naš tim će pregledati zahtjev i
              javiti se s preporukom materijala i sljedećim koracima.
            </p>
            <div className="contact-details">
              <a href="mailto:info@dunolit.com"><Mail size={18} /> info@dunolit.com</a>
              <span><Phone size={18} /> +385 (0) 00 000 000</span>
              <span><MapPin size={18} /> Split, Hrvatska</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Ime i prezime<input required name="name" /></label>
              <label>E-mail<input required type="email" name="email" /></label>
            </div>
            <div className="form-row">
              <label>Vrsta materijala
                <select name="material" defaultValue="">
                  <option value="" disabled>Odaberite</option>
                  <option>Mramor</option><option>Granit</option>
                  <option>Dekton</option><option>Oniks</option>
                </select>
              </label>
              <label>Lokacija projekta<input name="location" /></label>
            </div>
            <label>Opišite projekt<textarea required name="message" rows={4} /></label>
            <button className="button button-light" type="submit">
              Pošalji upit <ArrowRight size={17} />
            </button>
            {submitted && (
              <p className="success"><Check size={18} /> Upit je zaprimljen. Javit ćemo vam se uskoro.</p>
            )}
          </form>
        </section>
      </main>

      <footer>
        <div>
          <a className="brand footer-brand" href="#pocetna">DUNOLIT<span>STONE CRAFT</span></a>
          <p>Prirodni kamen. Precizna izvedba. Trajna vrijednost.</p>
        </div>
        <div className="footer-links">
          <a href="#materijali">Materijali</a>
          <a href="#projekti">Projekti</a>
          <a href="#proces">Proces</a>
          <a href="#kontakt">Kontakt</a>
        </div>
        <p>© {new Date().getFullYear()} Dunolit. Sva prava pridržana.</p>
      </footer>
    </>
  );
}
