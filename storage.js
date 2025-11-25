// Contributors
// Software Engineer (Back-end, Front-end, and Architecture)
// Name: Sean Nyakutira
// Contacts: 
//   - WhatsApp: +260 776950796
//   - Phone: +260 968597996
//   - Email: seantinashenyakutira@gmail.com
//   - GitHub: https://github.com/seantinashenyakutira-whatsblade
//
// Software Engineer and Front-end
// Name: Zvikomborero Svotwa
// Contacts:
//   - Email: svotwaZvikomborero28@gmail.com
//   - GitHub: https://github.com/svotwazvikomborero28-sudo

const StorageManager = (() => {
  const TASK_KEY = "timeOnTasks";
  const SETTINGS_KEY = "timeOnSettings";

  const defaultSettings = {
    theme: "light",
    quotesEnabled: true,
    lastSummaryDate: null,
  };

  const loadTasks = () => {
    try {
      const raw = localStorage.getItem(TASK_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Unable to parse tasks", err);
      return [];
    }
  };

  const saveTasks = (tasks) => {
    localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
  };

  const loadSettings = () => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch (err) {
      console.error("Unable to read settings", err);
      return { ...defaultSettings };
    }
  };

  const saveSettings = (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  };

  const exportTasks = () => {
    const data = JSON.stringify(loadTasks(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `time-on-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return {
    loadTasks,
    saveTasks,
    loadSettings,
    saveSettings,
    exportTasks,
  };
})();

