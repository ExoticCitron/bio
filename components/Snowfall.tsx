"use client"

import { useEffect, useRef } from "react"

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
}

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      if (!canvas) return // Add null check
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create snowflakes - reduced count for subtlety
    const snowflakes: Snowflake[] = []
    const snowflakeCount = 50 // Reduced count for more subtle effect

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 1.5, // Smaller snowflakes
        speed: Math.random() * 0.5 + 0.2, // Slower speed
        opacity: Math.random() * 0.4 + 0.1, // Lower opacity for subtlety
      })
    }

    // Animation loop
    function animate() {
      if (!canvas || !ctx) return // Add null check

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach((snowflake) => {
        // Draw simple white snowflake
        ctx.beginPath()
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.globalAlpha = snowflake.opacity
        ctx.fill()

        // Update snowflake position - slower movement
        snowflake.y += snowflake.speed
        snowflake.x += Math.sin(snowflake.y / 50) * 0.3 // More gentle sway

        // Reset snowflake when it goes off screen
        if (snowflake.y > canvas.height) {
          snowflake.y = -10
          snowflake.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.7 }} // Reduced overall opacity
    />
  )
}
