import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../services/api';
import { FileText, FileUp, Activity, MessageSquare, Download } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard/stats');
        setStats(res.data.stats);
        setActivity(res.data.recentActivity);
        
        if (res.data.chartData) {
          setChartData({
            labels: res.data.chartData.labels,
            datasets: [
              {
                data: res.data.chartData.data,
                backgroundColor: [
                  'rgba(99, 102, 241, 0.75)', // Indigo
                  'rgba(168, 85, 247, 0.75)', // Purple
                  'rgba(16, 185, 129, 0.75)', // Success Green
                ],
                borderColor: [
                  'rgba(99, 102, 241, 1)',
                  'rgba(168, 85, 247, 1)',
                  'rgba(16, 185, 129, 1)',
                ],
                borderWidth: 1,
              },
            ],
          });
        }
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="shimmer h-32 rounded-2xl"></div>
          <div className="shimmer h-32 rounded-2xl"></div>
          <div className="shimmer h-32 rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="shimmer h-[350px] lg:col-span-1 rounded-2xl"></div>
          <div className="shimmer h-[350px] lg:col-span-2 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total AI Chats',
      value: stats?.totalChats || 0,
      icon: MessageSquare,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Generated Templates',
      value: stats?.totalDocs || 0,
      icon: FileText,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Uploaded Legal Scans',
      value: stats?.totalUploads || 0,
      icon: FileUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="glass-card p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-brand-textMuted">{card.title}</p>
                <h4 className="text-3xl font-extrabold text-white mt-2">{card.value}</h4>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.color}`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart card */}
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-between h-[350px]">
          <div>
            <h3 className="text-lg font-semibold text-white">Usage Analytics</h3>
            <p className="text-xs text-brand-textMuted mt-1">Breakdown of legal assistance features used</p>
          </div>
          <div className="flex-1 max-h-[200px] flex items-center justify-center mt-4">
            {chartData && (chartData.datasets[0].data.reduce((a, b) => a + b, 0) > 0) ? (
              <Doughnut 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: { color: '#f3f4f6', font: { family: 'Outfit', size: 11 } }
                    }
                  }
                }} 
              />
            ) : (
              <p className="text-sm text-brand-textMuted text-center py-12">No activity compiled yet.</p>
            )}
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2 h-[350px] flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-accent" />
              <span>Recent Activity</span>
            </h3>
            <p className="text-xs text-brand-textMuted mt-1">Realtime logs of your recent inputs and deeds</p>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {activity.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-brand-textMuted">
                No recent activity logged. Start chatting or generating docs!
              </div>
            ) : (
              activity.map((act) => (
                <div key={act.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                    <div>
                      <h5 className="text-sm font-semibold text-white">{act.title}</h5>
                      <p className="text-xs text-brand-textMuted mt-0.5">{act.detail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] text-brand-textMuted">
                      {new Date(act.createdAt).toLocaleDateString()}
                    </span>
                    {act.type === 'document' && act.pdfUrl && (
                      <a 
                        href={`https://nyayaai-backend-qejx.onrender.com${act.pdfUrl}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-brand-accent/20 border border-brand-accent/35 text-brand-accentLight hover:bg-brand-accent hover:text-white transition-colors"
                        title="Download Document"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
