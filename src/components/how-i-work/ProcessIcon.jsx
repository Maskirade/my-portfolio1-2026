import { Brain, CodeXml, Layers, Lightbulb, MessageSquare, Rocket, Search, ShieldCheck, Target, TrendingUp, Users } from 'lucide-react';

const icons = {
  search: Search,
  brain: Brain,
  layers: Layers,
  code: CodeXml,
  shield: ShieldCheck,
  rocket: Rocket,
  target: Target,
  users: Users,
  growth: TrendingUp,
  message: MessageSquare,
  lightbulb: Lightbulb,
};

export default function ProcessIcon({ name, className = '' }) {
  const Icon = icons[name];
  return <Icon size={20} strokeWidth={1.5} aria-hidden="true" className={className} />;
}
