interface SpotifyProgressBarProps {
    progress: number
    currentTime: string
    totalTime: string
  }
  
  export default function SpotifyProgressBar({ progress, currentTime, totalTime }: SpotifyProgressBarProps) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-[10px] sm:text-xs text-gray-400 tabular-nums">{currentTime}</span>
        <div className="flex-1 h-[2px] sm:h-[3px] bg-gray-700 rounded-full overflow-hidden relative">
          {/* Green progress bar */}
          <div
            className="h-full bg-[#1DB954] rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${progress}%` }}
          />
  
          {/* White circle knob */}
          <div
            className="absolute top-1/2 w-[8px] h-[8px] bg-white rounded-full shadow-md transform -translate-y-1/2"
            style={{
              left: `calc(${progress}% - 4px)`,
              display: progress > 0 ? "block" : "none",
            }}
          />
        </div>
        <span className="text-[10px] sm:text-xs text-gray-400 tabular-nums">{totalTime}</span>
      </div>
    )
  }
  
