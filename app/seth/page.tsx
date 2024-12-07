// app/hoithung/page.tsx
'use client'

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Diamond, Star, Trophy, Clock, Music2, Github, MessageCircle, Globe } from 'lucide-react';
import { useLanyard } from '../hooks/use-lanyard';
import Snowfall from '../../components/Snowfall';


const CUSTOM_STATUS = "avid talk tuah fan";

export default function BioLink() {
  const { data: presence } = useLanyard('708647339413209129');
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const updateElapsedTime = () => {
      if (presence?.activities?.[0]?.timestamps?.start) {
        const start = new Date(presence.activities[0].timestamps.start);
        const now = new Date();
        const diff = now.getTime() - start.getTime();
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        setTimeElapsed(`${hours}h ${minutes}m`);
      }
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 60000);

    return () => clearInterval(interval);
  }, [presence]);

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
                  src={`https://api.lanyard.rest/${presence.discord_user.id}.png`}
                  alt="Profile"
                  className="rounded-full border-2 border-white/10"
                  width={96}
                  height={96}
                />
              )}
              <div
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-black translate-x-1/4 translate-y-1/4 ${
                  presence?.discord_status === 'online'
                    ? 'bg-green-400'
                    : presence?.discord_status === 'idle'
                    ? 'bg-yellow-400'
                    : presence?.discord_status === 'dnd'
                    ? 'bg-red-400'
                    : 'bg-gray-400'
                }`}
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]">
              {presence?.discord_user?.username || 'Loading...'}
            </h1>
            <p className="text-gray-400">
              {CUSTOM_STATUS || (presence?.discord_status ? presence.discord_status : 'No Discord Status')}
            </p>
          </div>

          <div className="flex space-x-2">
            {['Clock', 'Diamond', 'Star', 'Trophy'].map((icon) => (
              <Badge
                key={icon}
                variant="secondary"
                className="bg-white/5 hover:bg-white/10 transition-all duration-300 ease-in-out"
              >
                <span className="w-4 h-4 mr-1 text-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  {icon === 'Clock' && <Clock className="w-full h-full" />}
                  {icon === 'Diamond' && <Diamond className="w-full h-full" />}
                  {icon === 'Star' && <Star className="w-full h-full" />}
                  {icon === 'Trophy' && <Trophy className="w-full h-full" />}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Discord Presence */}
        {presence?.listening_to_spotify && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-700/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/50 rounded-lg p-4 flex items-center justify-between border border-gray-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  {presence.spotify?.album_art_url && (
                    <img
                      src={presence.spotify.album_art_url}
                      alt="Album Art"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Music2 className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500 font-semibold">Listening to Spotify</span>
                  </div>
                  <h3 className="font-medium text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">{presence.spotify?.song}</h3>
                  <p className="text-sm text-green-400">by {presence.spotify?.artist}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {presence?.activities?.filter((a) => a.type !== 2).map((activity) => (
          <div key={activity.name} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-700/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/50 rounded-lg p-4 flex items-center justify-between border border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
                  {activity.assets?.small_image && (
                    <img
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`}
                      alt={activity.name}
                      className="w-6 h-6"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">{activity.name}</h3>
                  {activity.details && <p className="text-sm text-blue-400">{activity.details}</p>}
                  {activity.state && <p className="text-sm text-blue-400">{activity.state}</p>}
                  {activity.timestamps?.start && (
                    <p className="text-xs text-blue-400 mt-1">Elapsed time: {timeElapsed}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="https://github.com/notkanyewest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
          <a
            href="https://discord.com/users/708647339413209129"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MessageCircle className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
          <a
            href="https://exodevs.space/seth"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Globe className="w-6 h-6 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" />
          </a>
        </div>
      </Card>
    </div>
  );
}
