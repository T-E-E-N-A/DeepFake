import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Upload, Cpu, CheckCircle, ArrowRight, Eye, Lock, Zap, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Lock,
    title: "Secure Uploads",
    description: "End-to-end encrypted video uploads ensure your content remains private and protected throughout the analysis process.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Analysis",
    description: "Advanced deep learning algorithms detect manipulations, face swaps, and synthetic media with high accuracy.",
  },
  {
    icon: Zap,
    title: "Real-time Verification",
    description: "Get instant results with detailed reports on video authenticity, metadata extraction, and modification detection.",
  },
];

const stats = [
  { value: "99.2%", label: "Detection Accuracy" },
  { value: "< 30s", label: "Average Analysis Time" },
  { value: "50K+", label: "Videos Analyzed" },
  { value: "24/7", label: "Monitoring" },
];

export default function Landing() {
  return (
    <div className="min-h-screen font-body">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-teal" />
            <span className="font-display text-xl font-bold text-foreground">DeepTrace</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#stats" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-light text-secondary-foreground font-large">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative bg-hero min-h-[90vh] flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-light/15 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 mb-8">
                <Eye className="h-4 w-4 text-teal-glow" />
                <span className="text-sm text-teal-glow font-medium">AI-Powered Video Verification</span>
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6">
                Detect Deepfakes.{" "}
                <span className="text-gradient">Protect Truth.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mb-10 leading-relaxed">
                Combat digital misinformation with our advanced AI verification system. Upload any video and get instant, reliable authenticity analysis.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="bg-teal hover:bg-teal-light hover:text-black text-secondary-foreground font-semibold text-base px-8 h-12 shadow-glow">
                    Start Verifying <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="bg-teal border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12 px-8">
                    Learn More
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <div className="relative w-80 h-80 animate-float">
              <div className="absolute inset-0 rounded-3xl border border-teal/20 bg-teal/5 backdrop-blur-sm flex items-center justify-center">
                <Video className="w-24 h-24 text-teal/40" />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-2xl border border-teal/30 bg-navy-deep/80 backdrop-blur-sm px-4 py-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-primary-foreground font-medium">Verified Authentic</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="stats" className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl md:text-4xl font-bold text-teal mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform uses cutting-edge AI to analyze every frame, detect anomalies, and verify video authenticity.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group rounded-2xl bg-card p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal group-hover:bg-teal group-hover:text-secondary-foreground transition-colors duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/10 rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Verify Your Videos?
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
              Join thousands of users protecting themselves from deepfakes and digital manipulation.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-teal hover:bg-teal-light text-secondary-foreground font-semibold text-base px-10 h-12 shadow-glow">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-teal" />
            <span className="font-display font-semibold text-foreground">DeepTrace</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 DeepTrace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
