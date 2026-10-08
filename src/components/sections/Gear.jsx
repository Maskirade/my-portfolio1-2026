import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { gear } from '../../data/gear.js';

export default function Gear() {
  const featuredGear = gear[0];
  const secondaryGear = gear.slice(1);

  return (
    <section
      id="gear"
      className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line"
    >
      {/* Section Header */}
      <Reveal>
        <SectionHeader
          index="03"
          label="Loadout"
          title="Gear"
          description="The hardware and tools behind the work."
        />
      </Reveal>

      {/* Featured Hardware */}
      {featuredGear && (
        <Reveal delay={80}>
          <Panel className="mt-10 overflow-hidden rounded-sm">
            <div className="grid lg:grid-cols-[1.7fr_0.8fr] min-h-[480px]">

              {/* Large Image */}
              <div className="relative min-h-[360px] lg:min-h-[480px] bg-bg-surface2 border-b lg:border-b-0 lg:border-r border-line overflow-hidden group">
                {featuredGear.image ? (
                  <img
                    src={featuredGear.image}
                    alt={`${featuredGear.title} preview`}
                    className="absolute inset-0 w-full h-full object-contain p-8 sm:p-12 lg:p-16 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
                      Preview image placeholder
                    </span>
                  </div>
                )}

                {/* Image Label */}
                <div className="absolute top-5 left-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 border border-line bg-bg/80 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest text-ink-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Primary Setup
                  </span>
                </div>

                {/* Image Index */}
                <span className="absolute bottom-5 right-5 font-mono text-[10px] text-ink-faint">
                  01 / 0{gear.length}
                </span>
              </div>

              {/* Hardware Information */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {featuredGear.category}
                  </span>

                  <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                    {featuredGear.title}
                  </h3>

                  {featuredGear.description && (
                    <p className="mt-5 text-sm leading-7 text-ink-muted max-w-md">
                      {featuredGear.description}
                    </p>
                  )}

                  {/* Divider */}
                  
                  {/*<div className="my-7 h-px bg-line" />*/}

                  {/* Specs / Tools */}
                  {/*
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                      Workload
                    </span>

                    <ul className="mt-4 space-y-3">
                      {featuredGear.items?.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-sm text-ink-muted"
                        >
                          <span
                            className="flex items-center justify-center w-5 h-5 border border-line font-mono text-[9px] text-accent"
                            aria-hidden="true"
                          >
                            +
                          </span>

                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  */}
                  </div>
                {/* Bottom Metadata */}
                <div className="mt-10 pt-5 border-t border-line flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    Development Environment
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </Panel>
        </Reveal>
      )}

      {/* Secondary Gear */}
      {secondaryGear.length > 0 && (
        <div className="grid md:grid-cols-2 gap-5 mt-5">
          {secondaryGear.map((item, i) => (
            <Reveal key={item.id} delay={140 + i * 70}>
              <Panel className="overflow-hidden rounded-sm h-full">

                {/* Hardware Image */}
                <div className="relative aspect-[16/10] bg-bg-surface2 border-b border-line overflow-hidden group">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.title} preview`}
                      className="absolute inset-0 w-full h-full object-contain p-8 sm:p-10 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
                        Preview image placeholder
                      </span>
                    </div>
                  )}

                  <span className="absolute top-4 left-4 px-2.5 py-1 border border-line bg-bg/80 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    0{i + 2}
                  </span>
                </div>

                {/* Information */}
                <div className="p-5 sm:p-6">

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-sm leading-6 text-ink-muted">
                      {item.description}
                    </p>
                  )}

                  {item.items?.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-line">
                      <div className="flex flex-wrap gap-2">
                        {item.items.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1.5 border border-line font-mono text-[10px] uppercase tracking-wider text-ink-faint"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}