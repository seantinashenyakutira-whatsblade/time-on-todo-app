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

const AlarmManager = (() => {
  let alarmTimeoutId = null;
  let targetTime = null;
  let audioEl;
  let popupEl;
  let statusEl;

  const init = () => {
    audioEl = document.getElementById("alarmAudio");
    popupEl = document.getElementById("alarmPopup");
    statusEl = document.getElementById("alarmStatus");

    document.getElementById("setAlarm").addEventListener("click", handleSetAlarm);
    document.getElementById("stopAlarm").addEventListener("click", clearAlarm);
    document.getElementById("snoozeAlarm").addEventListener("click", snoozeAlarm);
    document.getElementById("dismissAlarm").addEventListener("click", stopAlarmSound);

    document.getElementById("alarmSoundInput").addEventListener("change", handleSoundUpload);
  };

  const handleSoundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      audioEl.src = target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSetAlarm = () => {
    const timeValue = document.getElementById("alarmTime").value;
    if (!timeValue) {
      statusEl.textContent = "Please choose a time.";
      return;
    }
    const [hours, minutes] = timeValue.split(":").map(Number);
    const now = new Date();
    const alarmDate = new Date();
    alarmDate.setHours(hours, minutes, 0, 0);
    if (alarmDate <= now) {
      alarmDate.setDate(alarmDate.getDate() + 1);
    }
    scheduleAlarm(alarmDate);
  };

  const scheduleAlarm = (date) => {
    clearTimeout(alarmTimeoutId);
    targetTime = date;
    const delay = targetTime.getTime() - Date.now();
    alarmTimeoutId = setTimeout(triggerAlarm, delay);
    statusEl.textContent = `Alarm set for ${targetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const triggerAlarm = () => {
    popupEl.classList.add("active");
    document.getElementById("alarmPopupTime").textContent = targetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    audioEl.loop = true;
    audioEl.play().catch(() => {
      statusEl.textContent = "Interaction required to play audio.";
    });
  };

  const stopAlarmSound = () => {
    popupEl.classList.remove("active");
    audioEl.pause();
    audioEl.currentTime = 0;
  };

  const clearAlarm = () => {
    stopAlarmSound();
    clearTimeout(alarmTimeoutId);
    alarmTimeoutId = null;
    targetTime = null;
    statusEl.textContent = "No alarm set.";
  };

  const snoozeAlarm = () => {
    if (!targetTime) {
      stopAlarmSound();
      return;
    }
    stopAlarmSound();
    targetTime = new Date(Date.now() + 5 * 60 * 1000);
    scheduleAlarm(targetTime);
    statusEl.textContent = "Snoozed for 5 minutes.";
  };

  return { init };
})();

