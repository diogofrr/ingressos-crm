import { useState } from "react";

export default function useLoading(initialState?: boolean) {
  const [loading, setLoading] = useState(initialState ?? false)

  const handleStartLoading = () => setLoading(true)
  const handleStopLoading = () => setLoading(false)

  return {
    loading,
    handleStartLoading,
    handleStopLoading
  }
}