import React, { createContext, useState } from 'react'

export const CacheContext = createContext()

export function CacheProvider({ children }) {
  const [cache, setCache] = useState({})

  const get = key => cache[key]
  const set = (key, data) => setCache(prev => ({ ...prev, [key]: data }))
  const clear = key => {
    if (key) {
      setCache(prev => {
        const { [key]: _, ...rest } = prev
        return rest
      })
    } else {
      setCache({})
    }
  }

  return (
    <CacheContext.Provider value={{ get, set, clear }}>
      {children}
    </CacheContext.Provider>
  )
}
