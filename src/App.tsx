import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  X,
  MessageCircle,
} from "lucide-react";
import logo from "./assets/MYLOGO.webp";
import mobileBg from "./assets/MOBILEBACKGROUND.webp";
import desktopBg from "./assets/hero-team2.webp";
import fabPhoto from "./assets/Myimage.webp";
import googleLogo from "./assets/google.svg";
import googleReviews from "./assets/google-reviews.webp";
import guaranteed from "./assets/google-guaranteed.webp";
import pech from "./assets/photos/pech.webp";
import second from "./assets/photos/second.jpg";
import third from "./assets/photos/third.webp";
import four from "./assets/photos/four.webp";
import refrigerator from "./assets/tech_images/refrigerator-repair.webp";
import washer from "./assets/tech_images/washing-machine-repair.webp";
import dryer from "./assets/tech_images/dryer-repair.webp";
import oven from "./assets/tech_images/oven-repair.webp";
import dishwasher from "./assets/tech_images/dishwasher-repair.webp";

const testimonials = [
  { name: "Sarah G., Google Reviews", text: "Ali was by far the most reliable and professional. Couldn’t recommend more highly!" },
  { name: "Adam J., Google Reviews", text: "Quick visit and repaired appliance in an hour. Extremely great service and friendly technician." },
  { name: "Yasmeen S., Google Reviews", text: "Ali said everything is fine and no repairs are needed. He went with honesty and integrity." },
  { name: "Lyndsey J., Google Reviews", text: "Fast, friendly service and no hard selling for upgrades. Will be using Super Master 100%." },
  { name: "Joyce W., Google Reviews", text: "Huge shoutout to Vlad and Tony for their incredible work installing our appliance appliance." },
];

const repairStories = [
  { name: "Nathan P.", title: "Appliance repair customer - April 24, 2024", description: "GE oven and microwave, back in place after being removed for repairs.", image: pech },
  { name: "Elmhurst, IL homeowner", title: "Dryer vent cleaning", description: "Dryer vent cleaning in Elmhurst, IL. Bird nest blockage caused poor airflow, longer drying times, and fire hazard.", image: second },
  { name: "Super Master Appliance", title: "Oven repair - August 20, 2024", description: "Oven repair.", image: third },
  { name: "Super Master Appliance", title: "LG washer repair - August 21, 2024", description: "LG washer repair.", image: four },
];

const cities = [
  ["Hinsdale", 41.8009, -87.937], ["Naperville", 41.7508, -88.1535, true],
  ["Oak Brook", 41.8328, -87.9289], ["Oakbrook Terrace", 41.8598, -87.9659],
  ["Burr Ridge", 41.7489, -87.9184], ["Western Springs", 41.8125, -87.9006],
  ["Clarendon Hills", 41.7975, -87.9548], ["La Grange", 41.805, -87.8692],
  ["Downers Grove", 41.7939, -88.0104], ["Elmhurst", 41.8995, -87.9403],
  ["Lombard", 41.88, -88.0078], ["Wheaton", 41.8661, -88.107],
  ["Glen Ellyn", 41.8775, -88.067], ["Lisle", 41.8011, -88.0748],
  ["Bolingbrook", 41.6986, -88.0684], ["Plainfield", 41.6097, -88.2037],
  ["Aurora", 41.7606, -88.3201], ["Batavia", 41.85, -88.3126],
  ["St. Charles", 41.9125, -88.3087], ["Woodridge", 41.7469, -88.0503],
  ["Lemont", 41.6736, -88.0017], ["Willowbrook", 41.7698, -87.9359],
  ["Warrenville", 41.8175, -88.1734],
] as const;

function Stars({ size = 15 }: { size?: number }) {
  return <span className="stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={size} fill="#f5b301" color="#f5b301" />)}</span>;
}

function Header({ openBooking }: { openBooking: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="supermaster-nav">
        <a href="/" className="supermaster-nav-logo" aria-label="Super Master Appliance home"><img src={logo} alt="Super Master Appliance" /></a>
        <div className="supermaster-nav-links">
          <a href="#services">Services</a>
          <a href="#areas">Service Areas</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="supermaster-nav-actions">
          <a href="tel:+16266358276" className="supermaster-btn supermaster-btn--ghost supermaster-nav-call"><Phone size={16} color="#f2711f" /> Call</a>
          <button onClick={openBooking} className="supermaster-btn supermaster-btn--accent supermaster-nav-book"><CalendarDays size={16} /> Book Now</button>
          <button className="supermaster-nav-burger" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </nav>
      {open && <div className="supermaster-nav-mobile-panel"><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#areas" onClick={() => setOpen(false)}>Service Areas</a><a href="#contact" onClick={() => setOpen(false)} className="supermaster-nav-mobile-cta">Contact</a></div>}
    </>
  );
}

function Hero({ openBooking }: { openBooking: () => void }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % testimonials.length), 5500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section id="main-1" className="hero">
      <picture>
        <source media="(min-width: 1280px)" srcSet={desktopBg} />
        <img className="hero-background" src={mobileBg} alt="Super Master Appliance technicians next to a freshly serviced appliance unit" />
      </picture>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <img className="hero-logo" src={logo} alt="Super Master Appliance logo" />
        <h1 className="hero-sub">Appliance Repair in Naperville, IL &amp; Nearby Suburbs</h1>
        <p className="hero-hours">Mon–Sat: 10 AM–4 PM | Sunday: Closed</p>
        <a className="hero-phone" href="tel:+16266358276">(626) 635-8276</a>
        <div className="hero-actions">
          <a href="tel:+16266358276" className="supermaster-btn supermaster-btn--primary hero-cta"><Phone size={18} />Call Us Now</a>
          <button onClick={openBooking} className="supermaster-btn supermaster-btn--accent hero-cta"><CalendarDays size={18} />Book Now</button>
        </div>
        <div className="hero-badges">
          <a href="https://maps.app.goo.gl/gaL6f2Ckigcq4LRe8" target="_blank" rel="noopener" className="review-badge"><img src={googleLogo} alt="Google" /><b>5.0</b><Stars /><span>200+ reviews</span></a>
          <a href="https://www.google.com/search?q=Super+Master+Appliance+Naperville" target="_blank" rel="noopener" className="review-badge"><img src={googleReviews} alt="Google Reviews" /><b>5.0</b><Stars /><span>200+ reviews</span></a>
        </div>
        <div className="hero-verification">
          <span className="guaranteed"><img src={guaranteed} alt="Super Master Appliance, 5 stars" /></span>
          <span className="licensed"><ShieldCheck size={34} /><span><b>Licensed service</b><small>Verified License</small></span></span>
        </div>
      </div>
      <div className="hero-testimonial">
        <div className="hero-quote"><Stars size={13} /><p>“{testimonials[index].text}”</p><small>{testimonials[index].name}</small></div>
        <div className="hero-dots">{testimonials.map((item, i) => <span key={item.name} className={i === index ? "active" : ""} />)}</div>
      </div>
    </section>
  );
}

function TechServices() {
  const cards = [
    ["Refrigerator repair", refrigerator], ["Washer repair", washer], ["Dryer repair", dryer], ["Oven repair", oven], ["Dishwasher repair", dishwasher],
  ] as const;
  return (
    <section id="services" className="sma-tech-services">
      <div className="sma-wrap">
        <div className="sma-tech-heading"><h2>Appliance repair for the machines your home relies on</h2><p>Clear diagnostics, honest recommendations, and dependable repairs for the appliances you use every day.</p></div>
        <div className="sma-tech-grid">{cards.map(([title, src]) => <div className="sma-tech-card" key={title}><div className="sma-tech-card-info"><strong>{title}</strong><p>In-home diagnosis and repair by a trained technician.</p><a className="sma-tech-call" href="tel:+16266358276">Call</a></div><div className="sma-tech-card-visual"><img src={src} alt={title} loading="lazy" /></div></div>)}</div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  const areaIcon = L.divIcon({ className: "", html: '<div style="width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:#f2711f;border:3px solid #fff;box-shadow:0 3px 10px rgba(19,44,84,.4);display:flex;align-items:center;justify-content:center;"><span style="transform:rotate(45deg);color:#fff;font-weight:800;font-size:11px">HQ</span></div>', iconSize: [34, 34], iconAnchor: [17, 34] });
  return (
    <section id="areas" className="areas-section">
      <div className="areas-wrap">
        <div className="areas-top">
          <div className="areas-list"><h2>Areas We Serve</h2><div>{cities.map(([name]) => <span key={name}>{name}</span>)}</div></div>
          <div className="hours-card"><h3>Hours of Operation</h3><p>Monday to Sunday</p><small>7:00am to 5:00pm</small></div>
        </div>
        <MapContainer center={[41.8108, -88.06]} zoom={9} scrollWheelZoom={false} className="service-map" aria-label="Map of cities served">
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {cities.map(([name, lat, lng, hq]) => hq ? <Marker key={name} position={[lat, lng]} icon={areaIcon}><Popup><b>Super Master Appliance</b><br />Naperville, IL</Popup></Marker> : <CircleMarker key={name} center={[lat, lng]} radius={7} pathOptions={{ color: "#1173c1", weight: 2, fillColor: "#1173c1", fillOpacity: 0.45 }}><Popup><b>{name}</b><br />We serve this area</Popup></CircleMarker>)}
        </MapContainer>
      </div>
    </section>
  );
}

function RepairStories() {
  const [index, setIndex] = useState(0);
  const story = repairStories[index];
  return (
    <section className="sma-testimonial-carousel">
      <div className="sma-testimonial-wrap"><h2 className="sma-testimonial-heading">Recent repair stories</h2><div className="sma-testimonial-stage"><div className="sma-testimonial-photo"><img src={story.image} alt={story.name} /></div><article className="sma-testimonial-card"><h3>{story.name}</h3><p className="title">{story.title}</p><p className="description">{story.description}</p></article></div><div className="sma-testimonial-nav"><button onClick={() => setIndex((index - 1 + repairStories.length) % repairStories.length)} aria-label="Previous repair story"><ChevronLeft /></button><div className="sma-testimonial-dots">{repairStories.map((item, i) => <button key={item.name} className={i === index ? "active" : ""} onClick={() => setIndex(i)} aria-label={`Go to repair story ${i + 1}`} />)}</div><button onClick={() => setIndex((index + 1) % repairStories.length)} aria-label="Next repair story"><ChevronRight /></button></div></div>
    </section>
  );
}

function BookingModal({ open, close }: { open: boolean; close: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [preference, setPreference] = useState("");
  if (!open) return null;
  const valid = name.trim() && phone.replace(/\D/g, "").length === 10;
  const submit = () => {
    if (!valid) return;
    const text = [`New booking request`, `Name: ${name.trim()}`, `Phone: ${phone.trim()}`, email && `Email: ${email.trim()}`, zip && `Zip: ${zip.trim()}`, preference && `Preferred time: ${preference}`, message && `Message: ${message.trim()}`].filter(Boolean).join("\n");
    window.open(`https://wa.me/77752253606?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  return (
    <div className="booking-backdrop" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <div className="booking-dialog" role="dialog" aria-modal="true" aria-label="Book your service">
        <div className="booking-header"><div><small>Super Master Appliance</small><b>Book Online Now</b></div><button onClick={close} aria-label="Close booking form"><X size={18} /></button></div>
        <div className="booking-body"><p className="booking-title">Where should we reach you?</p><div className="booking-info"><b>We’ll call to set up a time</b><p>A technician comes out, finds the problem and quotes the repair before any work starts.</p></div><div className="time-options"><label>Better time to reach you? (optional)</label><button className={preference === "Earlier" ? "active" : ""} onClick={() => setPreference(preference === "Earlier" ? "" : "Earlier")}><b>Earlier</b><small>10am – 3pm</small></button><button className={preference === "Later" ? "active" : ""} onClick={() => setPreference(preference === "Later" ? "" : "Later")}><b>Later</b><small>3pm – 8pm</small></button></div><div className="booking-fields"><label>Name *<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label><label>Phone *<input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" /></label><label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" /></label><label>Zip code<input value={zip} onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" /></label></div><label className="booking-note">Anything else we should know?<textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)} /></label></div>
        <div className="booking-footer"><a href="tel:+16266358276"><Phone size={16} />Call us instead</a><button className="supermaster-btn supermaster-btn--accent" disabled={!valid} onClick={submit}>Book My Visit</button></div>
      </div>
    </div>
  );
}

function Footer({ openChat }: { openChat: () => void }) {
  return (
    <footer id="contact" className="footer">
      <div className="footer-wrap"><div className="footer-top"><div><img src={logo} alt="Super Master Appliance" /><p>Reliable in-home appliance repair throughout Naperville and the western suburbs of Chicago.</p></div><button onClick={openChat} className="supermaster-btn supermaster-btn--ghost">Text Us</button></div><div className="footer-contact"><h3>Contact</h3><a href="tel:+16266358276"><Phone size={16} /><span>(626) 635-8276</span></a><a href="mailto:contact@supermasterappliance.com"><Mail size={16} /><span>contact@supermasterappliance.com</span></a><span><MapPin size={16} /><span>Naperville, IL</span></span><span><Clock3 size={16} /><span>Mon–Sat: 10 AM–4 PM | Sunday: Closed</span></span></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Super Master Appliance · Serving the western suburbs of Chicago</p><p>Locally owned · Naperville, IL</p></div></div>
    </footer>
  );
}

function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("supermaster-open-chat", openChat);
    return () => window.removeEventListener("supermaster-open-chat", openChat);
  }, []);
  return (
    <div className="supermaster-fab-root">
      {open && <div className="supermaster-fab-panel"><h3>Text Super Master Appliance</h3><p>Phone</p><input value={phone} onChange={(e) => setPhone(e.target.value)} /><p>Message</p><textarea value={message} onChange={(e) => setMessage(e.target.value)} /><button className="supermaster-btn supermaster-btn--accent" onClick={() => { window.open(`https://wa.me/77752253606?text=${encodeURIComponent(`Phone: ${phone}\n${message}`)}`, "_blank"); }}>Text Me</button></div>}
      <button className="supermaster-fab-btn" onClick={() => setOpen((v) => !v)} aria-label={open ? "Close chat" : "Chat with us"}>{open ? <X /> : <img src={fabPhoto} alt="" />}</button>
    </div>
  );
}

export default function App() {
  const [booking, setBooking] = useState(false);
  const openBooking = () => setBooking(true);
  return (
    <>
      <Header openBooking={openBooking} />
      <main><Hero openBooking={openBooking} /><TechServices /><ServiceAreas /><RepairStories /></main>
      <Footer openChat={() => window.dispatchEvent(new Event("supermaster-open-chat"))} />
      <FloatingChat />
      <div className="supermaster-sticky-cta"><a href="tel:+16266358276" className="supermaster-btn supermaster-btn--primary">Call Us Now</a><button className="supermaster-btn supermaster-btn--accent" onClick={openBooking}>Book Now</button></div>
      <BookingModal open={booking} close={() => setBooking(false)} />
    </>
  );
}
