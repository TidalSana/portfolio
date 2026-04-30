'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import StatusDot from './StatusDot';
import TechStackToggle from './TechStackToggle';
import {
  fadeInScale,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from '../lib/animations';

interface ThingBuilt {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  link: string;
  tags: string[];
  active: boolean;
}

const thingsBuilt: ThingBuilt[] = [
  {
    title: 'Biproxi',
    subtitle: 'Full-Stack Engineer',
    date: '2022 - Present',
    description:
      'Architecting scalable real estate marketplace dashboards with collaborative engineering teams',
    link: 'https://www.biproxi.com',
    tags: ['React', 'TypeScript', 'Node.js'],
    active: true,
  },
  {
    title: 'OfficeSpace',
    subtitle: 'Full-Stack Engineer',
    date: '2023-2024',
    description:
      'Building CRE platform features and integrated lead management systems',
    link: 'https://www.officespace.com',
    tags: ['Next.js', 'PostgreSQL', 'AWS'],
    active: true,
  },
  {
    title: 'ExtrasOnly',
    subtitle: 'AI-Powered Registry',
    date: '2024',
    description:
      'A global keycap extras registry solving browser-tab fatigue. Features an idempotent '
      + 'TypeScript scraping pipeline, 4-gate classification algorithm powered by Claude 4.5 Haiku, '
      + 'and full-stack implementation from Prisma to Next.js.',
    link: 'https://github.com/TidalSana/extras-only',
    tags: ['TypeScript', 'Next.js', 'Prisma', 'Claude API'],
    active: true,
  },
];

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#built', label: 'Built' },
  { href: '#tech', label: 'Stack' },
  { href: '#keyboards', label: 'Keyboards' },
  { href: '#about', label: 'About' },
];

const socialLinks: Array<{ href: string; label: string; Icon: IconType }> = [
  { href: 'https://github.com/TidalSana', label: 'GitHub', Icon: AiFillGithub },
  { href: 'https://www.linkedin.com/in/joshua-semana/', label: 'LinkedIn', Icon: AiFillLinkedin },
];

export default function KorsaPortfolio() {
  return (
    <div className="min-h-screen bg-main text-offwhite">
      <header className="sticky top-0 z-50 border-b border-offwhite/10 bg-main/90 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 py-4 md:justify-end md:gap-6"
          aria-label="Primary"
        >
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-offwhite/60 transition-colors hover:text-accent active:translate-y-px"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden xl:col-span-2 xl:block" aria-hidden />

            <main className="col-span-12 space-y-20 xl:col-span-8">
              <section id="hero" className="relative scroll-mt-24 py-12">
                <div className="absolute -left-32 top-12 hidden xl:block">
                  <p className="text-xs font-mono uppercase tracking-wider text-offwhite/30 [writing-mode:vertical-lr] rotate-180">
                    Est. 2022
                  </p>
                </div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  className="zen-border rounded-xl bg-card p-8 transition-all active:translate-y-px md:p-12"
                >
                  <div className="flex flex-col items-start gap-6 md:flex-row">
                    <motion.div
                      variants={slideInLeft}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-accent ring-4 ring-accent/20"
                    >
                      <Image
                        src="/aboutme.jpeg"
                        alt="Joshua Semana"
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <motion.div variants={slideInRight} className="flex-1">
                      <h1 className="mb-2 text-5xl font-bold leading-tight tracking-tighter text-offwhite md:text-6xl">
                        Joshua Semana
                      </h1>

                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <p className="text-xl font-medium text-offwhite/90">
                          Full-Stack Engineer
                        </p>
                        <StatusDot active />
                        <span className="text-sm text-emerald-400">Available</span>
                      </div>

                      <p className="mb-6 max-w-2xl text-base leading-relaxed text-offwhite/70">
                        Building elegant, high-performance web experiences with TypeScript, Next.js,
                        and AI integration. Based in Bozeman, MT.
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-6 flex flex-wrap gap-4"
                  >
                    {socialLinks.map(({ href, label, Icon }) => (
                      <motion.a
                        key={label}
                        variants={fadeInScale}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="inline-flex items-center justify-center rounded-lg bg-main p-3 text-offwhite ring-1 ring-offwhite/10 transition-all hover:text-accent hover:ring-accent/50 active:translate-y-px"
                      >
                        <Icon className="h-7 w-7" aria-hidden />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </section>

              <section id="built" className="relative scroll-mt-24 py-12">
                <div className="absolute -right-32 top-12 hidden xl:block">
                  <p className="text-xs font-mono uppercase tracking-wider text-offwhite/30 [writing-mode:vertical-lr] rotate-180">
                    Portfolio
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="mb-2 text-3xl font-bold tracking-tight text-offwhite">
                    Things I&apos;ve built
                  </h2>
                  <p className="text-sm text-offwhite/50">
                    Professional work and side projects
                  </p>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  className="space-y-4"
                >
                  {thingsBuilt.map((item) => (
                    <motion.a
                      key={item.title}
                      variants={fadeInScale}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group zen-border block rounded-xl bg-card p-6 transition-all hover:bg-card/80 active:translate-y-px"
                    >
                      <div className="mb-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold tracking-tight text-offwhite transition-colors group-hover:text-accent">
                              {item.title}
                            </h3>
                            {item.active ? <StatusDot active /> : null}
                          </div>
                          <p className="font-mono text-sm text-accent">{item.subtitle}</p>
                        </div>
                        <span className="shrink-0 font-mono text-xs text-offwhite/50">
                          {item.date}
                        </span>
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-offwhite/70">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-main px-2 py-1 font-mono text-xs text-offwhite/70 ring-1 ring-offwhite/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </section>

              <section id="tech" className="relative scroll-mt-24 py-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInScale}
                  className="zen-border rounded-xl bg-card p-6"
                >
                  <TechStackToggle />
                </motion.div>
              </section>

              <section id="about" className="relative scroll-mt-24 py-12">
                <div className="mb-8">
                  <h2 className="mb-2 text-3xl font-bold tracking-tight text-offwhite">About</h2>
                  <p className="font-mono text-sm text-offwhite/50">README.md</p>
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_200px]">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInLeft}
                    className="animate-bounce-subtle zen-border rounded-xl bg-[#0f0d14] p-8"
                  >
                    <div className="space-y-4 font-mono text-sm">
                      <div className="flex gap-2">
                        <span className="text-offwhite/30">#</span>
                        <p className="text-offwhite/90">
                          Full-stack engineer based in Bozeman, Montana
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-offwhite/30">-</span>
                        <p className="text-offwhite/70">
                          Specialized in TypeScript, Next.js, and AI integration
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-offwhite/30">-</span>
                        <p className="text-offwhite/70">
                          Building scraping pipelines and full-stack applications
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-offwhite/30">-</span>
                        <p className="text-offwhite/70">
                          Passionate about custom mechanical keyboards
                        </p>
                      </div>

                      <div className="mt-6 border-t border-offwhite/10 pt-6">
                        <p className="text-offwhite/60">
                          <span className="text-accent">const</span>
                          <span className="text-offwhite"> availability </span>
                          <span className="text-offwhite/40">= </span>
                          <span className="text-emerald-400">&quot;Open to work&quot;</span>
                          ;
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideInRight}
                    className="animate-bounce-delay zen-border relative h-56 min-h-[200px] overflow-hidden rounded-xl md:h-auto md:min-h-[280px]"
                  >
                    <Image
                      src="/aboutme.jpeg"
                      alt="About Joshua"
                      fill
                      className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
                      sizes="(min-width: 768px) 200px, 100vw"
                    />
                  </motion.div>
                </div>
              </section>

              <section id="keyboards" className="relative scroll-mt-24 py-12">
                <div className="absolute -left-32 top-12 hidden xl:block">
                  <p className="text-xs font-mono uppercase tracking-wider text-offwhite/30 [writing-mode:vertical-lr] rotate-180">
                    Collection
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="mb-2 text-3xl font-bold tracking-tight text-offwhite">
                    Keyboards
                  </h2>
                  <p className="text-sm text-offwhite/50">
                    Some of my favorite keyboards I&apos;ve built
                  </p>
                </div>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  className="space-y-6"
                >
                  <motion.div
                    variants={fadeInScale}
                    className="glow-keyboards group relative cursor-pointer overflow-hidden rounded-xl bg-card zen-border"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-[400px] w-full md:h-[500px]">
                      <Image
                        src="/keyboard-red-anime.jpg"
                        alt="Custom mechanical keyboard with red anime character keycaps"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 1200px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-main/90 via-main/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <div className="mb-2 flex flex-wrap items-center gap-3">
                          <h3 className="text-2xl font-bold text-offwhite md:text-3xl">
                            <span className="line-through">Rio</span>
                            {' '}
                            65
                          </h3>
                        </div>
                        <p className="font-mono text-sm text-offwhite/80">
                          Anime-inspired keyboard
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                  >
                    <motion.div
                      variants={fadeInScale}
                      className="group relative cursor-pointer overflow-hidden rounded-xl bg-card zen-border"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-[240px] w-full">
                        <Image
                          src="/keyboard-blue-spacebar.jpg"
                          alt="Keyboard with blue and gold spacebar design"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-main/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-mono text-xs text-offwhite/90">
                            Pangea Mini external weight
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInScale}
                      className="group relative cursor-pointer overflow-hidden rounded-xl bg-card zen-border"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-[240px] w-full">
                        <Image
                          src="/keyboard-cyan-accents.jpg"
                          alt="Black keyboard with cyan accent keycaps"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-main/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-mono text-xs text-offwhite/90">
                            Pangea Mini with GMK Phosphorous
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={fadeInScale}
                      className="group relative cursor-pointer overflow-hidden rounded-xl bg-card zen-border"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-[240px] w-full">
                        <Image
                          src="/keyboard-black-watermelon.jpg"
                          alt="Black keyboard with watermelon novelty keycap"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-main/80 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-mono text-xs text-offwhite/90">
                            Rio65 with GMK Hangul
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    variants={fadeInScale}
                    className="zen-border mt-6 rounded-xl bg-card p-6"
                  >
                    <p className="text-sm leading-relaxed text-offwhite/70">
                      Beyond code, I&apos;m passionate about custom mechanical keyboards. Each build
                      is a unique combination of switches, keycaps, and layouts—optimized for feel,
                      sound, and aesthetics.
                      {'From '}
                      <span className="font-semibold text-accent">artisan keycaps</span>
                      {' to custom PCBs, every detail matters.'}
                    </p>
                  </motion.div>
                </motion.div>
              </section>

              <footer className="sticky bottom-0 rounded-lg border-t border-accent/20 bg-main/90 px-6 py-3 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 font-mono text-xs text-offwhite/50">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-offwhite">Joshua Semana</span>
                    <span className="text-offwhite/20">{'//'}</span>
                    <span>Full-Stack Engineer</span>
                    <span className="text-offwhite/20">{'//'}</span>
                    <span className="text-accent">v2.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot active />
                    <span className="hidden sm:inline">Available</span>
                  </div>
                </div>
              </footer>
            </main>

            <div className="hidden xl:col-span-2 xl:block" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
