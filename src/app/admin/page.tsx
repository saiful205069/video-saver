'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Users, Download, Search, Activity, Clock, RefreshCw, Settings, Save, Calendar, CalendarDays } from 'lucide-react';

interface Stats {
  visits: number;
  dailyVisits: Record<string, number>;
  monthlyVisits: Record<string, number>;
  searches: number;
  downloads: number;
  recentActivity: Array<{ type: string; url?: string; time: string }>;
}

interface Config {
  siteName: string;
  siteColor: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'settings'>('analytics');

  const fetchData = async () => {
    setLoading(true);
    try {
      const resStats = await fetch('/api/track?action=get');
      setStats(await resStats.json());
      
      const resConfig = await fetch('/api/track?action=get_config');
      setConfig(await resConfig.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const saveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    try {
      const res = await fetch('/api/track?action=set_config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      setConfig(await res.json());
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    }
    setSaving(false);
  };

  if (!stats || !config) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><RefreshCw className="w-8 h-8 animate-spin text-green-500" /></div>;

  const todayKey = new Date().toISOString().split('T')[0];
  const monthKey = todayKey.substring(0, 7);
  const dailyVisits = stats.dailyVisits[todayKey] || 0;
  const monthlyVisits = stats.monthlyVisits[monthKey] || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-green-500" />
              {config.siteName} Admin
            </h1>
            <p className="text-gray-500 mt-1">Real-time analytics and website settings.</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'analytics' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Analytics
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'bg-green-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              <Settings className="w-4 h-4" /> Settings
            </button>
          </div>
        </div>

        {activeTab === 'analytics' ? (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><Calendar className="w-5 h-5" /></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Daily Visits</p>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mt-2">{dailyVisits.toLocaleString()}</h2>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg"><CalendarDays className="w-5 h-5" /></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Monthly Visits</p>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mt-2">{monthlyVisits.toLocaleString()}</h2>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-50 text-purple-500 rounded-lg"><Search className="w-5 h-5" /></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Searches</p>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mt-2">{stats.searches.toLocaleString()}</h2>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-50 text-green-500 rounded-lg"><Download className="w-5 h-5" /></div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Downloads</p>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mt-2">{stats.downloads.toLocaleString()}</h2>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-400" />
                  Live Activity Feed
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Live
                  </span>
                  <button onClick={fetchData} className="text-gray-400 hover:text-gray-600">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {stats.recentActivity.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                    <Clock className="w-12 h-12 mb-3 opacity-20" />
                    <p>No activity yet. Waiting for users...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {stats.recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className={`mt-1 rounded-full p-2 ${activity.type === 'download' ? 'bg-green-50 text-green-500' : 'bg-purple-50 text-purple-500'}`}>
                          {activity.type === 'download' ? <Download className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            User {activity.type === 'download' ? 'downloaded a video' : 'searched for a video'}
                          </p>
                          {activity.url && (
                            <a href={activity.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline truncate block mt-0.5 max-w-[500px]">
                              {activity.url}
                            </a>
                          )}
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(activity.time).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              Website Settings
            </h3>
            <form onSubmit={saveConfig} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website Name / Logo Text</label>
                <input 
                  type="text" 
                  value={config.siteName}
                  onChange={(e) => setConfig({...config, siteName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  placeholder="e.g. VideoSaver"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">This changes the main logo name and text throughout the site.</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-70"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
