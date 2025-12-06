import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Upload, X, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUser } from '../../context/UserContext';

// --- Types ---
type OnboardingData = {
  currentJobTitle: string;
  yearsExperience: string;
  qualification: string;
  desiredJobTitle: string;
  industries: string[];
  locations: string[];
  skills: string[];
  cvFile: File | null;
};

// --- Components ---

const Step1Background = ({ data, updateData }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-display font-bold text-white">Tell us about your experience</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Current Job Title</label>
      <input
        type="text"
        value={data.currentJobTitle}
        onChange={(e) => updateData({ currentJobTitle: e.target.value })}
        className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
        placeholder="e.g. Software Engineer"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Years of Experience</label>
      <select
        value={data.yearsExperience}
        onChange={(e) => updateData({ yearsExperience: e.target.value })}
        className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
      >
        <option value="">Select experience</option>
        <option value="0-2">0-2 years</option>
        <option value="3-5">3-5 years</option>
        <option value="6-10">6-10 years</option>
        <option value="10+">10+ years</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">Highest Qualification</label>
      <select
        value={data.qualification}
        onChange={(e) => updateData({ qualification: e.target.value })}
        className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
      >
        <option value="">Select qualification</option>
        <option value="gcse">GCSE</option>
        <option value="a-level">A-Level</option>
        <option value="bachelors">Bachelor's Degree</option>
        <option value="masters">Master's Degree</option>
        <option value="phd">PhD</option>
        <option value="other">Other</option>
      </select>
    </div>
  </div>
);

const Step2Target = ({ data, updateData }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void }) => {
  const industries = ['Technology', 'Finance', 'Healthcare', 'Engineering', 'Marketing', 'Sales', 'Construction', 'Education'];
  const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Remote', 'Any'];

  const toggleItem = (list: string[], item: string, field: 'industries' | 'locations') => {
    const newList = list.includes(item) 
      ? list.filter(i => i !== item)
      : [...list, item];
    updateData({ [field]: newList });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white">What role are you looking for?</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Desired Job Title</label>
        <input
          type="text"
          value={data.desiredJobTitle}
          onChange={(e) => updateData({ desiredJobTitle: e.target.value })}
          className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary outline-none"
          placeholder="e.g. Senior Developer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Industry</label>
        <div className="flex flex-wrap gap-2">
          {industries.map(ind => (
            <button
              key={ind}
              onClick={() => toggleItem(data.industries, ind, 'industries')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                data.industries.includes(ind)
                  ? "bg-secondary/20 border-secondary text-secondary"
                  : "bg-surface border-gray-700 text-gray-400 hover:border-gray-500"
              )}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Location</label>
        <div className="flex flex-wrap gap-2">
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => toggleItem(data.locations, loc, 'locations')}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                data.locations.includes(loc)
                  ? "bg-secondary/20 border-secondary text-secondary"
                  : "bg-surface border-gray-700 text-gray-400 hover:border-gray-500"
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step3Skills = ({ data, updateData }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void }) => {
  const [input, setInput] = useState('');

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!data.skills.includes(input.trim())) {
        updateData({ skills: [...data.skills, input.trim()] });
      }
      setInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateData({ skills: data.skills.filter(s => s !== skill) });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white">Add your key skills</h2>
      <p className="text-gray-400 text-sm">Type a skill and press Enter. Add at least 3 skills.</p>

      <div className="min-h-[100px] bg-surface border border-gray-700 rounded-lg p-4 focus-within:ring-2 focus-within:ring-secondary transition-all">
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map(skill => (
            <span key={skill} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={addSkill}
          className="bg-transparent outline-none text-white w-full"
          placeholder="e.g. Python, Project Management, SQL..."
        />
      </div>
    </div>
  );
};

const Step4CV = ({ data, updateData }: { data: OnboardingData; updateData: (d: Partial<OnboardingData>) => void }) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      updateData({ cvFile: file });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateData({ cvFile: file });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-bold text-white">Upload Your CV</h2>
      <p className="text-gray-400">Optional. We'll use AI to analyze it and suggest improvements.</p>

      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center hover:border-secondary transition-colors bg-surface/50"
      >
        {data.cvFile ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-white font-medium mb-2">{data.cvFile.name}</p>
            <button 
              onClick={() => updateData({ cvFile: null })}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-white font-medium mb-2">Drag and drop your CV here</p>
            <p className="text-gray-500 text-sm mb-6">PDF, DOC, DOCX up to 5MB</p>
            <label className="inline-block">
              <span className="bg-secondary hover:bg-emerald-400 text-background px-6 py-2 rounded-lg font-medium cursor-pointer transition-colors">
                Browse Files
              </span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

// --- Main Onboarding Component ---

export default function Onboarding() {
  const navigate = useNavigate();
  const { updateProfile, completeOnboarding } = useUser();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [data, setData] = useState<OnboardingData>({
    currentJobTitle: '',
    yearsExperience: '',
    qualification: '',
    desiredJobTitle: '',
    industries: [],
    locations: [],
    skills: [],
    cvFile: null
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Save to User Context
    updateProfile({
      currentJobTitle: data.currentJobTitle,
      yearsExperience: data.yearsExperience,
      qualification: data.qualification,
      desiredJobTitle: data.desiredJobTitle,
      industries: data.industries,
      locations: data.locations,
      skills: data.skills,
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    completeOnboarding();
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Redirect after success animation
    setTimeout(() => {
      navigate('/dashboard/companies'); // Go directly to companies to show matches
    }, 2500);
  };

  // Validation for Next button
  const canProceed = () => {
    if (step === 1) return data.currentJobTitle && data.yearsExperience && data.qualification;
    if (step === 2) return data.desiredJobTitle && data.industries.length > 0 && data.locations.length > 0;
    if (step === 3) return data.skills.length >= 3;
    return true;
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#0F1623] flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-4">You're All Set! 🎉</h1>
          <p className="text-gray-400 mb-8">Finding your first AI match...</p>
          <div className="w-full bg-surface rounded-full h-2 overflow-hidden">
            <div className="h-full bg-secondary animate-[loading_2s_ease-in-out_infinite] w-1/2"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1623] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">
            <span>Background</span>
            <span>Target Role</span>
            <span>Skills</span>
            <span>CV Upload</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden flex">
            {[1, 2, 3, 4].map(s => (
              <div 
                key={s}
                className={cn(
                  "h-full flex-1 transition-all duration-500",
                  s <= step ? "bg-secondary" : "bg-transparent",
                  s < step && "border-r border-[#0F1623]"
                )}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#141B2D] border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden min-h-[450px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1"
            >
              {step === 1 && <Step1Background data={data} updateData={updateData} />}
              {step === 2 && <Step2Target data={data} updateData={updateData} />}
              {step === 3 && <Step3Skills data={data} updateData={updateData} />}
              {step === 4 && <Step4CV data={data} updateData={updateData} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/5">
            {step > 1 ? (
              <button 
                onClick={prevStep}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex items-center gap-4">
              {step === 4 && (
                <button 
                  onClick={handleSubmit}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Skip for now
                </button>
              )}
              <button
                onClick={nextStep}
                disabled={!canProceed() || isSubmitting}
                className="flex items-center gap-2 bg-secondary hover:bg-emerald-400 text-background px-6 py-2.5 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : step === 4 ? (
                  'Complete Setup'
                ) : (
                  <>Next <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
