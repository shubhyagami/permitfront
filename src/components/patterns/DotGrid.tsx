export function DotGrid({ blade }: { blade?: boolean }) {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
      style={{
        backgroundImage: `radial-gradient(circle, ${blade ? '#00E5FF' : '#556B2F'} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    />
  )
}
