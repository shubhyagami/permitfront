interface Props {
  label?: string
  blade?: boolean
}

export function WavyDivider({ label, blade }: Props) {
  const line = blade ? 'border-br-cyan/20' : 'border-olive/30'
  const text = blade ? 'text-br-cyan/50' : 'text-olive'
  return (
    <div className="flex items-center gap-3 my-4">
      <div className={`flex-1 border-t ${line}`} />
      {label && <span className={`font-space text-[10px] uppercase tracking-widest ${text}`}>{label}</span>}
      <div className={`flex-1 border-t ${line}`} />
    </div>
  )
}
