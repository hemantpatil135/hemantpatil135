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

<p align="center">
  <a href="#impact">⚡ Impact</a> &nbsp;·&nbsp;
  <a href="#experience">🧭 Experience</a> &nbsp;·&nbsp;
  <a href="#architecture">🏗️ Architecture</a> &nbsp;·&nbsp;
  <a href="#stack">🛠️ Stack</a> &nbsp;·&nbsp;
  <a href="#projects">📌 Projects</a> &nbsp;·&nbsp;
  <a href="#activity">🐍 Activity</a> &nbsp;·&nbsp;
  <a href="#contact">🤝 Contact</a>
</p>

> [!TIP]
> **Open to work:** full-time Software Engineer roles and selected contract work. The fastest way to reach me is [email](mailto:patilhemantsing@gmail.com).

For about five years I've built production frontends for enterprise products, including **American Express, Pearson, Axis Bank and YES Securities**. Most of my work starts at the foundation: folder structure, a shared API layer, the auth and role-based access pattern, and state management. From there I tune performance until it shows up in Lighthouse and Core Web Vitals. I was promoted to Team Leader at Koli Infotech and led a team of 6 developers.

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="impact"></a>
## ⚡ Impact

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./assets/impact-dark.svg" />
  <img alt="~40% faster Student Portal; 250K+ students served; ~55% fewer redundant API calls; ~45% faster search and filter; 100% Jest coverage on Amex features; 6 developers led" src="./assets/impact-light.svg" width="100%" />
</picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="experience"></a>
## 🧭 Experience

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/timeline-dark.svg" /><img alt="Career timeline: Koli Infotech (Nov 2021 – Feb 2025, React.js Developer to Team Leader), iauro Systems (Feb – May 2025, Software Engineer), Interstride (Jun 2025 – Sep 2026, Frontend Developer)" src="./assets/timeline-light.svg" width="100%" /></picture>

<sub>▾ Click a role for the full story.</sub>

<details>
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

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="architecture"></a>
## 🏗️ How I structure a frontend

<details>
<summary><b>▸ Click to open the diagram</b> — the pattern I set up on most projects</summary>
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

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="stack"></a>
## 🛠️ Tech stack

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://skillicons.dev/icons?i=react,nextjs,ts,js,redux,nodejs,materialui,tailwind,jest,githubactions,mongodb,mysql&theme=dark&perline=12" />
    <img alt="React, Next.js, TypeScript, JavaScript, Redux, Node.js, Material UI, Tailwind CSS, Jest, GitHub Actions, MongoDB, MySQL" src="https://skillicons.dev/icons?i=react,nextjs,ts,js,redux,nodejs,materialui,tailwind,jest,githubactions,mongodb,mysql&theme=light&perline=12" />
  </picture>
</p>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/stack-dark.svg" /><img alt="Tech stack. Frontend: React, Next.js, TypeScript, Redux Toolkit, Redux Saga, micro frontends, Context API. UI: Material UI, Tailwind CSS, Storybook, React Hook Form, Yup, Chart.js. Performance: code splitting, lazy loading, render optimization, bundle size, Lighthouse, Core Web Vitals. Quality: Jest, code review, GitHub Actions, Jenkins, GitLab CI, Bitbucket. Backend: Node.js, REST APIs, MySQL, MongoDB, MSW" src="./assets/stack-light.svg" width="100%" /></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="projects"></a>
## 📌 Featured projects

<p align="center">
  <a href="https://hemantpatil.vercel.app"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/project-portfolio-dark.svg" /><img alt="hemant-portfolio — live portfolio on Next.js 15, React 19 and TypeScript" src="./assets/project-portfolio-light.svg" width="49%" /></picture></a>
  <a href="https://github.com/hemantpatil135/multi-step-form"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/project-multi-step-form-dark.svg" /><img alt="multi-step-form — validated three-step form with an MSW mock API" src="./assets/project-multi-step-form-light.svg" width="49%" /></picture></a>
</p>
<p align="center">
  <a href="https://github.com/hemantpatil135/student-management-app"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/project-student-management-dark.svg" /><img alt="student-management-app — CRUD on MUI DataGrid with React Hook Form and Yup" src="./assets/project-student-management-light.svg" width="49%" /></picture></a>
  <a href="https://github.com/hemantpatil135/react-big-calendar"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/project-big-calendar-dark.svg" /><img alt="react-big-calendar — React Big Calendar with Chart.js drill-downs" src="./assets/project-big-calendar-light.svg" width="49%" /></picture></a>
</p>

<sub>Click a card to open it. Portfolio source: <a href="https://github.com/hemantpatil135/hemant-portfolio">hemant-portfolio</a>.</sub>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="activity"></a>
## 🐍 Contribution activity

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/hemantpatil135/hemantpatil135/output/github-snake-dark.svg" />
  <img alt="Snake animation eating my GitHub contribution graph" src="https://raw.githubusercontent.com/hemantpatil135/hemantpatil135/output/github-snake.svg" width="100%" />
</picture>

<sub>Regenerated daily by a GitHub Action.</sub>

<picture><source media="(prefers-color-scheme: dark)" srcset="./assets/divider-dark.svg" /><img alt="" src="./assets/divider-light.svg" width="100%" /></picture>

<a id="contact"></a>
## 🤝 Let's work together

I'm most useful on **React and Next.js performance**, **frontend architecture** (API layers, auth and role-based access, state) and **reusable TypeScript components**. If you're hiring, or you maintain a project in that space and could use help, open an issue or get in touch.

<a href="mailto:patilhemantsing@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="./assets/footer-dark.svg" /><img alt="Let's build something fast. Email Hemant." src="./assets/footer-light.svg" width="100%" /></picture></a>

<p align="center">
  <a href="https://hemantpatil.vercel.app"><img alt="Portfolio" src="https://img.shields.io/badge/Portfolio-0891b2?style=flat-square&logo=vercel&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/hemantpatil135/"><img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:patilhemantsing@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-7c3aed?style=flat-square&logo=gmail&logoColor=white" /></a>
  <a href="https://hemantpatil.vercel.app/Hemant_Patil_Resume.pdf"><img alt="Résumé" src="https://img.shields.io/badge/R%C3%A9sum%C3%A9-db2777?style=flat-square&logo=readdotcv&logoColor=white" /></a>
  <a href="#top"><img alt="Back to top" src="https://img.shields.io/badge/↑_Back_to_top-30363d?style=flat-square" /></a>
</p>

<!-- Animated SVGs in ./assets are generated by scripts/build-assets.mjs (node scripts/build-assets.mjs). -->
