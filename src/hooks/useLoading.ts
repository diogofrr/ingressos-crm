import { useState } from "react";

export default function useLoading() {
  const [loading, setLoading] = useState(false)

  const handleStartLoading = () => setLoading(true)
  const handleStopLoading = () => setLoading(false)

  return {
    loading,
    handleStartLoading,
    handleStopLoading
  }
}