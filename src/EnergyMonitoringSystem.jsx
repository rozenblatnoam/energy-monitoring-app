import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Power, Zap, AlertTriangle, Settings, History, Smartphone, TrendingUp, Home, Calendar, Bell } from 'lucide-react';

const EnergyMonitoringSystem = () => {
  const [currentConsumption, setCurrentConsumption] = useState(4.2);
  const [alerts, setAlerts] = useState([]);
  const [settings, setSettings] = useState({
    maxConsumption: 5.0,
    whatsappNumber: '',
    alertsEnabled: true
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // נתונים סימולציה לזמן אמת
  const [realTimeData, setRealTimeData] = useState([]);
  
  // נתונים היסטוריים
  const [historicalData] = useState([
    { time: '00:00', consumption: 2.1, cost: 0.84 },
    { time: '02:00', consumption: 1.8, cost: 0.72 },
    { time: '04:00', consumption: 1.5, cost: 0.60 },
    { time: '06:00', consumption: 2.8, cost: 1.12 },
    { time: '08:00', consumption: 4.5, cost: 1.80 },
    { time: '10:00', consumption: 3.9, cost: 1.56 },
    { time: '12:00', consumption: 5.2, cost: 2.08 },
    { time: '14:00', consumption: 4.8, cost: 1.92 },
    { time: '16:00', consumption: 3.6, cost: 1.44 },
    { time: '18:00', consumption: 6.1, cost: 2.44 },
    { time: '20:00', consumption: 5.8, cost: 2.32 },
    { time: '22:00', consumption: 4.2, cost: 1.68 }
  ]);

  const [deviceData] = useState([
    { name: 'מזגן', consumption: 2.8, status: 'פעיל', color: '#ff6b6b' },
    { name: 'מקרר', consumption: 0.8, status: 'פעיל', color: '#4ecdc4' },
    { name: 'תאורה', consumption: 0.4, status: 'פעיל', color: '#45b7d1' },
    { name: 'מחשב', consumption: 0.2, status: 'פעיל', color: '#96ceb4' }
  ]);

  // סימולציה של נתונים בזמן אמת
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('he-IL');
      const newConsumption = Math.random() * 6 + 1; // בין 1-7 קילוואט
      
      setCurrentConsumption(newConsumption);
      
      setRealTimeData(prev => {
        const newData = [...prev, { time: timeStr, consumption: newConsumption }];
        return newData.slice(-20); // שמור רק 20 נקודות אחרונות
      });
      
      // בדיקת התראות
      if (newConsumption > settings.maxConsumption && settings.alertsEnabled) {
        const newAlert = {
          id: Date.now(),
          message: `צריכת יתר זוהתה: ${newConsumption.toFixed(1)} קילוואט`,
          time: timeStr,
          type: 'warning'
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
        
        // סימולציה של שליחת הודעת ווטסאפ
        if (settings.whatsappNumber) {
          console.log(`שליחת הודעת ווטסאפ ל-${settings.whatsappNumber}: ${newAlert.message}`);
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [settings.maxConsumption, settings.alertsEnabled, settings.whatsappNumber]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      direction: 'rtl'
    },
    mainWrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      color: 'white'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px'
    },
    headerSubtitle: {
      fontSize: '1.1rem',
      opacity: '0.9'
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '30px',
      flexWrap: 'wrap'
    },
    tabButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 20px',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    tabButtonActive: {
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
    },
    tabButtonInactive: {
      background: 'white',
      color: '#666',
      border: '1px solid #ddd'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      border: '1px solid #f0f0f0',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    statCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
    },
    statCardHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statCardInfo: {
      flex: 1
    },
    statCardTitle: {
      fontSize: '14px',
      color: '#666',
      marginBottom: '5px'
    },
    statCardValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px'
    },
    statCardTrend: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: '#10B981',
      fontSize: '14px'
    },
    statCardIcon: {
      padding: '15px',
      borderRadius: '50%',
      color: 'white'
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '25px',
      marginBottom: '30px'
    },
    chartCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    chartTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    alertsContainer: {
      background: 'white',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    alertItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      background: '#fef2f2',
      borderRight: '4px solid #ef4444',
      borderRadius: '8px',
      marginBottom: '10px',
      gap: '15px'
    },
    alertContent: {
      flex: 1
    },
    alertMessage: {
      color: '#991b1b',
      fontWeight: '500',
      marginBottom: '5px'
    },
    alertTime: {
      color: '#dc2626',
      fontSize: '13px'
    },
    noAlerts: {
      textAlign: 'center',
      color: '#666',
      padding: '20px',
      fontStyle: 'italic'
    },
    settingsContainer: {
      maxWidth: '600px',
      margin: '0 auto'
    },
    settingsCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '30px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    settingsTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    formGroup: {
      marginBottom: '25px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'border-color 0.3s ease',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#3b82f6'
    },
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    toggleLabel: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    toggle: {
      position: 'relative',
      display: 'inline-flex',
      height: '24px',
      width: '44px',
      alignItems: 'center',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    toggleActive: {
      backgroundColor: '#3b82f6'
    },
    toggleInactive: {
      backgroundColor: '#d1d5db'
    },
    toggleButton: {
      height: '16px',
      width: '16px',
      backgroundColor: 'white',
      borderRadius: '50%',
      position: 'absolute',
      transition: 'transform 0.3s ease',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    toggleButtonActive: {
      transform: 'translateX(24px)'
    },
    toggleButtonInactive: {
      transform: 'translateX(4px)'
    },
    infoBox: {
      marginTop: '25px',
      padding: '20px',
      background: '#eff6ff',
      borderRadius: '10px',
      border: '1px solid #bfdbfe'
    },
    infoTitle: {
      fontWeight: '500',
      color: '#1e40af',
      marginBottom: '10px'
    },
    infoList: {
      fontSize: '13px',
      color: '#1e3a8a',
      lineHeight: '1.6'
    }
  };

  const StatCard = ({ title, value, unit, icon: Icon, gradient, trend }) => (
    <div style={styles.statCard}>
      <div style={styles.statCardHeader}>
        <div style={styles.statCardInfo}>
          <p style={styles.statCardTitle}>{title}</p>
          <p style={styles.statCardValue}>{value} {unit}</p>
          {trend && (
            <div style={styles.statCardTrend}>
              <TrendingUp size={16} />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div style={{...styles.statCardIcon, background: gradient}}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, title, icon: Icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      style={{
        ...styles.tabButton,
        ...(isActive ? styles.tabButtonActive : styles.tabButtonInactive)
      }}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );

  const renderDashboard = () => (
    <div>
      {/* כרטיסי סטטיסטיקה */}
      <div style={styles.statsGrid}>
        <StatCard
          title="צריכה נוכחית"
          value={currentConsumption.toFixed(1)}
          unit="קילוואט"
          icon={Zap}
          gradient="linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
          trend="+5% מהיום"
        />
        <StatCard
          title="עלות יומית"
          value={(currentConsumption * 24 * 0.4).toFixed(0)}
          unit="₪"
          icon={TrendingUp}
          gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatCard
          title="התראות פעילות"
          value={alerts.length}
          unit="היום"
          icon={AlertTriangle}
          gradient="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
        />
        <StatCard
          title="מכשירים פעילים"
          value={deviceData.filter(d => d.status === 'פעיל').length}
          unit="יחידות"
          icon={Home}
          gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
        />
      </div>

      {/* גרפים */}
      <div style={styles.chartsGrid}>
        {/* גרף זמן אמת */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <Zap style={{color: '#fbbf24'}} />
            ניטור זמן אמת
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={realTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="consumption" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* פילוח מכשירים */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <Home style={{color: '#3b82f6'}} />
            פילוח צריכה למכשירים
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, consumption }) => `${name}: ${consumption}kW`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="consumption"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* התראות אחרונות */}
      <div style={styles.alertsContainer}>
        <h3 style={styles.chartTitle}>
          <Bell style={{color: '#ef4444'}} />
          התראות אחרונות
        </h3>
        <div>
          {alerts.length > 0 ? alerts.map(alert => (
            <div key={alert.id} style={styles.alertItem}>
              <AlertTriangle color="#ef4444" size={20} />
              <div style={styles.alertContent}>
                <p style={styles.alertMessage}>{alert.message}</p>
                <p style={styles.alertTime}>{alert.time}</p>
              </div>
            </div>
          )) : (
            <p style={styles.noAlerts}>אין התראות חדשות</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div>
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>
          <History style={{color: '#3b82f6'}} />
          נתונים היסטוריים - 24 שעות אחרונות
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="consumption" stroke="#3B82F6" strokeWidth={2} name="צריכה (קילוואט)" />
            <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#10B981" strokeWidth={2} name="עלות (שקלים)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{...styles.chartCard, marginTop: '25px'}}>
        <h3 style={styles.chartTitle}>סיכום יומי</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="consumption" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={styles.settingsContainer}>
      <div style={styles.settingsCard}>
        <h3 style={styles.settingsTitle}>
          <Settings style={{color: '#666'}} />
          הגדרות מערכת
        </h3>
        
        <div>
          {/* הגדרת סף צריכה */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              סף צריכת יתר (קילוואט)
            </label>
            <input
              type="number"
              value={settings.maxConsumption}
              onChange={(e) => setSettings(prev => ({...prev, maxConsumption: parseFloat(e.target.value)}))}
              style={styles.input}
              step="0.1"
              min="0"
            />
          </div>

          {/* הגדרת ווטסאפ */}
          <div style={styles.formGroup}>
            <label style={{...styles.label, display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Smartphone style={{color: '#10b981'}} size={16} />
              מספר ווטסאפ להתראות
            </label>
            <input
              type="tel"
              value={settings.whatsappNumber}
              onChange={(e) => setSettings(prev => ({...prev, whatsappNumber: e.target.value}))}
              style={styles.input}
              placeholder="054-123-4567"
              dir="ltr"
            />
          </div>

          {/* הפעלת התראות */}
          <div style={styles.toggleContainer}>
            <span style={styles.toggleLabel}>הפעלת התראות</span>
            <div
              onClick={() => setSettings(prev => ({...prev, alertsEnabled: !prev.alertsEnabled}))}
              style={{
                ...styles.toggle,
                ...(settings.alertsEnabled ? styles.toggleActive : styles.toggleInactive)
              }}
            >
              <div
                style={{
                  ...styles.toggleButton,
                  ...(settings.alertsEnabled ? styles.toggleButtonActive : styles.toggleButtonInactive)
                }}
              />
            </div>
          </div>
        </div>

        <div style={styles.infoBox}>
          <h4 style={styles.infoTitle}>הוראות הגדרת ווטסאפ:</h4>
          <ol style={styles.infoList}>
            <li>1. הכנס את מספר הטלפון כולל קידומת (לדוגמה: 054-123-4567)</li>
            <li>2. וודא שהמספר פעיל בווטסאפ</li>
            <li>3. ההתראות יישלחו באופן אוטומטי בעת חריגה מהסף</li>
          </ol>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.mainWrapper}>
        {/* כותרת */}
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            <Power size={40} />
            מערכת ניטור אנרגיה חכמה
          </h1>
          <p style={styles.headerSubtitle}>ניהול וניטור צריכת אנרגיה בזמן אמת עם התראות חכמות</p>
        </div>

        {/* טאבים */}
        <div style={styles.tabContainer}>
          <TabButton
            id="dashboard"
            title="דשבורד"
            icon={Home}
            isActive={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <TabButton
            id="history"
            title="היסטוריה"
            icon={History}
            isActive={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
          <TabButton
            id="settings"
            title="הגדרות"
            icon={Settings}
            isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </div>

        {/* תוכן */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'history' && renderHistory()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default EnergyMonitoringSystem;