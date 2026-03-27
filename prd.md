# Overthinker**.ai** — Product Requirements Document

> **Version:** 1.0 · **Type:** Web Application · **Stage:** MVP
> *Think clearer, not harder.*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Target Audience](#3-target-audience)
4. [Tech Stack](#4-tech-stack)
5. [Landing Page — UI/UX Spec](#5-landing-page--uiux-spec)
6. [Core Features & User Stories](#6-core-features--user-stories)
7. [Demo Section Spec](#7-demo-section-spec)
8. [Ethical Framework](#8-ethical-framework)
9. [MVP Success Criteria](#9-mvp-success-criteria)
10. [Pitch Deck Script](#10-pitch-deck-script)
11. [Roadmap](#11-roadmap)

---

## 1. Executive Summary

### What is Overthinker.ai?

Overthinker.ai is a web-based AI tool that helps users spot **cognitive distortions** — patterns of biased or irrational thinking — in their own words.

The user writes a thought → the AI detects traps like catastrophizing or overgeneralization → explains them gently → offers a balanced reframe.

**No diagnosis. No judgment. Just clarity.**

### Why does it matter?

We all have distorted thoughts — the kind that feel 100% true in the moment but are actually skewed by cognitive bias. Most people never learn to see their own thinking patterns. Overthinker.ai acts as a mirror: it shows you what's happening in your mind, in plain language, without any pressure.

---

## 2. Product Vision & Goals

### Vision

> A world where people can see their own thinking clearly — not through a therapist's office, but through a tool they can reach for in any moment of doubt.

### Goals — MVP

| Goal | Description |
|------|-------------|
| 🎯 **Core loop works end-to-end** | User submits a thought → AI returns: detected trap, insight, reframe |
| 🎨 **Design feels premium & trustworthy** | Dark mode, purple/blue palette, minimal layout — not clinical, not toy-like |
| 📣 **Pitch-ready** | A demo section that visually convinces investors and users in under 30 seconds |
| 🔐 **Ethically grounded** | Clear disclaimer: this is a thinking tool, not a diagnostic tool |

---

## 3. Target Audience

### Primary Users
Students, young professionals (18–35), people prone to anxiety or negative self-talk who are curious about their thought patterns.

### Secondary Users
Coaches, therapists, educators who want a lightweight digital tool to introduce cognitive reframing concepts.

### User Persona

> **"Ayla" — 22-year-old university student**
>
> She failed an exam and spiraled into *"I'm just not smart."* She doesn't have access to a therapist but wants to understand her thinking. She finds Overthinker.ai, types her thought, and within seconds sees: **Catastrophizing detected.** A reframe appears. She feels seen, not judged.

---

## 4. Tech Stack

### Recommended Stack (MVP)

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Frontend** | Next.js + Tailwind CSS | Fast, SEO-friendly, easy to deploy on Vercel |
| **Fonts** | Inter / Poppins (Google Fonts) | Modern, clean — matches the design brief |
| **AI Layer** | OpenAI API (GPT-4o-mini) | Sufficient for cognitive pattern recognition at low cost |
| **Backend** | Next.js API Routes | No separate server needed for MVP |
| **Database** | None (MVP) / Supabase (v2) | MVP is stateless; v2 adds user history |
| **Hosting** | Vercel | Free tier, instant deploys, edge functions |
| **Analytics** | Posthog or Plausible | Privacy-friendly, lightweight |

---

## 5. Landing Page — UI/UX Spec

### Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#7C3AED` | CTA buttons, accent text, logo `.ai` suffix |
| `--color-secondary` | `#3B82F6` | Links, trust signals, secondary buttons |
| `--color-bg` | `#0F172A` | Page background (dark mode) |
| `--color-surface` | `#1E293B` | Cards, input boxes |
| `--color-success` | `#22C55E` | Reframe output, positive states |
| `--color-text` | `#F8FAFC` | Primary body text |
| `--color-muted` | `#94A3B8` | Labels, placeholders, captions |
| `--font-heading` | `Poppins 700` | Hero title, section headings |
| `--font-body` | `Inter 400/500` | All body copy, inputs, buttons |

> The page is a **single-page app (SPA)**. No routing required for v1.

---

### Section 1 — Hero

**Navbar**
Logo left (`Overthinker` in white + `.ai` in `#7C3AED`), no nav links for MVP.

**Headline**
```
Overthinker.ai
```
- `Overthinker` → `font-weight: 700`, `color: #F8FAFC`
- `.ai` → `font-weight: 300`, `color: #7C3AED`

**Sub-headline**
```
Think clearer, not harder.
```
Slightly smaller, muted color, italic or light weight.

**Description**
```
Spot thinking traps, challenge biased thoughts, and see your mind more clearly with AI.
```
Body size, muted color (`#94A3B8`).

**Input Box**
- Placeholder: `"Write what's on your mind…"`
- Large `<textarea>`, dark surface bg (`#1E293B`)
- Purple focus ring, `border-radius: 16px`
- Min 10 chars / Max 800 chars, character counter shown

**CTA Button**
```
Analyze My Thought
```
- Full width on mobile, centered on desktop
- Background: gradient `#7C3AED → #3B82F6`
- Bold text, hover: slight brightness lift

---

### Section 2 — Feature Section

3 cards in a row (desktop) / stacked (mobile). Dark surface background.

| Icon | Feature | Description |
|------|---------|-------------|
| 🔍 | **Detect Thinking Traps** | Finds patterns like overgeneralization, catastrophizing, and mind reading. |
| 💬 | **Explain Without Judging** | Gentle, human-like explanations — no labels, no pressure. |
| 🔄 | **Reframe Your Thoughts** | Turns negative or biased thinking into balanced perspectives. |

---

### Section 3 — Demo Section

> ⚡ **Critical.** This section must work without any API call — use hardcoded examples.

**User Input:**
```
"I failed this exam, I'm just not smart."
```

**AI Output Card:**
```
🧠 Detected: Catastrophizing

💬 Insight:
   This thought turns a single event into a global judgment about your intelligence.

🔄 Reframe:
   "This exam didn't go well, but it doesn't define my intelligence."
```

Render as a **card UI component** with:
- Trap name as a pill/badge in purple
- Insight in a soft gray block
- Reframe in a green-tinted block (`#22C55E`)

---

## 6. Core Features & User Stories

### F-01: Thought Input

> *As a user, I want to type a thought freely so that I can submit it for analysis without friction.*

| Key | Detail |
|-----|--------|
| **Acceptance Criteria** | Textarea accepts min 10 / max 800 chars. Character counter shown. Submit disabled if empty. |
| **Edge Cases** | Empty submit shows inline error. Very long input truncated with user warning. Non-English input accepted. |
| **UI States** | Default → Focused (purple border) → Loading (spinner) → Result shown below |

---

### F-02: AI Analysis

> *As a user, I want to receive a structured analysis of my thought — trap detected, why it matters, how to reframe.*

The AI prompt must return **exactly three fields**:

| Field | Description |
|-------|-------------|
| `trap_name` | The specific cognitive distortion (e.g., *Catastrophizing*, *All-or-Nothing Thinking*) |
| `insight` | Gentle, non-judgmental explanation of why this thought pattern is distorted |
| `reframe` | A balanced, alternative perspective phrased in first person |

> **Prompt Engineering Note:** System prompt must emphasize — no clinical language, no diagnosis, gentle tone, max 2 sentences per field. `temperature: 0.4` for consistency.

---

### F-03: Result Display

> *As a user, I want to see the result as a clean card, not a wall of text.*

Output card must contain:
- **Trap badge** — Pill component in purple with trap name
- **Insight block** — Soft gray card with 💬 and insight text
- **Reframe block** — Green-tinted card with 🔄 and reframe text
- **Reset button** — *"Analyze another thought"* clears input and result

---

### F-04: Ethical Disclaimer

> *As a user, I want to be reminded that this is not a mental health tool.*

Disclaimer text (must appear below input AND in footer):

```
This tool does not diagnose or replace professional help.
It is designed to support awareness, not judgment.
```

Render in muted color (`#94A3B8`), small font, always visible.

---

## 7. Demo Section Spec

> This section is the most persuasive element of the landing page. It must work even without an API call.

**Implementation:** Pre-bake 3 example thoughts with their AI outputs. Cycle through them with a *"Try an example"* button. User can also type their own and hit Analyze for a live call.

Section label: `"See it in action"`

### 3 Built-in Demo Examples

**Example 1**
```
Input:   "I failed this exam, I'm just not smart."
Trap:    Catastrophizing
Reframe: "One exam doesn't define my intelligence."
```

**Example 2**
```
Input:   "Nobody ever listens to me."
Trap:    Overgeneralization
Reframe: "Some conversations feel unheard, but that's not true of everyone."
```

**Example 3**
```
Input:   "I know they think I'm weird."
Trap:    Mind Reading
Reframe: "I can't know what others think without actually asking them."
```

---

## 8. Ethical Framework

### Non-Negotiable Principles

1. Never claim to diagnose
2. Never store user thoughts beyond the session (MVP)
3. Always show the disclaimer
4. AI output must always be framed as a **perspective**, not a fact
5. Do not gamify or create streaks — this is not a habit app

### What We Are vs. What We Are Not

| ✅ What we ARE | ❌ What we are NOT |
|---------------|------------------|
| A cognitive mirror | A therapy replacement |
| A thinking companion | A diagnostic tool |
| An awareness tool | A mood tracker |
| | A journaling app |

---

## 9. MVP Success Criteria

| Metric | Target | Priority |
|--------|--------|----------|
| AI response returned in < 3 seconds | 100% of calls | **P0** |
| Landing page loads in < 2s on mobile | Lighthouse > 85 | **P0** |
| Demo section works without API key | Always | **P0** |
| Disclaimer visible on every screen | 100% | **P0** |
| User completes analysis without errors | > 90% success rate | **P1** |
| Mobile responsiveness | Works on iOS Safari & Android Chrome | **P1** |
| At least 3 cognitive traps detected in testing | Pass | **P1** |

---

## 10. Pitch Deck Script

*7 slides. Each includes the headline, spoken script, and visual direction.*

---

### Slide 1 — Hook

> *"People don't just have problems — they have distorted ways of thinking about those problems."*

**Visual:** Full-screen dark background, single sentence centered. No logo yet. Let it breathe.

---

### Slide 2 — Problem

> *"We all make cognitive mistakes — overgeneralizing, catastrophizing, assuming the worst.*
> *And the biggest issue? We think those thoughts are true."*

**Visual:** Show 3 example distorted thoughts floating on screen. No labels. Let the audience recognize themselves.

---

### Slide 3 — Solution

> *"Overthinker.ai acts like a mirror for your mind.*
> *It doesn't judge — it helps you see your thoughts clearly."*

**Visual:** Introduce the logo. Animate the word *"mirror"* — show a thought going in, a reframe coming out.

---

### Slide 4 — How It Works

> *"You write a thought → AI detects patterns → explains them → and offers a balanced alternative."*

**Visual:** 3-step horizontal flow diagram. Minimalist. Each step in a circle connected by arrows.

---

### Slide 5 — Why It's Different

> *"Most apps track behavior.*
> *We analyze thinking itself."*

**Visual:** Side-by-side comparison. Left: competitors track symptoms. Right: Overthinker.ai addresses the root cognitive pattern.

---

### Slide 6 — Impact

> *"Better thinking → better decisions → better lives."*

**Visual:** Stat on screen — *"1 in 3 adults experience anxiety driven by distorted thinking."* (Source: APA). Then fade to the 3-step impact chain.

---

### Slide 7 — Close

> *"We call it Overthinker.ai — because that's where it starts.*
> *But what we really improve… is how people think."*

**Visual:** Full-screen logo. Tagline below: *"Think clearer, not harder."* Contact / QR code. Silence. Let it land.

---

## 11. Roadmap

| Phase | Timeline | Deliverables |
|-------|----------|-------------|
| **v0 — Prototype** | Week 1–2 | Landing page, hardcoded demo, no real API. HTML/CSS/JS or Next.js skeleton. |
| **v1 — MVP** | Week 3–4 | Live OpenAI integration, real analysis, mobile responsive, deployed to Vercel. |
| **v2 — Growth** | Month 2 | User accounts (Supabase), thought history, share-a-reframe feature. |
| **v3 — Monetize** | Month 3+ | Pro tier: unlimited history, team mode for coaches, API for third-party integrations. |

---

> *This document does not constitute a medical or therapeutic product specification.*
> **Overthinker.ai** · PRD v1.0 · Confidential