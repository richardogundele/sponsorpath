import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Download, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CVOptimizer() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    setResult({
      score: 72,
      breakdown: { ats: 85, content: 70, keywords: 65, format: 68 },
      strengths: [
        "Clear job titles and progression",
        "Good use of action verbs",
        "Contact information is complete"
      ],
      improvements: [
        "Add more industry-specific keywords",
        "Quantify your achievements (e.g. 'increased sales by 20%')",
        "Include a 'Visa Status' section explicitly"
      ],
      missingKeywords: ["Agile", "TypeScript", "Stakeholder Management", "CI/CD"]
    });
    setIsAnalyzing(false);
  };

  const reset = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-2">CV Optimizer</h1>
        <p className="text-gray-400">AI-powered analysis to help you pass ATS filters and impress recruiters.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Upload & Controls */}
        <div className="space-y-6">
          <div className={cn(
            "border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300",
            file 
              ? "border-secondary bg-secondary/5" 
              : "border-white/10 bg-surface hover:border-primary/30"
          )}>
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-secondary" />
                  </div>
                  <p className="text-white font-medium text-lg mb-1">{file.name}</p>
                  <p className="text-sm text-gray-400 mb-6">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={reset}
                      className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      Replace File
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Upload your CV</h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                    Drag and drop your PDF or Word document here, or click to browse.
                  </p>
                  <label className="cursor-pointer">
                    <span className="bg-white text-background px-6 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                      Browse Files
                    </span>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Target Role (Optional) */}
          <div className="bg-surface border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Target Role (Optional)</h3>
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Recommended</span>
            </div>
            <input 
              type="text" 
              placeholder="e.g. Senior Software Engineer" 
              className="w-full bg-[#0F1623] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              We'll tailor the keyword analysis to this specific job title.
            </p>
          </div>

          {/* Analyze Button */}
          <button 
            onClick={handleAnalyze}
            disabled={!file || isAnalyzing || result}
            className="w-full py-4 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Analyze CV
              </>
            )}
          </button>

          {/* Usage Stats */}
          <div className="flex items-center justify-between text-sm text-gray-400 px-2">
            <span>Monthly Optimizations</span>
            <span className="text-white font-medium">2 of 6 used</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-secondary h-1.5 rounded-full w-[33%]"></div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="relative min-h-[500px]">
          {!result && !isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-2xl bg-surface/30">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Sparkles className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Optimize</h3>
              <p className="text-gray-400 max-w-sm">
                Upload your CV to get a comprehensive analysis, ATS score, and tailored improvement suggestions.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 border border-white/5 rounded-2xl bg-surface/30">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analyzing your CV...</h3>
              <p className="text-gray-400">Checking ATS compatibility, keywords, and formatting.</p>
            </div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="bg-surface border border-white/5 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1F2937" strokeWidth="8" />
                    <motion.circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#00D4B4" strokeWidth="8"
                      strokeDasharray="283"
                      initial={{ strokeDashoffset: 283 }}
                      animate={{ strokeDashoffset: 283 - (283 * result.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{result.score}</span>
                    <span className="text-xs text-gray-400">/ 100</span>
                  </div>
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-xl font-bold text-white mb-1">Good Start!</h3>
                  <p className="text-gray-400 text-sm mb-6">Your CV is strong but has room for specific improvements to pass ATS filters.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(result.breakdown).map(([key, val]: [string, any]) => (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="capitalize text-gray-400">{key}</span>
                          <span className="text-white font-medium">{val}/100</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div 
                            className={cn("h-1.5 rounded-full", val > 75 ? "bg-green-500" : val > 50 ? "bg-yellow-500" : "bg-red-500")}
                            style={{ width: `${val}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback Sections */}
              <div className="space-y-4">
                <div className="bg-surface border border-white/5 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.strengths.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-white/5 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" /> Improvements Needed
                  </h4>
                  <ul className="space-y-2">
                    {result.improvements.map((item: string, i: number) => (
                      <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-surface border border-white/5 rounded-xl p-6">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" /> Missing Keywords
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.missingKeywords.map((keyword: string, i: number) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 py-3 rounded-lg bg-secondary hover:bg-emerald-400 text-background font-bold transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Report
                </button>
                <button 
                  onClick={reset}
                  className="px-4 py-3 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
