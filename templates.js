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

const Templates = (() => {
  const selfCare = [
    { title: "Wake up", note: "Gentle rise + sunlight", time: "05:30 - 05:45" },
    { title: "Hydrate", note: "500ml water", time: "05:45 - 05:50" },
    { title: "Meditation", note: "Breath work", time: "05:50 - 06:10" },
    { title: "Workout", note: "Movement session", time: "06:15 - 07:00" },
    { title: "Shower & Groom", note: "Feel refreshed", time: "07:00 - 07:30" },
    { title: "Breakfast", note: "Mindful meal", time: "07:30 - 08:00" },
    { title: "Deep Work", note: "Most important task", time: "08:30 - 11:00" },
    { title: "Breaks", note: "Micro-reset", time: "11:00 - 11:30" },
    { title: "Social / Family Time", note: "Connect intentionally", time: "17:30 - 19:00" },
    { title: "Evening Reflection", note: "Gratitude journaling", time: "21:00 - 21:20" },
    { title: "Sleep", note: "Digital sunset", time: "22:00 - 05:30" },
  ];

  const student = [
    { title: "Morning Prep", note: "Review schedule", time: "06:30 - 07:00" },
    { title: "Class Attendance", note: "Be present + notes", time: "08:00 - 13:00" },
    { title: "Study Sessions", note: "Focus block", time: "14:00 - 16:00" },
    { title: "Homework", note: "Assignments due", time: "16:00 - 17:00" },
    { title: "Assignments", note: "Major projects", time: "17:00 - 18:00" },
    { title: "Revision", note: "Flashcards or recap", time: "19:00 - 20:00" },
    { title: "Group Study", note: "Collab time", time: "20:00 - 21:00" },
    { title: "Rest & Leisure", note: "Recharge", time: "21:00 - 22:30" },
  ];

  const work = [
    { title: "Morning Routine", note: "Prime the mind", time: "06:00 - 07:00" },
    { title: "Work Tasks", note: "Priority list", time: "08:30 - 10:30" },
    { title: "Meetings", note: "Keep concise", time: "10:30 - 12:00" },
    { title: "Emails", note: "Batch process inbox", time: "13:00 - 14:00" },
    { title: "Breaks", note: "Move + hydrate", time: "14:00 - 14:30" },
    { title: "Family Check-ins", note: "Quick message/call", time: "15:00 - 15:30" },
    { title: "Project Work", note: "Deep focus", time: "15:30 - 17:30" },
    { title: "Evening Wrap-Up", note: "Plan tomorrow", time: "20:00 - 20:30" },
  ];

  const templates = {
    selfCare,
    student,
    work,
  };

  const buildTasks = (key) =>
    templates[key].map((item) => ({
      id: crypto.randomUUID(),
      title: item.title,
      category: "daily",
      dueDate: buildDueDateFromRange(item.time),
      notes: `${item.time} • ${item.note}`,
      completed: false,
      important: key !== "selfCare",
    }));

  const buildDueDateFromRange = (range) => {
    const today = new Date();
    const [start] = range.split("-");
    const [hours, minutes] = start.trim().split(":");
    today.setHours(Number(hours), Number(minutes), 0, 0);
    return today.toISOString();
  };

  return {
    getTemplate(key) {
      return templates[key];
    },
    buildTasks,
  };
})();

