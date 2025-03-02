"use client"

import { Settings, X } from "lucide-react"

export default function CharacterStatus() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a1744] text-white">
      {/* Main Container */}
      <div className="flex flex-col items-center max-w-md w-full">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image_2025-03-01_211414481-modified-3BsdjBMOC9Bu6otWqDLIDuNc0Zt1tr.png"
            alt="Character Avatar"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Status Panel */}
        <div className="w-full bg-[#1a2035] border border-[#0078ff] rounded-md p-4 text-white relative">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 border-b border-[#0078ff] pb-2">
            <button className="text-[#0078ff]">
              <Settings size={20} />
            </button>
            <h1 className="text-[#0078ff] text-2xl font-bold tracking-wider">STATUS</h1>
            <button className="text-[#0078ff]">
              <X size={20} />
            </button>
          </div>

          {/* Character Info */}
          <div className="flex justify-between items-center mb-4">
            <div className="space-y-1">
              <p className="text-gray-200">
                NAME: <span className="text-white">HAVEEN</span>
              </p>
              <p className="text-gray-200">
                LV: <span className="text-white">3</span>
              </p>
              <p className="text-gray-200">
                CLASS: <span className="text-white">ASSASSIN</span>
              </p>
              <p className="text-gray-200">
                TITLE: <span className="text-white">BEGINNER</span>
              </p>
            </div>
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 w-16 h-16 border-2 border-[#0078ff] rotate-45"></div>
              <div className="absolute inset-0 w-16 h-16 border-2 border-[#0078ff] -rotate-45"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">E</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-[#0078ff] py-4 mb-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-gray-200">
                  STRENGTH: <span className="text-white">10</span>
                </p>
                <p className="text-gray-200">
                  INTELLIGENCE: <span className="text-white">3.5</span>
                </p>
                <p className="text-gray-200">
                  DISCIPLINE: <span className="text-white">2.5</span>
                </p>
                <p className="text-gray-200">
                  SPIRIT: <span className="text-white">10</span>
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-200">
                  AP: <span className="text-white">15</span>
                </p>
                <p className="text-gray-200">
                  DEF: <span className="text-white">15</span>
                </p>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="flex justify-center">
            <RadarChart />
          </div>
        </div>
      </div>
    </div>
  )
}

function RadarChart() {
  // Points for a pentagon
  const centerX = 60
  const centerY = 60
  const radius = 50

  // Calculate points for pentagon
  const points = []
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push({ x, y })
  }

  // Create web lines (3 levels)
  const webLines = []
  for (let level = 1; level <= 3; level++) {
    const levelRadius = (radius * level) / 3
    const levelPoints = []

    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
      const x = centerX + levelRadius * Math.cos(angle)
      const y = centerY + levelRadius * Math.sin(angle)
      levelPoints.push({ x, y })
    }

    let pathData = `M ${levelPoints[0].x} ${levelPoints[0].y}`
    for (let i = 1; i < 5; i++) {
      pathData += ` L ${levelPoints[i].x} ${levelPoints[i].y}`
    }
    pathData += " Z"

    webLines.push(pathData)
  }

  // Data points (values between 0-1)
  const data = [
    { name: "STR", value: 0.7 }, // Strength
    { name: "INT", value: 0.3 }, // Intelligence
    { name: "SPI", value: 0.7 }, // Spirit
    { name: "DIS", value: 0.2 }, // Discipline
    { name: "WIL", value: 0.5 }, // Will
  ]

  // Calculate data points
  const dataPoints = data.map((item, i) => {
    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
    const x = centerX + radius * item.value * Math.cos(angle)
    const y = centerY + radius * item.value * Math.sin(angle)
    return { x, y, name: item.name }
  })

  // Create data path
  let dataPath = `M ${dataPoints[0].x} ${dataPoints[0].y}`
  for (let i = 1; i < 5; i++) {
    dataPath += ` L ${dataPoints[i].x} ${dataPoints[i].y}`
  }
  dataPath += " Z"

  // Create axis lines
  const axisLines = points.map((point) => `M ${centerX} ${centerY} L ${point.x} ${point.y}`)

  return (
    <div className="relative w-[120px] h-[120px]">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Web lines */}
        {webLines.map((path, i) => (
          <path key={`web-${i}`} d={path} fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
        ))}

        {/* Axis lines */}
        {axisLines.map((path, i) => (
          <path key={`axis-${i}`} d={path} stroke="white" strokeWidth="0.5" opacity="0.5" />
        ))}

        {/* Data area */}
        <path d={dataPath} fill="#0078ff" fillOpacity="0.3" stroke="#0078ff" strokeWidth="2" />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle key={`point-${i}`} cx={point.x} cy={point.y} r="3" fill="#0078ff" />
        ))}

        {/* Center point with star */}
        <path
          d="M60,60 L63,55 L60,50 L57,55 Z M60,60 L65,63 L70,60 L65,57 Z M60,60 L57,65 L60,70 L63,65 Z M60,60 L55,57 L50,60 L55,63 Z"
          fill="#0078ff"
        />

        {/* Labels */}
        <text x="60" y="5" textAnchor="middle" fill="white" fontSize="8">
          STR
        </text>
        <text x="115" y="60" textAnchor="middle" fill="white" fontSize="8">
          INT
        </text>
        <text x="85" y="110" textAnchor="middle" fill="white" fontSize="8">
          SPI
        </text>
        <text x="35" y="110" textAnchor="middle" fill="white" fontSize="8">
          DIS
        </text>
        <text x="5" y="60" textAnchor="middle" fill="white" fontSize="8">
          WIL
        </text>
      </svg>
    </div>
  )
}

