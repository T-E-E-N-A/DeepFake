import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Upload as UploadIcon, File, X, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("video/")) {
      setFile(dropped);
    } else {
      toast.error("Please upload a valid video file.");
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setUploading(false);
      toast.success("Video uploaded and analysis started!");
      navigate("/results/1");
    }, 3000);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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

      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Upload Video</h1>
          <p className="text-muted-foreground mb-8">Upload a video file to analyze for deepfake manipulation.</p>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
              dragOver
                ? "border-teal bg-teal/5 shadow-glow"
                : file
                ? "border-teal/30 bg-teal/5"
                : "border-border hover:border-teal/40 hover:bg-muted/30"
            }`}
          >
            {file ? (
              <div className="flex items-center justify-center gap-4">
                <File className="h-10 w-10 text-teal" />
                <div className="text-left">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="ml-4 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <UploadIcon className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-foreground font-medium mb-1">Drag and drop your video here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
                <label>
                  <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
                  <span className="inline-flex items-center rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground cursor-pointer hover:bg-muted/80 transition-colors">
                    Browse Files
                  </span>
                </label>
              </>
            )}
          </div>

          {uploading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uploading & analyzing...</span>
                <span className="text-foreground font-medium">{Math.min(Math.round(progress), 100)}%</span>
              </div>
              <Progress value={Math.min(progress, 100)} className="h-2" />
            </motion.div>
          )}

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="bg-teal hover:bg-teal-light text-secondary-foreground font-semibold px-8 h-11"
            >
              {uploading ? "Processing..." : "Analyze Video"}
              {!uploading && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
