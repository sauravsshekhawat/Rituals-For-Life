"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(128))
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array>(new Uint8Array(128))
  const animationRef = useRef<number>(0)

  const updateVisualization = useCallback(() => {
    if (analyserRef.current && dataArrayRef.current && isPlaying) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current)
      setAudioData(new Uint8Array(dataArrayRef.current))
    }
    animationRef.current = requestAnimationFrame(updateVisualization)
  }, [isPlaying])

  useEffect(() => {
    setIsClient(true)
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleLoadStart = () => setIsLoading(true)
    const handleLoadEnd = () => setIsLoading(false)
    const handleEnded = () => {
      setIsPlaying(false)
      cancelAnimationFrame(animationRef.current)
    }

    const setupAudioContext = () => {
      if (!analyserRef.current && typeof window !== 'undefined') {
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
          const analyser = audioContext.createAnalyser()
          const source = audioContext.createMediaElementSource(audio)
          source.connect(analyser)
          analyser.connect(audioContext.destination)
          analyser.fftSize = 256
          analyserRef.current = analyser
          dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
        } catch (error) {
          console.warn('Web Audio API not supported:', error)
        }
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("loadstart", handleLoadStart)
    audio.addEventListener("canplaythrough", handleLoadEnd)
    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("play", setupAudioContext)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("loadstart", handleLoadStart)
      audio.removeEventListener("canplaythrough", handleLoadEnd)
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("play", setupAudioContext)
      cancelAnimationFrame(animationRef.current)
    }
  }, [audioFile])

  useEffect(() => {
    if (isPlaying) {
      updateVisualization()
    } else {
      cancelAnimationFrame(animationRef.current)
    }
  }, [isPlaying, updateVisualization])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        await audio.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Error playing audio:', error)
    }
  }

  const skipForward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(audio.currentTime + 10, duration)
  }

  const skipBackward = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.max(audio.currentTime - 10, 0)
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
          container: "bg-white/20 backdrop-blur-xl shadow-2xl border border-yellow-200/30 backdrop-saturate-150",
          playButton:
            "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
          seekBar: "accent-yellow-500",
          volumeBar: "accent-orange-400",
          text: "text-gray-800",
          glow: "shadow-yellow-200/50 shadow-2xl",
          visualizerColor: "from-yellow-400 to-orange-500",
        }
      case "growth":
        return {
          container: "bg-white/25 backdrop-blur-xl shadow-2xl border border-green-200/40 backdrop-saturate-150",
          playButton: "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-lg transform hover:scale-105 transition-all duration-300",
          seekBar: "accent-emerald-500",
          volumeBar: "accent-green-400",
          text: "text-gray-700",
          glow: "shadow-emerald-200/50 shadow-xl",
          visualizerColor: "from-emerald-400 to-green-500",
        }
      case "empowerment":
        return {
          container: "bg-black/30 backdrop-blur-xl shadow-2xl border border-blue-500/40 backdrop-saturate-150",
          playButton:
            "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300",
          seekBar: "accent-blue-400",
          volumeBar: "accent-purple-400",
          text: "text-white",
          glow: "shadow-blue-500/30 shadow-2xl",
          visualizerColor: "from-blue-400 to-purple-500",
        }
      default:
        return {
          container: "bg-white/20 backdrop-blur-xl shadow-2xl",
          playButton: "bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-300",
          seekBar: "accent-blue-500",
          volumeBar: "accent-blue-400",
          text: "text-gray-800",
          glow: "",
          visualizerColor: "from-blue-400 to-blue-500",
        }
    }
  }

  const styles = getPlayerStyles()
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 20 }}
      className={`relative rounded-3xl p-8 ${styles.container} ${styles.glow} overflow-hidden`}
    >
      <audio ref={audioRef} src={audioFile} preload="metadata" />

      {/* 3D Audio Visualizer Background */}
      {isClient && (
        <div className="absolute inset-0 opacity-30 overflow-hidden rounded-3xl">
          <div className="flex items-end justify-center h-full gap-1 px-8">
            {Array.from({ length: 64 }, (_, i) => {
              const amplitude = audioData[i] || 0
              const height = Math.max(2, (amplitude / 255) * 100)
              return (
                <motion.div
                  key={i}
                  className={`w-1 bg-gradient-to-t ${styles.visualizerColor} rounded-full`}
                  animate={{
                    height: `${height}%`,
                    opacity: isPlaying ? 0.8 : 0.2,
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: 'bottom',
                  }}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with glass effect */}
      <div className="relative z-20">
        {/* Title with enhanced typography */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl font-bold mb-8 text-center ${styles.text} tracking-wide drop-shadow-lg`}
        >
          {title}
        </motion.h2>

        {/* Enhanced Control Section */}
        <div className="flex justify-center items-center mb-8 gap-4">
          {/* Skip Backward */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipBackward}
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-300 ${styles.text} backdrop-blur-sm`}
          >
            <SkipBack className="w-5 h-5" />
          </motion.button>

          {/* Play/Pause Button - Enhanced */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${styles.playButton} overflow-hidden`}
          >
            {/* Pulsing ring effect when playing */}
            <AnimatePresence>
              {isPlaying && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                />
              )}
            </AnimatePresence>
            
            <motion.div
              initial={false}
              animate={{ rotate: isPlaying ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isPlaying ? <Pause className="w-10 h-10 text-white" /> : <Play className="w-10 h-10 text-white ml-1" />}
            </motion.div>
          </motion.button>

          {/* Skip Forward */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={skipForward}
            className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-all duration-300 ${styles.text} backdrop-blur-sm`}
          >
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Enhanced Progress Bar with gradient and glow */}
        <div className="mb-8">
          <div className="relative mb-3">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className={`w-full h-3 rounded-full appearance-none cursor-pointer ${styles.seekBar} relative z-10`}
              style={{
                background: `linear-gradient(to right, 
                  ${theme === 'morning' ? '#f59e0b' : theme === 'growth' ? '#10b981' : '#3b82f6'} ${progress}%, 
                  rgba(255,255,255,0.2) ${progress}%)`,
              }}
            />
            {/* Progress glow effect */}
            <div 
              className="absolute top-0 left-0 h-3 rounded-full blur-sm opacity-50"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(to right, 
                  ${theme === 'morning' ? '#fbbf24' : theme === 'growth' ? '#34d399' : '#60a5fa'}, 
                  ${theme === 'morning' ? '#f59e0b' : theme === 'growth' ? '#10b981' : '#3b82f6'})`,
              }}
            />
          </div>
          <div className={`flex justify-between text-sm ${styles.text} font-medium`}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Enhanced Volume Control with additional buttons */}
        <div className="flex items-center gap-4">
          {/* Additional Controls */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg transition-all duration-300 ${styles.text} hover:bg-white/20 backdrop-blur-sm`}
          >
            <Repeat className="w-4 h-4" />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-lg transition-all duration-300 ${styles.text} hover:bg-white/20 backdrop-blur-sm`}
          >
            <Shuffle className="w-4 h-4" />
          </motion.button>

          {/* Volume */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute} 
            className={`p-2 rounded-lg transition-all duration-300 ${styles.text} hover:bg-white/20 backdrop-blur-sm`}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
          
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${styles.volumeBar}`}
              style={{
                background: `linear-gradient(to right, 
                  ${theme === 'morning' ? '#fb923c' : theme === 'growth' ? '#22c55e' : '#a855f7'} ${isMuted ? 0 : volume * 100}%, 
                  rgba(255,255,255,0.2) ${isMuted ? 0 : volume * 100}%)`,
              }}
            />
            {/* Volume level indicator */}
            <div className="flex justify-between text-xs mt-1 opacity-60">
              <span className={styles.text}>0</span>
              <span className={styles.text}>100</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
