import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useFetch(endpoint, options) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchData() {
      setLoading(true)
      try {
        const res = await api.get(endpoint, options)
        if (mounted) setData(res)
      } catch (err) {
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [endpoint, JSON.stringify(options)])

  return { data, loading, error }
}
