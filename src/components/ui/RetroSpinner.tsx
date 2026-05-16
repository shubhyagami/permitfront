interface Props {
  className?: string
  blade?: boolean
}

export function RetroSpinner({ className = 'w-8 h-8', blade }: Props) {
  return (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-20"
        cx="12" cy="12" r="10"
        stroke={blade ? '#00E5FF' : '#556B2F'}
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill={blade ? '#00E5FF' : '#D4A017'}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
