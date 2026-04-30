'use client';

import { useState } from 'react';
import type { IconType } from 'react-icons';
import { FaReact } from 'react-icons/fa';
import { TbBrandNextjs, TbSparkles } from 'react-icons/tb';
import { BiLogoMongodb, BiLogoPostgresql, BiLogoTypescript } from 'react-icons/bi';
import { SiGoogle, SiOpenai, SiPrisma } from 'react-icons/si';

type StackTab = 'frontend' | 'backend' | 'ai';

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

const stacks: Record<StackTab, TechItem[]> = {
  frontend: [
    { name: 'React', icon: FaReact, color: 'text-blue-400' },
    { name: 'Next.js', icon: TbBrandNextjs, color: 'text-offwhite' },
    { name: 'TypeScript', icon: BiLogoTypescript, color: 'text-blue-500' },
  ],
  backend: [
    { name: 'PostgreSQL', icon: BiLogoPostgresql, color: 'text-blue-500' },
    { name: 'Prisma', icon: SiPrisma, color: 'text-offwhite' },
    { name: 'MongoDB', icon: BiLogoMongodb, color: 'text-emerald-500' },
  ],
  ai: [
    { name: 'Claude API', icon: TbSparkles, color: 'text-accent' },
    { name: 'OpenAI API', icon: SiOpenai, color: 'text-white' },
    { name: 'Gemini API', icon: SiGoogle, color: 'text-white' },
  ],
};

export default function TechStackToggle() {
  const [activeTab, setActiveTab] = useState<StackTab>('frontend');

  return (
    <div>
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-offwhite">
          Tech stack
        </h2>
        <p className="text-sm text-offwhite/50">
          Technologies organized by layer
        </p>
      </div>

      <div>
        <div className="mb-6 flex w-fit flex-wrap gap-2 rounded-lg bg-main p-1 ring-1 ring-offwhite/10">
          {(['frontend', 'backend', 'ai'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all active:translate-y-px ${
                activeTab === tab
                  ? 'bg-accent text-offwhite shadow-lg'
                  : 'text-offwhite/60 hover:bg-accent/10 hover:text-offwhite'
              }`}
            >
              {tab === 'ai' ? 'AI' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {stacks[activeTab].map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="flex items-center gap-3 rounded-lg bg-main p-4 ring-1 ring-offwhite/10 transition-all hover:bg-accent/10 active:translate-y-px"
              >
                <Icon className={`shrink-0 text-2xl ${tech.color}`} aria-hidden />
                <span className="text-sm font-medium text-offwhite">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
