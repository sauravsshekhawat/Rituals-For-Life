"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import AudioPlayer from "@/components/audio-player"

const tabs = [
  {
    id: "morning",
    title: "🔆 Morning Listen",
    audioFile: "/Morning Listen.mp3",
    theme: "morning",
  },
  {
    id: "growth",
    title: "🌿 Growth",
    audioFile: "/Ritual_For Growth_ - Xqdrt - SoundLoadMate.com.mp3",
    theme: "growth",
  },
  {
    id: "empowerment",
    title: "🌌 Empowerment",
    audioFile: "/Ritual_To Empower_ - Xqdrt - SoundLoadMate.com.mp3",
    theme: "empowerment",
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("morning")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getBackgroundClass = (theme: string) => {
    switch (theme) {
      case "morning":
        return "bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300"
      case "growth":
        return "bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100"
      case "empowerment":
        return "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
      default:
        return "bg-white"
    }
  }

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div className={`min-h-screen relative transition-all duration-700 ${getBackgroundClass(activeTab)}`}>
      {/* Enhanced Animated backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${
              activeTab === 'morning' ? 'rgba(251, 191, 36, 0.1)' :
              activeTab === 'growth' ? 'rgba(34, 197, 94, 0.1)' :
              'rgba(59, 130, 246, 0.1)'
            } 0%, transparent 70%)`,
          }}
          animate={{
            x: mousePosition.x - 128,
            y: mousePosition.y - 128,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
          }}
        />

        {activeTab === "morning" && isClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Floating orbs */}
            {[...Array(8)].map((_, i) => {
              const orbSize = 60 + (i * 10) % 80
              const orbLeft = (i * 13) % 100
              const orbTop = (i * 17) % 100
              return (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-r from-yellow-300/40 to-orange-300/40 rounded-full blur-xl"
                  style={{
                    width: `${orbSize}px`,
                    height: `${orbSize}px`,
                    left: `${orbLeft}%`,
                    top: `${orbTop}%`,
                  }}
                  animate={{
                    x: [0, 30, -20, 0],
                    y: [0, -40, 20, 0],
                    scale: [1, 1.2, 0.8, 1],
                    opacity: [0.3, 0.7, 0.4, 0.3],
                  }}
                  transition={{
                    duration: 8 + (i % 4),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              )
            })}
            
            {/* Wave effect */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-300/20 to-transparent"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}

        {activeTab === "growth" && isClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Organic growth patterns */}
            {[...Array(12)].map((_, i) => {
              const patternSize = 40 + (i * 5) % 60
              const patternLeft = (i * 8.3) % 100
              const patternTop = (i * 7.7) % 100
              return (
                <motion.div
                  key={i}
                  className="absolute bg-gradient-to-r from-emerald-300/30 to-green-400/30 rounded-full blur-lg"
                  style={{
                    width: `${patternSize}px`,
                    height: `${patternSize}px`,
                    left: `${patternLeft}%`,
                    top: `${patternTop}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6 + (i % 4),
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              )
            })}
            
            {/* Growing vines effect */}
            {[...Array(6)].map((_, i) => {
              const vineHeight = 100 + (i * 20) % 200
              return (
                <motion.div
                  key={`vine-${i}`}
                  className="absolute bg-gradient-to-r from-green-400/20 to-emerald-500/20"
                  style={{
                    width: '2px',
                    height: `${vineHeight}px`,
                    left: `${10 + i * 15}%`,
                    bottom: 0,
                    transformOrigin: 'bottom',
                  }}
                  animate={{
                    scaleY: [0, 1, 0.8, 1],
                    opacity: [0, 0.6, 0.4, 0.6],
                  }}
                  transition={{
                    duration: 4 + (i % 2),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              )
            })}
          </motion.div>
        )}

        {activeTab === "empowerment" && isClient && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {/* Constellation effect */}
            {[...Array(40)].map((_, i) => {
              const x = (i * 2.5) % 100
              const y = (i * 2.3) % 100
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.5, 0.5],
                  }}
                  transition={{
                    duration: 2 + (i % 3),
                    repeat: Infinity,
                    delay: (i % 10) * 0.2,
                  }}
                />
              )
            })}
            
            {/* Connecting lines */}
            {[...Array(8)].map((_, i) => {
              const lineWidth = 100 + (i * 25) % 200
              const lineLeft = (i * 10) % 80
              const lineTop = (i * 9) % 80 + 10
              const lineRotation = (i * 45) % 360
              return (
                <motion.div
                  key={`line-${i}`}
                  className="absolute bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                  style={{
                    height: '1px',
                    width: `${lineWidth}px`,
                    left: `${lineLeft}%`,
                    top: `${lineTop}%`,
                    transform: `rotate(${lineRotation}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scaleX: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + (i % 2),
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                />
              )
            })}
            
            {/* Nebula clouds */}
            {[...Array(5)].map((_, i) => {
              const nebulaSize = 200 + (i * 60) % 300
              const nebulaLeft = (i * 20) % 80
              const nebulaTop = (i * 16) % 80
              return (
                <motion.div
                  key={`nebula-${i}`}
                  className="absolute rounded-full blur-3xl"
                  style={{
                    width: `${nebulaSize}px`,
                    height: `${nebulaSize}px`,
                    left: `${nebulaLeft}%`,
                    top: `${nebulaTop}%`,
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20 + (i * 2),
                    repeat: Infinity,
                    delay: i * 2,
                  }}
                />
              )
            })}
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full pb-32">
        {/* Enhanced Logo with animations */}
        <motion.div 
          className="w-full flex justify-center mt-12 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl text-center tracking-wide relative"
            style={{
              fontFamily: '"Texturina", serif',
              fontStyle: 'italic',
              letterSpacing: '2px',
              color: activeTab === "morning" || activeTab === "growth" ? "black" : "white",
              textShadow:
                activeTab === "empowerment"
                  ? `0 0 20px rgba(59, 130, 246, 0.5),
                     0 2px 4px rgba(0,0,0,0.4),
                     0 4px 8px rgba(0,0,0,0.3),
                     0 6px 12px rgba(0,0,0,0.2)`
                  : activeTab === "morning"
                  ? `0 0 15px rgba(251, 191, 36, 0.3),
                     0 2px 4px rgba(0,0,0,0.1)`
                  : `0 0 15px rgba(34, 197, 94, 0.3),
                     0 2px 4px rgba(0,0,0,0.1)`,
            }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
          >
            <motion.span
              animate={isClient ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className={activeTab === 'empowerment' ? 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent' : ''}
              style={isClient && activeTab === 'empowerment' ? {
                backgroundImage: 'linear-gradient(90deg, #60a5fa, #a855f7, #ec4899, #60a5fa)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              } : {}}
            >
              Rituals for Life
            </motion.span>
            
            {/* Underline effect */}
            <motion.div
              className={`absolute bottom-0 left-1/2 h-1 opacity-70 ${
                activeTab === 'morning' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                  : activeTab === 'growth'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              initial={{ width: 0, x: '-50%' }}
              animate={{ width: '80%' }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.h1>
        </motion.div>

        {/* Enhanced Tabs with better animations */}
        <motion.nav 
          className="flex justify-center pt-4 px-4 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex bg-white/20 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white/20">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-500 overflow-hidden ${
                  activeTab === tab.id 
                    ? "bg-white/90 shadow-xl text-gray-900 backdrop-blur-sm" 
                    : "text-gray-700 hover:bg-white/30 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {/* Active tab glow */}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                )}
                
                <span className="relative z-10">{tab.title}</span>
                
                {/* Ripple effect on click */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-2xl"
                  initial={{ scale: 0, opacity: 0.5 }}
                  whileTap={{ scale: 1, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.nav>

        {/* Audio player */}
        <div className="flex justify-center items-center w-full min-h-[calc(100vh-200px)] px-4 mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-2xl"
            >
              {activeTabData && (
                <AudioPlayer
                  audioFile={activeTabData.audioFile}
                  theme={activeTabData.theme}
                  title={activeTabData.title}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="w-full bg-white/15 backdrop-blur-xl py-6 flex justify-center items-center gap-8 fixed bottom-0 left-0 z-20 border-t border-white/20">
        <motion.a
          href="https://github.com/sauravsshekhawat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-gray-900 hover:text-black font-semibold transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaGithub size={28} />
          </motion.div>
          <span>GitHub</span>
        </motion.a>
        
        <div className="w-px h-8 bg-gray-400/50" />
        
        <motion.a
          href="https://www.linkedin.com/in/saurav-singh-shekhawat-b76509258/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-blue-700 hover:text-blue-900 font-semibold transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaLinkedin size={28} />
          </motion.div>
          <span>LinkedIn</span>
        </motion.a>
      </footer>
    </div>
  ) 
}
