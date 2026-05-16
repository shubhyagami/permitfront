interface Props {
  name: string
  size?: number
  blade?: boolean
}

export function AvatarCircle({ name, size = 40, blade }: Props) {
  const initial = (name || '?').charAt(0).toUpperCase()
  return (
    <div
      className={`rounded-full flex items-center justify-center font-playfair font-bold text-white ${blade ? 'shadow-[0_0_10px_rgba(0,229,255,0.5)]' : ''}`}
      style={{ width: size, height: size, fontSize: size * 0.45, background: blade ? '#00E5FF' : '#D4A017' }}
    >
      {initial}
    </div>
  )
}
