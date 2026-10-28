import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Activity, CalendarCheck, CalendarDays, CalendarOff, Clock,
  LayoutDashboard, LogOut, Settings, Sparkles, Stethoscope, Users
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const isNurseRoute = location.pathname.startsWith('/nurse-');
  const userRole = localStorage.getItem('userRole') || (isNurseRoute ? 'nurse' : 'admin');
  const isNurse = userRole === 'nurse' || isNurseRoute;

  useEffect(() => {
    fetch('https://nursingstaffshiftbackend.vercel.app/api/leaves?status=Pending')
      .then(r => r.json())
      .then(data => Array.isArray(data) && setPendingLeaves(data.length))
      .catch(() => {});
    fetch('https://nursingstaffshiftbackend.vercel.app/api/nurses/current-shift-status')
      .then(r => r.json())
      .then(data => data && Array.isArray(data.absentNurses) && setAbsentCount(data.absentNurses.length))
      .catch(() => {});
  }, [location.pathname]);

  const adminItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { path: '/live-shifts', name: 'Live Coverage', icon: <Activity size={18} />, badge: absentCount || null },
    { path: '/nurses', name: 'Nurses', icon: <Users size={18} /> },
    { path: '/availability', name: 'Leave Approvals', icon: <CalendarCheck size={18} />, badge: pendingLeaves || null },
    { path: '/scheduler', name: 'Auto Scheduler', icon: <CalendarDays size={18} /> },
    { path: '/overtime', name: 'Overtime', icon: <Clock size={18} /> }
  ];
  const nurseItems = [
    { path: '/nurse-dashboard', name: 'My Dashboard', icon: <Stethoscope size={18} /> },
    { path: '/nurse-shifts', name: 'My Shifts', icon: <CalendarDays size={18} /> },
    { path: '/nurse-overtime', name: 'Overtime', icon: <Clock size={18} /> },
    { path: '/nurse-leave', name: 'Apply for Leave', icon: <CalendarOff size={18} /> }
  ];
  const items = isNurse ? nurseItems : adminItems;

  return (
    <aside className="sidebar">
      <Link to={isNurse ? '/nurse-dashboard' : '/dashboard'} className="brand">
        <span className="brand-mark"><Sparkles size={18} strokeWidth={2.5} /></span>
        <span><strong>ShiftSync</strong><small>Hospital Operations</small></span>
      </Link>
      <div className="workspace-switcher">
        <span className="workspace-icon">▣</span>
        <span><small>Workspace</small><strong>{isNurse ? 'Nurse Portal' : 'Admin Portal'}</strong></span>
        <span className="workspace-chevron">⌄</span>
      </div>
      <div className="sidebar-search">⌕ <span>Search...</span></div>
      <nav className="sidebar-nav">
        <span className="nav-label">WORKSPACE</span>
        {items.map(item => (
          <Link className={location.pathname === item.path ? 'nav-item active' : 'nav-item'} to={item.path} key={item.path}>
            {item.icon}<span>{item.name}</span>
            {item.badge ? <b>{item.badge}</b> : null}
          </Link>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <Link className="nav-item" to="/settings"><Settings size={18} /><span>Settings</span></Link>
        <div className="profile-chip"><span className="avatar">JD</span><span><strong>{isNurse ? 'Nurse Account' : 'Admin User'}</strong><small>ShiftSync workspace</small></span></div>
        <Link className="logout-link" to="/login"><LogOut size={16} /> Sign out</Link>
      </div>
    </aside>
  );
}
