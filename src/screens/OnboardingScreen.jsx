import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Ticket, ArrowRight, Mail, Lock, Eye, EyeOff, 
  User, ChevronRight, Github 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Welcome to Ticz",
      subtitle: "Your one-stop destination for event tickets",
      content: (
        <div className="space-y-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 mx-auto bg-gradient-to-br from-[#24A0B5] to-[#0E464F] rounded-3xl flex items-center justify-center shadow-xl"
          >
            <Ticket className="w-12 h-12 text-white" />
          </motion.div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome to Ticz</h1>
            <p className="text-gray-400">Your journey to amazing events begins here</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveStep(1)}
            className="w-full bg-[#24A0B5] text-white py-3 rounded-xl font-medium hover:bg-[#2DBAD3] 
                     transition-colors flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )
    },
    {
      title: "Sign In",
      subtitle: "Welcome back! Please sign in to continue",
      content: (
        <form onSubmit={handleSignIn} className="space-y-6">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-4 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#24A0B5]"
                required
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#041E23] border border-[#0E464F] rounded-xl py-3 pl-12 pr-12 
                         text-white placeholder-gray-400 focus:outline-none focus:border-[#24A0B5]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                         hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="button"
              className="text-[#24A0B5] text-sm hover:text-[#2DBAD3] transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-[#24A0B5] text-white py-3 rounded-xl font-medium 
                     hover:bg-[#2DBAD3] transition-colors flex items-center justify-center
                     ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#0E464F]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#02191D] text-gray-400">Or continue with</span>
            </div>
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl 
                     bg-[#041E23] border border-[#0E464F] text-white hover:border-[#24A0B5] 
                     transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </motion.button>
        </form>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#02191D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#02191D] border border-[#0E464F] rounded-3xl p-8 shadow-xl"
          >
            {steps[activeStep].content}
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === activeStep ? 'bg-[#24A0B5]' : 'bg-[#0E464F]'
              }`}
              animate={{
                scale: index === activeStep ? 1.2 : 1,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen; 