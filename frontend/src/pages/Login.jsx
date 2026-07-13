import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError(null);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white text-center mb-6">Welcome Back</h3>

      {apiError && (
        <div className="mb-4 bg-brand-danger/10 border border-brand-danger/20 rounded-xl p-3 flex items-start gap-2.5 text-brand-danger text-sm">
          <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-2">Email Address</label>
          <input
            type="email"
            placeholder="name@domain.com"
            className={`w-full px-4 py-3 rounded-xl glass-input text-white text-sm ${errors.email ? 'border-brand-danger/50 focus:border-brand-danger/50' : ''}`}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Please enter a valid email'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-brand-danger">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-xs font-semibold text-brand-textMuted uppercase tracking-wider mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className={`w-full pl-4 pr-10 py-3 rounded-xl glass-input text-white text-sm ${errors.password ? 'border-brand-danger/50 focus:border-brand-danger/50' : ''}`}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-textMuted hover:text-white"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-brand-danger">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 bg-brand-accent hover:bg-brand-accentDark disabled:bg-indigo-500/50 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20 transition-all active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-brand-textMuted">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-accentLight hover:underline font-semibold">
          Create account
        </Link>
      </div>
    </div>
  );
};

export default Login;
