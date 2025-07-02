"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"

// 🎯 Example custom prompts for better story generation
const examplePrompts = [
  "Ravi always took the last train home. But tonight, the train stopped at a dark, unknown platform in Mumbai. The sign said: 'Platform Zero'. Nervous but curious, he stepped out...",
  "Priya opened the dusty film projector left by her grandfather. As it flickered to life, she saw a movie... that predicted her future.",
  "In 1987, a Bollywood actress disappeared from a movie set. 30 years later, a filmmaker finds unreleased footage that shows what really happened.",
  "A struggling actor from Delhi finds a magical ring that lets him read directors' minds—but each wish comes with a cost.",
  "A journalist receives a tip about a haunted theatre in Bandra, where every film played ends with a real death.",
  "She married a man who only existed in her dreams. Until one day, she saw him in a crowd at CST station.",
]

function App() {
  const [prompt, setPrompt] = useState("")
  const [temperature, setTemperature] = useState(1.0)
  const [maxLength, setMaxLength] = useState(150)
  const [loading, setLoading] = useState(false)
  const [story, setStory] = useState(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const storyRef = useRef(null)
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  
  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.")
      return
    }
    setLoading(true)
    setStory(null) // Clear previous story
    try {
      const res = await axios.post(`${API_BASE_URL}/generate`, {
        prompt,
        temperature,
        max_length: maxLength,
      })
      setStory(res.data)
    } catch (error) {
      console.error("API Error:", error)
      alert("Something went wrong!")
    }
    setLoading(false)
  }

  // Auto-scroll to story when it's generated
  useEffect(() => {
    if (story && storyRef.current) {
      // Show scroll indicator briefly
      setShowScrollIndicator(true)

      // Smooth scroll to story after a short delay
      setTimeout(() => {
        storyRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
        setShowScrollIndicator(false)
      }, 500)
    }
  }, [story])

  const useRandomPrompt = () => {
    const random = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
    setPrompt(random)
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#0f0f0f",
      color: "#ffffff",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      position: "relative",
      margin: 0,
      padding: 0,
      width: "100%",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "25px 15px", // Reduced padding
    },
    header: {
      textAlign: "center",
      marginBottom: "40px", // Reduced margin
      borderBottom: "1px solid #2a2a2a",
      paddingBottom: "30px", // Reduced padding
    },
    iconContainer: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "50px", // Smaller icon
      height: "50px",
      backgroundColor: "#d4af37",
      borderRadius: "8px",
      marginBottom: "15px", // Reduced margin
    },
    title: {
      fontSize: "36px", // Smaller title
      fontWeight: "300",
      color: "#ffffff",
      marginBottom: "10px",
      letterSpacing: "0.5px",
      margin: "0 0 10px 0",
    },
    subtitle: {
      fontSize: "16px", // Smaller subtitle
      color: "#a0a0a0",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      fontWeight: "300",
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "30px", // Reduced gap
      alignItems: "start",
    },
    leftColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "20px", // Reduced gap
    },
    card: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: "12px",
      padding: "25px", // Reduced padding
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
    label: {
      display: "block",
      color: "#d4af37",
      fontSize: "16px",
      fontWeight: "500",
      marginBottom: "12px", // Reduced margin
      letterSpacing: "0.3px",
      margin: "0 0 12px 0",
    },
    textarea: {
      width: "100%",
      height: "120px", // Reduced height
      backgroundColor: "#0f0f0f",
      border: "1px solid #3a3a3a",
      borderRadius: "8px",
      padding: "16px",
      color: "#ffffff",
      fontSize: "15px",
      resize: "none",
      outline: "none",
      transition: "border-color 0.2s ease",
      fontFamily: "inherit",
      lineHeight: "1.5",
    },
    randomButton: {
      marginTop: "12px", // Reduced margin
      display: "inline-flex",
      alignItems: "center",
      padding: "8px 16px", // Reduced padding
      backgroundColor: "transparent",
      color: "#d4af37",
      border: "1px solid #d4af37",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "14px",
      fontWeight: "400",
      letterSpacing: "0.3px",
    },
    generateButton: {
      width: "100%",
      backgroundColor: "#d4af37",
      color: "#000000",
      fontWeight: "500",
      padding: "16px 32px", // Slightly reduced padding
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "16px",
      letterSpacing: "0.5px",
    },
    generateButtonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    settingsCard: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: "12px",
      padding: "20px", // Reduced padding
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
    settingsTitle: {
      color: "#ffffff",
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "20px", // Reduced margin
      display: "flex",
      alignItems: "center",
      margin: "0 0 20px 0",
      letterSpacing: "0.3px",
    },
    sliderContainer: {
      marginBottom: "20px", // Reduced margin
    },
    sliderLabel: {
      display: "block",
      color: "#a0a0a0",
      fontSize: "14px",
      fontWeight: "400",
      marginBottom: "10px", // Reduced margin
    },
    slider: {
      width: "100%",
      height: "4px",
      backgroundColor: "#3a3a3a",
      borderRadius: "2px",
      outline: "none",
      cursor: "pointer",
      appearance: "none",
    },
    sliderLabels: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      color: "#666666",
      marginTop: "6px", // Reduced margin
    },
    tipsCard: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: "12px",
      padding: "20px", // Reduced padding
      marginTop: "15px", // Reduced margin
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    },
    tipsTitle: {
      color: "#d4af37",
      fontWeight: "500",
      marginBottom: "12px", // Reduced margin
      display: "flex",
      alignItems: "center",
      margin: "0 0 12px 0",
      fontSize: "16px",
      letterSpacing: "0.3px",
    },
    tipsList: {
      color: "#a0a0a0",
      fontSize: "14px",
      lineHeight: "1.6",
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    tipsListItem: {
      marginBottom: "6px", // Reduced margin
      paddingLeft: "15px",
      position: "relative",
    },
    storyCard: {
      marginTop: "30px", // Reduced margin
      backgroundColor: "#1a1a1a",
      border: "1px solid #2a2a2a",
      borderRadius: "12px",
      padding: "30px", // Reduced padding
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      animation: "fadeIn 0.4s ease-out",
    },
    storyHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px", // Reduced margin
      paddingBottom: "15px", // Reduced padding
      borderBottom: "1px solid #2a2a2a",
    },
    storyIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#d4af37",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "15px",
    },
    storyTitle: {
      fontSize: "22px", // Slightly smaller
      fontWeight: "400",
      color: "#ffffff",
      marginBottom: "5px",
      margin: "0 0 5px 0",
      letterSpacing: "0.3px",
    },
    storyMeta: {
      color: "#666666",
      fontSize: "13px",
    },
    storyContent: {
      backgroundColor: "#0f0f0f",
      borderRadius: "8px",
      padding: "20px", // Reduced padding
      border: "1px solid #2a2a2a",
    },
    storyText: {
      color: "#e0e0e0",
      lineHeight: "1.7",
      fontSize: "16px",
      whiteSpace: "pre-wrap",
      margin: 0,
      fontWeight: "300",
    },
    actionButtons: {
      display: "flex",
      gap: "15px",
      marginTop: "20px", // Reduced margin
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      padding: "10px 18px",
      border: "1px solid #3a3a3a",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontSize: "14px",
      fontWeight: "400",
      backgroundColor: "transparent",
    },
    copyButton: {
      color: "#ffffff",
    },
    clearButton: {
      color: "#ff6b6b",
      borderColor: "#ff6b6b",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "2px solid transparent",
      borderTop: "2px solid #000000",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "10px",
    },
    buttonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    scrollIndicator: {
      position: "fixed",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#d4af37",
      color: "#000000",
      padding: "12px 20px",
      borderRadius: "25px",
      fontSize: "14px",
      fontWeight: "500",
      boxShadow: "0 4px 20px rgba(212, 175, 55, 0.3)",
      animation: "bounce 2s infinite",
      zIndex: 1000,
      display: showScrollIndicator ? "flex" : "none",
      alignItems: "center",
      gap: "8px",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.iconContainer}>
            <span style={{ fontSize: "20px", color: "#000000" }}>🎬</span>
          </div>
          <h1 style={styles.title}>Bollywood Story Generator</h1>
          <p style={styles.subtitle}>
            Craft compelling narratives with artificial intelligence. Professional storytelling tools for creative
            minds.
          </p>
        </div>

        <div style={styles.mainGrid}>
          {/* Main Input Section */}
          <div style={styles.leftColumn}>
            {/* Story Prompt Card */}
            <div style={styles.card}>
              <label style={styles.label}>Story Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your story concept here. Be specific about characters, setting, and the central conflict or mystery..."
                style={styles.textarea}
                onFocus={(e) => {
                  e.target.style.borderColor = "#d4af37"
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#3a3a3a"
                }}
              />

              {/* Random Prompt Button */}
              <button
                onClick={useRandomPrompt}
                style={styles.randomButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#d4af37"
                  e.target.style.color = "#000000"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"
                  e.target.style.color = "#d4af37"
                }}
              >
                <span style={{ marginRight: "8px" }}>⚡</span>
                Use Sample Prompt
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              style={{
                ...styles.generateButton,
                ...(loading || !prompt.trim() ? styles.generateButtonDisabled : {}),
              }}
              onMouseEnter={(e) => {
                if (!loading && prompt.trim()) {
                  e.target.style.backgroundColor = "#b8941f"
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && prompt.trim()) {
                  e.target.style.backgroundColor = "#d4af37"
                }
              }}
            >
              {loading ? (
                <div style={styles.buttonContent}>
                  <div style={styles.spinner}></div>
                  Generating Story...
                </div>
              ) : (
                <div style={styles.buttonContent}>Generate Story</div>
              )}
            </button>
          </div>

          {/* Settings Panel */}
          <div>
            <div style={styles.settingsCard}>
              <h3 style={styles.settingsTitle}>
                <span style={{ marginRight: "10px" }}>⚙</span>
                Generation Settings
              </h3>

              {/* Temperature Control */}
              <div style={styles.sliderContainer}>
                <label style={styles.sliderLabel}>Creativity Level: {temperature}</label>
                <div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(Number.parseFloat(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderLabels}>
                    <span>Focused</span>
                    <span>Creative</span>
                  </div>
                </div>
              </div>

              {/* Max Length Control */}
              <div>
                <label style={styles.sliderLabel}>Story Length: {maxLength} words</label>
                <div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={maxLength}
                    onChange={(e) => setMaxLength(Number.parseInt(e.target.value))}
                    style={styles.slider}
                  />
                  <div style={styles.sliderLabels}>
                    <span>Brief</span>
                    <span>Detailed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div style={styles.tipsCard}>
              <h4 style={styles.tipsTitle}>
                <span style={{ marginRight: "8px" }}>💡</span>
                Writing Tips
              </h4>
              <ul style={styles.tipsList}>
                <li style={styles.tipsListItem}>Include specific locations and cultural details</li>
                <li style={styles.tipsListItem}>Define clear character motivations</li>
                <li style={styles.tipsListItem}>Establish the central conflict early</li>
                <li style={styles.tipsListItem}>Higher creativity yields unexpected plot twists</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Generated Story Display */}
        {story && (
          <div ref={storyRef} style={styles.storyCard}>
            <div style={styles.storyHeader}>
              <div style={styles.storyIcon}>
                <span style={{ fontSize: "18px", color: "#000000" }}>📄</span>
              </div>
              <div>
                <h2 style={styles.storyTitle}>{story.title}</h2>
                <p style={styles.storyMeta}>Generated {new Date().toLocaleTimeString()}</p>
              </div>
            </div>

            <div style={styles.storyContent}>
              <p style={styles.storyText}>{story.story}</p>
            </div>

            {/* Action Buttons */}
            <div style={styles.actionButtons}>
              <button
                onClick={() => navigator.clipboard.writeText(story.story)}
                style={{ ...styles.actionButton, ...styles.copyButton }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#2a2a2a"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"
                }}
              >
                <span style={{ marginRight: "8px" }}>📋</span>
                Copy Text
              </button>
              <button
                onClick={() => setStory(null)}
                style={{ ...styles.actionButton, ...styles.clearButton }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 107, 107, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"
                }}
              >
                <span style={{ marginRight: "8px" }}>✕</span>
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div style={styles.scrollIndicator}>
        <span>📖</span>
        Your story is ready! Scrolling down...
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          background-color: #0f0f0f;
          overflow-x: hidden;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: none;
        }
        
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #d4af37;
          cursor: pointer;
          border: none;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 28px !important;
          }
          .subtitle {
            font-size: 14px !important;
          }
          .card {
            padding: 20px !important;
          }
        }

        textarea::placeholder {
          color: #666666;
        }

        li::before {
          content: "•";
          color: #d4af37;
          position: absolute;
          left: 0;
        }
      `}</style>
    </div>
  )
}

export default App
