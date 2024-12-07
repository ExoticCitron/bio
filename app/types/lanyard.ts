export interface LanyardResponse {
    success: boolean
    data: {
      spotify: SpotifyData | null
      discord_user: DiscordUser
      discord_status: string
      activities: Activity[]
      listening_to_spotify: boolean
      active_on_discord_desktop: boolean
      active_on_discord_mobile: boolean
    }
  }
  
  interface SpotifyData {
    track_id: string
    timestamps: {
      start: number
      end: number
    }
    song: string
    artist: string
    album_art_url: string
    album: string
  }
  
  interface DiscordUser {
    id: string
    username: string
    avatar: string
    discriminator: string
    public_flags: number
  }
  
  interface Activity {
    type: number
    state: string
    name: string
    id: string
    created_at: number
    timestamps?: {
      start: number
      end?: number
    }
    application_id?: string
    details?: string
    emoji?: {
      name: string
      id?: string
      animated?: boolean
    }
    party?: {
      id: string
      size?: [number, number]
    }
    assets?: {
      large_image?: string
      large_text?: string
      small_image?: string
      small_text?: string
    }
    secrets?: {
      join?: string
      spectate?: string
      match?: string
    }
    instance?: boolean
    flags?: number
  }
  
  