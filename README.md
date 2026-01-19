<div align="center">
  <a href="https://github.com/joschka-w/pocket-dex">
    <img src="assets/logo.svg" width="80" height="80" />
  </a>
  <h3 align="center">PocketDex</h3>
  <p align="center">
    An unofficial deck-building tool for Pokémon TCG Pocket players
    <br/>
    to browse cards, create decks, and publish them.
  </p>
  <a href="https://pocket-dex-web.vercel.app">Live Demo</a>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#features">Features</a></li>
    <li>
      <a href="#technical-highlights">Technical Highlights</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
      </ul>
    </li>
    <li>
      <a href="#what-i-learned">What I Learned</a>
      <ul>
        <li><a href="#%EF%B8%8F-postgresql--database-design">PostgreSQL & Database Design</a></li>
        <li><a href="#-design-first-code-later">Design First, Code Later</a></li>
        <li><a href="#-the-importance-of-ux">The Importance of UX</a></li>
        <li><a href="#-data-fetching-strategies">Data Fetching Strategies</a></li>
        <li><a href="#-different-caching-strategies">Different Caching Strategies</a></li>
        <li><a href="#-looking-back">Looking Back</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#feedback--suggestions">Feedback & Suggestions</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>

## Features

#### 🔍 Advanced Card Search

- Filter cards by set, rarity, color, hp and more.

#### 🃏 Deck Builder

- Intuitive interface with deck validation and statistics.

#### 📊 Card Details

- View detailed card information including stats, abilities, and pull rates from booster packs.

#### 🔐 Secure Authentication

- OAuth integration with Google and GitHub via Supabase Auth.

#### ☁️ Cross-Device Sync

- Save decks to the cloud and access them from any device, with local drafts for unfinished decks.

#### ❤️ Community Features

- Publish decks and discover popular builds through the like system.

## Technical Highlights

- **URL-Based Filter State** - Search and filter parameters persist in the URL for easy sharing and state preservation across page reloads
- **Complex Database Architecture** - PostgreSQL database with normalized tables, multiple relationship patterns, custom functions, triggers, and views
- **Server-Side Rendering** - Uses Next.js App Router with static generation, dynamic rendering, and streaming with React Suspense for optimal performance
- **OAuth Authentication Flow** - Secure authentication with Google and GitHub providers, implented with Supabase Auth
- **Real-Time Username Validation** - Instant feedback on username availability with debounced calls to database & validation on both server and client
- **Type-Safe Form Handling** - Form validation using Zod schemas and React Hook Form for UX and type safety
- **Full TypeScript Coverage** - End-to-end type safety across frontend, backend, and database queries
- **Consistent Design** - Cohesive UI built with Tailwind CSS and custom design system

### Built With

- [![Next][nextjs-shield]][nextjs-link]
- [![Typescript][typescript-shield]][typescript-link]
- [![Supabase][supabase-shield]][supabase-link]
- [![PostgreSQL][postgres-shield]][postgres-link]
- [![Tailwind CSS][tailwind-shield]][tailwind-link]

### Database Schema

<img src="https://i.imgur.com/fPvEJWE.jpeg" size="100" title="Database schema visualization" />

## What I Learned

Building PocketDex was my first full-scale web application, and it taught me way more than I expected.

#### 🗄️ PostgreSQL & Database Design

- **Starting From Zero**: I've only worked with Firebase before (a NoSQL database), so jumping into Postgres was a learning curve.I gathered experience designing database schemas, setting up relationships between tables, and using features like triggers and Row Level Security for access control. I also learned how indexes can improve query performance (even though it doesn't really matter with the few thousand rows in the database).

#### 🎨 Design First, Code Later

- **Rushing Into Code**: I was too eager to start coding and thought "I'll figure out the rest as I go", which was a big mistake. Designing just one button state but not hover, active, or disabled states came back to bite me later on. I learned that spending time designing first saves a lot of headaches later.

#### 🧠 The Importance of UX

- **Small Details Matter**: In the filter system, for example, I spent time fine-tuning the debounce delay so users could modify filters without triggering unnecessary database calls, but also without making the site feel sluggish.
- **Clear Feedback**: When testing as a user, I kept encountering unclear situations. I realized how important loading states, error messages, and toast notifications are. If you don't make it clear what's going on, users are probably going to assume the site is broken.

#### ⚡ Data Fetching Strategies

- **Server vs Client**: I learned when to use each approach:
  - **Server Actions** for initial data - users see content immediately when the page loads
  - **TanStack Query** for dynamic features like infinite scroll, while still prefetching the initial data on the server for that immediate first load
- This mix gave me the best of both worlds: fast initial loads with dynamic client-side features.

#### 💾 Different Caching Strategies

- **Handling 1400+ Cards**: With a full card database containing thousands of data points, API requests add up fast. I implemented different caching strategies:
  - Per-request caching for frequently accessed data
  - Persistent caching for static content (card details don't change often)
  - Tag-based revalidation so I can manually refresh data when new sets release
- Getting caching right reduced API calls and improved the loading times.

#### 💡 Looking Back

Building a full application with real features like authentication, database design, and user workflows is a completely different beast than smaller projects. There's a lot to juggle - performance, UX, caching, error handling - and I realized that making things work is just the baseline. Making them work _well_ requires constant iteration and thinking through edge cases I'd never considered before.

## Roadmap

- [ ] Responsive design for mobile users
- [ ] Advanced deck filtering (by included cards, deck energies etc.)
- [ ] Dashboard to view liked decks and personal deck collection
- [ ] Deck management (edit and delete published decks)
- [ ] Light/Dark mode toggle
- [ ] Deck detail page with comments

## Feedback & Suggestions

This is primarily a portfolio project, so I'm not currently seeking contributors. But I'm always open to feedback and suggestions!

If you have ideas for improvements or find any issues:

- Open an issue with the "enhancement" or "bug" tag
- Feel free to reach out directly

Thanks for checking out my project! ⭐

## Contact

Joschka - wjoschka@gmail.com

Project Link: https://github.com/joschka-w/pocket-dex

## Acknowledgements

Additional packages I used include:

- [`Nuqs`][nuqs-link]
- [`Tanstack Query`][tanstack-query-link]
- [`Zod`][zod-link]
- [`React Hook Form`][react-hook-form-link]
- [`Radix UI Primitives`][radix-link]
- [`Jotai`][jotai-link]
- [`MDX`][mdx-link]
- [`Lucide Icons`][lucide-link]
- [`Embla Carousel`][embla-link]

<!-- Shields -->

[nextjs-shield]: https://img.shields.io/badge/Next.js%20-%20000000?style=for-the-badge&logo=nextdotjs&color=000000&link=https%3A%2F%2Fnextjs.org
[typescript-shield]: https://img.shields.io/badge/Typescript%20-%20%233178C6?style=for-the-badge&logo=typescript&logoColor=%23ffffff&color=%233178C6
[supabase-shield]: https://img.shields.io/badge/Supabase-%2331B075?style=for-the-badge&logo=supabase&logoColor=%23ffffff&color=%2331B075
[postgres-shield]: https://img.shields.io/badge/PostgreSQL-%234169E1?style=for-the-badge&logo=postgresql&logoColor=%23ffffff&color=%234169E1
[tailwind-shield]: https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&logoColor=%23ffffff&color=%2306B6D4

<!-- Links -->

[nextjs-link]: https://nextjs.org/
[typescript-link]: https://www.typescriptlang.org/
[supabase-link]: https://supabase.com/
[postgres-link]: https://www.postgresql.org/
[tailwind-link]: https://tailwindcss.com/

<!-- Additional links -->

[nuqs-link]: https://nuqs.dev
[tanstack-query-link]: https://tanstack.com/query/latest
[zod-link]: https://zod.dev
[react-hook-form-link]: https://react-hook-form.com
[jotai-link]: https://jotai.org
[mdx-link]: https://mdxjs.com
[lucide-link]: https://lucide.dev
[embla-link]: https://www.embla-carousel.com
[radix-link]: https://www.radix-ui.com
