# Personal Homepage Design

## Goal

Create a minimal personal homepage for Rongxuan Deng that can be served directly by GitHub Pages.

## Context

The repository currently contains only a README. The homepage should avoid build tooling and external dependencies so it can run from a plain `index.html` file.

## Approved Direction

Use a minimal single-screen card layout:

- Primary text: `Rongxuan Deng`
- Contact text: `fdeng.andrew.cmu`
- Focus area: `Reinforcement Learning`

## Architecture

The site will be a static page implemented as one `index.html` file with embedded CSS. This keeps hosting simple for GitHub Pages and avoids a package manager, framework, or build step.

## Visual Design

The page will use a quiet neutral background and a centered compact identity block. Typography should be readable on mobile and desktop, with restrained spacing and no decorative sections. The page should feel like a clean personal name card rather than a portfolio or landing page.

## Testing

Add a small local verification script that reads `index.html` and checks:

- the page exists
- the required identity text is present
- basic HTML metadata exists
- responsive viewport metadata exists

Manual verification can use a local static server or opening the file directly in a browser.
