export function LiveBadge({ live, liveLabel = "Dati live", demoLabel = "Demo", title }: { live: boolean; liveLabel?: string; demoLabel?: string; title?: string }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${live ? "bg-up-soft text-up" : "bg-surface2 text-muted"}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-70" />}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${live ? "bg-up" : "bg-muted2"}`} />
      </span>
      {live ? liveLabel : demoLabel}
    </span>
  );
}
