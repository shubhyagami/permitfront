export function Scanlines() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.3) 2px, rgba(0,229,255,0.3) 4px)',
        backgroundSize: '100% 4px',
      }}
    />
  )
}

export function ScanlineBeam() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.02] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.15) 50%, transparent 100%)' }}
    >
      <div className="absolute w-full h-[2px] bg-br-cyan/20 animate-scanline" />
    </div>
  )
}
