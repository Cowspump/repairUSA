const appliances = [
  { slug: "washer", label: "Washer", issues: ["Not draining", "Won’t spin", "Leaking", "Won’t start", "Loud noise", "Door won’t open", "Error code"] },
  { slug: "dryer", label: "Dryer", issues: ["Not heating", "Won’t start", "Drum not turning", "Takes too long to dry", "Loud noise", "Burning smell"] },
  { slug: "refrigerator", label: "Refrigerator", issues: ["Not cooling", "Freezer not freezing", "Leaking water", "Ice maker issue", "Loud noise", "Frost buildup"] },
  { slug: "dishwasher", label: "Dishwasher", issues: ["Not draining", "Not cleaning", "Leaking", "Won’t start", "Door won’t latch"] },
  { slug: "oven", label: "Oven & Range", issues: ["Not heating", "Burner won’t light", "Wrong temperature", "Door won’t open", "Gas smell"] },
  { slug: "cooktop", label: "Cooktop", issues: ["Burner won’t light", "Not heating", "Knob or touch panel issue", "Gas smell"] },
  { slug: "microwave", label: "Microwave", issues: ["Not heating", "Sparks", "Turntable stuck", "Display dead"] },
  { slug: "other", label: "Other", issues: ["Not sure", "Other issue"] }
];

let selectedAppliance = null;
let selectedIssue = "";
let currentStep = 1;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

window.addEventListener("load", () => {
  const preloader = $("#preloader");
  let progress = 0;
  const timer = setInterval(() => {
    progress += 25;
    $("#loading-value").textContent = `${Math.min(progress, 100)}%`;
    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(() => preloader.classList.add("is-hidden"), 180);
    }
  }, 100);
});

function renderAppliances() {
  $("#appliance-list").innerHTML = appliances.map((item, index) => `
    <button class="appliance-row" type="button" data-appliance="${item.slug}">
      <span class="row-icon">${index + 1}</span>
      <strong>${item.label}</strong>
      <small>${item.issues.length} issues</small>
    </button>`).join("");
  $$("#appliance-list .appliance-row").forEach((row) => row.addEventListener("click", () => chooseAppliance(row.dataset.appliance)));
}

function chooseAppliance(slug) {
  selectedAppliance = appliances.find((item) => item.slug === slug);
  selectedIssue = "";
  $$("#appliance-list .appliance-row").forEach((row) => row.classList.toggle("active", row.dataset.appliance === slug));
  $("#issue-title").textContent = "What’s the symptom?";
  $("#issue-copy").textContent = `Choose the closest match for your ${selectedAppliance.label.toLowerCase()}.`;
  $("#issue-list").innerHTML = selectedAppliance.issues.map((issue) => `<button type="button" class="issue-chip">${issue}</button>`).join("");
  $("#back-to-appliances").classList.remove("hidden");
  $$("#issue-list .issue-chip").forEach((chip) => chip.addEventListener("click", () => chooseIssue(chip)));
  $("#form-appliance").value = selectedAppliance.slug;
  renderFormIssues();
  syncTicket();
}

function chooseIssue(chip) {
  selectedIssue = chip.textContent;
  $$("#issue-list .issue-chip").forEach((item) => item.classList.toggle("active", item === chip));
  $("#form-issue").value = selectedIssue;
  syncTicket();
}

function renderFormOptions() {
  $("#form-appliance").innerHTML = `<option value="">Choose an appliance</option>${appliances.map((item) => `<option value="${item.slug}">${item.label}</option>`).join("")}`;
}

function renderFormIssues() {
  const appliance = appliances.find((item) => item.slug === $("#form-appliance").value);
  $("#form-issue").innerHTML = `<option value="">Choose the issue</option>${(appliance?.issues || []).map((issue) => `<option>${issue}</option>`).join("")}`;
  if (selectedIssue) $("#form-issue").value = selectedIssue;
}

function syncTicket() {
  $("#ticket-appliance").textContent = selectedAppliance?.label || $("#form-appliance").selectedOptions[0]?.text || "—";
  $("#ticket-issue").textContent = selectedIssue || $("#form-issue").value || "—";
  $("#ticket-zip").textContent = $("#form-zip").value || $("#hero-zip").value || "—";
  $("#ticket-time").textContent = $("#form-time").value || "—";
  $("#ticket-contact").textContent = $("#form-name").value || "—";
}

function setStep(step) {
  currentStep = step;
  $$(".form-step").forEach((panel) => panel.classList.toggle("active", Number(panel.dataset.step) === step));
  $("#progress-bar-fill").style.width = `${step / 3 * 100}%`;
  syncTicket();
}

$("#back-to-appliances").addEventListener("click", () => {
  selectedAppliance = null; selectedIssue = "";
  $$("#appliance-list .appliance-row").forEach((row) => row.classList.remove("active"));
  $("#issue-title").textContent = "Start here";
  $("#issue-copy").textContent = "Choose the appliance that needs attention. Common problems appear next.";
  $("#issue-list").innerHTML = "";
  $("#back-to-appliances").classList.add("hidden");
});

$("#form-appliance").addEventListener("change", (event) => { selectedAppliance = appliances.find((item) => item.slug === event.target.value) || null; selectedIssue = ""; renderFormIssues(); syncTicket(); });
$("#form-issue").addEventListener("change", (event) => { selectedIssue = event.target.value; syncTicket(); });
["form-zip", "form-time", "form-name", "form-phone", "form-email"].forEach((id) => $(`#${id}`).addEventListener("input", syncTicket));

$$(".next-step").forEach((button) => button.addEventListener("click", () => {
  const panel = button.closest(".form-step");
  const required = [...panel.querySelectorAll("[required]")];
  const invalid = required.find((field) => !field.value.trim());
  if (invalid) { invalid.focus(); $("#form-error").textContent = "Please fill in the required fields to continue."; return; }
  if (currentStep === 1 && !selectedAppliance) { $("#form-error").textContent = "Choose an appliance first."; return; }
  if (currentStep === 2 && !/^\d{5}$/.test($("#form-zip").value)) { $("#form-error").textContent = "Enter a 5-digit ZIP code."; return; }
  $("#form-error").textContent = ""; setStep(currentStep + 1);
}));
$$(".prev-step").forEach((button) => button.addEventListener("click", () => { $("#form-error").textContent = ""; setStep(currentStep - 1); }));

$("#booking-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const phone = $("#form-phone").value.replace(/\D/g, "");
  if (phone.length < 10) { $("#form-error").textContent = "Enter a 10-digit phone number."; $("#form-phone").focus(); return; }
  if (!$("#form-sms").checked) { $("#form-error").textContent = "Please confirm that we can contact you about this repair."; return; }
  $$(".form-step").forEach((panel) => panel.classList.remove("active"));
  $(".progress-bar").hidden = true; $("#form-error").textContent = "";
  $("#success-message").hidden = false;
});

$("#reset-form").addEventListener("click", () => { $("#booking-form").reset(); $(".progress-bar").hidden = false; $("#success-message").hidden = true; setStep(1); syncTicket(); });
$("#hero-form").addEventListener("submit", (event) => { event.preventDefault(); const zip = $("#hero-zip").value.trim(); if (!/^\d{5}$/.test(zip)) { $("#hero-zip").focus(); return; } $("#form-zip").value = zip; syncTicket(); $("#book").scrollIntoView({ behavior: "smooth" }); });
$("#issue-cta").addEventListener("click", () => { if (selectedAppliance) { $("#form-appliance").value = selectedAppliance.slug; renderFormIssues(); $("#form-issue").value = selectedIssue; } syncTicket(); });

document.querySelectorAll("[data-count]").forEach((element) => {
  const target = element.dataset.count;
  const observer = new IntersectionObserver((entries, instance) => {
    if (!entries[0].isIntersecting) return;
    let value = 0; const end = Number(target); const step = end / 30;
    const timer = setInterval(() => { value += step; if (value >= end) { value = end; clearInterval(timer); } element.textContent = target.includes(".") ? value.toFixed(1) : target === "89" ? `$${Math.round(value)}` : Math.round(value); }, 25);
    instance.disconnect();
  }, { threshold: .4 });
  observer.observe(element);
});

renderAppliances();
renderFormOptions();
renderFormIssues();

const motionTargets = [
  ...document.querySelectorAll("main section h2, main section h3, main section > p, .hero-lede, .zip-form, .hero-stage, .process-item, .number-card, .fix-image, .fix-note, .city-row, .review-track blockquote, .faq-list details, .booking-form, .ticket-card")
];
motionTargets.forEach((element, index) => {
  element.classList.add("will-animate");
  element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
});
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: .12 });
motionTargets.forEach((element) => revealObserver.observe(element));
