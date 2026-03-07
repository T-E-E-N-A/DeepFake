import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, LayoutDashboard, Upload, LogOut, Video,
  CheckCircle, AlertTriangle, XCircle, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const mockVideos = [
  { id: "1", name: "interview_clip.mp4", status: "real", date: "2026-03-05", confidence: 98.5 },
  { id: "2", name: "news_segment.mp4", status: "suspicious", date: "2026-03-04", confidence: 67.2 },
  { id: "3", name: "social_post.mp4", status: "fake", date: "2026-03-03", confidence: 12.1 },
  { id: "4", name: "presentation.mp4", status: "real", date: "2026-03-02", confidence: 95.8 },
  { id: "5", name: "testimony.mp4", status: "suspicious", date: "2026-03-01", confidence: 54.3 },
];

const statusConfig = {
  real: { label: "Real", icon: CheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  suspicious: { label: "Suspicious", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", border: "border-warning/20" },
  fake: { label: "Fake", icon: XCircle, color: "text-danger", bg: "bg-danger/10", border: "border-danger/20" },
};

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const summary = {
    total: mockVideos.length,
    real: mockVideos.filter((v) => v.status === "real").length,
    suspicious: mockVideos.filter((v) => v.status === "suspicious").length,
    fake: mockVideos.filter((v) => v.status === "fake").length,
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-deep border-r border-navy-light/20 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Shield className="h-7 w-7 text-teal" />
              <span className="font-display text-xl font-bold text-primary-foreground">DeepTrace</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-primary-foreground/60">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 px-4 space-y-1">
            <Link to="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-primary-foreground/90 bg-navy-light/30 font-medium text-sm">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link to="/upload" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-primary-foreground/60 hover:text-primary-foreground/90 hover:bg-navy-light/20 transition-colors text-sm">
              <Upload className="h-4 w-4" />
              Upload Video
            </Link>
          </nav>
          <div className="p-4">
            <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-primary-foreground/50 hover:text-primary-foreground/90 hover:bg-navy-light/20 transition-colors text-sm w-full">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold text-foreground">Dashboard</h1>
          <Link to="/upload">
            <Button size="sm" className="bg-teal hover:bg-teal-light text-secondary-foreground font-medium">
              <Upload className="h-4 w-4 mr-2" /> Upload
            </Button>
          </Link>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Videos", value: summary.total, icon: Video, accent: "text-teal" },
              { label: "Verified Real", value: summary.real, icon: CheckCircle, accent: "text-success" },
              { label: "Suspicious", value: summary.suspicious, icon: AlertTriangle, accent: "text-warning" },
              { label: "Detected Fake", value: summary.fake, icon: XCircle, accent: "text-danger" },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl bg-card border border-border p-5 shadow-card"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{card.label}</span>
                  <card.icon className={`h-5 w-5 ${card.accent}`} />
                </div>
                <div className="font-display text-3xl font-bold text-foreground">{card.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-display text-lg font-semibold text-foreground">Recent Analyses</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Video</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Confidence</th>
                    <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockVideos.map((video) => {
                    const cfg = statusConfig[video.status];
                    return (
                      <tr key={video.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-4 text-sm font-medium text-foreground">{video.name}</td>
                        <td className="px-5 py-4 text-sm text-muted-foreground">{video.date}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                            <cfg.icon className="h-3 w-3" />
                            {cfg.label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-foreground font-medium">{video.confidence}%</td>
                        <td className="px-5 py-4 text-right">
                          <Link to={`/results/${video.id}`}>
                            <Button variant="ghost" size="sm" className="text-teal hover:text-teal-light text-xs">
                              View Report
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
