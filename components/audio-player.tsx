"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { motion } from "framer-motion"

interface AudioPlayerProps {
  audioFile: string
  theme: "morning" | "growth" | "empowerment"
  title: string
}

export default function AudioPlayer({ audioFile, theme, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [audioFile])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = (Number.parseFloat(e.target.value) / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newVolume = Number.parseFloat(e.target.value) / 100
    audio.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getPlayerStyles = () => {
    switch (theme) {
      case "morning":
        return {
          container: "bg-white/90 backdrop-blur-sm shadow-2xl border border-yellow-200/50",
          playButton:
            "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 shadow-lg hover:shadow-xl",
          seekBar: "accent-yellow-500",
          volumeBar: "accent-orange-400",
          text: "text-gray-800",
          glow: "shadow-yellow-200/50",
        }
      case "growth":
        return {
          container: "bg-white/95 backdrop-blur-sm shadow-lg border border-green-100",
          playButton: "bg-emerald-500 hover:bg-emerald-600 shadow-md",
          seekBar: "accent-emerald-500",
          volumeBar: "accent-green-400",
          text: "text-gray-700",
          glow: "",
        }
      case "empowerment":
        return {
          container: "bg-gray-900/90 backdrop-blur-sm shadow-2xl border border-blue-500/30",
          playButton:
            "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25",
          seekBar: "accent-blue-400",
          volumeBar: "accent-purple-400",
          text: "text-white",
          glow: "shadow-blue-500/20",
        }
      default:
        return {
          container: "bg-white shadow-lg",
          playButton: "bg-blue-500 hover:bg-blue-600",
          seekBar: "accent-blue-500",
          volumeBar: "accent-blue-400",
          text: "text-gray-800",
          glow: "",
        }
    }
  }

  const styles = getPlayerStyles()
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`rounded-3xl p-8 ${styles.container} ${styles.glow}`}
    >
      <audio ref={audioRef} src={audioFile} preload="metadata" />

      {/* Title */}
      <h2 className={`text-2xl font-bold mb-8 text-center ${styles.text}`}>{title}</h2>

      {/* Play Button */}
      <div className="flex justify-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${styles.playButton}`}
        >
          {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${styles.seekBar}`}
          style={{
            background: `linear-gradient(to right, currentColor ${progress}%, #e5e7eb ${progress}%)`,
          }}
        />
        <div className={`flex justify-between text-sm mt-2 ${styles.text}`}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-4">
        <button onClick={toggleMute} className={`p-2 rounded-lg transition-colors ${styles.text} hover:bg-black/10`}>
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume * 100}
          onChange={handleVolumeChange}
          className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${styles.volumeBar}`}
          style={{
            background: `linear-gradient(to right, currentColor ${isMuted ? 0 : volume * 100}%, #e5e7eb ${isMuted ? 0 : volume * 100}%)`,
          }}
        />
      </div>
    </motion.div>
  )
}
