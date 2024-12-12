'use client'

import { useState, useEffect } from 'react'
import type { LanyardResponse } from '../types/lanyard'

export function useLanyard(userId: string) {
  const [data, setData] = useState<LanyardResponse['data'] | null>(null)

  useEffect(() => {
    const ws = new WebSocket('wss://api.lanyard.rest/socket')
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        op: 2,
        d: {
          subscribe_to_id: userId
        }
      }))
    }

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data)

      if (json.op === 1) {
        setInterval(() => {
          ws.send(JSON.stringify({ op: 3 }))
        }, json.d.heartbeat_interval)
      }

      if (json.op === 0) {
        if (json.t === 'INIT_STATE' || json.t === 'PRESENCE_UPDATE') {
          setData(json.d)
        }
      }
    }

    return () => {
      ws.close()
    }
  }, [userId])

  return { data }
}

