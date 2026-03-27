# Overthinker.ai Tech Stack

This document outlines the technologies used in Overthinker.ai and the justifications for their selection.

| Technology | Role | Justification |
| :--- | :--- | :--- |
| **Next.js 15 (App Router)** | Framework | Provides a modern, efficient, and SEO-friendly React environment with built-in API routes. |
| **Tailwind CSS v4** | Styling | Offers a highly flexible, utility-first styling system that is extremely performant and easy to maintain. |
| **Lucide-React** | Icons | Provides a clean, consistent set of icons for better UX in buttons and result cards. |
| **Groq API** | LLM Gateway | Chosen for its sub-second latency on Llama 3 models, making AI analysis feel instantaneous. |
| **Llama-3.3-70b-versatile** | Model | Balances high-level cognitive reasoning (required for CBT analysis) with speed and availability. |
| **Framer Motion** | Animations | Enables smooth, premium-feeling transitions and the subtle pulse loading states. |
| **i18next / Custom Locale Logic** | i18n | Simple yet effective multi-language support (Turkish/English) with easy-to-manage translation files. |
| **GitHub flavored Markdown** | Documentation | Used for clear, structured project documentation and diagrams. |

### Architectural Decisions

1. **Server-Side API Routes**: Used for proxying Groq requests to protect the API key and handle response sanitization.
2. **Stateless Design**: The application does not store user data (privacy-first). Analysis happens entirely in-memory and is lost upon refresh.
3. **Safety First**: Implemented custom crisis detection logic within the system prompt to redirect users to professional help when necessary.
4. **Cognitive Behavioral Therapy (CBT)**: Prompt engineering leverages evidence-based techniques from Aaron Beck, David Burns, and modern CBT applications (Woebot, Wysa).
