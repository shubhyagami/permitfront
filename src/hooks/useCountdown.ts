import { useState, useEffect } from 'react'
import { differenceInSeconds, parseISO } from 'date-fns'

export function useCountdown(expiryDate: string | null) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!expiryDate) { setDisplay('N/A'); return }
    const tick = () => {
      const diff = differenceInSeconds(parseISO(expiryDate + 'T23:59:59'), new Date())
      if (diff <= 0) { setDisplay('EXPIRED'); return }
      const d = Math.floor(diff / 86400)
      const h = Math.floor((diff % 86400) / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setDisplay(`${d}d ${h}h ${m}m ${s}s`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [expiryDate])

  return display
}
