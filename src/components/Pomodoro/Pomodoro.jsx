import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const Pomodoro = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(25);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [goal, setGoal] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [phase, setPhase] = useState("ready when you are");
  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const totalTime = sessionDuration * 60;
  const CIRC = 2 * Math.PI * 100;
  const progress = (totalTime - timeLeft) / totalTime;
  const dashOffset = CIRC * (1 - progress);

  useEffect(() => {
    setTimeLeft(sessionDuration * 60);
    setIsRunning(false);
    setPhase("ready when you are");
  }, [sessionDuration]);

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setSessionsCompleted((s) => Math.min(s + 1, goal));
          setPhase("session complete");
          if (audioRef.current) audioRef.current.play();
          return sessionDuration * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") navigate("/"); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      setPhase("paused");
    } else {
      setIsRunning(true);
      setPhase("deep work");
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTimeLeft(sessionDuration * 60);
    setPhase("ready when you are");
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      {/* subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,255,255,0.03) 0%, transparent 70%)" }}
      />

      {/* exit button */}
      <button onClick={() => navigate("/")}
        className="fixed top-4 right-16 z-50 text-white/30 hover:text-white/70 transition-all duration-300 cursor-pointer">
        <Clock className="w-8 h-8" strokeWidth={1.2} />
      </button>

      {/* glass card */}
      <div className="flex flex-col items-center gap-8 px-12 py-10 w-[420px]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.1)",
          borderRadius: "20px",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}>

        {/* eyebrow */}
        <span className="text-[10px] tracking-[4px] text-white/25 uppercase">in the zone</span>

        {/* stats */}
        <div className="flex gap-4 w-full">
          {[
            { label: "completed", val: sessionsCompleted },
            { label: "goal", val: goal },
          ].map(({ label, val }) => (
            <div key={label} className="flex-1 flex flex-col gap-1 px-4 py-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[9px] tracking-[2px] text-white/25 uppercase">{label}</span>
              <span className="text-xl font-light text-white/80">{val}</span>
            </div>
          ))}
        </div>

        {/* ring + timer */}
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"/>
            <circle cx="110" cy="110" r="100" fill="none"
              stroke="rgba(255,255,255,0.7)" strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[52px] font-light text-white/90 tracking-[4px] tabular-nums leading-none">
              {fmt(timeLeft)}
            </span>
            <span className="text-[10px] tracking-[3px] text-white/25 uppercase"
              style={isRunning ? { animation: "pulse 2s ease-in-out infinite" } : {}}>
              {phase}
            </span>
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center gap-4">
          <button onClick={reset}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 transition-all cursor-pointer"
            style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>
            </svg>
          </button>

          <button onClick={toggleTimer}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
            style={{ background: "rgba(255,255,255,0.08)", border: "0.5px solid rgba(255,255,255,0.2)" }}>
            {isRunning ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            )}
          </button>

          <button onClick={() => setShowSettings(!showSettings)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 transition-all cursor-pointer"
            style={{ border: "0.5px solid rgba(255,255,255,0.1)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          </button>
        </div>

        {/* session dots */}
        <div className="flex gap-2">
          {Array.from({ length: goal }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i < sessionsCompleted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>

        {/* settings panel */}
        {showSettings && (
          <div className="w-full flex flex-col gap-4 px-4 py-4 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[2px] text-white/30 uppercase">session length</span>
              <select value={sessionDuration} onChange={(e) => setSessionDuration(Number(e.target.value))}
                className="text-white/60 text-xs px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)" }}>
                {[25,30,45,50,60].map(m => <option key={m} value={m} style={{background:"#1a1a1a"}}>{m} min</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[2px] text-white/30 uppercase">daily goal</span>
              <input type="number" min="1" max="20" value={goal}
                onChange={(e) => setGoal(Math.max(1, Math.min(20, Number(e.target.value))))}
                className="w-16 text-center text-white/60 text-xs px-2 py-1.5 rounded-lg outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)" }}
              />
            </div>
          </div>
        )}
      </div>

      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
};

export default Pomodoro;