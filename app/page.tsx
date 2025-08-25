"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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

  const getBackgroundClass = (theme: string) => {
    switch (theme) {
      case "morning":
        return "bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300"
      case "growth":
        return "bg-gradient-to-br from-white via-green-50 to-emerald-100"
      case "empowerment":
        return "bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900"
      default:
        return "bg-white"
    }
  }

  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
<div className={`min-h-screen relative transition-all duration-700 ${getBackgroundClass(activeTab)}`}>
  {/* Animated background effects */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {activeTab === "morning" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-orange-300/40 rounded-full blur-lg animate-bounce" />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-pulse" />
      </motion.div>
    )}

    {activeTab === "empowerment" && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>
    )}
  </div>

  {/* Logo and content */}
  <div className="relative z-10 flex flex-col items-center">
    {/* Logo at the top */}
    <div className="w-full flex justify-center mt-12 mb-8">
   <h1
  className={`text-4xl md:text-5xl text-center tracking-wide`}
  style={{
    fontFamily: '"Texturina", serif',
    fontStyle: 'italic',
    letterSpacing: '1px',
    color: activeTab === "morning" || activeTab === "growth" ? "black" : "white",
    textShadow:
      activeTab === "empowerment"
        ? `0 2px 4px rgba(0,0,0,0.4),
           0 4px 8px rgba(0,0,0,0.3),
           0 6px 12px rgba(0,0,0,0.2)`
        : "none",
  }}
>
  Rituals for Life
</h1>


    </div>

    {/* Tab Navigation */}
    <nav className="flex justify-center pt-4 px-4 w-full">
      <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === tab.id ? "bg-white shadow-lg text-gray-900" : "text-gray-700 hover:bg-white/50"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </nav>

    {/* Content Area */}
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
</div>

  )
}
