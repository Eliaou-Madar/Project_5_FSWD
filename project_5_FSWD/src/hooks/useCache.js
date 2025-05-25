import { useContext } from 'react'
import { CacheContext } from '../context/CacheContext'

export default function useCache() {
  return useContext(CacheContext)
}
