'use client'

import React, { useEffect, useRef } from 'react'

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const snowflakes: { x: number; y: number; radius: number; speed: number }[] = []

    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1 + 0.5
      })
    }

    function drawSnowflakes() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.3)'
      
      snowflakes.forEach((flake) => {
        ctx!.beginPath()
        ctx!.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx!.fill()

        flake.y += flake.speed

        if (flake.y > canvas!.height) {
          flake.y = 0
          flake.x = Math.random() * canvas!.width
        }
      })

      animationFrameId = requestAnimationFrame(drawSnowflakes)
    }

    drawSnowflakes()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

export default Snowfall

