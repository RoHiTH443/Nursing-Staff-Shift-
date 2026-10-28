import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Stethoscope, Mail, Lock, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'nurse'
  const [email, setEmail] = useState('admin@hospital.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'admin') {
      setEmail('admin@hospital.com');
      setPassword('admin123');
    } else {
      setEmail('nurse.priya@hospital.com');
      setPassword('nurse123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('userRole', activeTab);
      if (activeTab === 'nurse') {
        navigate('/nurse-dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 400);
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page { min-height: 100vh; width: 100vw; display: flex; align-items: stretch; background: #101113; color: #f5f5f5; font-family: var(--font-main, sans-serif); overflow: auto; }
        .login-visual { position: relative; flex: 1.15; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 5rem clamp(2rem, 8vw, 8rem); overflow: hidden; background: radial-gradient(circle at 54% 46%, #263c4b 0, #17242c 30%, #101113 68%); }
        .login-visual:before { content: ''; position: absolute; width: min(45vw, 560px); height: min(45vw, 560px); left: 18%; top: 24%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, rgba(86, 145, 161, .55), rgba(11, 19, 24, .92) 58%, #080b0d 72%); box-shadow: inset -35px -25px 55px rgba(0,0,0,.9), 0 0 55px rgba(68, 131, 151, .2); }
        .login-visual:after { content: ''; position: absolute; width: min(42vw, 520px); height: 190px; left: 12%; top: 58%; border-top: 1px solid rgba(120, 194, 209, .35); border-radius: 50%; transform: rotate(-20deg); box-shadow: 0 0 28px rgba(74, 164, 183, .28); }
        .login-visual-content { position: relative; z-index: 1; max-width: 430px; margin-top: 20rem; }
        .login-brand { display: flex; align-items: center; gap: .75rem; margin-bottom: 1.5rem; color: #fff; }
        .login-brand-mark { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 12px; background: #7c3aed; color: #fff; box-shadow: 0 8px 25px rgba(124,58,237,.3); }
        .login-brand strong { display: block; font-size: 1.3rem; letter-spacing: -.03em; }
        .login-brand small { color: #a4b4ba; font-size: .72rem; }
        .login-visual h1 { margin: 0 0 .75rem; color: #fff; font-size: clamp(2rem, 4vw, 3.4rem); line-height: 1.05; letter-spacing: -.05em; }
        .login-visual p { margin: 0; color: #a8b7bd; font-size: 1rem; line-height: 1.65; }
        .login-form-panel { width: min(42vw, 520px); min-width: 390px; display: flex; align-items: center; justify-content: center; padding: 3rem; background: #181a1d; border-left: 1px solid #2a2d31; }
        .login-card { width: 100%; max-width: 360px; padding: 2.4rem 2.25rem; background: #282b2f; border: 1px solid #42464b; border-radius: 5px; box-shadow: 0 24px 60px rgba(0,0,0,.42); }
        .login-card h2 { margin: 0 0 .4rem; color: #fff; font-size: 1.7rem; font-weight: 700; }
        .login-card-subtitle { margin: 0 0 1.8rem; color: #aeb4b8; font-size: .82rem; }
        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.7rem .5rem;
          border-radius: 4px;
          border: none;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .input-group {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 3px;
          background: #3a3d41;
          border: 1px solid #50545a;
          transition: all 0.2s ease;
        }
        .input-group:focus-within {
          border-color: #6bb7c4;
          box-shadow: 0 0 0 2px rgba(107, 183, 196, .2);
        }
        .input-field {
          width: 100%;
          padding: 0.78rem 1rem 0.78rem 2.7rem;
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.82rem;
        }
        .submit-btn {
          width: 100%;
          padding: .8rem;
          border-radius: 3px;
          border: none;
          color: white;
          font-size: .85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.25s ease;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
        }
        .login-card label { color: #d7dbdd !important; font-size: .72rem !important; letter-spacing: .04em; }
        .login-card input::placeholder { color: #9da3a7; }
        @media (max-width: 760px) {
          .login-page { display: block; }
          .login-visual { min-height: 300px; padding: 2rem; }
          .login-visual:before { width: 280px; height: 280px; left: 48%; top: 18%; }
          .login-visual-content { margin-top: 5rem; }
          .login-visual h1, .login-visual p { display: none; }
          .login-form-panel { width: 100%; min-width: 0; min-height: calc(100vh - 300px); padding: 2rem 1.25rem; border-left: 0; }
        }
      `}</style>
      <section className="login-visual">
        <div className="login-visual-content">
          <div className="login-brand"><span className="login-brand-mark"><Sparkles size={21} strokeWidth={2.5} /></span><span><strong>ShiftSync</strong><small>Hospital Operations</small></span></div>
          <h1>Clinical operations,<br />synchronized.</h1>
          <p>Coordinate every shift, every ward, and every care team from one intelligent hospital operations portal.</p>
        </div>
      </section>
      <section className="login-form-panel">
      <div className="login-card">
        
        {/* Hospital Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: activeTab === 'admin' 
              ? 'linear-gradient(135deg, #4f46e5 0%, #38bdf8 100%)' 
              : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            boxShadow: activeTab === 'admin' 
              ? '0 8px 20px rgba(79, 70, 229, 0.4)' 
              : '0 8px 20px rgba(16, 185, 129, 0.4)',
            marginBottom: '1rem',
            transition: 'all 0.3s ease'
          }}>
            {activeTab === 'admin' ? (
              <Shield size={28} color="#ffffff" />
            ) : (
              <Stethoscope size={28} color="#ffffff" />
            )}
          </div>
          <h2>
            Portal Login
          </h2>
          <p className="login-card-subtitle">
            Sign in to your hospital workspace
          </p>
        </div>

        {/* Clean Admin vs Nurse Toggle Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: '#1d1f22',
          padding: '0.35rem',
          borderRadius: '4px',
          border: '1px solid #373a3e',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            className="tab-btn"
            onClick={() => handleTabChange('admin')}
            style={{
              background: activeTab === 'admin' ? '#4c777f' : 'transparent',
              color: activeTab === 'admin' ? '#ffffff' : '#94a3b8',
              boxShadow: activeTab === 'admin' ? '0 4px 14px rgba(79, 70, 229, 0.4)' : 'none'
            }}
          >
            <Shield size={17} />
            Admin Login
          </button>

          <button
            type="button"
            className="tab-btn"
            onClick={() => handleTabChange('nurse')}
            style={{
              background: activeTab === 'nurse' ? '#4c777f' : 'transparent',
              color: activeTab === 'nurse' ? '#ffffff' : '#94a3b8',
              boxShadow: activeTab === 'nurse' ? '0 4px 14px rgba(16, 185, 129, 0.4)' : 'none'
            }}
          >
            <Stethoscope size={17} />
            Nurse Login
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Email / ID Field */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
              {activeTab === 'admin' ? 'ADMIN EMAIL' : 'NURSE EMAIL'}
            </label>
            <div className="input-group">
              <Mail size={18} color="#38bdf8" style={{ position: 'absolute', left: '1rem' }} />
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@hospital.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
              PASSWORD
            </label>
            <div className="input-group">
              <Lock size={18} color="#38bdf8" style={{ position: 'absolute', left: '1rem' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.9rem',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{
              marginTop: '0.5rem',
              background: activeTab === 'admin'
                ? 'linear-gradient(135deg, #4f46e5 0%, #38bdf8 100%)'
                : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              boxShadow: activeTab === 'admin'
                ? '0 10px 25px -3px rgba(79, 70, 229, 0.45)'
                : '0 10px 25px -3px rgba(16, 185, 129, 0.45)'
            }}
          >
            {loading ? (
              <span>Signing In...</span>
            ) : (
              <>
                <span>Sign In as {activeTab === 'admin' ? 'Administrator' : 'Nurse'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>

        </form>

        {/* Simple Footer */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: '#aeb4b8', fontSize: '0.72rem' }}>
          Select <strong>Admin</strong> or <strong>Nurse</strong> above to log into your dashboard.
        </div>

      </div>
      </section>
    </div>
  );
}
