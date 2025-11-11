import React, { useState, useEffect } from 'react';
import { Bell, Plus, Search, Settings, CheckCircle2, Circle, Phone, Calendar, Clock, Tag, Trash2, Filter, BarChart3, Archive, Star, ChevronDown, X } from 'lucide-react';

const TodoApp = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    category: 'work',
    priority: 'medium',
    dueDate: '',
    dueTime: '',
    estimatedTime: '',
    notes: '',
    recurring: 'none',
    reminderTime: '15min',
    type: 'task' // task or call
  });

  // Categories
  const categories = [
    { id: 'work', label: 'Delo', color: 'bg-blue-500', icon: '💼' },
    { id: 'personal', label: 'Osebno', color: 'bg-green-500', icon: '🏠' },
    { id: 'shopping', label: 'Nakupi', color: 'bg-purple-500', icon: '🛒' },
    { id: 'health', label: 'Zdravje', color: 'bg-red-500', icon: '❤️' },
    { id: 'finance', label: 'Finance', color: 'bg-yellow-500', icon: '💰' },
    { id: 'other', label: 'Ostalo', color: 'bg-gray-500', icon: '📌' }
  ];

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    
    // Check for due reminders every minute
    const intervalId = setInterval(checkReminders, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  // Check for due reminders
  const checkReminders = () => {
    const now = new Date();
    tasks.forEach(task => {
      if (!task.completed && task.dueDate && task.dueTime && notificationsEnabled) {
        const taskDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
        const timeDiff = taskDateTime - now;
        
        // Remind based on user preference
        let reminderMs = 0;
        switch(task.reminderTime) {
          case '15min': reminderMs = 15 * 60 * 1000; break;
          case '1hour': reminderMs = 60 * 60 * 1000; break;
          case '1day': reminderMs = 24 * 60 * 60 * 1000; break;
        }
        
        if (timeDiff > 0 && timeDiff <= reminderMs && !task.reminded) {
          playNotificationSound();
          showNotification(task);
          // Mark as reminded
          setTasks(prev => prev.map(t => 
            t.id === task.id ? { ...t, reminded: true } : t
          ));
        }
      }
    });
  };

  // Play notification sound
  const playNotificationSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Vibrate if supported (iOS Safari partial support)
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Show notification
  const showNotification = (task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Opomnik za nalogo', {
        body: task.title,
        icon: '✅',
        badge: '✅'
      });
    }
  };

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Add new task
  const addTask = () => {
    if (!newTask.title.trim()) return;
    
    const task = {
      id: Date.now(),
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      reminded: false
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      category: 'work',
      priority: 'medium',
      dueDate: '',
      dueTime: '',
      estimatedTime: '',
      notes: '',
      recurring: 'none',
      reminderTime: '15min',
      type: 'task'
    });
    setShowAddModal(false);
    playNotificationSound();
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed, completedAt: !task.completed ? new Date().toISOString() : null } : task
    ));
    playNotificationSound();
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  // Get filtered tasks
  const getFilteredTasks = () => {
    let filtered = tasks.filter(task => {
      // Search filter
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filterCategory !== 'all' && task.category !== filterCategory) {
        return false;
      }
      
      // Priority filter
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }
      
      return true;
    });
    
    return filtered;
  };

  // Get tasks by tab
  const getTasksByTab = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekEnd = new Date(today);
    weekEnd.setDate(today.getDate() + 7);
    
    let filtered = getFilteredTasks();
    
    switch(activeTab) {
      case 'today':
        // Top 3 tasks for today
        return filtered
          .filter(task => !task.completed)
          .filter(task => {
            if (!task.dueDate) return true;
            const taskDate = new Date(task.dueDate);
            return taskDate <= today;
          })
          .sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          })
          .slice(0, 3);
      
      case 'week':
        // Tasks for this week
        return filtered
          .filter(task => !task.completed)
          .filter(task => {
            if (!task.dueDate) return true;
            const taskDate = new Date(task.dueDate);
            return taskDate >= today && taskDate < weekEnd;
          })
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      case 'upcoming':
        // Tasks beyond this week
        return filtered
          .filter(task => !task.completed)
          .filter(task => {
            if (!task.dueDate) return true;
            const taskDate = new Date(task.dueDate);
            return taskDate >= weekEnd;
          })
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      case 'calls':
        // Phone calls
        return filtered
          .filter(task => !task.completed && task.type === 'call')
          .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
      
      case 'archive':
        // Completed tasks
        return filtered
          .filter(task => task.completed)
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
      
      default:
        return filtered;
    }
  };

  // Get statistics
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const todayCompleted = tasks.filter(t => {
      if (!t.completed || !t.completedAt) return false;
      const completedDate = new Date(t.completedAt);
      const today = new Date();
      return completedDate.toDateString() === today.toDateString();
    }).length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { total, completed, pending, todayCompleted, completionRate };
  };

  // Get category from ID
  const getCategoryInfo = (categoryId) => {
    return categories.find(c => c.id === categoryId) || categories[categories.length - 1];
  };

  // Priority badge
  const PriorityBadge = ({ priority }) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    const labels = {
      high: 'Visoka',
      medium: 'Srednja',
      low: 'Nizka'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${colors[priority]} text-white`}>
        {labels[priority]}
      </span>
    );
  };

  // Task item component
  const TaskItem = ({ task }) => {
    const category = getCategoryInfo(task.category);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (touchStart - touchEnd > 75) {
        // Swiped left - delete
        deleteTask(task.id);
      }
      if (touchEnd - touchStart > 75) {
        // Swiped right - complete
        toggleComplete(task.id);
      }
    };

    return (
      <div
        className={`p-4 rounded-xl mb-3 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'} transition-all`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => toggleComplete(task.id)}
            className="mt-1 flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{category.icon}</span>
              <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : darkMode ? 'text-white' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {task.type === 'call' && <Phone className="w-4 h-4 text-blue-500" />}
            </div>
            
            {task.notes && (
              <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {task.notes}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2 items-center">
              <PriorityBadge priority={task.priority} />
              <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {category.label}
              </span>
              
              {task.dueDate && (
                <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Calendar className="w-3 h-3" />
                  {new Date(task.dueDate).toLocaleDateString('sl-SI')}
                </span>
              )}
              
              {task.dueTime && (
                <span className={`text-xs flex items-center gap-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock className="w-3 h-3" />
                  {task.dueTime}
                </span>
              )}
              
              {task.estimatedTime && (
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  ⏱️ {task.estimatedTime} min
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => deleteTask(task.id)}
            className="flex-shrink-0 text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const displayTasks = getTasksByTab();
  const stats = getStats();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} pb-24`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg sticky top-0 z-10`}>
        <div className="p-4 safe-top">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeTab === 'today' && '⭐ Danes - Top 3'}
              {activeTab === 'week' && '📅 Ta teden'}
              {activeTab === 'upcoming' && '🔮 Prihodnje'}
              {activeTab === 'calls' && '📞 Klici'}
              {activeTab === 'archive' && '📦 Arhiv'}
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowStatsModal(true)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Iskanje nalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          {/* Filter & Stats */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilterModal(true)}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white`}
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`py-2 px-4 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} ${darkMode ? 'text-white' : 'text-gray-700'}`}
            >
              <Archive className="w-4 h-4" />
              Arhiv
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'today' && (
          <div className={`mb-4 p-4 rounded-xl ${darkMode ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              💪 <strong>Focus Mode:</strong> Osredotoči se na 3 najpomembnejše naloge danes!
            </p>
          </div>
        )}
        
        {displayTasks.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-6xl mb-4">✨</p>
            <p className="text-lg">Ni nalog za prikaz</p>
            <p className="text-sm mt-2">Dodaj novo nalogo z gumbom +</p>
          </div>
        ) : (
          <div>
            {displayTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl p-6 safe-bottom max-h-[90vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Nova naloga
              </h2>
              <button onClick={() => setShowAddModal(false)}>
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Naslov naloge *"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              
              <select
                value={newTask.type}
                onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              >
                <option value="task">📋 Naloga</option>
                <option value="call">📞 Klic</option>
              </select>
              
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
              
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              >
                <option value="high">🔴 Visoka prioriteta</option>
                <option value="medium">🟡 Srednja prioriteta</option>
                <option value="low">🟢 Nizka prioriteta</option>
              </select>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                />
                <input
                  type="time"
                  value={newTask.dueTime}
                  onChange={(e) => setNewTask({...newTask, dueTime: e.target.value})}
                  className={`p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                />
              </div>
              
              <input
                type="number"
                placeholder="Ocenjeno trajanje (min)"
                value={newTask.estimatedTime}
                onChange={(e) => setNewTask({...newTask, estimatedTime: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              />
              
              <select
                value={newTask.reminderTime}
                onChange={(e) => setNewTask({...newTask, reminderTime: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              >
                <option value="15min">🔔 Opomni 15 min prej</option>
                <option value="1hour">🔔 Opomni 1 uro prej</option>
                <option value="1day">🔔 Opomni 1 dan prej</option>
              </select>
              
              <select
                value={newTask.recurring}
                onChange={(e) => setNewTask({...newTask, recurring: e.target.value})}
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
              >
                <option value="none">🔄 Brez ponavljanja</option>
                <option value="daily">🔄 Dnevno</option>
                <option value="weekly">🔄 Tedensko</option>
                <option value="monthly">🔄 Mesečno</option>
              </select>
              
              <textarea
                placeholder="Opombe..."
                value={newTask.notes}
                onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                rows="3"
                className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              
              <button
                onClick={addTask}
                disabled={!newTask.title.trim()}
                className="w-full py-4 bg-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✅ Dodaj nalogo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl p-6 safe-bottom`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Filtri
              </h2>
              <button onClick={() => setShowFilterModal(false)}>
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Kategorija
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                >
                  <option value="all">Vse kategorije</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={`block mb-2 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Prioriteta
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className={`w-full p-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200'}`}
                >
                  <option value="all">Vse prioritete</option>
                  <option value="high">🔴 Visoka</option>
                  <option value="medium">🟡 Srednja</option>
                  <option value="low">🟢 Nizka</option>
                </select>
              </div>
              
              <button
                onClick={() => {
                  setFilterCategory('all');
                  setFilterPriority('all');
                }}
                className={`w-full py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} ${darkMode ? 'text-white' : 'text-gray-900'} rounded-xl font-semibold`}
              >
                Ponastavi filtre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-3xl p-6 safe-bottom`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                📊 Statistika
              </h2>
              <button onClick={() => setShowStatsModal(false)}>
                <X className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Skupaj nalog</span>
                  <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>✅ Dokončano</span>
                  <span className="text-2xl font-bold text-green-500">{stats.completed}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>⏳ V teku</span>
                  <span className="text-2xl font-bold text-yellow-500">{stats.pending}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>🎯 Danes dokončano</span>
                  <span className="text-2xl font-bold text-purple-500">{stats.todayCompleted}</span>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>📈 Stopnja dokončanja</span>
                  <span className="text-2xl font-bold text-indigo-500">{stats.completionRate}%</span>
                </div>
                <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} overflow-hidden`}>
                  <div
                    className="h-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${stats.completionRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-16 h-16 bg-blue-500 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:bg-blue-600 transition-all hover:scale-110"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} safe-bottom z-30`}>
        <div className="flex justify-around p-2">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'today' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <Star className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Top 3</span>
          </button>
          
          <button
            onClick={() => setActiveTab('week')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'week' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <Calendar className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Ta teden</span>
          </button>
          
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'upcoming' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <Clock className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Prihodnje</span>
          </button>
          
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors relative ${
              activeTab === 'calls' ? 'text-blue-500' : darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <Phone className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Klici</span>
            {tasks.filter(t => !t.completed && t.type === 'call').length > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {tasks.filter(t => !t.completed && t.type === 'call').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* iOS-style safe area padding */}
      <style jsx>{`
        .safe-top { padding-top: env(safe-area-inset-top); }
        .safe-bottom { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
};

export default TodoApp;
