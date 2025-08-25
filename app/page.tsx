"use client"

import { useState } from "react"
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
      {/* Animated backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {activeTab === "morning" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl animate-pulse" />
            <div className="absolute top-40 right-32 w-24 h-24 bg-orange-300/40 rounded-full blur-lg animate-bounce" />
            <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-yellow-200/20 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        )}

        {activeTab === "empowerment" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full pb-32">
        {/* Logo */}
        <div className="w-full flex justify-center mt-12 mb-8">
          <h1
            className="text-4xl md:text-5xl text-center tracking-wide"
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

        {/* Tabs */}
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

      {/* Footer */}
      <footer className="w-full bg-white/10 backdrop-blur-sm py-6 flex justify-center items-center gap-6 fixed bottom-0 left-0 z-20">
        <a
          href="https://github.com/sauravsshekhawat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-900 hover:text-black font-medium"
        >
          <FaGithub size={24} />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/saurav-singh-shekhawat-b76509258/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"
        >
          <FaLinkedin size={24} />
          LinkedIn
        </a>
      </footer>
    </div>
  ) 
}
