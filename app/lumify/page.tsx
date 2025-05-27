"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { CIcon } from "@coreui/icons-react"
import { cibSpotify } from "@coreui/icons"
import { Github, MessageCircle, Globe, PlayCircle, Code2 } from "lucide-react"
import { useLanyard } from "../hooks/use-lanyard"
import { GiCrown } from "react-icons/gi"
import { GiSpinningSword } from "react-icons/gi"
import Snowfall from "../../components/Snowfall"
import { MdOutlineCode } from "react-icons/md"
import { IoCheckmarkDoneSharp } from "react-icons/io5"
import { GiSeaDragon } from "react-icons/gi";
import { useMobile } from "@/hooks/use-mobile"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CUSTOM_STATUS = "It always seems impossible until it's done -Lumify"

export default function BioLink() {
  const { data: presence } = useLanyard("1131029123528138837")
  const [activityElapsedTime, setActivityElapsedTime] = useState<Record<string, string>>({})
  const [spotifyProgress, setSpotifyProgress] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const isMobile = useMobile()

  // Show error toast if Lanyard data fails to load

  useEffect(() => {
    const updateElapsedTimes = () => {
      if (presence?.activities) {
        const newElapsedTimes: Record<string, string> = {}
        presence.activities.forEach((activity) => {
          if (activity.timestamps?.start) {
            const start = new Date(activity.timestamps.start)
            const now = new Date()
            const diff = now.getTime() - start.getTime()

            const hours = Math.floor(diff / 3600000)
            const minutes = Math.floor((diff % 3600000) / 60000)
            const seconds = Math.floor((diff % 60000) / 1000)

            newElapsedTimes[activity.id] =
              `${hours > 0 ? `${hours}:` : ""}${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
          }
        })
        setActivityElapsedTime(newElapsedTimes)
      }
    }

    const updateSpotifyProgress = () => {
      if (presence?.spotify?.timestamps) {
        const { start, end } = presence.spotify.timestamps
        const now = Date.now()
        const total = end - start
        const current = now - start
        setSpotifyProgress((current / total) * 100)
      }
    }

    updateElapsedTimes()
    updateSpotifyProgress()
    const interval = setInterval(() => {
      updateElapsedTimes()
      updateSpotifyProgress()
    }, 1000)

    return () => clearInterval(interval)
  }, [presence])

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / 1000 / 60) % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return

    // Check if mouse has actually moved significantly to prevent glitching
    if (Math.abs(e.clientX - lastMousePos.current.x) < 2 && Math.abs(e.clientY - lastMousePos.current.y) < 2) {
      return
    }

    // Update last mouse position
    lastMousePos.current = { x: e.clientX, y: e.clientY }

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to the card center
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    // Calculate tilt values (adjust the divisor to control tilt intensity)
    const tiltX = -(y / 20)
    const tiltY = x / 20

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    // Reset tilt when mouse leaves the card
    setTilt({ x: 0, y: 0 })
  }

  useEffect(() => {
    // Show toast notification when the page loads
    toast.success("Successfully loaded @lumify", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }, [])

  return (
    <div className="min-h-screen text-white flex items-center justify-center p-4 relative overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Snowfall />
      {/* Background image instead of gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/lumify1.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>



      {/* Updated card styling with Discord-like metallic look */}
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="card-container w-full max-w-md bg-[#2f3136]/60 backdrop-blur-sm border border-[#40444b]/80 p-4 sm:p-6 md:p-8 rounded-xl space-y-4 sm:space-y-6 relative z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:rounded-xl before:-z-10 transition-transform duration-200 ease-out overflow-y-auto max-h-[85vh] md:max-h-none"
        style={{
          transform: isMobile ? "none" : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundPosition: `${50 + tilt.y * 2}% ${50 + tilt.x * 2}%`,
          }}
        />
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-3 sm:space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full blur-lg opacity-60" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              {presence?.discord_user && (
                <img
                  src={`https://cdn.discordapp.com/avatars/${presence.discord_user.id}/${presence.discord_user.avatar}.png`}
                  alt="Profile"
                  className="rounded-full border-2 border-white/10"
                  width={96}
                  height={96}
                />
              )}
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-black translate-x-1/4 translate-y-1/4 ${
                  presence?.discord_status === "online"
                    ? "bg-green-400"
                    : presence?.discord_status === "idle"
                      ? "bg-yellow-400"
                      : presence?.discord_status === "dnd"
                        ? "bg-red-400"
                        : "bg-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {/* Rainbow gradient username */}
              <h1 className="text-xl sm:text-2xl font-bold rainbow-text">
                {presence?.discord_user?.username || "Loading..."}
              </h1>
              {/* Badges with styled tooltips */}
              <div className="flex items-center justify-center">
                <div className="badges-container bg-black/20 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 border border-[#40444b]/50 overflow-visible relative">
                  {/* Shine effect container - kept inside the border */}
                  <div className="shine-container absolute inset-0 rounded-full overflow-hidden pointer-events-none"></div>
                  <div className="badge-container flex items-center justify-center">
                    <div className="icon-wrapper flex items-center justify-center w-5 h-5">
                      <IoCheckmarkDoneSharp className="badge-icon text-purple-600 animate-pulse-sync filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </div>
                    <div className="badge-tooltip">verified</div>
                    <div className="sparkle-container"></div>
                  </div>
                  <div className="badge-container flex items-center justify-center">
                    <div className="icon-wrapper flex items-center justify-center w-5 h-5">
                      <GiSpinningSword className="badge-icon text-blue-600 animate-pulse-sync filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </div>
                    <div className="badge-tooltip">hunter&apos;s association</div>
                    <div className="sparkle-container"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="custom-status text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
              {CUSTOM_STATUS || (presence?.discord_status ? presence.discord_status : "No Discord Status")}
            </p>
          </div>
        </div>

        {/* Spotify Status - Updated styling */}
        {presence?.listening_to_spotify && presence.spotify ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#36393f]/70 rounded-lg p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4 border border-[#40444b]/80 shadow-[0_0_10px_rgba(0,0,0,0.2)] spotify-card">
              {/* Spotify Header - Smaller size */}
              <div className="flex items-center gap-2">
                <span className="text-[12px] sm:text-[13px] text-gray-400 font-medium">Listening to Spotify</span>
                <CIcon
                  icon={cibSpotify}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                  style={{ color: "green", fill: "green" }}
                />
              </div>

              <div className="flex items-start space-x-3 sm:space-x-4">
                {/* Album Art */}
                <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={presence.spotify.album_art_url || "/placeholder.svg"}
                    alt="Album Art"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Song Title */}
                  <h3 className="text-[14px] sm:text-[16px] font-semibold text-white mb-1 truncate">
                    {presence.spotify.song}
                  </h3>

                  {/* Artist Name */}
                  <p className="text-[12px] sm:text-[13px] text-gray-400 truncate">{presence.spotify.artist}</p>
                </div>

                {/* Visualizer - Hide on very small screens */}
                <div className="hidden xs:flex gap-[2px] self-center">
                  {[0.4, 0.7, 0.5, 0.3].map((height, i) => (
                    <div
                      key={i}
                      className="w-[2px] sm:w-[3px] animate-pulse rounded-full bg-gray-300"
                      style={{
                        height: `${height * 14}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs text-gray-400 tabular-nums">
                  {formatTime(Date.now() - presence.spotify.timestamps.start)}
                </span>
                <div className="flex-1 h-[2px] sm:h-[3px] bg-gray-700 rounded-full overflow-hidden relative">
                  {/* Green progress bar */}
                  <div
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${spotifyProgress}%` }}
                  />

                  {/* White circle knob */}
                  <div
                    className="absolute top-1/2 w-[8px] h-[8px] bg-white rounded-full shadow-md transform -translate-y-1/2"
                    style={{
                      left: `calc(${spotifyProgress}% - 4px)`,
                      display: spotifyProgress > 0 ? "block" : "none",
                    }}
                  />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-400 tabular-nums">
                  {formatTime(presence.spotify.timestamps.end - presence.spotify.timestamps.start)}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Discord Activities - Updated styling */}
        {presence?.activities
          ?.filter((activity) => activity.name !== "Spotify")
          .map((activity) => (
            <div key={activity.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#36393f]/70 rounded-lg p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4 border border-[#40444b]/80 shadow-[0_0_10px_rgba(0,0,0,0.2)] activity-card">
                {/* Activity Status */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] sm:text-[13px] text-gray-400 font-medium">Playing</span>
                  <PlayCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-400" />
                </div>

                <div className="flex items-start space-x-3 sm:space-x-4">
                  {/* Code Icon */}
                  <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#4f545c]/40 to-[#36393f]/40 flex items-center justify-center">
                    {activity.name.toLowerCase().includes("code") || activity.name.toLowerCase().includes("dev") ? (
                      <div className="flex gap-[2px]">
                        {[0.3, 0.5, 0.7, 0.5].map((height, i) => (
                          <div
                            key={i}
                            className="w-[2px] sm:w-[3px] animate-pulse rounded-full bg-blue-400"
                            style={{
                              height: `${height * 35}px`,
                              animationDelay: `${i * 0.15}s`,
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Activity Name */}
                    <h3 className="text-[14px] sm:text-[16px] font-semibold text-white mb-1 truncate">
                      {activity.name}
                    </h3>

                    {/* Activity Details */}
                    {activity.details && (
                      <p className="text-[12px] sm:text-[13px] text-gray-400 truncate">{activity.details}</p>
                    )}
                    {activity.state && (
                      <p className="text-[12px] sm:text-[13px] text-gray-400 truncate">{activity.state}</p>
                    )}

                    {/* Elapsed Time */}
                    {activity.timestamps?.start && (
                      <p className="text-[10px] sm:text-[12px] text-gray-500 mt-1">
                        {activityElapsedTime[activity.id]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-4 sm:mt-6">
         
          <a
            href="https://discord.com/users/1131029123528138837"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
          <a
            href="https://exodevs.space/@lumify"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
        </div>
      </Card>

      {/* Global styles that will apply regardless of Spotify status */}
      <style jsx global>{`
        /* Custom Font */
        @font-face {
          font-family: 'SoloLevel';
          src: url('/fonts/SoloLevelDemo.otf') format('opentype'),
               url('/app/fonts/SoloLevelDemo.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        .custom-status {
          font-family: 'SoloLevel', sans-serif;
        }
        
        /* Activity Card Glowing Borders */
        .activity-card {
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .activity-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }

        /* Spotify Card Glowing Border */
        .spotify-card {
          position: relative;
          border: 1px solid rgba(29, 185, 84, 0.2);
          box-shadow: 0 0 10px rgba(29, 185, 84, 0.2);
          transition: all 0.3s ease;
        }

        .spotify-card:hover {
          border-color: rgba(29, 185, 84, 0.4);
          box-shadow: 0 0 15px rgba(29, 185, 84, 0.3);
        }

        /* Icon wrapper to ensure consistent sizing */
        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          width: 20px;
          position: relative;
        }
        
        .icon-wrapper svg {
          width: 16px;
          height: 16px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        @media (min-width: 640px) {
          .icon-wrapper {
            height: 20px;
            width: 20px;
          }
          
          .icon-wrapper svg {
            width: 18px;
            height: 18px;
          }
        }

        @keyframes border-pulse {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:flex {
            display: flex;
          }
        }
        
        /* Badge tooltip styling */
        .badge-tooltip {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) translateY(-100%);
          background-color: rgba(47, 49, 54, 0.95);
          color: grey;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          border: 1px solid rgba(79, 84, 92, 0.8);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          z-index: 50;
          pointer-events: none;
        }
        
        .badge-tooltip:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: rgba(47, 49, 54, 0.95) transparent transparent transparent;
        }
        
        .badge-container {
          position: relative;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          margin: 0 1px;
          z-index: 10; /* Add z-index to ensure hover works properly */
        }
        
        .badge-container:hover .badge-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-110%);
        }
        
        /* Synchronized pulse animation for all badges */
        @keyframes pulse-sync {
          0% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
          }
        }
        
        .animate-pulse-sync {
          animation: pulse-sync 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Enhanced sparkle effect */
        .sparkle-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        .badge-container:hover .sparkle-container::before,
        .badge-container:hover .sparkle-container::after {
          content: '';
          position: absolute;
          width: 3px;
          height: 3px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.8);
          opacity: 0;
        }
        
        /* Top sparkle */
        .badge-container:hover .sparkle-container::before {
          top: -5px;
          left: 50%;
          transform: translateX(-50%);
          animation: sparkleTop 1.2s ease-out infinite;
        }
        
        /* Right sparkle */
        .badge-container:nth-child(1):hover .sparkle-container::after {
          top: 50%;
          right: -5px;
          
          transform: translateY(-50%);
          animation: sparkleRight 1.2s ease-out 0.1s infinite;
        }
        
        /* Bottom sparkle - using additional elements */
        .badge-container:hover .sparkle-container::after {
          content: '';
          bottom: -5px;
          left: 50%;
          top: auto;
          transform: translateX(-50%);
          animation: sparkleBottom 1.2s ease-out 0.2s infinite;
        }
        
        /* Left sparkle - using additional elements */
        .badge-container:nth-child(2):hover .sparkle-container::after {
          content: '';
          top: 50%;
          left: -5px;
          right: auto;
          transform: translateY(-50%);
          animation: sparkleLeft 1.2s ease-out 0.3s infinite;
        }
        
        /* Diagonal sparkles for other badges */
        .badge-container:nth-child(3):hover .sparkle-container::after {
          content: '';
          top: -5px;
          right: -5px;
          left: auto;
          transform: none;
          animation: sparkleDiagonal1 1.2s ease-out 0.15s infinite;
        }
        
        .badge-container:nth-child(4):hover .sparkle-container::after {
          content: '';
          bottom: -5px;
          right: -5px;
          top: auto;
          left: auto;
          transform: none;
          animation: sparkleDiagonal2 1.2s ease-out 0.25s infinite;
        }
        
        /* Add more sparkles with pseudo-elements on the container */
        .badge-container:hover::before,
        .badge-container:hover::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: green;
          border-radius: 50%;
          box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.7);
          opacity: 0;
        }
        
        .badge-container:hover::before {
          top: 0;
          left: 0;
          animation: sparkleDiagonal3 1s ease-out 0.4s infinite;
        }
        
        .badge-container:hover::after {
          bottom: 0;
          left: 0;
          animation: sparkleDiagonal4 1s ease-out 0.5s infinite;
        }
        
        /* Sparkle animations */
        @keyframes sparkleTop {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(-15px);
          }
        }
        
        @keyframes sparkleRight {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(15px);
          }
        }
        
        @keyframes sparkleBottom {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
          }
        }
        
        @keyframes sparkleLeft {
          0% {
            opacity: 0;
            transform: translateY(-50%) translateX(0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-50%) translateX(-15px);
          }
        }
        
        @keyframes sparkleDiagonal1 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(10px, -10px);
          }
        }
        
        @keyframes sparkleDiagonal2 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(10px, 10px);
          }
        }
        
        @keyframes sparkleDiagonal3 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          30% {
            opacity:  1;
          }
          100% {
            opacity: 0;
            transform: translate(-10px, -10px);
          }
        }
        
        @keyframes sparkleDiagonal4 {
          0% {
            opacity: 0;
            transform: translate(0, 0);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-10px, 10px);
          }
        }
      
        .rainbow-text {
          background-image: linear-gradient(
                to right,
                #ff00ff,   /* Neon pink/purple */
                #c936ff,   /* Vivid purple */
                #884dff,   /* Soft purple */
                #567dff,   /* Bluish purple */
                #00cfff,   /* Cyan blue */
                #567dff,
                #884dff,
                #c936ff,
                #ff00ff
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: continuous-flow 12s linear infinite;
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
        }
        
        @keyframes continuous-flow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        /* Toast styles */
        .Toastify__toast-container {
          width: auto;
          max-width: 320px;
        }

        @media only screen and (max-width: 480px) {
          .Toastify__toast-container {
            width: 90%;
            max-width: 300px;
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .Toastify__toast {
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(47, 49, 54, 0.85) !important;
        }

        .Toastify__toast--success {
          border-left: 4px solid #43b581;
        }

        .Toastify__toast--error {
          border-left: 4px solid #f04747;
        }

        .Toastify__progress-bar {
          height: 3px;
          background: linear-gradient(to right, #43b581, #4f46e5) !important;
        }
          

        .Toastify__toast--error .Toastify__progress-bar {
          background: linear-gradient(to right, #f04747, #ff7a6b) !important;
        }

        .Toastify__close-button {
          color: rgba(255, 255, 255, 0.6);
          opacity: 0.7;
        }

        .Toastify__close-button:hover {
          color: rgba(255, 255, 255, 0.9);
          opacity: 1;
        }
        /* Badge container wrapper styling */
        .badge-container-wrapper {
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.1);
        }
        
        .badge-container-wrapper:hover {
          background-color: rgba(0, 0, 0, 0.2);
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3), inset 0 0 8px rgba(255, 255, 255, 0.15);
        }
        
        /* Add a subtle glow effect to the wrapper */
        .badge-container-wrapper::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent, rgba(255, 255, 255, 0.1), transparent);
          border-radius: inherit;
          z-index: -1;
          animation: rotate-gradient 6s linear infinite;
        }
        
        @keyframes rotate-gradient {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        /* Badges container styling */
        .badges-container {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: visible !important; /* Ensure sparkles and tooltips can extend outside */
        }
        
        /* Shine effect container */
        .shine-container {
          z-index: 1;
        }
        
        .shine-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .badges-container:hover .shine-container::before {
          opacity: 1;
          animation: shine 1.5s infinite;
        }

        /* Ensure tooltips have higher z-index */
        .badge-tooltip {
          z-index: 100 !important;
        }
        
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
