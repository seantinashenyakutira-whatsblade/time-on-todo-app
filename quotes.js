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

const QuotesManager = (() => {
  const POPUP_INTERVAL = 45 * 1000;
  const QUOTES = [
    "Small calm actions compound into remarkable growth.",
    "You are allowed to be both a masterpiece and a work in progress.",
    "Consistency beats intensity when it comes to progress.",
    "Your future is built quietly in today's focused minutes.",
    "Energy flows where your gentle attention goes.",
    "Rest is productive when it fuels aligned action.",
    "Choose progress over perfection, always.",
    "Momentum loves clarity—set the tone, then move.",
    "Tiny rituals create massive life upgrades.",
    "Your pace is sacred; honor what feels sustainable.",
    "Deep breaths invite the mind to soften and refocus.",
    "You can do hard things softly.",
    "Focus on the next elegant step, not the entire staircase.",
    "Alignment turns effort into flow.",
    "Grace is giving yourself room to restart.",
    "Less noise, more intention.",
    "Celebrate quiet wins; they're the foundation of confidence.",
    "You are on time for your own life.",
    "Protect your energy like the precious resource it is.",
    "Take breaks before you break.",
    "Even 1% better is progress worth honoring.",
    "You’re not behind—you’re in training.",
    "Calm clarity is your productivity edge.",
    "Build systems that feel like support, not pressure.",
    "You’re rewriting your story every focused minute.",
    "Stillness is a strategy, not an accident.",
    "You don’t need more time, you need more aligned intention.",
    "Listen to what your nervous system needs.",
    "Slow is smooth, smooth becomes fast.",
    "Your habits are a love letter to your future self.",
    "Being gentle with yourself is a power skill.",
    "When it’s rooted in purpose, discipline becomes devotion.",
  ];

  let enabled = true;
  let timerId = null;
  let popupEl;
  let quoteTextEl;

  const init = (initialState = true) => {
    popupEl = document.getElementById("quotePopup");
    quoteTextEl = document.getElementById("quoteText");
    document.getElementById("closeQuote").addEventListener("click", hidePopup);
    enabled = initialState;
    refreshTimer();
  };

  const refreshTimer = () => {
    clearInterval(timerId);
    if (!enabled) return;
    timerId = setInterval(showRandomQuote, POPUP_INTERVAL);
  };

  const showRandomQuote = () => {
    if (!enabled) return;
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    quoteTextEl.textContent = random;
    popupEl.classList.add("active");
    setTimeout(hidePopup, 10000);
  };

  const hidePopup = () => {
    popupEl.classList.remove("active");
  };

  const toggle = () => {
    enabled = !enabled;
    hidePopup();
    refreshTimer();
    return enabled;
  };

  return { init, toggle, showRandomQuote };
})();

