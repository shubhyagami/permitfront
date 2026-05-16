import { useEffect, useRef } from 'react'

export function RainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const drops: { x: number; speed: number; length: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        speed: 2 + Math.random() * 4,
        length: 10 + Math.random() * 20,
        opacity: 0.02 + Math.random() * 0.04,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = '#00E5FF'
      ctx.lineWidth = 1

      drops.forEach(d => {
        d.x += 0.3
        if (d.x > canvas.width) d.x = -10

        ctx.globalAlpha = d.opacity
        ctx.beginPath()
        ctx.moveTo(d.x, 0)
        ctx.lineTo(d.x - 2, d.length)
        ctx.stroke()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
