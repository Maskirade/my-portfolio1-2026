import { useEffect, useState } from 'react';
import { GithubIcon } from '../ui/icons.jsx';
import Reveal from '../effects/Reveal.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import Panel from '../ui/Panel.jsx';
import { profile } from '../../data/profile.js';
import { contributionColors, isGithubActivity } from '../../data/githubActivity.js';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GithubActivity() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [attempt, setAttempt] = useState(0);
  const [request, setRequest] = useState({ year, attempt, status: 'loading' });

  if (request.year !== year || request.attempt !== attempt) {
    setRequest({ year, attempt, status: 'loading' });
  }

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadActivity() {
      try {
        const response = await fetch(`/api/github-contributions?year=${year}`, {
          signal: controller.signal,
        });
        if (!response.headers.get('content-type')?.includes('application/json')) {
          throw new Error('GitHub activity is temporarily unavailable. Please try again.');
        }
        const data = await response.json();
        if (!response.ok) {
          throw new Error(typeof data.error === 'string' ? data.error : 'Unable to load GitHub activity.');
        }
        if (!isGithubActivity(data, year)) {
          throw new Error('GitHub activity is temporarily unavailable. Please try again.');
        }
        if (active) setRequest({ year, attempt, status: 'success', activity: data });
      } catch (error) {
        if (active) {
          setRequest({
            year, attempt, status: 'error',
            error: error instanceof TypeError ? 'Unable to connect. Please try again.' : error.message,
          });
        }
      }
    }

    loadActivity();
    return () => {
      active = false;
      controller.abort();
    };
  }, [year, attempt]);

  const loading = request.status === 'loading';
  const activity = request.activity;
  const weeks = activity?.weeks || [];
  const columns = { gridTemplateColumns: `repeat(${weeks.length}, 10px)` };
  const rows = { gridTemplateRows: 'repeat(7, 10px)' };

  return (
    <section id="github" className="px-6 sm:px-10 lg:px-16 py-24 border-t border-line">
      <Reveal>
        <SectionHeader index="10" label="Activity" title="GitHub contributions" description="A live view of my GitHub activity." />
      </Reveal>

      <Reveal>
        <Panel className="p-4 sm:p-6 rounded-sm min-w-0" aria-busy={loading}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div role="status" aria-live="polite" aria-atomic="true">
              {loading ? (
                <p className="font-mono text-sm text-ink-muted">Loading GitHub activity...</p>
              ) : activity ? (
                <p className="font-mono text-2xl text-ink font-semibold">
                  {activity.totalContributions.toLocaleString()}
                  <span className="text-sm text-ink-muted font-normal"> contributions in {year}</span>
                </p>
              ) : (
                <p className="font-mono text-sm text-ink-muted">GitHub activity unavailable</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-wrap items-center gap-1 font-mono text-xs" role="group" aria-label="Select contribution year">
                {[currentYear, currentYear - 1, currentYear - 2].map((value) => (
                  <button
                    key={value} type="button" aria-pressed={value === year} onClick={() => setYear(value)}
                    className={`px-3 py-1.5 rounded-sm border transition-colors ${value === year
                      ? 'border-accent text-accent bg-accent/10' : 'border-line text-ink-muted hover:text-ink'}`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <a
                href={activity?.profileUrl || profile.socials.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-accent transition-colors"
              >
                <GithubIcon size={15} aria-hidden="true" /> View GitHub
              </a>
            </div>
          </div>

          {loading ? (
            <div className="h-32 flex items-center justify-center animate-pulse">
              <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">Loading contribution graph...</span>
            </div>
          ) : request.status === 'error' ? (
            <div className="min-h-32 flex flex-col items-start justify-center gap-4">
              <p role="alert" className="text-sm text-ink-muted">{request.error}</p>
              <button
                type="button" onClick={() => setAttempt((value) => value + 1)}
                className="px-4 py-2 border border-line rounded-sm font-mono text-xs text-ink hover:text-accent hover:border-accent/40 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : activity ? (
            <>
              {activity.totalContributions === 0 && (
                <p className="mb-4 text-sm text-ink-muted">No contributions recorded in {year}.</p>
              )}
              <div className="flex gap-3 min-w-0">
                <div className="shrink-0 text-[10px] font-mono text-ink-faint" aria-hidden="true">
                  <div className="h-4 mb-2" />
                  <div className="grid gap-1" style={rows}>
                    <span style={{ gridRowStart: 2 }}>Mon</span>
                    <span style={{ gridRowStart: 4 }}>Wed</span>
                    <span style={{ gridRowStart: 6 }}>Fri</span>
                  </div>
                </div>
                <div
                  className="min-w-0 flex-1 overflow-x-auto pb-2 focus-visible:outline-accent"
                  tabIndex={0} role="region" aria-label="Scrollable GitHub contribution calendar"
                >
                  <div className="w-max pr-4">
                    <div className="grid gap-1 h-4 mb-2 font-mono text-[10px] text-ink-faint" style={columns} aria-hidden="true">
                      {weeks.map((week, index) => {
                        const firstDay = week.contributionDays.find((day) => day.date.endsWith('-01'));
                        return <span key={index}>{firstDay ? months[Number(firstDay.date.slice(5, 7)) - 1] : ''}</span>;
                      })}
                    </div>
                    <div
                      className="grid gap-1" style={columns} role="img"
                      aria-label={`${activity.totalContributions} GitHub contributions in ${year}, arranged by week and weekday`}
                    >
                      {weeks.map((week, index) => (
                        <div key={index} className="grid gap-1" style={rows}>
                          {week.contributionDays.map((day) => (
                            <span
                              key={day.date} style={{ gridRowStart: day.weekday + 1 }}
                              className={`w-2.5 h-2.5 rounded-[2px] ${contributionColors[day.level]}`}
                              title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 font-mono text-[11px] text-ink-faint" aria-hidden="true">
                <span>Less</span>
                {Object.entries(contributionColors).map(([level, color]) => (
                  <span key={level} className={`w-2.5 h-2.5 rounded-[2px] ${color}`} />
                ))}
                <span>More</span>
              </div>
            </>
          ) : null}
        </Panel>
      </Reveal>
    </section>
  );
}
