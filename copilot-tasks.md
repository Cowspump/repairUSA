# Copilot task list: UI upgrade round 2

Read this file fully before touching code. Work through the tasks in order, one at a time. After each task run `npm run build` (and lint/typecheck if configured), test in the browser at 360, 390, 768 and 1440 px, then continue. Do not start a task before the previous one builds.

## Project context (do not change)

- Site: appliance repair platform for Chicago and other US cities. Customers pick an appliance and a problem, leave ZIP + phone, a master calls back.
- Stack: React + Vite + TypeScript + Tailwind + shadcn/ui. Site language is English (US).
- Style: single LIGHT theme, Apple-like, "liquid glass" surfaces. No dark mode, no theme toggle. Design tokens already exist in `src/styles/tokens.css` (bg #FFFFFF, bg-soft #F5F5F7, glass rgba(255,255,255,.55), text #1D1D1F, muted #6E6E73, accent #FF6A2B, accent-text #C2410C). Reuse the `Glass` utility/component. Do not invent new colors.
- Mobile must be perfect (360-430px first). No horizontal scroll at 360px. Touch targets >= 44px. Input font >= 16px.
- Respect `prefers-reduced-motion` everywhere (no floating, no sliding, short fades).
- Logo already exists in the project (`public/logo.*`). Do not redraw it.
- Icons and the hero video will be added later by the owner. Keep `IconSlot` placeholders.

## Global rules for every task

1. Install via the commands given. Then OPEN the generated component file and read its real props/API before using it. If the real API differs from this document, follow the real API and note the difference in `docs/copilot-report.md`.
2. Components land in `src/components/ui/` (shadcn default). Restyle them with our tokens; do not leave their default colors if they clash with the light glass style.
3. Do not nest `backdrop-filter` layers. Max 3 glass layers per mobile screen.
4. Keep everything typed. No `any`.
5. Some text pasted from the Animate UI docs contains broken characters (for example `вЂ¦`, `вњ“`, `Г—`). That is an encoding error: use `…`, `✓`, `×`.
6. Replacements of earlier choices (the earlier plan used React Bits for some of these):
   - React Bits `CountUp` -> Animate UI `CountingNumber` (task 3)
   - React Bits `ShinyText` -> Animate UI `HighlightText` (task 5)
   - React Bits `SplitText` / `BlurText` for section headings -> Animate UI `SplittingText` (task 6)
   - React Bits `ScrollStack` / custom "How it works" -> lightswind `scroll-timeline` (task 7)
   - React Bits `LogoLoop` -> `LogoMarquee` (task 11)
   - shadcn `Calendar` -> lightswind `calendar` (task 9)
   Remove the unused React Bits files afterwards.

## Prerequisites (run once, skip what already exists)

```bash
# shadcn must be initialized (components.json exists)
npx shadcn@latest init
npm install @animate-ui/react motion react-use-measure
```

---

## Task 1. Issue picker as an animated Combobox

Where: every place where the user chooses WHICH problem the appliance has (desktop selector issue step, Contact Us step 01, `/book`). On the mobile bottom sheet, use it too if the popup works inside the sheet at 360px; if it does not, fall back to Task 4 radio cards there and write that down in the report.

Install:

```bash
npx shadcn@latest add combobox
npx @animate-ui/cli@latest animate combobox
```

Import the animated primitive from Animate UI (not from Base UI):

```tsx
import { Combobox } from '@animate-ui/react/primitives/base-ui/combobox';
```

Usage pattern (from the docs):

```tsx
<Combobox.Root items={issues}>
  <Combobox.Input aria-label="Problem" placeholder="Search or pick a problem…" />
  <Combobox.Portal>
    <Combobox.Positioner sideOffset={6}>
      <Combobox.Popup>
        <Combobox.Empty>No match. Choose "Other" and describe it.</Combobox.Empty>
        <Combobox.List>
          {(item: string) => (
            <Combobox.Item key={item} value={item}>
              {item}
              <Combobox.ItemIndicator animation="pop">✓</Combobox.ItemIndicator>
            </Combobox.Item>
          )}
        </Combobox.List>
      </Combobox.Popup>
    </Combobox.Positioner>
  </Combobox.Portal>
</Combobox.Root>
```

Built-in animation (do not re-implement): popup fade+scale from the input, staggered rows, input text swap, a highlight that glides behind the hovered/arrowed item, animated check. Highlight color comes from the item's own highlighted background (`data-highlighted:bg-accent` style classes), so set a soft accent tint there.

Requirements:
- Items come from `src/data/appliances.ts` for the chosen appliance. Always append an item `Other (describe it)`.
- Choosing `Other` reveals an inline text field (label "Describe the problem", required, max 300 chars) right under the combobox with a short height animation.
- Popup uses our glass style, radius 20px, max-height with scroll, 44px+ rows.
- Selected value goes to the zustand store and the URL query (`?appliance=...&issue=...`; for Other use `issue=other`).
- Keyboard and screen reader behavior stays as Base UI provides; do not break it.

## Task 2. "What stopped working?" mobile scene: floating icons like the screenshot

Section title: **What stopped working?**
Subtitle: **Pick the appliance first. We'll narrow down the problem before a master calls.**

On mobile, the appliance icons must look and "fly" exactly like in the screenshot `mobile_icons_prew.png` (the owner has attached it; if it is in the repo look in `docs/reference/`; if you cannot find it, STOP and ask for it).

Do this before writing code:
1. Open the screenshot and write down in `docs/copilot-report.md`: bubble size(s), shape, glass/shadow/border look, how they are scattered (positions relative to each other), label style, background, any depth/blur differences between bubbles.
2. Reproduce that look with our `Glass` style and tokens, using `IconSlot` inside each bubble until real icons arrive.
3. Floating motion: slow drift using `transform` only (via `motion` or CSS keyframes), each bubble with its own phase and period (6-9 s), small amplitude so the tap target stays under the finger. Pause when the section is off-screen (IntersectionObserver) and while the bottom sheet is open.
4. Tap: bubble squishes (scale .94), then expands into the glass bottom sheet (shared `layoutId` transition, spring stiffness 260 damping 24). The sheet content is the question flow from Task 4 (issue first, then details), then "Continue" scrolls to Contact Us step 03.
5. Each bubble is a real `<button>` with `aria-label`, tap area >= 72px. Sheet is a `dialog` with focus trap, Esc/close button/swipe down, focus returns to the bubble.
6. Reduced motion: no floating, tidy 2-column grid.
7. Test on a real phone width (360px) and check the frame rate while scrolling. If it janks, reduce blur or number of animated layers.

## Task 3. Animated counters in the trust block

The block currently shows: `4.9` / `45 min typical call-back` / `$89`. Make the numbers count up when they scroll into view.

Install (included in `@animate-ui/react`). Import:

```tsx
import { CountingNumber } from '@animate-ui/react/primitives/texts/counting-number';
```

Examples:

```tsx
<CountingNumber number={4.9} decimalPlaces={1} inView />
<CountingNumber number={45} inView />
<span>$<CountingNumber number={89} inView /></span>
```

Notes from the docs: it counts on a spring (stiffness 90, damping 50), writes to the DOM directly, shows the target immediately under reduced motion, and screen readers read the target value once. Useful props: `inView`, `inViewOnce` (default true), `delay` (stagger the three counters by 150 ms), `initiallyStable` (use on pages with many counters), `decimalPlaces`, `thousandSeparator`.
Keep the existing layout, labels and tabular numerals (set `font-variant-numeric: tabular-nums` so the layout does not jitter while counting). The values `4.9`, `45`, `$89` are placeholders: keep them in the placeholders file.

## Task 4. Questionnaire everywhere we ask about the problem and how it broke

Where: the mobile bottom sheet (issue + details), Contact Us steps 01-02, `/book`. Use the Animate UI Questionnaire wherever we ask "what's the problem", "how did it break", "when did it start", "which brand", etc.

Install:

```bash
npx shadcn@latest add questionnaire
npx @animate-ui/cli@latest animate questionnaire
```

The animated primitive is imported from `@animate-ui/react/primitives/questionnaire` (the shadcn component file imports it as `QuestionnairePrimitive`). In the app, import the parts from `@/components/ui/questionnaire`:
`Questionnaire, QuestionnaireProgress, QuestionnaireItem, QuestionnaireTitle, QuestionnaireDescription, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireInput, QuestionnaireError, QuestionnaireActions, QuestionnairePrevious, QuestionnaireSkip, QuestionnaireNext, QuestionnaireSubmit`.

Data shape (docs):

```ts
{ name, required, prompt, description,
  choices: [{ value, label, description? }],
  input?: { label, placeholder } }   // the freeform "Other" answer
```

Answers are read from `FormData` on submit (`get(name)`, `getAll(name)` for multiple).

Hard requirements:
1. EVERY question must have an "Other" option so the user can type their own answer: pass `input: { label: 'Other', placeholder: 'Type your own answer…' }` for every item. The text field must be reachable by keyboard and by touch, and must not be required unless the choice "Other" is picked.
2. Questions to build (copy in English, short): "What's the problem?" (issues of the chosen appliance), "How did it happen?" (e.g. suddenly stopped, started making noise, after a power outage, after a move/repair, not sure), "When did it start?" (today, this week, longer, not sure), "Which brand?" (Samsung, LG, Whirlpool, GE, Bosch). All with Other.
3. Do NOT add the tw-animate-css classes the shadcn example puts on `QuestionnaireItem` (`data-active:animate-in`, `fade-in-0`, `slide-in-from-bottom-2`, `duration-300`). Animate UI already animates the step, and the classes would run on top of it.
4. Keep the Questionnaire inside our glass card; progress label "Question 2 of 3" stays as the default (its numbers roll by themselves).
5. Mark questions optional where appropriate so `Skip` appears; the first question is required.
6. On submit/finish, push answers into the zustand store and continue to Contact Us step 03. Existing URL params stay in sync.
7. The Task 1 Combobox may be used for the first question if it plugs into the Questionnaire form value (it needs a `name` so FormData sees it). Check this in the installed code. If it does not work cleanly, use radio choices for question 1 inside the Questionnaire and keep the Combobox on desktop and `/book`. Document the decision in the report.

## Task 5. Highlighted accent words

Replace the old shiny/gradient accent text with Animate UI Highlight Text.

```tsx
import { HighlightText } from '@animate-ui/react/primitives/texts/highlight';

<HighlightText
  text="simple"
  className="bg-linear-to-r from-orange-100 to-orange-200 rounded-md px-1"
  inView
/>
```

Notes: the highlight IS the element's background, so style it with background classes. The background sweeps from the left over 2 s (ease-in-out); `inViewOnce` is true by default; `delay` in ms; reduced motion shows it highlighted at once. `text` is a plain string, so use it for one accent word or short phrase per heading, inline inside the heading.
Use soft tints of our accent (orange-100/200 range) so the text color `#1D1D1F` keeps contrast >= 4.5:1. Use it on 1 accent word in the hero headline and in each section heading where we had an accent word. Do not overuse: max one highlight per viewport.

## Task 6. Splitting text for extra motion

```tsx
import { SplittingText } from '@animate-ui/react/primitives/texts/splitting';

<SplittingText text="How it works" type="words" inView />
<SplittingText type="lines" text={['Line one', 'Line two']} inView />
```

Defaults: each piece fades in and slides 150px from the right over 0.7 s, staggered (0.05 s chars, 0.2 s words, 0.3 s lines). Words never break in the middle. Reduced motion = no animation. Props worth using: `type`, `stagger`, `delay`, `initial`, `animate`, `transition`, `inView`, `inViewOnce`, `disableAnimation`.

IMPORTANT for mobile: the default 150px slide can create horizontal scroll at 360px. Override `initial={{ x: 32, opacity: 0 }}` (or wrap in an `overflow-hidden` container) and verify there is no horizontal scrollbar.
Where: hero subline (`words`), H2 of each section (`words`), the final CTA line (`lines`). Not on body text, not on form labels, not on more than one element per viewport at a time.

## Task 7. "How it works" steps with lightswind Scroll Timeline

```bash
npx lightswind@latest add scroll-timeline
```

The lightswind CLI copies the component into the project. Open the generated file, read its props and expected data shape, then build our 3 steps with it:
- 01 Pick the appliance and the problem
- 02 A master calls you back
- 03 It's fixed

Restyle it to our light glass tokens (glass cards, accent line/progress, mono step numbers `01/02/03`). Keep it readable on 360px (single column, no overlapping sticky layers that hide content). Replace the previous ScrollStack/custom steps and delete the unused code. Respect reduced motion.

## Task 8. Reviews with lightswind Trusted Users

```bash
npx lightswind@latest add trusted-users
```

Open the generated component, read its props, and use it for the Reviews section (avatar group + rating/count + review cards, whatever the component offers). Adapt styling to the light glass look.
Data: we have NO real reviews yet. Use clearly fake demo data (names like "Demo Customer 1", initials avatars instead of real photos, a visible `// TODO: replace with real reviews before launch` comment) and register them in the placeholders file. Never present invented reviews as genuine on a production build: add a build-time check or a visible `{{DEMO}}` marker that is easy to grep.

## Task 9. Date picker in the order form with lightswind Calendar

```bash
npx lightswind@latest add calendar
```

Use it for "Pick a date" in Contact Us step 03 (and `/book`). Keep the quick chips (ASAP, Today, Tomorrow); "Pick a date" opens the calendar.
- Disable past dates. Allow booking only from today to +60 days (constant in one place).
- On mobile, open the calendar in a bottom sheet/drawer, not a tiny popover. On desktop a popover is fine.
- Selected date is shown on the receipt card and goes to the store and the `POST /api/leads` payload as ISO date (`YYYY-MM-DD`).
- Time window chips (Morning, Afternoon, Evening) stay next to it.
- Keyboard navigation and focus return after closing must work. Style with our tokens.

## Task 10. "Good repairs look simple." photo section

The owner pasted only the heading `Good repairs look simple.` for this task: the reference component or layout description is MISSING from the notes. Do not guess a design.
1. Check `docs/reference/` for a file about this section. If nothing is there, ask the owner to paste the component code or a screenshot.
2. Until then, build a simple placeholder: the heading (with a `HighlightText` accent on "simple"), a photo gallery area with 4-6 clearly marked placeholder images (use Unsplash stock photos of home appliances/repair that you know exist, or neutral gradient placeholders), responsive grid, lazy loading, explicit width/height to avoid layout shift.
3. Mark it in the report as "waiting for the reference".

## Task 11. Brands marquee with real brand logos (LogoMarquee)

Install dependencies (`motion` and `react-use-measure` are in the prerequisites). Create `src/components/ui/logo-marquee.tsx` with this component (our adaptations are listed below the code):

```tsx
"use client";

import React, { memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "motion/react";
import useMeasure from "react-use-measure";

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const LogoImage = memo(function LogoImage({ logo }: { logo: Logo }) {
  return (
    <img
      alt={logo.alt}
      src={logo.src}
      width={logo.width ?? "auto"}
      height={logo.height ?? "auto"}
      loading="lazy"
      className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
    />
  );
});

export const LogoMarquee = memo(function LogoMarquee({
  logos,
  className,
}: {
  logos: Logo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-7xl mx-auto overflow-hidden py-4 mask-[linear-gradient(to_right,transparent,black_25%,black_75%,transparent)]",
        className,
      )}
    >
      <InfiniteSlider gap={42} reverse duration={80} durationOnHover={25}>
        {[...logos, ...logos].map((logo, i) => (
          <LogoImage key={`${logo.alt}-${i}`} logo={logo} />
        ))}
      </InfiniteSlider>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;
```

Adaptations for our project:
1. Our site is light only: remove `dark:brightness-0 dark:invert`. Instead make logos calm: `grayscale opacity-60 hover:opacity-100 transition-opacity` (hover only on `@media (hover: hover)`).
2. Logo height: `h-5` on mobile, `h-6` on md and up, so they stay readable on phones. Keep `object-contain`.
3. Check the Tailwind version. `mask-[linear-gradient(...)]` is Tailwind v4 syntax; on v3 use an inline `style` with `maskImage`/`WebkitMaskImage`.
4. Reduced motion: when `prefers-reduced-motion` is set, do not animate; show the logos as a static wrapped row.
5. Replace the demo logos (they point to a third-party CDN) with appliance brands: Samsung, LG, Whirlpool, GE Appliances, Bosch, Frigidaire, Maytag, KitchenAid, Electrolux, Kenmore. Local files at `public/brands/{slug}.svg`, referenced as `/brands/samsung.svg`, etc. We cannot download official logos from the shell. If the files are not in `public/brands/`, ask the owner to add them (they must have the right to use each logo; keep them as "brands we repair" not as partnerships). Until they exist, render a text wordmark fallback (Inter Tight, muted color) for each brand so the marquee still works.
6. Section label above the marquee: "Brands we repair" in the mono label style.
7. Delete the old brands marquee and the React Bits `LogoLoop` code.

---

## Placeholders file

Collect every placeholder in one file, `src/data/placeholders.ts`, and list them in the final report: stats (`4.9`, `45`, `$89`), demo reviews, brand logo files, icons, hero video, `{{BRAND}}`, diagnostic price, call-back minutes, the "Good repairs look simple." photos.

## Final checklist (all must pass before the final report)

- [ ] `npm run build` passes, no TypeScript errors, no console errors
- [ ] No horizontal scroll at 360px; all targets >= 44px; inputs >= 16px
- [ ] Reduced motion tested (no floating, no sliding; counters show final numbers)
- [ ] Mobile floating-icon scene matches `mobile_icons_prew.png`, opens the sheet by touch, and the choice reaches the form
- [ ] Combobox keyboard and screen-reader behavior intact; "Other" works and reveals a text field
- [ ] Every Questionnaire question has an "Other" answer field
- [ ] Date picker blocks past dates and shows the chosen date on the receipt
- [ ] Unused React Bits components removed
- [ ] `docs/copilot-report.md` lists: what was built, differences from this document, open questions (Task 10 reference, brand logo files, mobile screenshot details), and the placeholders to replace
