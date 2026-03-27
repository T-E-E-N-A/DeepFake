import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, ArrowLeft, CheckCircle, AlertTriangle, XCircle,
  FileVideo, Clock, Hash, Monitor, Calendar, Info,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockResults = {
  "1": {
    name: "interview_clip.mp4",
    status: "real",
    confidence: 98.5,
    date: "2026-03-05",
    duration: "2:34",
    resolution: "1920x1080",
    format: "H.264 / MP4",
    size: "24.5 MB",
    frames: 4580,
    faceSwap: false,
    audioMismatch: false,
    artifacts: "None detected",
    metadata: {
      creation: "2026-03-05 14:32:00",
      encoder: "libx264",
      bitrate: "8.2 Mbps",
      fps: "30",
    },
  },
  "2": {
    name: "news_segment.mp4",
    status: "suspicious",
    confidence: 67.2,
    date: "2026-03-04",
    duration: "1:12",
    resolution: "1280x720",
    format: "H.264 / MP4",
    size: "12.1 MB",
    frames: 2160,
    faceSwap: true,
    audioMismatch: false,
    artifacts: "Minor temporal inconsistencies detected in frames 430-512",
    metadata: {
      creation: "2026-03-04 09:15:00",
      encoder: "libx264",
      bitrate: "5.1 Mbps",
      fps: "30",
    },
  },
  "3": {
    name: "social_post.mp4",
    status: "fake",
    confidence: 12.1,
    date: "2026-03-03",
    duration: "0:45",
    resolution: "1080x1920",
    format: "H.264 / MP4",
    size: "8.7 MB",
    frames: 1350,
    faceSwap: true,
    audioMismatch: true,
    artifacts: "Significant face boundary artifacts, lip sync mismatch, metadata tampering detected",
    metadata: {
      creation: "2026-03-03 18:44:00",
      encoder: "unknown",
      bitrate: "3.8 Mbps",
      fps: "24",
    },
  },
};

const statusConfig = {
  real: { label: "Verified Real", icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/30", desc: "This video shows no signs of manipulation." },
  suspicious: { label: "Suspicious", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", desc: "Some anomalies detected. Manual review recommended." },
  fake: { label: "Fake Detected", icon: XCircle, color: "text-danger", bg: "bg-danger/10", border: "border-danger/30", desc: "High probability of deepfake manipulation detected." },
};

export default function Results() {
  const { id } = useParams();
  const result = mockResults[id || "1"] || mockResults["1"];
  const cfg = statusConfig[result.status];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal" />
              <span className="font-display text-lg font-bold text-foreground">DeepTrace</span>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Verification Report</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <FileVideo className="h-4 w-4" /> {result.name}
              </p>
            </div>
            <div className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
              <cfg.icon className="h-6 w-6" />
              <div>
                <div className="font-display font-bold text-lg leading-tight">{cfg.label}</div>
                <div className="text-xs opacity-80">{result.confidence}% authenticity</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6 shadow-card mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Authenticity Score</span>
              <span className={`font-display text-2xl font-bold ${cfg.color}`}>{result.confidence}%</span>
            </div>
            <Progress value={result.confidence} className="h-3" />
            <p className="text-sm text-muted-foreground mt-3">{cfg.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Video Information</h2>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: "Duration", value: result.duration },
                  { icon: Monitor, label: "Resolution", value: result.resolution },
                  { icon: Hash, label: "Format", value: result.format },
                  { icon: Info, label: "Size", value: result.size },
                  { icon: Hash, label: "Total Frames", value: result.frames.toLocaleString() },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="h-4 w-4" /> {item.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Analysis Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Face Swap Detection</span>
                  <span className={`text-sm font-medium ${result.faceSwap ? "text-danger" : "text-success"}`}>
                    {result.faceSwap ? "Detected" : "Not Detected"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Audio Mismatch</span>
                  <span className={`text-sm font-medium ${result.audioMismatch ? "text-danger" : "text-success"}`}>
                    {result.audioMismatch ? "Detected" : "Not Detected"}
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-sm text-muted-foreground block mb-1">Artifacts</span>
                  <span className="text-sm text-foreground">{result.artifacts}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6 shadow-card">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Extracted Metadata</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {Object.entries(result.metadata).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground capitalize">{key}</span>
                  <span className="text-sm font-medium text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
