export function DiagonalStripes() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.02]"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, #556B2F 20px, #556B2F 21px)`,
      }}
    />
  )
}
