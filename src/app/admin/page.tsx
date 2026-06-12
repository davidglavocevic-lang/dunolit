"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Eye,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./admin.module.css";

type Tab = "dashboard" | "materials" | "projects" | "inquiries" | "settings";
type AdminMaterial = { id: string; name: string; type: string; origin: string; active: boolean; image: string };
type AdminProject = { id: string; title: string; location: string; status: string; image: string };
type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  material?: string;
  location?: string;
  message: string;
  status: string;
};

const seedMaterials: AdminMaterial[] = [
  { id: "1", name: "Bianco Carrara", type: "Mramor", origin: "Italija", active: true, image: "/images/materials/bianco-carrara.png" },
  { id: "2", name: "Nero Assoluto", type: "Granit", origin: "Zimbabve", active: true, image: "/images/materials/nero-assoluto.png" },
  { id: "3", name: "Calacatta Gold", type: "Mramor", origin: "Italija", active: true, image: "/images/materials/calacatta-gold.png" },
  { id: "4", name: "Dekton Kreta", type: "Dekton", origin: "Španjolska", active: true, image: "/images/materials/dekton-kreta.png" },
  { id: "5", name: "Verde Guatemala", type: "Mramor", origin: "Indija", active: true, image: "/images/materials/verde-guatemala.png" },
  { id: "6", name: "Onyx White", type: "Oniks", origin: "Iran", active: true, image: "/images/materials/onyx-white.png" },
];

const seedProjects: AdminProject[] = [
  { id: "1", title: "Rezidencijalna kupaonica", location: "Split", status: "Završeno", image: "/images/projekt1.jpeg" },
  { id: "2", title: "Poslovno stubište", location: "Zagreb", status: "Završeno", image: "/images/projekt2.jpeg" },
  { id: "3", title: "Granitne stepenice", location: "Dubrovnik", status: "U tijeku", image: "/images/projekt3.jpeg" },
  { id: "4", title: "Kuhinja po mjeri", location: "Opatija", status: "Završeno", image: "/images/projekt4.jpeg" },
];

const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Pregled", icon: LayoutDashboard },
  { id: "materials", label: "Materijali", icon: Boxes },
  { id: "projects", label: "Projekti", icon: FolderKanban },
  { id: "inquiries", label: "Upiti", icon: Mail },
  { id: "settings", label: "Postavke", icon: Settings },
];

function readStore<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [materials, setMaterials] = useState(seedMaterials);
  const [projects, setProjects] = useState(seedProjects);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setAuthenticated(window.sessionStorage.getItem("dunolit-admin") === "true");
    setMaterials(readStore("dunolit-materials", seedMaterials));
    setProjects(readStore("dunolit-projects", seedProjects));
    setInquiries(readStore("dunolit-inquiries", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem("dunolit-materials", JSON.stringify(materials));
    window.localStorage.setItem("dunolit-projects", JSON.stringify(projects));
    window.localStorage.setItem("dunolit-inquiries", JSON.stringify(inquiries));
  }, [materials, projects, inquiries, ready]);

  const newInquiries = useMemo(() => inquiries.filter((item) => item.status === "Novo").length, [inquiries]);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") === "demo" && ["demo", "demo123"].includes(String(data.get("password")))) {
      window.sessionStorage.setItem("dunolit-admin", "true");
      setAuthenticated(true);
      setError("");
    } else {
      setError("Pogrešno korisničko ime ili lozinka.");
    }
  }

  function logout() {
    window.sessionStorage.removeItem("dunolit-admin");
    setAuthenticated(false);
  }

  function flash(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }

  if (!ready) return null;

  if (!authenticated) {
    return (
      <main className={styles.loginPage}>
        <section className={styles.loginVisual}>
          <Image src="/images/stone.jpeg" alt="" fill priority sizes="55vw" />
          <div className={styles.loginShade} />
          <div><p>DUNOLIT</p><h1>Upravljanje sadržajem i upitima.</h1></div>
        </section>
        <section className={styles.loginPanel}>
          <Link href="/" className={styles.backLink}>← Povratak na web</Link>
          <div className={styles.loginBox}>
            <p className={styles.kicker}>Administracija</p>
            <h2>Dobro došli</h2>
            <p>Prijavite se za upravljanje Dunolit platformom.</p>
            <form onSubmit={login}>
              <label>Korisničko ime<input name="username" required autoComplete="username" /></label>
              <label>Lozinka<input name="password" type="password" required autoComplete="current-password" /></label>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit">Prijava</button>
            </form>
            <div className={styles.demoNote}><strong>Demo pristup</strong><span>demo / demo123</span></div>
          </div>
        </section>
      </main>
    );
  }

  const currentLabel = nav.find((item) => item.id === tab)?.label;

  return (
    <main className={styles.admin}>
      <aside className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ""}`}>
        <div className={styles.logo}>DUNOLIT<span>ADMIN CONSOLE</span></div>
        <nav>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button key={item.id} className={tab === item.id ? styles.activeNav : ""} onClick={() => { setTab(item.id); setMobileNav(false); }}>
                <Icon size={19} />{item.label}
                {item.id === "inquiries" && newInquiries > 0 && <em>{newInquiries}</em>}
              </button>
            );
          })}
        </nav>
        <div className={styles.sidebarBottom}>
          <Link href="/"><Eye size={18} /> Pogledaj web</Link>
          <button onClick={logout}><LogOut size={18} /> Odjava</button>
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <button className={styles.mobileMenu} onClick={() => setMobileNav((value) => !value)}>{mobileNav ? <X /> : <Menu />}</button>
          <div><span>Administracija</span><h1>{currentLabel}</h1></div>
          <div className={styles.profile}><span>AD</span><div><strong>Admin Dunolit</strong><small>Demo korisnik</small></div></div>
        </header>

        <div className={styles.content}>
          {notice && <div className={styles.notice}><CheckCircle2 size={18} />{notice}</div>}

          {tab === "dashboard" && (
            <>
              <div className={styles.pageIntro}><div><p className={styles.kicker}>Dnevni pregled</p><h2>Dobro došli natrag.</h2></div><p>Brzi pregled sadržaja, projekata i novih zahtjeva klijenata.</p></div>
              <div className={styles.stats}>
                <Stat icon={Boxes} label="Materijali" value={materials.length} note={`${materials.filter((item) => item.active).length} aktivno`} />
                <Stat icon={FolderKanban} label="Projekti" value={projects.length} note="Portfolio" />
                <Stat icon={Mail} label="Novi upiti" value={newInquiries} note={`${inquiries.length} ukupno`} />
                <Stat icon={BarChart3} label="Mjesečne posjete" value="1.2k" note="+18% ovaj mjesec" />
              </div>
              <div className={styles.dashboardGrid}>
                <section className={styles.panel}>
                  <div className={styles.panelHead}><div><p className={styles.kicker}>Najnovije</p><h3>Upiti klijenata</h3></div><button onClick={() => setTab("inquiries")}>Prikaži sve</button></div>
                  {inquiries.length === 0 ? <Empty text="Još nema zaprimljenih upita." /> : inquiries.slice(0, 4).map((item) => <InquiryRow key={item.id} item={item} />)}
                </section>
                <section className={styles.quickPanel}>
                  <p className={styles.kicker}>Brze radnje</p><h3>Uredite sadržaj</h3>
                  <button onClick={() => setTab("materials")}><Plus size={17} /> Dodaj materijal</button>
                  <button onClick={() => setTab("projects")}><Plus size={17} /> Dodaj projekt</button>
                  <button onClick={() => setTab("inquiries")}><Mail size={17} /> Obradi upite</button>
                </section>
              </div>
            </>
          )}

          {tab === "materials" && (
            <CrudSection title="Katalog materijala" description="Dodajte materijale i odredite koji su aktivni na javnoj stranici.">
              <form className={styles.inlineForm} onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                setMaterials((items) => [...items, { id: crypto.randomUUID(), name: String(data.get("name")), type: String(data.get("type")), origin: String(data.get("origin")), active: true, image: "/images/materials/bianco-carrara.png" }]);
                event.currentTarget.reset(); flash("Materijal je dodan.");
              }}>
                <input required name="name" placeholder="Naziv materijala" />
                <select name="type"><option>Mramor</option><option>Granit</option><option>Dekton</option><option>Oniks</option></select>
                <input required name="origin" placeholder="Podrijetlo" />
                <button><Plus size={17} /> Dodaj</button>
              </form>
              <div className={styles.table}>
                {materials.map((item) => (
                  <div className={styles.tableRow} key={item.id}>
                    <Image src={item.image} alt="" width={58} height={58} />
                    <div className={styles.rowTitle}><strong>{item.name}</strong><span>{item.type} · {item.origin}</span></div>
                    <label className={styles.switch}><input type="checkbox" checked={item.active} onChange={() => setMaterials((items) => items.map((entry) => entry.id === item.id ? { ...entry, active: !entry.active } : entry))} /><span /></label>
                    <button className={styles.delete} aria-label="Obriši" onClick={() => setMaterials((items) => items.filter((entry) => entry.id !== item.id))}><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>
            </CrudSection>
          )}

          {tab === "projects" && (
            <CrudSection title="Upravljanje projektima" description="Održavajte portfolio realizacija i njihov trenutačni status.">
              <form className={styles.inlineForm} onSubmit={(event) => {
                event.preventDefault(); const data = new FormData(event.currentTarget);
                setProjects((items) => [...items, { id: crypto.randomUUID(), title: String(data.get("title")), location: String(data.get("location")), status: "Planirano", image: "/images/projekt1.jpeg" }]);
                event.currentTarget.reset(); flash("Projekt je dodan.");
              }}>
                <input required name="title" placeholder="Naziv projekta" />
                <input required name="location" placeholder="Lokacija" />
                <button><Plus size={17} /> Dodaj projekt</button>
              </form>
              <div className={styles.table}>
                {projects.map((item) => (
                  <div className={styles.tableRow} key={item.id}>
                    <Image src={item.image} alt="" width={58} height={58} />
                    <div className={styles.rowTitle}><strong>{item.title}</strong><span>{item.location}</span></div>
                    <select value={item.status} onChange={(event) => setProjects((items) => items.map((entry) => entry.id === item.id ? { ...entry, status: event.target.value } : entry))}><option>Planirano</option><option>U tijeku</option><option>Završeno</option></select>
                    <button className={styles.delete} onClick={() => setProjects((items) => items.filter((entry) => entry.id !== item.id))}><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>
            </CrudSection>
          )}

          {tab === "inquiries" && (
            <CrudSection title="Upiti klijenata" description="Pregledajte poruke s javne stranice i pratite status obrade.">
              {inquiries.length === 0 ? <Empty text="Novi upiti s kontakt forme pojavit će se ovdje." /> : (
                <div className={styles.inquiryList}>{inquiries.map((item) => (
                  <article className={styles.inquiryCard} key={item.id}>
                    <div><span>{new Date(item.createdAt).toLocaleDateString("hr-HR")}</span><h3>{item.name}</h3><a href={`mailto:${item.email}`}>{item.email}</a></div>
                    <div><strong>{item.material || "Opći upit"}</strong><p>{item.message}</p><small>{item.location}</small></div>
                    <select value={item.status} onChange={(event) => setInquiries((items) => items.map((entry) => entry.id === item.id ? { ...entry, status: event.target.value } : entry))}><option>Novo</option><option>U obradi</option><option>Odgovoreno</option><option>Zatvoreno</option></select>
                    <button className={styles.delete} onClick={() => setInquiries((items) => items.filter((entry) => entry.id !== item.id))}><Trash2 size={17} /></button>
                  </article>
                ))}</div>
              )}
            </CrudSection>
          )}

          {tab === "settings" && (
            <CrudSection title="Postavke web stranice" description="Osnovni kontaktni i poslovni podaci.">
              <form className={styles.settingsForm} onSubmit={(event) => { event.preventDefault(); flash("Postavke su spremljene."); }}>
                <label>Kontakt email<input defaultValue="info@dunolit.com" type="email" /></label>
                <label>Telefon<input defaultValue="+385 (0) 00 000 000" /></label>
                <label>Lokacija<input defaultValue="Split, Hrvatska" /></label>
                <label>SEO naslov<input defaultValue="Dunolit | Majstorstvo u kamenu" /></label>
                <button><Save size={17} /> Spremi postavke</button>
              </form>
            </CrudSection>
          )}
        </div>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value, note }: { icon: typeof Boxes; label: string; value: string | number; note: string }) {
  return <article className={styles.stat}><Icon size={22} /><span>{label}</span><strong>{value}</strong><small>{note}</small></article>;
}
function CrudSection({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <><div className={styles.pageIntro}><div><p className={styles.kicker}>Dunolit CMS</p><h2>{title}</h2></div><p>{description}</p></div><section className={styles.panel}>{children}</section></>;
}
function Empty({ text }: { text: string }) { return <div className={styles.empty}><Mail size={28} /><p>{text}</p></div>; }
function InquiryRow({ item }: { item: Inquiry }) {
  return <div className={styles.inquiryRow}><span>{item.name?.slice(0, 1) || "?"}</span><div><strong>{item.name}</strong><small>{item.message}</small></div><em>{item.status}</em></div>;
}
