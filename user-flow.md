# Overthinker.ai User Flow

This document outlines the step-by-step journey of a user through the Overthinker.ai application.

```mermaid
graph TD
    A[Start: Landing Page] --> B{Choose Language}
    B -->|TR| C[Turkish Textarea]
    B -->|EN| D[English Textarea]
    
    C --> E[Input Thought / Feeling]
    D --> E
    
    E --> F{Input Validity Check}
    F -->|< 10 chars| G[Show Error: Min 10 chars]
    F -->|> 10 chars| H[Click "Analyze"]
    
    H --> I[Loading State: Pulse Animation + Disabled Input]
    I --> J{API Analysis (Groq AI)}
    
    J -->|Crisis Signal| K[Emergency Crisis Card]
    J -->|Non-Thought/Random| L[Guidance Message Card]
    J -->|Valid Thought| M[Result Card: Cognitive Analysis]
    
    M --> N[Detected Distortion]
    M --> O[AI Insight / Explanation]
    M --> P[Balanced Reframe]
    M --> Q[3 Specialized Practical Suggestions]
    
    K --> R[Reset / New Thought]
    L --> R
    M --> R
    R --> E
```

### Steps:

1. **Language Selection**: User sets their preferred language (Turkish/English) via the toggle in the header.
2. **Input Phase**: 
   - User types a thought that's bothering them.
   - Character counter provides real-time feedback (Yellow at 600, Red at 750).
   - Valid inputs are between 10 and 800 characters.
3. **Analysis Phase**:
   - User clicks the primary action button.
   - Textarea is disabled, and a subtle pulse animation indicates active processing.
4. **Result Phase**:
   - **Scenario A (Standard)**: AI identifies a cognitive trap, explains it gently, reframes it, and gives 3 diverse, actionable suggestions.
   - **Scenario B (Crisis)**: If self-harm or hopelessness is detected, a high-visibility support card appears with emergency contact numbers.
   - **Scenario C (Noise)**: If the input is random or not a thought, a friendly guidance message helps the user re-engage.
5. **Iteration**: User can read the results, click "Reset" or "Analyze Another Thought" to clear the state and try again.
