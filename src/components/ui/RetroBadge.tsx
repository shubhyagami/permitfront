import type { DocumentStatus } from '../../types'

interface Props {
  status: DocumentStatus | 'EXPIRED'
}

const config = {
  ACTIVE: { bg: 'bg-teal', text: 'text-white', label: 'ACTIVE' },
  EXPIRING_SOON: { bg: 'bg-mustard', text: 'text-navy', label: 'EXPIRING' },
  EXPIRED: { bg: 'bg-red-700', text: 'text-white', label: 'EXPIRED' },
}

export function RetroBadge({ status }: Props) {
  const c = config[status] || config.ACTIVE
  return (
    <span className={`${c.bg} ${c.text} font-space font-bold text-[10px] uppercase px-2.5 py-1 rounded`}>
      {c.label}
    </span>
  )
}
