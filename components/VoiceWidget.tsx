"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const CONFIG = {
  BACKEND_URL: "https://widget.numbero.org",
  ASSISTANT_ID: "assistant_plumbing_all_hours_plumbing_inc_1779710865",
  BADGE_TEXT: "Live — All Hours",
  TITLE: "All Hours Plumbing",
  SUBTITLE: "South Charlotte's trusted family plumber since 1995",
  START_BUTTON_TEXT: "Talk to Us Now",
  END_BUTTON_TEXT: "End Call",
  STATUS_READY: "Ready — tap to connect",
  STATUS_CONNECTED: "Connected",
  GREETING_TEXT:
    "Hi, you have reached All Hours Plumbing. We have been serving South Charlotte since 1995. What can we help you with today?",
  CONNECTING_TEXT: "Connecting you now...",
  CONNECTED_TEXT: "Connected — go ahead",
  AGENT_READY_TEXT: "AI receptionist ready",
  DISCONNECTED_TEXT: "Call ended",
  CONNECTION_FAILED_TEXT:
    "Connection failed — please call us directly at (704) 488-8177",
  PRIMARY_COLOR: "#1a2e4a",
  ACCENT_COLOR: "#da532c",
  END_BUTTON_COLOR: "#C62828",
  SUCCESS_COLOR: "#2E7D32",
};

type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

export default function VoiceWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startCall = useCallback(async () => {
    try {
      setStatus("connecting");
      setElapsed(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });
      pcRef.current = pc;

      const audio = new Audio();
      audio.autoplay = true;
      audioRef.current = audio;

      pc.ontrack = (event) => {
        audio.srcObject = event.streams[0];
      };

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const response = await fetch(`${CONFIG.BACKEND_URL}/connect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sdp: pc.localDescription?.sdp,
          type: pc.localDescription?.type,
          assistant_id: CONFIG.ASSISTANT_ID,
        }),
      });

      if (!response.ok) throw new Error("Connection failed");

      const answer = await response.json();
      await pc.setRemoteDescription(new RTCSessionDescription(answer));

      pc.oniceconnectionstatechange = () => {
        if (
          pc.iceConnectionState === "disconnected" ||
          pc.iceConnectionState === "failed"
        ) {
          setStatus("disconnected");
          cleanup();
        }
      };

      setStatus("connected");
      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch {
      setStatus("error");
      cleanup();
    }
  }, [cleanup]);

  const endCall = useCallback(() => {
    setStatus("disconnected");
    cleanup();
  }, [cleanup]);

  const toggleMute = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  }, []);

  const getStatusText = () => {
    switch (status) {
      case "idle":
        return CONFIG.STATUS_READY;
      case "connecting":
        return CONFIG.CONNECTING_TEXT;
      case "connected":
        return CONFIG.CONNECTED_TEXT;
      case "disconnected":
        return CONFIG.DISCONNECTED_TEXT;
      case "error":
        return CONFIG.CONNECTION_FAILED_TEXT;
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full px-5 py-3.5 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        style={{ backgroundColor: CONFIG.ACCENT_COLOR }}
        aria-label="Open voice assistant"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
        <span className="font-body text-sm font-semibold">
          {CONFIG.BADGE_TEXT}
        </span>
        <span
          className="pulse-dot inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: CONFIG.SUCCESS_COLOR }}
        />
      </button>

      {/* Widget panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:items-center sm:justify-end sm:p-6">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              if (status !== "connected" && status !== "connecting") {
                setIsOpen(false);
              }
            }}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div
              className="px-6 py-5"
              style={{ backgroundColor: CONFIG.PRIMARY_COLOR }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {CONFIG.TITLE}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/70">
                    {CONFIG.SUBTITLE}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (status === "connected" || status === "connecting") {
                      endCall();
                    }
                    setIsOpen(false);
                  }}
                  className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-8 text-center">
              {status === "idle" && (
                <>
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${CONFIG.ACCENT_COLOR}15` }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={CONFIG.ACCENT_COLOR}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  </div>
                  <p className="mb-1 font-heading text-lg font-semibold text-navy-900">
                    {CONFIG.AGENT_READY_TEXT}
                  </p>
                  <p className="mb-6 text-sm text-navy-500">
                    {CONFIG.GREETING_TEXT}
                  </p>
                </>
              )}

              {status === "connecting" && (
                <div className="py-4">
                  <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-navy-100 border-t-ember" />
                  <p className="font-body text-navy-600">
                    {CONFIG.CONNECTING_TEXT}
                  </p>
                </div>
              )}

              {status === "connected" && (
                <div className="py-2">
                  <div
                    className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${CONFIG.SUCCESS_COLOR}15` }}
                  >
                    <div
                      className="pulse-dot h-4 w-4 rounded-full"
                      style={{ backgroundColor: CONFIG.SUCCESS_COLOR }}
                    />
                  </div>
                  <p
                    className="mb-1 text-sm font-semibold"
                    style={{ color: CONFIG.SUCCESS_COLOR }}
                  >
                    {CONFIG.STATUS_CONNECTED}
                  </p>
                  <p className="mb-4 font-heading text-2xl font-bold text-navy-900">
                    {formatTime(elapsed)}
                  </p>
                </div>
              )}

              {status === "disconnected" && (
                <div className="py-4">
                  <p className="mb-2 font-heading text-lg font-semibold text-navy-900">
                    {CONFIG.DISCONNECTED_TEXT}
                  </p>
                  <p className="text-sm text-navy-500">
                    Duration: {formatTime(elapsed)}
                  </p>
                </div>
              )}

              {status === "error" && (
                <div className="py-4">
                  <p className="mb-2 text-sm text-red-600">
                    {CONFIG.CONNECTION_FAILED_TEXT}
                  </p>
                </div>
              )}

              <p className="mb-4 text-xs text-navy-400">{getStatusText()}</p>

              {/* Actions */}
              <div className="flex items-center justify-center gap-3">
                {(status === "idle" ||
                  status === "disconnected" ||
                  status === "error") && (
                  <button
                    onClick={startCall}
                    className="flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: CONFIG.ACCENT_COLOR }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {CONFIG.START_BUTTON_TEXT}
                  </button>
                )}

                {status === "connected" && (
                  <>
                    <button
                      onClick={toggleMute}
                      className={`rounded-full p-3 transition-all ${
                        isMuted
                          ? "bg-red-100 text-red-600"
                          : "bg-navy-100 text-navy-600"
                      }`}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        {isMuted ? (
                          <>
                            <line x1="1" y1="1" x2="23" y2="23" />
                            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V5a3 3 0 0 0-5.94-.6" />
                            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .36-.03.71-.08 1.06" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </>
                        ) : (
                          <>
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </>
                        )}
                      </svg>
                    </button>
                    <button
                      onClick={endCall}
                      className="flex items-center gap-2 rounded-full px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:brightness-110"
                      style={{ backgroundColor: CONFIG.END_BUTTON_COLOR }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91" />
                        <line x1="23" x2="1" y1="1" y2="23" />
                      </svg>
                      {CONFIG.END_BUTTON_TEXT}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
