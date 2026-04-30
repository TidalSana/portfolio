interface StatusDotProps {
  active?: boolean;
}

export default function StatusDot({ active = false }: StatusDotProps) {
  return (
    <span className="relative flex h-2 w-2">
      {active ? (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-75" />
      ) : null}
      <span
        className={`relative inline-flex h-2 w-2 rounded-full ${
          active ? 'bg-status' : 'bg-offwhite/30'
        }`}
      />
    </span>
  );
}
