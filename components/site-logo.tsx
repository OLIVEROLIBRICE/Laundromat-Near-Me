import { MapPin, WashingMachine } from "lucide-react";

type SiteLogoProps = {
  inverted?: boolean;
  compact?: boolean;
};

export function SiteLogo({ inverted = false, compact = false }: SiteLogoProps) {
  return <span className="inline-flex items-center gap-3">
    <span aria-hidden="true" className={`relative grid shrink-0 place-items-center overflow-hidden bg-gradient-to-br from-sky-400 via-brand-600 to-blue-800 shadow-[0_8px_24px_rgba(37,99,235,.28)] ring-1 ring-white/20 ${compact ? "h-10 w-10 rounded-xl" : "h-12 w-12 rounded-2xl"}`}>
      <MapPin className="translate-y-0.5 text-white" size={compact ? 30 : 36} strokeWidth={2.35}/>
      <span className={`absolute grid place-items-center rounded-md bg-white text-brand-700 shadow-sm ${compact ? "left-[13px] top-[7px] h-[15px] w-[15px]" : "left-[15px] top-[8px] h-[18px] w-[18px]"}`}>
        <WashingMachine size={compact ? 11 : 13} strokeWidth={2.5}/>
      </span>
      <span className="absolute bottom-1.5 h-1 w-5 rounded-full bg-sky-200/70"/>
    </span>
    <span className="min-w-0 leading-none">
      <span className={`block whitespace-nowrap font-display font-extrabold tracking-[-.025em] ${compact ? "text-base" : "text-lg"} ${inverted ? "text-white" : "text-ink"}`}>
        Laundromat <span className={inverted ? "text-sky-300" : "text-brand-600"}>Near Me</span>
      </span>
      <span className={`mt-1.5 hidden whitespace-nowrap text-[9px] font-extrabold uppercase tracking-[.23em] min-[380px]:block ${inverted ? "text-slate-300" : "text-slate-500"}`}>Laundry directory</span>
    </span>
  </span>;
}
