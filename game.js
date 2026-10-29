(function () {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const KEYS = ["A", "B", "C", "D"];
  const POINTS = 10;
  const STREAK_BONUS = 5;
  const STREAK_MIN = 3;

  const state = { rounds: [], index: 0, score: 0, streak: 0, correct: 0, answered: false, log: [] };

  /* ---------- helpers ---------- */
  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    window.scrollTo({ top: 0 });
  }

  /* ---------- building rounds ---------- */
  // Two round types: medicine -> drug class, and drug class -> medicine.
  // Every class in data.js is unique, so each round has exactly one right answer.
  function buildRounds() {
    return shuffle(MEDICINES).map((med, i) => {
      const others = shuffle(MEDICINES.filter((m) => m !== med)).slice(0, 3);
      const askClass = i % 2 === 0;
      return {
        med,
        type: askClass ? "Find the drug class" : "Find the medicine",
        before: askClass ? "Which drug class does " : "Which medicine is a ",
        focus: askClass ? med.name : med.cls,
        after: askClass ? " belong to?" : "?",
        answer: askClass ? med.cls : med.name,
        options: shuffle([med].concat(others).map((m) => (askClass ? m.cls : m.name)))
      };
    });
  }

  /* ---------- game flow ---------- */
  function startGame() {
    state.rounds = buildRounds();
    state.index = 0;
    state.score = 0;
    state.streak = 0;
    state.correct = 0;
    state.log = [];
    $("total").textContent = state.rounds.length;
    show("screen-play");
    renderRound();
  }

  function renderRound() {
    const r = state.rounds[state.index];
    state.answered = false;

    $("round").textContent = state.index + 1;
    $("score").textContent = state.score;
    $("streak").textContent = state.streak;
    $("progress-fill").style.width = (state.index / state.rounds.length) * 100 + "%";
    $("qtype").textContent = r.type;

    const q = $("question");
    q.textContent = "";
    const em = document.createElement("em");
    em.textContent = r.focus;
    q.append(r.before, em, r.after);

    const cap = $("capsule");
    cap.classList.remove("good", "bad");

    const box = $("options");
    box.textContent = "";
    r.options.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "opt";
      b.type = "button";
      b.dataset.key = KEYS[i];
      b.textContent = text;
      b.addEventListener("click", () => answer(b, text));
      box.appendChild(b);
    });

    $("feedback").hidden = true;
    box.querySelector(".opt").focus({ preventScroll: true });
  }

  function answer(button, choice) {
    if (state.answered) return;
    state.answered = true;

    const r = state.rounds[state.index];
    const right = choice === r.answer;
    let gained = 0;

    if (right) {
      state.streak += 1;
      state.correct += 1;
      gained = POINTS + (state.streak >= STREAK_MIN ? STREAK_BONUS : 0);
      state.score += gained;
    } else {
      state.streak = 0;
    }
    state.log.push({ med: r.med, right, choice });

    document.querySelectorAll(".opt").forEach((b) => {
      b.disabled = true;
      if (b.textContent === r.answer) b.classList.add("correct");
      else if (b === button) b.classList.add("wrong");
      else b.classList.add("dim");
    });

    $("capsule").classList.add(right ? "good" : "bad");
    $("score").textContent = state.score;
    $("streak").textContent = state.streak;
    const pill = $("streak-pill");
    pill.classList.remove("hot");
    if (right && state.streak >= STREAK_MIN) { void pill.offsetWidth; pill.classList.add("hot"); }

    const fb = $("feedback");
    fb.className = "feedback " + (right ? "good" : "bad");
    $("verdict").textContent = right
      ? "Correct! +" + gained + (gained > POINTS ? " (streak bonus)" : "")
      : "Not quite. The answer is: " + r.answer;
    $("explain").textContent = r.med.name + " is a " + r.med.cls + ". Main use: " + r.med.use + ".";
    $("btn-next").textContent = state.index + 1 < state.rounds.length ? "Next →" : "See Results →";
    fb.hidden = false;
    $("btn-next").focus({ preventScroll: true });
    fb.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function next() {
    state.index += 1;
    if (state.index < state.rounds.length) renderRound();
    else finish();
  }

  function finish() {
    const total = state.rounds.length;
    const c = state.correct;
    const stars = c >= total - 2 ? 3 : c >= Math.ceil(total * 0.6) ? 2 : c >= Math.ceil(total * 0.3) ? 1 : 0;

    $("progress-fill").style.width = "100%";
    $("final-score").textContent = state.score;
    $("stars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("final-line").textContent = "You got " + c + " out of " + total + " correct. " +
      (stars === 3 ? "Excellent work!" : stars === 2 ? "Good job, review the ones you missed." : "Try the Study Cards, then play again.");

    const review = $("review");
    review.textContent = "";
    const h = document.createElement("h3");
    h.textContent = "Review";
    const ul = document.createElement("ul");
    state.log.forEach((e) => {
      const li = document.createElement("li");
      li.className = e.right ? "ok" : "";
      li.textContent = (e.right ? "✓ " : "✗ ") + e.med.name + " – " + e.med.cls + " (" + e.med.use + ")" +
        (e.right ? "" : "  · you chose: " + e.choice);
      ul.appendChild(li);
    });
    review.append(h, ul);
    show("screen-result");
  }

  /* ---------- study cards ---------- */
  function renderStudy() {
    const wrap = $("cards");
    wrap.textContent = "";
    MEDICINES.forEach((m) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.setAttribute("aria-label", m.name + ", tap to flip");
      card.innerHTML = '<div class="card-inner"><div class="face front"></div><div class="face back"></div></div>';
      const front = card.querySelector(".front");
      front.textContent = m.name;
      const small = document.createElement("small");
      small.textContent = "tap to flip";
      front.appendChild(small);
      const back = card.querySelector(".back");
      const b1 = document.createElement("b");
      b1.textContent = m.cls;
      back.append(b1, document.createElement("br"), "Use: " + m.use);
      card.addEventListener("click", () => card.classList.toggle("flipped"));
      wrap.appendChild(card);
    });
    $("study-count").textContent = MEDICINES.length + " medicines";
    show("screen-study");
  }

  /* ---------- sources ---------- */
  function openSources() {
    const ul = $("sources-list");
    ul.textContent = "";
    SOURCES.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      ul.appendChild(li);
    });
    $("modal").hidden = false;
    $("btn-close").focus();
  }
  function closeSources() { $("modal").hidden = true; }

  /* ---------- events ---------- */
  $("btn-play").addEventListener("click", startGame);
  $("btn-again").addEventListener("click", startGame);
  $("btn-next").addEventListener("click", next);
  $("btn-study").addEventListener("click", renderStudy);
  $("btn-study2").addEventListener("click", renderStudy);
  $("btn-sources").addEventListener("click", openSources);
  $("btn-close").addEventListener("click", closeSources);
  $("modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeSources(); });
  document.querySelectorAll("[data-home]").forEach((b) => b.addEventListener("click", () => show("screen-start")));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("modal").hidden) return closeSources();
    if (!$("screen-play").classList.contains("active")) return;
    const k = e.key.toUpperCase();
    const i = KEYS.indexOf(k) >= 0 ? KEYS.indexOf(k) : ["1", "2", "3", "4"].indexOf(k);
    if (!state.answered && i >= 0) {
      const b = document.querySelectorAll(".opt")[i];
      if (b) b.click();
    }
  });

  /* ---------- floating capsules background (2D canvas) ---------- */
  const canvas = $("bg");
  const ctx = canvas.getContext("2d");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colors = ["#ff6b5e", "#12b5a5", "#ffc54d", "#6fa8ff"];
  let pills = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(26, (innerWidth * innerHeight) / 45000));
    pills = Array.from({ length: n }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 6 + Math.random() * 8,
      a: Math.random() * Math.PI,
      va: (Math.random() - 0.5) * 0.01,
      vy: 0.15 + Math.random() * 0.35,
      c: colors[Math.floor(Math.random() * colors.length)]
    }));
  }

  function drawPill(p) {
    const len = p.r * 2.4;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.a);
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(-len / 2, 0, p.r, Math.PI / 2, Math.PI * 1.5);
    ctx.lineTo(len / 2, -p.r);
    ctx.arc(len / 2, 0, p.r, -Math.PI / 2, Math.PI / 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function frame() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    pills.forEach((p) => {
      if (!still) {
        p.y -= p.vy;
        p.a += p.va;
        if (p.y < -30) { p.y = innerHeight + 30; p.x = Math.random() * innerWidth; }
      }
      drawPill(p);
    });
    if (!still) requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => { resize(); if (still) frame(); });
  resize();
  frame();
})();
