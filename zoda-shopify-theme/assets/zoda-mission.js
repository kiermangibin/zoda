(function () {
  function getLocalDateKey(date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  }

  function initMissionGame(root) {
    var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-mission-space]"));
    var detail = root.querySelector("[data-mission-detail]");
    var week = root.querySelector("[data-mission-detail-week]");
    var title = root.querySelector("[data-mission-detail-title]");
    var copy = root.querySelector("[data-mission-detail-copy]");
    var points = root.querySelector("[data-mission-detail-points]");
    var type = root.querySelector("[data-mission-detail-type]");
    var icon = root.querySelector("[data-mission-detail-icon]");
    var daily = root.querySelector("[data-mission-daily]");
    var dailyDay = root.querySelector("[data-mission-daily-day]");
    var dailyStart = root.querySelector("[data-mission-daily-start]");
    var startButton = root.querySelector("[data-mission-start]");
    var todayButton = root.querySelector("[data-mission-today]");
    var storageKey = "zoda-mission-start-date";

    function selectButton(button) {
      if (!button) return;

      buttons.forEach(function (item) {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });

      if (detail) detail.dataset.tone = button.dataset.tone || "black";
      if (week) week.textContent = button.dataset.week || "";
      if (title) title.textContent = button.dataset.label || "";
      if (copy) copy.textContent = button.dataset.detail || "";
      if (points) points.textContent = button.dataset.points || "";
      if (type) type.textContent = button.dataset.type || "";

      if (icon) {
        if (button.dataset.icon) {
          icon.src = button.dataset.icon;
          icon.hidden = false;
        } else {
          icon.hidden = true;
        }
      }

      root.dataset.selectedDay = button.dataset.day || "1";
      root.dataset.selectedSpaceId = button.dataset.spaceId || "";
    }

    function showActiveMission() {
      var startDate = window.localStorage.getItem(storageKey);
      if (!startDate || !daily) return;

      daily.hidden = false;
      if (dailyDay) dailyDay.textContent = "Day " + (root.dataset.selectedDay || "1") + " / 21";
      if (dailyStart) dailyStart.textContent = "Started " + startDate;
      if (todayButton) todayButton.hidden = false;
      if (startButton) startButton.textContent = "Start Here";
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        selectButton(button);
      });
    });

    if (startButton) {
      startButton.addEventListener("click", function () {
        window.localStorage.setItem(storageKey, getLocalDateKey(new Date()));
        showActiveMission();
      });
    }

    if (todayButton) {
      todayButton.addEventListener("click", function () {
        var todaySpace = root.querySelector(
          '[data-mission-space][data-day="' + (root.dataset.selectedDay || "1") + '"]',
        );
        selectButton(todaySpace || buttons[1] || buttons[0]);
      });
    }

    selectButton(buttons[0]);
    showActiveMission();
  }

  function initMissionPlaybook(root) {
    var cards = Array.prototype.slice.call(root.querySelectorAll("[data-playbook-card]"));
    var dots = Array.prototype.slice.call(root.querySelectorAll("[data-playbook-dot]"));
    var prev = root.querySelector("[data-playbook-prev]");
    var next = root.querySelector("[data-playbook-next]");
    var count = root.querySelector("[data-playbook-count]");
    var checks = Array.prototype.slice.call(root.querySelectorAll("[data-playbook-check]"));
    var storageKey = "zoda-mission-playbook-checks";
    var selectedIndex = 0;
    var savedChecks = [];

    try {
      savedChecks = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
    } catch (error) {
      savedChecks = [];
    }

    function saveChecks() {
      window.localStorage.setItem(storageKey, JSON.stringify(savedChecks));
    }

    function setChecked(button, isChecked) {
      var row = button.closest("[data-playbook-item-row]");
      button.setAttribute("aria-pressed", isChecked ? "true" : "false");
      if (row) row.classList.toggle("is-checked", isChecked);
    }

    function showCard(index) {
      if (!cards.length) return;
      selectedIndex = (index + cards.length) % cards.length;

      cards.forEach(function (card, cardIndex) {
        card.hidden = cardIndex !== selectedIndex;
      });

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === selectedIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      if (count) {
        count.textContent =
          String(selectedIndex + 1).padStart(2, "0") +
          " / " +
          String(cards.length).padStart(2, "0");
      }
    }

    checks.forEach(function (button) {
      var id = button.dataset.checkId;
      if (!id) return;

      setChecked(button, savedChecks.indexOf(id) !== -1);

      button.addEventListener("click", function () {
        var isChecked = savedChecks.indexOf(id) !== -1;
        if (isChecked) {
          savedChecks = savedChecks.filter(function (item) {
            return item !== id;
          });
        } else {
          savedChecks.push(id);
        }
        setChecked(button, !isChecked);
        saveChecks();
      });
    });

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        showCard(Number(dot.dataset.cardIndex || 0));
      });
    });

    if (prev) {
      prev.addEventListener("click", function () {
        showCard(selectedIndex - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        showCard(selectedIndex + 1);
      });
    }

    showCard(0);
  }

  function init() {
    document.querySelectorAll("[data-zoda-mission-game]").forEach(initMissionGame);
    document.querySelectorAll("[data-zoda-mission-playbook]").forEach(initMissionPlaybook);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
