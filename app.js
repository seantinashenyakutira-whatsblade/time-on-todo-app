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

const TimeOnApp = (() => {
  const taskGroupsEl = document.getElementById("taskGroups");
  const formEl = document.getElementById("taskForm");
  const categoryButtons = document.querySelectorAll(".nav-item");
  const filterChips = document.querySelectorAll(".chip[data-filter]");
  const templateModal = document.getElementById("templateModal");
  const alarmModal = document.getElementById("alarmModal");
  const summaryModal = document.getElementById("summaryModal");
  const templatePreviewEl = document.getElementById("templatePreview");
  const greetingTextEl = document.getElementById("greetingText");

  const state = {
    tasks: [],
    activeCategory: "daily",
    activeFilter: "all",
    searchQuery: "",
    templateKey: "selfCare",
    settings: StorageManager.loadSettings(),
  };

  const init = () => {
    state.tasks = StorageManager.loadTasks();
    applyTheme(state.settings.theme);
    bindEvents();
    AlarmManager.init();
    QuotesManager.init(state.settings.quotesEnabled);
    document.getElementById("toggleQuotes").textContent = state.settings.quotesEnabled
      ? "Disable Quotes"
      : "Enable Quotes";
    renderTemplatePreview();
    renderAll();
    updateGreeting();
    scheduleSummaryCheck();
  };

  const bindEvents = () => {
    formEl.addEventListener("submit", handleSubmitTask);
    document.getElementById("cancelEdit").addEventListener("click", resetForm);
    document.getElementById("searchInput").addEventListener("input", handleSearch);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("exportJson").addEventListener("click", StorageManager.exportTasks);
    document.getElementById("openTemplates").addEventListener("click", () => openModal(templateModal));
    document.getElementById("openAlarm").addEventListener("click", () => openModal(alarmModal));
    document.getElementById("openSummary").addEventListener("click", () => showSummary(true));
    document.getElementById("toggleQuotes").addEventListener("click", toggleQuotes);
    document.getElementById("applyTemplate").addEventListener("click", handleApplyTemplate);

    document.querySelectorAll("[data-modal-close]").forEach((btn) =>
      btn.addEventListener("click", closeModal),
    );

    document.querySelectorAll(".modal").forEach((modal) =>
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
      }),
    );

    document.getElementById("searchInput").addEventListener("focus", addRipple);

    document.querySelectorAll(".template-tabs .chip").forEach((chip) =>
      chip.addEventListener("click", () => {
        document.querySelectorAll(".template-tabs .chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.templateKey = chip.dataset.template;
        renderTemplatePreview();
      }),
    );

    categoryButtons.forEach((btn) =>
      btn.addEventListener("click", () => {
        categoryButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.activeCategory = btn.dataset.category;
        renderAll();
      }),
    );

    filterChips.forEach((chip) =>
      chip.addEventListener("click", () => {
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        state.activeFilter = chip.dataset.filter;
        renderAll();
      }),
    );

    document.querySelectorAll(".ripple").forEach((el) =>
      el.addEventListener("click", (e) => {
        const ripple = el;
        const rect = ripple.getBoundingClientRect();
        const circle = ripple.querySelector(".ripple-circle") || document.createElement("span");
        circle.className = "ripple-circle";
        const diameter = Math.max(rect.width, rect.height);
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
        circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
        ripple.appendChild(circle);
        circle.classList.add("show");
        circle.addEventListener("animationend", () => circle.remove());
      }),
    );
  };

  const handleSubmitTask = (event) => {
    event.preventDefault();
    const id = document.getElementById("taskId").value || crypto.randomUUID();
    const payload = {
      id,
      title: document.getElementById("taskTitle").value.trim(),
      category: document.getElementById("taskCategory").value,
      dueDate: document.getElementById("taskDue").value || null,
      notes: document.getElementById("taskNotes").value.trim(),
      important: document.getElementById("taskImportant").checked,
    };
    if (!payload.title) return;
    const existing = state.tasks.find((task) => task.id === id);
    if (existing) {
      Object.assign(existing, payload);
    } else {
      state.tasks.push({
        ...payload,
        completed: payload.category === "completed",
        createdAt: new Date().toISOString(),
      });
    }
    persist();
    resetForm();
    renderAll();
  };

  const resetForm = () => {
    formEl.reset();
    document.getElementById("taskId").value = "";
  };

  const handleSearch = (event) => {
    state.searchQuery = event.target.value.toLowerCase();
    renderAll();
  };

  const toggleTheme = () => {
    const nextTheme = state.settings.theme === "light" ? "dark" : "light";
    state.settings.theme = nextTheme;
    StorageManager.saveSettings(state.settings);
    applyTheme(nextTheme);
  };

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  };

  const toggleQuotes = () => {
    const enabled = QuotesManager.toggle();
    state.settings.quotesEnabled = enabled;
    StorageManager.saveSettings(state.settings);
    document.getElementById("toggleQuotes").textContent = enabled ? "Disable Quotes" : "Enable Quotes";
  };

  const renderAll = () => {
    renderTasks();
    updateStats();
    drawConsistencyGraph();
  };

  const renderTasks = () => {
    const groups = {
      daily: [],
      important: [],
      completed: [],
    };
    const today = new Date().toDateString();

    state.tasks
      .filter((task) => applyFilters(task, today))
      .forEach((task) => {
        if (task.completed) {
          groups.completed.push(task);
        } else if (task.important || task.category === "important") {
          groups.important.push(task);
        } else {
          groups.daily.push(task);
        }
      });

    taskGroupsEl.innerHTML = "";
    Object.entries(groups).forEach(([key, tasks]) => {
      if (!shouldShowGroup(key)) return;
      const groupEl = document.createElement("div");
      groupEl.className = "task-group";
      groupEl.innerHTML = `<h4>${labelForGroup(key)}</h4>`;
      if (!tasks.length) {
        const empty = document.createElement("p");
        empty.textContent = "No tasks here yet.";
        empty.style.color = "var(--subtle)";
        groupEl.appendChild(empty);
      } else {
        tasks.forEach((task) => groupEl.appendChild(buildTaskItem(task)));
      }
      taskGroupsEl.appendChild(groupEl);
    });
  };

  const shouldShowGroup = (key) => {
    if (state.activeCategory === "daily") return key === "daily";
    if (state.activeCategory === "important") return key === "important";
    if (state.activeCategory === "completed") return key === "completed";
    return true;
  };

  const labelForGroup = (key) =>
    ({
      daily: "Daily To-Do",
      important: "Important",
      completed: "Completed",
    })[key];

  const buildTaskItem = (task) => {
    const wrapper = document.createElement("div");
    wrapper.className = `task-item ${task.completed ? "completed" : ""}`;
    wrapper.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} />
      </div>
      <div class="task-meta">
        <strong>${task.title}</strong>
        <small>${task.notes || "No notes"}</small>
        ${task.dueDate ? `<small>Due: ${formatDate(task.dueDate)}</small>` : ""}
        ${
          task.important
            ? '<span class="badge important">Important</span>'
            : '<span class="badge">Scheduled</span>'
        }
      </div>
      <div class="task-actions">
        <button class="icon-btn" data-action="edit">✎</button>
        <button class="icon-btn" data-action="delete">🗑</button>
      </div>
    `;

    const checkbox = wrapper.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => toggleComplete(task.id, checkbox.checked));

    wrapper.querySelector("[data-action='edit']").addEventListener("click", () => startEdit(task));
    wrapper.querySelector("[data-action='delete']").addEventListener("click", () => deleteTask(task.id));
    return wrapper;
  };

  const toggleComplete = (id, isCompleted) => {
    const target = state.tasks.find((task) => task.id === id);
    if (!target) return;
    target.completed = isCompleted;
    target.category = isCompleted ? "completed" : target.category || "daily";
    target.completedAt = isCompleted ? new Date().toISOString() : null;
    persist();
    renderAll();
  };

  const startEdit = (task) => {
    document.getElementById("taskId").value = task.id;
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskCategory").value = task.category;
    document.getElementById("taskDue").value = task.dueDate ? task.dueDate.slice(0, 16) : "";
    document.getElementById("taskNotes").value = task.notes || "";
    document.getElementById("taskImportant").checked = task.important;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteTask = (id) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);
    persist();
    renderAll();
  };

  const applyFilters = (task, todayString) => {
    if (state.searchQuery) {
      const haystack = `${task.title} ${task.notes}`.toLowerCase();
      if (!haystack.includes(state.searchQuery)) return false;
    }

    switch (state.activeFilter) {
      case "today":
        if (!task.dueDate) return false;
        return new Date(task.dueDate).toDateString() === todayString;
      case "important":
        return task.important;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  };

  const renderTemplatePreview = () => {
    const template = Templates.getTemplate(state.templateKey);
    templatePreviewEl.innerHTML = "";
    template.forEach((block) => {
      const item = document.createElement("div");
      item.className = "template-item";
      item.innerHTML = `<strong>${block.title}</strong><br/><small>${block.time} • ${block.note}</small>`;
      templatePreviewEl.appendChild(item);
    });
  };

  const handleApplyTemplate = () => {
    const generated = Templates.buildTasks(state.templateKey);
    state.tasks = [...state.tasks, ...generated];
    persist();
    renderAll();
    closeModal();
  };

  const updateStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const focusScore = total ? Math.round((completed / total) * 100) : 0;
    document.getElementById("focusScore").textContent = `${focusScore}%`;
    document.getElementById("tasksCompletedCount").textContent = completed;
    document.getElementById("tasksPendingCount").textContent = pending;
    document.getElementById("consistencyRate").textContent = `${calcStreak()} day streak`;
  };

  const calcStreak = () => {
    const completedTasks = state.tasks.filter((task) => task.completedAt);
    if (!completedTasks.length) return 0;
    const days = new Set(
      completedTasks.map((task) => new Date(task.completedAt).toDateString()),
    );
    return Math.min(days.size, 30);
  };

  const drawConsistencyGraph = () => {
    const canvas = document.getElementById("consistencyGraph");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const days = Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - idx));
      return date;
    });

    const counts = days.map((day) => {
      const key = day.toDateString();
      return state.tasks.filter(
        (task) => task.completedAt && new Date(task.completedAt).toDateString() === key,
      ).length;
    });

    const max = Math.max(...counts, 1);
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    const barCount = counts.length;
    const barWidth = chartWidth / barCount - 10;
    const barSpacing = 10;

    // Get computed colors from CSS
    const computedStyle = getComputedStyle(document.body);
    const primaryColor = computedStyle.getPropertyValue("--primary").trim() || "#6d87ff";
    const primaryDark = computedStyle.getPropertyValue("--primary-dark").trim() || "#4d5dd9";
    const textColor = computedStyle.getPropertyValue("--text").trim() || "#1d1f2c";
    const subtleColor = computedStyle.getPropertyValue("--subtle").trim() || "#6f748c";

    // Draw grid lines
    ctx.strokeStyle = "rgba(109, 135, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (i / 5) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(canvas.width - padding.right, y);
      ctx.stroke();
    }

    // Draw bars
    counts.forEach((value, idx) => {
      const barHeight = max > 0 ? (value / max) * chartHeight : 0;
      const x = padding.left + idx * (barWidth + barSpacing) + barSpacing / 2;
      const y = canvas.height - padding.bottom - barHeight;

      // Create gradient for bars
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height - padding.bottom);
      gradient.addColorStop(0, primaryColor);
      gradient.addColorStop(1, primaryDark);

      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw bar border
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, barWidth, barHeight);

      // Draw value on top of bar
      if (value > 0) {
        ctx.fillStyle = textColor;
        ctx.font = "bold 11px Inter";
        ctx.textAlign = "center";
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      }

      // Draw day label
      ctx.fillStyle = subtleColor;
      ctx.font = "12px Inter";
      ctx.textAlign = "center";
      ctx.fillText(dayLabel(days[idx]), x + barWidth / 2, canvas.height - padding.bottom + 20);
    });

    // Draw Y-axis labels
    ctx.fillStyle = subtleColor;
    ctx.font = "10px Inter";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((max / 5) * (5 - i));
      const y = padding.top + (i / 5) * chartHeight;
      ctx.fillText(value.toString(), padding.left - 10, y + 4);
    }
  };

  const dayLabel = (date) =>
    date.toLocaleDateString(undefined, {
      weekday: "short",
    });

  const persist = () => {
    StorageManager.saveTasks(state.tasks);
  };

  const openModal = (modal) => {
    modal.classList.add("active");
  };

  const closeModal = () => {
    [templateModal, alarmModal, summaryModal].forEach((modal) => modal.classList.remove("active"));
  };

  const formatDate = (isoString) =>
    new Date(isoString).toLocaleString([], {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    });

  const addRipple = (event) => {
    const target = event.currentTarget;
    target.classList.add("ripple");
  };

  const updateGreeting = () => {
    const hours = new Date().getHours();
    const greeting =
      hours < 12 ? "Good Morning" : hours < 18 ? "Good Day" : "Good Evening";
    greetingTextEl.textContent = greeting;
  };

  const showSummary = (manual = false) => {
    const total = state.tasks.length;
    const completed = state.tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    const summaryContent = document.getElementById("summaryContent");
    summaryContent.innerHTML = `
      <p><strong>Completed:</strong> ${completed}</p>
      <p><strong>Pending:</strong> ${pending}</p>
      <p><strong>Recommendation:</strong> ${
        pending > 3 ? "Schedule deep work tomorrow morning." : "Great flow—prepare a stretch goal."
      }</p>
    `;
    openModal(summaryModal);
    if (!manual) {
      state.settings.lastSummaryDate = new Date().toDateString();
      StorageManager.saveSettings(state.settings);
    }
  };

  const scheduleSummaryCheck = () => {
    setInterval(() => {
      const now = new Date();
      if (now.getHours() === 20 && now.getMinutes() === 0) {
        if (state.settings.lastSummaryDate !== now.toDateString()) {
          showSummary(false);
        }
      }
    }, 60000);
  };

  return { init };
})();

document.addEventListener("DOMContentLoaded", TimeOnApp.init);

