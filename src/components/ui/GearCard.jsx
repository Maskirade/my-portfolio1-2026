import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';
import Panel from './Panel.jsx';
import TechBadge from './TechBadge.jsx';
import StatusDot from './StatusDot.jsx';

export default function GearCard({gear}) {

    return(
        <Panel ClassName="group flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
            <div ClassName="aspect-video w-full bg-bg-surface2 border-b border-line flex items-center justify-center overflow-hidden">
                {gear.image ? (
                    <img
                        src={gear.image}
                        alt={`${gear.title} preview`}
                        ClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                ) : (
                    <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
                        Preview image placeholder
                    </span>
                )}
            </div>
        </Panel>
    );
}