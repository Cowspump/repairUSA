import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { AnimatedList } from "./components/react-bits/AnimatedList";
import { Reveal } from "./components/react-bits/Reveal";
import { CountingNumber } from "@animate-ui/react/primitives/texts/counting-number";
import { HighlightText } from "@animate-ui/react/primitives/texts/highlight";
import { SplittingText } from "@animate-ui/react/primitives/texts/splitting";
import { LogoMarquee } from "./components/ui/logo-marquee";
import { InfiniteMovingCards } from "./components/ui/infinite-moving-cards";
import { appliances, getIssueOptions } from "./data/appliances";
import { placeholders } from "./data/placeholders";
import { syncRepairUrl, useRepairStore } from "./store/repair-store";
import { RepairQuestionnaire } from "./components/repair-questionnaire";
import { TrustedUsers } from "./components/lightswind/trusted-users";
import { Calendar } from "./components/lightswind/calendar";
import { ApplianceSpaceScene } from "./components/hero/ApplianceSpaceScene";
import StackingCards, { StackingCardItem } from "./components/fancy/blocks/stacking-cards";
import { cn } from "./lib/utils";
import { ProcessTimeline } from "./components/process-timeline";
import { LiquidMetalButton } from "./components/ui/liquid-metal-button";
import "./styles.css";

const brandLogos = [
  ["Samsung", "https://cdn.simpleicons.org/samsung/f1efed"],
  ["LG", "https://cdn.simpleicons.org/lg/f1efed"],
  ["Whirlpool", "https://www.google.com/s2/favicons?domain=whirlpool.com&sz=128"],
  ["GE", "https://cdn.simpleicons.org/generalelectric/f1efed"],
  ["Bosch", "https://cdn.simpleicons.org/bosch/f1efed"],
  ["Maytag", "https://cdn.simpleicons.org/maytag/f1efed"],
  ["KitchenAid", "https://www.google.com/s2/favicons?domain=kitchenaid.com&sz=128"],
  ["Electrolux", "https://www.google.com/s2/favicons?domain=electrolux.com&sz=128"],
  ["Frigidaire", "https://www.google.com/s2/favicons?domain=frigidaire.com&sz=128"],
  ["Miele", "https://www.google.com/s2/favicons?domain=miele.com&sz=128"],
  ["Amana", "https://www.google.com/s2/favicons?domain=amana.com&sz=128"],
  ["Hotpoint", "https://www.google.com/s2/favicons?domain=hotpoint.com&sz=128"],
  ["Thermador", "https://www.google.com/s2/favicons?domain=thermador.com&sz=128"],
  ["Viking", "https://www.google.com/s2/favicons?domain=vikingrange.com&sz=128"],
  ["Fisher & Paykel", "https://www.google.com/s2/favicons?domain=fisherpaykel.com&sz=128"],
].map(([alt, src]) => ({ alt, src }));

function Header() {
  return <header className="site-header"><a className="brand" href="#top" aria-label="Super Master Appliance Repair home"><img src="/Assets/LOGO.png" alt="Super Master Appliance Repair" /></a><nav className="desktop-nav" aria-label="Main navigation"><a href="#repair">Repair</a><a href="#process">How it works</a><a href="#faq">FAQ</a></nav><div className="header-actions"><a className="phone-link" href="tel:+13125550123">(312) 555-0123</a><a className="button button-dark button-small" href="#book">Book a repair</a></div></header>;
}

function Hero() {
  return <section className="hero section-pad"><div className="hero-copy"><h1><SplittingText text="Our appliances, newer than ever." type="words" inView initial={{ x: 32, opacity: 0 }} /></h1><p className="hero-lede"><SplittingText text="A local repair professional for the machines that keep your home moving." type="words" inView initial={{ x: 32, opacity: 0 }} /></p><p className="form-note">Diagnostic visits from $89 · No spam, only repair help.</p></div><div className="hero-stage"><ApplianceSpaceScene /></div></section>;
}

function Brands() { return <section className="brand-strip"><div className="strip-copy">OEM brands we repair</div><LogoMarquee logos={brandLogos} /></section>; }

function MobileApplianceSelect({ appliances, selectedAppliance, onSelect }) {
  const [open, setOpen] = useState(false);
  const selected = appliances.find((item) => item.slug === selectedAppliance);

  return <MotionConfig transition={{ type: "spring", stiffness: 300, damping: 25 }}>
    <div className="mobile-appliance-select">
      <AnimatePresence mode="popLayout" initial={false}>
        {!open ? (
          <motion.button
            type="button"
            className="mobile-appliance-select-trigger"
            layout
            layoutId="mobile-appliance-select"
            whileTap={{ scale: .97 }}
            onClick={() => setOpen(true)}
            aria-expanded="false"
          >
            <span>
              <strong>{selected?.label || "Choose an appliance"}</strong>
              <small>{selected ? `${selected.issues.length} common issues` : "Start here"}</small>
            </span>
            <ChevronDown aria-hidden="true" size={20} />
          </motion.button>
        ) : (
          <motion.div
            className="mobile-appliance-select-menu"
            layout
            layoutId="mobile-appliance-select"
          >
            <div className="mobile-appliance-select-head">
              <strong>Choose an appliance</strong>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close appliance list">
                <X aria-hidden="true" size={15} />
              </button>
            </div>
            <div className="mobile-appliance-options" role="listbox" aria-label="Appliance">
              {appliances.map((item, index) => (
                <motion.button
                  key={item.slug}
                  type="button"
                  role="option"
                  aria-selected={selectedAppliance === item.slug}
                  className={`mobile-appliance-option ${selectedAppliance === item.slug ? "is-selected" : ""}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: index * .04 } }}
                  onClick={() => {
                    onSelect(item.slug);
                    setOpen(false);
                  }}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.issues.length} common issues</small>
                  </span>
                  {selectedAppliance === item.slug && <span aria-hidden="true">✓</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </MotionConfig>;
}

function RepairPicker({ selectedAppliance, selectedIssue, setAppliance, setIssue }) {
  const [mobileAppliance, setMobileAppliance] = useState(null);
  const [issueMenuOpen, setIssueMenuOpen] = useState(false);
  const [mobileIssueMenuOpen, setMobileIssueMenuOpen] = useState(false);
  const sheetCloseRef = useRef(null);
  const issueMenuRef = useRef(null);
  const appliance = appliances.find((item) => item.slug === selectedAppliance);
  const issueItems = getIssueOptions(appliance);
  const chooseAppliance = (slug) => {
    setAppliance(slug);
    setIssue("");
    syncRepairUrl({ appliance: slug, issue: "" });
  };
  const chooseIssue = (value) => {
    setIssue(value || "");
    syncRepairUrl({ appliance: selectedAppliance, issue: value || "" });
  };
  const closeMobileSheet = () => {
    setMobileAppliance(null);
    setMobileIssueMenuOpen(false);
  };
  useEffect(() => {
    if (!mobileAppliance) return undefined;
    sheetCloseRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMobileSheet();
      if (event.key === "Tab" && document.activeElement === sheetCloseRef.current) event.preventDefault();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileAppliance]);
  useEffect(() => {
    if (!issueMenuOpen) return undefined;
    const handleClickOutside = (event) => {
      if (issueMenuRef.current && !issueMenuRef.current.contains(event.target)) setIssueMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [issueMenuOpen]);
  return <section className="repair-section section-pad" id="repair"><Reveal className="section-heading split-heading"><h2>What stopped working?</h2><p>Pick the appliance first. We’ll narrow down the problem before a master calls.</p></Reveal><div className="mobile-appliance-scene" aria-label="Choose an appliance"><p className="mobile-scene-label">Tap the appliance that needs attention</p><MobileApplianceSelect appliances={appliances} selectedAppliance={selectedAppliance} onSelect={(slug) => { chooseAppliance(slug); setMobileAppliance(appliances.find((item) => item.slug === slug)); setMobileIssueMenuOpen(false); }} /></div>{mobileAppliance && <div className="mobile-sheet-backdrop" role="presentation" onClick={closeMobileSheet}><div className="mobile-sheet" role="dialog" aria-modal="true" aria-label={`${mobileAppliance.label} problem`} onClick={(event) => event.stopPropagation()}><button ref={sheetCloseRef} className="sheet-close" type="button" onClick={closeMobileSheet} aria-label="Close appliance chooser">×</button><h3>What’s the symptom?</h3><p>Choose the closest match for your {mobileAppliance.label.toLowerCase()}.</p><div className="issue-combobox mobile-issue-combobox"><button className="issue-combobox-trigger" type="button" aria-haspopup="listbox" aria-expanded={mobileIssueMenuOpen} onClick={() => setMobileIssueMenuOpen((open) => !open)}><span>{selectedIssue || "Select a problem"}</span><span className={`issue-combobox-chevron ${mobileIssueMenuOpen ? "is-open" : ""}`} aria-hidden="true">⌄</span></button>{mobileIssueMenuOpen && <div className="issue-dropdown" role="listbox" aria-label="Problem">{getIssueOptions(mobileAppliance).map((item, index) => <button key={item} className={`issue-dropdown-item ${selectedIssue === item ? "is-selected" : ""}`} type="button" role="option" aria-selected={selectedIssue === item} style={{ animationDelay: `${index * 30}ms` }} onClick={() => { chooseIssue(item); setMobileIssueMenuOpen(false); }}><span>{item}</span>{selectedIssue === item && <span aria-hidden="true">✓</span>}</button>)}</div>}</div><a className="button button-red" href="#book" onClick={closeMobileSheet}>Continue</a></div></div>}<div className="repair-picker"><AnimatedList items={appliances} active={selectedAppliance} onSelect={chooseAppliance} /><div className="issue-panel"><div className="issue-panel-top"><span className="selected-appliance-name">{appliance?.label || "Choose an appliance"}</span>{appliance && <button className="text-button" type="button" onClick={() => { setAppliance(""); setIssue(""); syncRepairUrl({ appliance: "", issue: "" }); }}>Back</button>}</div><h3>{appliance ? "What’s the symptom?" : "Start here"}</h3><p>{appliance ? `Choose the closest match for your ${appliance.label.toLowerCase()}.` : "Choose the appliance that needs attention. Common problems appear next."}</p>{appliance &&     <div className="issue-combobox" ref={issueMenuRef}>
    <div className="issue-combobox-heading">
      <span>Choose the problem</span>
      <small>Select a symptom from the list</small>
    </div>
    <button
      className="issue-combobox-trigger"
      type="button"
      aria-haspopup="listbox"
      aria-expanded={issueMenuOpen}
      onClick={() => setIssueMenuOpen((open) => !open)}
    >
      <span>{selectedIssue || "Select a problem"}</span>
      <span className={`issue-combobox-chevron ${issueMenuOpen ? "is-open" : ""}`} aria-hidden="true">⌄</span>
    </button>
    {issueMenuOpen && (
      <div className="issue-dropdown" role="listbox" aria-label="Problem">
        {issueItems.map((item, index) => (
          <button
            key={item}
            className={`issue-dropdown-item ${selectedIssue === item ? "is-selected" : ""}`}
            type="button"
            role="option"
            aria-selected={selectedIssue === item}
            style={{ animationDelay: `${index * 30}ms` }}
            onClick={() => {
              chooseIssue(item);
              setIssueMenuOpen(false);
            }}
          >
            <span>{item}</span>
            {selectedIssue === item && <span aria-hidden="true">✓</span>}
          </button>
        ))}
      </div>
    )}
  </div>}{selectedIssue === "Other (describe it)" && <input className="custom-issue" maxLength={300} required placeholder="Describe the problem" aria-label="Describe the problem" />}{appliance && <a className="button button-red issue-cta" href="#book">Continue to booking</a>}</div></div></section>;
}

function Process() { const milestones = [["01", "Pick the appliance and the problem", "Choose what needs attention and tell us the symptom."], ["02", "A master calls you back", "We confirm your ZIP, timing and the visit details."], ["03", "It’s fixed", "Your master explains the repair and gets your appliance back to normal."]].map(([date, title, description]) => ({ id: date, date, title, description })); return <section className="process-section process-timeline-section section-pad" id="process"><div className="process-intro"><span className="section-note">HOW IT WORKS</span><h2>From problem to <HighlightText text="fixed." inView /></h2><p>Three clear steps from the first symptom to a working appliance.</p></div><ProcessTimeline milestones={milestones} /></section>; }

function Numbers() { return <section className="numbers-section section-pad"><div className="number-card number-card-main"><strong><CountingNumber number={placeholders.stats.rating} decimalPlaces={1} inView /></strong><span>average rating</span></div><div className="number-card"><strong><CountingNumber number={placeholders.stats.callbackMinutes} inView delay={150} /></strong><span>min<br />typical call-back</span></div><div className="number-card"><strong><span>$</span><CountingNumber number={placeholders.stats.diagnosticPrice} inView delay={300} /></strong><span>diagnostic<br />visit from</span></div><div className="numbers-copy"><p>Clear pricing, a human call and a repair plan you can understand.</p></div></section>; }

function BookingDetails({ appliance }) {
  const issues = getIssueOptions(appliance);
  return <div className="booking-details">
    <div className="booking-detail-group">
      <h3>What’s the problem?</h3>
      <p>Choose the closest symptom, or describe your own.</p>
      <select name="issue" defaultValue="" required>
        <option value="" disabled>Select a problem</option>
        {issues.map((issue) => <option key={issue} value={issue}>{issue}</option>)}
      </select>
      <input name="issueDetails" maxLength={300} placeholder="Add a little more detail (optional)" aria-label="Additional problem details" />
    </div>
    <div className="booking-detail-group">
      <h3>Tell us a little more.</h3>
      <label>How did it happen?<select name="howItHappened" defaultValue=""><option value="">Choose an answer</option><option>Suddenly stopped</option><option>Started making noise</option><option>After a power outage</option><option>After a move or repair</option><option>Not sure</option></select></label>
      <label>When did it start?<select name="whenStarted" defaultValue=""><option value="">Choose an answer</option><option>Today</option><option>This week</option><option>Longer ago</option><option>Not sure</option></select></label>
      <label>Brand<select name="brand" defaultValue=""><option value="">Choose a brand</option><option>Samsung</option><option>LG</option><option>Whirlpool</option><option>GE</option><option>Bosch</option></select></label>
    </div>
  </div>;
}

function FixGallery() { const cards = [["bg-[#e32e37]", "Careful diagnosis first.", "We find the real problem before recommending the right repair.", "/Assets/photos/service-1.jpg"], ["bg-[#242326]", "Every brand. Every kitchen.", "Experienced help for the appliances your home depends on.", "/Assets/photos/service-2.jpg"], ["bg-[#f3f1ee] text-[#242326]", "Prepared for the details.", "The right tools, clear answers and a plan you can understand.", "/Assets/photos/service-3.jpg"], ["bg-[#b71f28]", "Back to your rhythm.", "A finished repair that gets your home moving again.", "/Assets/photos/service-4.jpg"]]; return <section className="fix-section section-pad" id="repairs"><Reveal className="section-heading"><h2>Good repairs look <HighlightText text="simple." inView /></h2><p>Clear answers, careful work and working appliances.</p></Reveal><StackingCards totalCards={cards.length} className="fix-stacking-cards">{cards.map(([background, title, description, image], index) => <StackingCardItem key={title} index={index} className="fix-stacking-card"><article className={cn("fix-stacking-card-inner", background)}><div className="fix-stacking-copy"><span className="section-note">0{index + 1} / REPAIR STANDARD</span><h3>{title}</h3><p>{description}</p></div><div className="fix-stacking-image"><img src={image} alt="" loading="lazy" /></div></article></StackingCardItem>)}</StackingCards></section>; }

function Cities() { return <section className="cities-section section-pad"><div className="cities-copy"><h2>Chicago first.</h2><p>We’re starting with neighborhoods across Chicago. Enter your ZIP to check the current service area.</p><a className="text-link" href="#book">Check my ZIP <span>↗</span></a></div><div className="city-list">{[["Chicago, IL", "Now booking"], ["Milwaukee, WI", "Coming soon"], ["Indianapolis, IN", "Coming soon"], ["Detroit, MI", "Coming soon"]].map(([city, status], index) => <button className={`city-row ${index === 0 ? "active" : ""}`} type="button" key={city}><span>{city}</span><small>{status}</small></button>)}</div></section>; }

function Reviews() {
  const items = [
    { id: 1, title: "Quick, clear, done.", description: "Our washer stopped draining on a Sunday. The call was quick, the explanation was clear.", rating: 5, tags: ["Washer"], name: "Chicago homeowner", role: "Verified customer" },
    { id: 2, title: "No guessing.", description: "I knew the diagnostic price before the master came out. No pressure, just a useful answer.", rating: 5, tags: ["Pricing"], name: "West Town renter", role: "Verified customer" },
    { id: 3, title: "Like a helpful neighbor.", description: "The whole process felt like texting someone who knows appliances and respects your time.", rating: 5, tags: ["Service"], name: "Logan Square family", role: "Verified customer" },
    { id: 4, title: "Prepared for the details.", description: "The master arrived ready with the right questions and explained the fix in plain English.", rating: 4, tags: ["Repair"], name: "Lincoln Park homeowner", role: "Verified customer" },
  ];
  return <section className="reviews-section section-pad"><Reveal className="section-heading split-heading"><h2><HighlightText text="Neighbors tell it straight." inView /></h2><p>Real stories belong in motion: pause the rail to read, then keep moving.</p></Reveal><p className="demo-marker">// TODO: replace with real reviews before launch</p><TrustedUsers avatars={["data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ffeadf'/%3E%3Ctext x='20' y='25' text-anchor='middle' font-family='Arial' font-size='14' fill='%23c2410c'%3ED1%3C/text%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ffe4d6'/%3E%3Ctext x='20' y='25' text-anchor='middle' font-family='Arial' font-size='14' fill='%23c2410c'%3ED2%3C/text%3E%3C/svg%3E", "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23ffd8c7'/%3E%3Ctext x='20' y='25' text-anchor='middle' font-family='Arial' font-size='14' fill='%23c2410c'%3ED3%3C/text%3E%3C/svg%3E"]} rating={5} totalUsersText={3} caption="Demo reviews from" className="trusted-users" /><InfiniteMovingCards items={items} speed="slow" direction="left" /></section>;
}

function FAQ() {
  const questions = [
    ["How much is a diagnostic visit?", "Diagnostic visits start at $89 in the current Chicago service area. Your master confirms the visit details before work begins."],
    ["How soon can someone call?", "Most requests receive a call within 45 minutes during service hours. For urgent issues, choose ASAP in the booking form."],
    ["What appliances do you repair?", "Washers, dryers, refrigerators, dishwashers, ovens, ranges, cooktops, microwaves and other common household appliances."],
    ["Do you cover my ZIP code?", "We currently serve Chicago and nearby neighborhoods. Add your five-digit ZIP in the form and we’ll confirm coverage before scheduling."],
    ["Is the repair guaranteed?", "Warranty details depend on the repair and part used. Your master explains what is covered on the estimate."],
    ["Can I book by phone?", <>Yes. Call <a href="tel:+13125550123">(312) 555-0123</a> and a member of the team will help.</>],
  ];

  return (
    <section className="faq-section section-pad" id="faq">
      <div className="faq-title">
        <span className="section-note">FAQ</span>
        <h2>Questions, answered.</h2>
        <p>Clear answers before you invite a master into your home.</p>
        <a className="faq-call-link" href="tel:+13125550123">
          Prefer to talk? Call (312) 555-0123 <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="faq-list">
        {questions.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary>
              <span className="faq-question-number">0{index + 1}</span>
              <span>{question}</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function BookingForm({ selectedAppliance, selectedIssue }) {
  const [step, setStep] = useState(1); const [submitted, setSubmitted] = useState(false); const [calendarOpen, setCalendarOpen] = useState(false); const [form, setForm] = useState({ appliance: selectedAppliance, issue: selectedIssue, zip: "", time: "", date: "", name: "", phone: "", sms: false }); const appliance = appliances.find((item) => item.slug === form.appliance); const update = (key, value) => setForm((current) => ({ ...current, [key]: value })); const today = new Date(); const maxDate = new Date(today); maxDate.setDate(today.getDate() + 60);
  useEffect(() => setForm((current) => ({ ...current, appliance: selectedAppliance || current.appliance, issue: selectedIssue || current.issue })), [selectedAppliance, selectedIssue]);
  const next = () => { if (step === 1 && (!form.appliance || !form.issue)) return; if (step === 2 && (!/^\d{5}$/.test(form.zip) || !form.time || !form.date)) return; setStep(step + 1); };
  return <section className="booking-section section-pad" id="book"><div className="booking-intro"><h2>Let’s get it moving.</h2><p>Leave the basics. A master will call to confirm the rest.</p><div className="trust-list"><span>Clear diagnostic pricing</span><span>Human support</span><span>No spam</span></div></div><div className="booking-layout"><form className="booking-form" onSubmit={(event) => { event.preventDefault(); const values = Object.fromEntries(new FormData(event.currentTarget).entries()); useRepairStore.getState().setAnswers({ ...values, appliance: form.appliance }); if (form.name && form.phone && form.sms) setSubmitted(true); }}><div className="progress-bar"><span style={{ width: `${submitted ? 100 : 33}%` }}></span></div>{submitted ? <div className="success-message"><span className="success-check" aria-hidden="true"></span><h3>Request received.</h3><p>A master will call you within 45 minutes during service hours.</p><button className="text-button" type="button" onClick={() => setSubmitted(false)}>Start another request</button></div> : <><BookingDetails appliance={appliance} /><div className="form-step active"><h3>Where are you?</h3><label>ZIP code<input name="zip" value={form.zip} onChange={(event) => update("zip", event.target.value.replace(/\D/g, "").slice(0, 5))} inputMode="numeric" placeholder="60601" required /></label><label>Pick a date<button className="date-trigger" type="button" onClick={() => setCalendarOpen(true)}>{form.date || "Choose a date"}</button></label>{calendarOpen && <div className="calendar-popover"><Calendar mode="single" selected={form.date ? new Date(`${form.date}T12:00:00`) : undefined} onSelect={(date) => { if (date) { const value = date.toISOString().slice(0, 10); update("date", value); useRepairStore.getState().setAnswers({ date: value }); setCalendarOpen(false); } }} disabled={{ before: today, after: maxDate }} /></div>}<label>When do you need help?<select name="time" value={form.time} onChange={(event) => update("time", event.target.value)} required><option value="">Choose a time</option><option>ASAP</option><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label></div><div className="form-step active"><h3>How should we reach you?</h3><label>Your name<input name="name" value={form.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" placeholder="Alex Morgan" required /></label><label>Phone<input name="phone" value={form.phone} onChange={(event) => update("phone", event.target.value)} type="tel" autoComplete="tel" placeholder="(312) 555-0123" required /></label><label className="checkbox-label"><input name="sms" checked={form.sms} onChange={(event) => update("sms", event.target.checked)} type="checkbox" /> I agree to receive calls or texts about this repair request.</label><div className="form-actions"><button className="button button-red" type="submit">Request a call</button></div></div></>}</form><aside className="ticket-card"><span className="ticket-label">Service ticket</span>{[["Appliance", appliance?.label], ["Problem", form.issue], ["ZIP", form.zip], ["Date", form.date], ["Timing", form.time], ["Contact", form.name]].map(([label, value]) => <div className="ticket-line" key={label}><span>{label}</span><strong>{value || "—"}</strong></div>)}<div className="ticket-bottom">A master will confirm<br />the next available time.</div></aside></div></section>;
}

function Footer() { return <footer className="site-footer"><div className="footer-top"><img src="/Assets/LOGO.png" alt="Super Master Appliance Repair" /><a className="button button-red" href="#book">Book a repair</a></div><div className="footer-bottom"><div><p>Chicago appliance repair, made human.</p><a href="tel:+13125550123">(312) 555-0123</a></div><div className="footer-links"><a href="#repair">Repair</a><a href="#faq">FAQ</a><a href="#book">Contact</a><a href="#">Privacy</a></div></div><div className="footer-wordmark">SUPER MASTER</div><p className="credits">Photography: Unsplash contributors, used as atmospheric service imagery. Replace with approved project photography before launch.</p></footer>; }

function App() { const storedAppliance = useRepairStore((state) => state.appliance); const storedIssue = useRepairStore((state) => state.issue); const setAnswers = useRepairStore((state) => state.setAnswers); const [selectedAppliance, setSelectedAppliance] = useState(storedAppliance); const [selectedIssue, setSelectedIssue] = useState(storedIssue); useEffect(() => { setAnswers({ appliance: selectedAppliance, issue: selectedIssue }); }, [selectedAppliance, selectedIssue, setAnswers]); return <><Header /><main id="top"><Hero /><Brands /><RepairPicker selectedAppliance={selectedAppliance} selectedIssue={selectedIssue} setAppliance={setSelectedAppliance} setIssue={setSelectedIssue} /><Process /><Numbers /><FixGallery /><Cities /><Reviews /><FAQ /><BookingForm selectedAppliance={selectedAppliance} selectedIssue={selectedIssue} /></main><Footer /><LiquidMetalButton label="Call us" phone="+13125550123" /></>; }

createRoot(document.getElementById("root")).render(<App />);
