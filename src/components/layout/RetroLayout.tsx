import type { ReactNode } from 'react'
import { Scanlines, ScanlineBeam } from '../patterns/Scanlines'
import { RainEffect } from '../patterns/RainEffect'

interface Props {
  children: ReactNode
  showRain?: boolean
}

export function RetroLayout({ children, showRain }: Props) {
  return (
    <div className="min-h-screen bg-br-dark">
      {showRain && <RainEffect />}
      <Scanlines />
      <ScanlineBeam />
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  )
}
