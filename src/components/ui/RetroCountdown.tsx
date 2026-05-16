import { useCountdown } from '../../hooks/useCountdown'
import type { DocumentStatus } from '../../types'

interface Props {
  expiryDate: string | null
  status: DocumentStatus | 'EXPIRED'
}

export function RetroCountdown({ expiryDate, status }: Props) {
  const display = useCountdown(expiryDate)

  const colors: Record<string, string> = {
    ACTIVE: 'text-teal',
    EXPIRING_SOON: 'text-mustard',
    EXPIRED: 'text-red-500',
  }

  return (
    <span className={`font-space font-bold text-lg ${colors[status] || 'text-navy'}`}>
      {display}
    </span>
  )
}
