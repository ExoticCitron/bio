"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Crown, Music2, Github, MessageCircle, Globe, PlayCircle, Code2 } from "lucide-react"
import { useLanyard } from "../hooks/use-lanyard"
import Snowfall from "../../components/Snowfall"

const CUSTOM_STATUS = "chessy wessy"

export default function BioLink() {
  const { data: presence } = useLanyard("1162847350956511233")
  const [activityElapsedTime, setActivityElapsedTime] = useState<Record<string, string>>({})
  const [spotifyProgress, setSpotifyProgress] = useState(0)

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

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <Snowfall />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black mix-blend-overlay" />
      <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-gray-800 p-8 rounded-xl space-y-6 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-full blur-lg opacity-60" />
            <div className="relative w-24 h-24">
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
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black translate-x-1/4 translate-y-1/4 ${
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
            <div className="flex items-center justify-center space-x-2">
              <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
                {presence?.discord_user?.username || "Loading..."}
              </h1>
              {/* Verified Badge */}
              <div className="relative group">
                <Crown className="w-5 h-5 text-white animate-pulse filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium whitespace-nowrap text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,1)]">
                  founder
                </span>
              </div>
            </div>
            <p className="text-gray-400 mt-2">
              {CUSTOM_STATUS || (presence?.discord_status ? presence.discord_status : "No Discord Status")}
            </p>
          </div>
        </div>

        {/* Spotify Status */}
        {presence?.listening_to_spotify && presence.spotify && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/50 rounded-lg p-4 flex flex-col space-y-4 border border-gray-800">
              {/* Spotify Header - Smaller size */}
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-gray-400 font-medium">Listening to Spotify</span>
                <Music2 className="w-3.5 h-3.5 text-gray-400" />
              </div>

              <div className="flex items-start space-x-4">
                {/* Album Art */}
                <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={presence.spotify.album_art_url || "/placeholder.svg"}
                    alt="Album Art"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Song Title */}
                  <h3 className="text-[16px] font-semibold text-white mb-1 truncate">{presence.spotify.song}</h3>

                  {/* Artist Name */}
                  <p className="text-[13px] text-gray-400 truncate">{presence.spotify.artist}</p>
                </div>

                {/* Visualizer */}
                <div className="flex gap-[2px] self-center">
                  {[0.4, 0.7, 0.5, 0.3].map((height, i) => (
                    <div
                      key={i}
                      className="w-[3px] animate-pulse rounded-full bg-gray-300"
                      style={{
                        height: `${height * 16}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 tabular-nums">
                  {formatTime(Date.now() - presence.spotify.timestamps.start)}
                </span>
                <div className="flex-1 h-[3px] bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-linear"
                    style={{ width: `${spotifyProgress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400 tabular-nums">
                  {formatTime(presence.spotify.timestamps.end - presence.spotify.timestamps.start)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Discord Activities */}
        {presence?.activities
          ?.filter((activity) => activity.name !== "Spotify")
          .map((activity) => (
            <div key={activity.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-900/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-black/50 rounded-lg p-4 flex flex-col space-y-4 border border-gray-800">
                {/* Activity Status */}
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-gray-400 font-medium">Playing</span>
                  <PlayCircle className="w-3.5 h-3.5 text-gray-400" />
                </div>

                <div className="flex items-start space-x-4">
                  {/* Code Icon */}
                  <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
                    <Code2 className="w-8 h-8 text-blue-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Activity Name */}
                    <h3 className="text-[16px] font-semibold text-white mb-1 truncate">{activity.name}</h3>

                    {/* Activity Details */}
                    {activity.details && <p className="text-[13px] text-gray-400 truncate">{activity.details}</p>}
                    {activity.state && <p className="text-[13px] text-gray-400 truncate">{activity.state}</p>}

                    {/* Elapsed Time */}
                    {activity.timestamps?.start && (
                      <p className="text-[12px] text-gray-500 mt-1">{activityElapsedTime[activity.id]}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="https://github.com/ExoticCitron"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
          <a
            href="https://discord.com/users/1245114941610922007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MessageCircle className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
          <a
            href="https://exodevs.space/exo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Globe className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
        </div>
      </Card>
    </div>
  )
}

