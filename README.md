<a href="https://hemantpatil.vercel.app">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/hero-dark.svg" />
    <img alt="Hemant Patil — Software Engineer, frontend-focused. React, Next.js, TypeScript. Frontend architecture and performance." src="./assets/hero-light.svg" width="100%" />
  </picture>
</a>

<p align="center">
  <a href="https://hemantpatil.vercel.app"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-hemantpatil.vercel.app-0891b2?style=for-the-badge&logo=vercel&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/hemantpatil135/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:patilhemantsing@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-Say%20hi-7c3aed?style=for-the-badge&logo=gmail&logoColor=white" /></a>
  <a href="https://hemantpatil.vercel.app/Hemant_Patil_Resume.pdf"><img alt="Résumé" src="https://img.shields.io/badge/R%C3%A9sum%C3%A9-PDF-db2777?style=for-the-badge&logo=readdotcv&logoColor=white" /></a>
</p>

> [!TIP]
> **Open to work:** full-time Software Engineer roles and selected contract work. The fastest way to reach me is [email](mailto:patilhemantsing@gmail.com).

For about five years I've built production frontends for enterprise products, including **American Express, Pearson, Axis Bank and YES Securities**. Most of my work starts at the foundation: folder structure, a shared API layer, the auth and role-based access pattern, and state management. From there I tune performance until it shows up in Lighthouse and Core Web Vitals. I was promoted to Team Leader at Koli Infotech and led a team of 6 developers.

## ⚡ Impact

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/impact-dark.svg" />
  <img alt="~40% faster Student Portal; 250K+ students served; ~55% fewer redundant API calls; ~45% faster search and filter; 100% Jest coverage on Amex features; 6 developers led" src="./assets/impact-light.svg" width="100%" />
</picture>

## 🧭 Experience

<sub>Click a role to expand it.</sub>

<details open>
<summary><b>Interstride</b> · Frontend Developer · <i>Jun 2025 – Sep 2026</i></summary>
<br />

- Set up the folder structure, shared API layer, auth pattern and Redux Toolkit state layer for **4 role-based portals** used by **550+ universities** and **7 user roles**.
- Made the Student Portal **~40% faster** for **250,000+ students** with route-level lazy loading, fewer re-renders and a smaller bundle.
- Cut redundant API calls by **~55%** and made search and filter **~45% faster** with debounced search, sorting and pagination.
- Owned code review, CI/CD and frontend architecture for a team of 8.

</details>

<details>
<summary><b>iauro Systems</b> · Software Engineer · client: YES Securities · <i>Feb – May 2025</i></summary>
<br />

- Built independently deployable modules on a **React micro-frontend** architecture.
- Built a **Material UI component library** documented in **Storybook**.

</details>

<details>
<summary><b>Koli Infotech</b> · React.js Developer → Team Leader · <i>Nov 2021 – Feb 2025</i></summary>
<br />

- Promoted to **Team Leader** within two years; led 6 remote developers across enterprise engagements for **American Express, Pearson and Axis Bank**.
- **American Express:** built the hotel cancellation and refund modules with Redux Saga, with **100% Jest coverage** on every feature I owned.
- Built the company website and the Pearson project on **Next.js**.

</details>

<sub>Client and employer code is under NDA and isn't on GitHub. The repos below are my own.</sub>

## 🏗️ How I structure a frontend

<details>
<summary>The pattern I set up on most projects (click to view the diagram)</summary>
<br />

```mermaid
flowchart LR
  subgraph App["React / Next.js app"]
    R["Routes<br/>lazy-loaded per role"] --> F["Feature modules"]
    F --> S[("State<br/>Redux Toolkit · Saga")]
    F --> A["Shared API layer<br/>one client · typed services"]
    G["Auth + role-based<br/>access guard"] --> R
    DS["Design system<br/>MUI · Storybook"] --> F
  end
  A --> B[("REST APIs")]
  CI["CI/CD<br/>lint · Jest · build · deploy"] -.-> App
```

**Why it works:** each feature owns its UI, state slice and service calls, so teams ship in parallel. All network traffic goes through one API layer, which makes auth, error handling and request de-duplication a single change. Role-based routing keeps every portal's bundle small.

</details>

## 🛠️ Tech stack

<p>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=react,nextjs,ts,js,redux,nodejs,materialui,tailwind,jest,githubactions,mongodb,mysql&theme=dark&perline=12" />
    <img alt="React, Next.js, TypeScript, JavaScript, Redux, Node.js, Material UI, Tailwind CSS, Jest, GitHub Actions, MongoDB, MySQL" src="https://skillicons.dev/icons?i=react,nextjs,ts,js,redux,nodejs,materialui,tailwind,jest,githubactions,mongodb,mysql&theme=light&perline=12" />
  </picture>
</p>

| Area | What I use |
|---|---|
| **Frontend** | React, Next.js (App Router), TypeScript, Redux Toolkit / Saga, Context API, micro frontends, Storybook |
| **Performance** | Code splitting, lazy loading, render optimization, bundle size, Lighthouse and Core Web Vitals |
| **Quality and delivery** | Jest, code review, CI/CD with GitHub Actions, Jenkins, GitLab CI and Bitbucket Pipelines |
| **Backend and data** | Node.js, REST APIs, MySQL, MongoDB |

## 📌 Featured projects

<table>
<tr>
<td width="50%" valign="top">

### [hemant-portfolio](https://github.com/hemantpatil135/hemant-portfolio)
[**▶ Live site**](https://hemantpatil.vercel.app)

My portfolio. Includes a dynamic Open Graph image, JSON-LD, a sitemap, a validated contact API route and lazy-loaded 3D scenes that respect `prefers-reduced-motion`.

![Next.js](https://img.shields.io/badge/Next.js_15-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white)

</td>
<td width="50%" valign="top">

### [multi-step-form](https://github.com/hemantpatil135/multi-step-form)

A three-step form with per-field validation, a mock API built on MSW and routing with React Router.

![Vite](https://img.shields.io/badge/Vite-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-0f172a?logo=tailwindcss&logoColor=38bdf8)
![MSW](https://img.shields.io/badge/MSW-ff6a33?logo=mockserviceworker&logoColor=white)

</td>
</tr>
<tr>
<td width="50%" valign="top">

### [student-management-app](https://github.com/hemantpatil135/student-management-app)

A CRUD app on Material UI and MUI X DataGrid, with forms built on React Hook Form and Yup and a set of reusable form controls.

![MUI](https://img.shields.io/badge/MUI-007fff?logo=mui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-ec5990?logo=reacthookform&logoColor=white)

</td>
<td width="50%" valign="top">

### [react-big-calendar](https://github.com/hemantpatil135/react-big-calendar)

A machine-coding exercise: React Big Calendar with Chart.js drill-down dialogs.

![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb)
![Chart.js](https://img.shields.io/badge/Chart.js-ff6384?logo=chartdotjs&logoColor=white)

</td>
</tr>
</table>

## 🐍 Contribution activity

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/hemantpatil135/hemantpatil135/output/github-snake-dark.svg" />
  <img alt="Snake animation eating my GitHub contribution graph" src="https://raw.githubusercontent.com/hemantpatil135/hemantpatil135/output/github-snake.svg" width="100%" />
</picture>

<sub>Regenerated daily by a GitHub Action.</sub>

## 🤝 Let's work together

I'm most useful on **React and Next.js performance**, **frontend architecture** (API layers, auth and role-based access, state) and **reusable TypeScript components**. If you're hiring, or you maintain a project in that space and could use help, open an issue or get in touch.

<p align="center">
  <a href="https://hemantpatil.vercel.app">Portfolio</a> ·
  <a href="https://www.linkedin.com/in/hemantpatil135/">LinkedIn</a> ·
  <a href="mailto:patilhemantsing@gmail.com">Email</a> ·
  <a href="https://hemantpatil.vercel.app/Hemant_Patil_Resume.pdf">Résumé (PDF)</a>
</p>

<!-- Animated SVGs in ./assets are generated by scripts/build-assets.mjs (node scripts/build-assets.mjs). -->
