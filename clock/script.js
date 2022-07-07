(function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const hands = [{
    name: "hours",
    color: "red"
  }, {
    name: "minutes",
    color: "yellow"
  }, {
    name: "seconds",
    color: "green"
  }];
  const getTime = async () => {
    const d = new Date();
    return {
      hr: d.getHours(),
      min: d.getMinutes(),
      sec: d.getSeconds(),
      day: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear()
    }
  }
  const displayValue = (value) => {
    return value < 10 ? "0" + value : value;
  }
  const init = () => {
    const clockRunner = (hands, digits) => {
      return function () {
        getTime().then(t => {
          if (hands) {
            hands.seconds.style.setProperty("--rotation", t.sec * 6);
            hands.minutes.style.setProperty("--rotation", t.min * 6);
            hands.hours.style.setProperty("--rotation", (t.hr) * 30 + t.min / 2);
            hands.date.textContent = t.day + " " + MONTHS[t.month] + " " + t.year;
          }
          if (digits) {
            digits.hours.textContent = displayValue(t.hr % 12);
            digits.minutes.textContent = displayValue(t.min);
            digits.seconds.textContent = displayValue(t.sec);
            digits.ampm.textContent = t.hr > 12 ? "PM" : "AM"
          }
        });
      }
    }
    const addDigits = (root) => {
      for (let i = 1; i <= 12; i++) {
        let number = document.createElement("div");
        number.style.setProperty('--i', i);
        number.classList.add("digits");
        number.innerHTML = `<span class="value">${i}</span>`
        root.appendChild(number);
      }
    }
    const addSeparators = (root) => {
      for (let i = 1; i <= 60; i++) {
        let number = document.createElement("div");
        number.style.setProperty('--a', i);
        number.classList.add("separator");
        number.innerHTML = `|`
        root.appendChild(number);
      }
    }
    const addDateDiv = (root) => {
      let div = document.createElement("div");
      div.classList.add("dateValue");
      root.appendChild(div);
      return div;
    }
    const addNumbers = (root, clazz = "hands") => {
      const ref = {};
      for (let i = 0; i < 3; i++) {
        let hand = document.createElement("div");
        hand.style.setProperty('--color', hands[i].color);
        hand.classList.add(clazz);
        hand.classList.add(`${hands[i].name}`);
        ref[hands[i].name] = hand;
        root.appendChild(hand);
      }
      return ref;
    }
    const analog = document.querySelector("[analog-clock]");
    const digital = document.querySelector("[digital]");
    let handRef, digitsRef;
    if (analog) {
      analog.classList.add("analog-clock");
      const fragment = new DocumentFragment();
      addDigits(fragment);
      handRef = addNumbers(fragment);
      addSeparators(fragment);
      //Add Date
      handRef["date"] = addDateDiv(fragment);
      analog.appendChild(fragment);
    }
    if (digital) {
      digital.classList.add("digital-clock");
      const fragment = new DocumentFragment();
      digitsRef = addNumbers(fragment, "digits");
      const ampm = document.createElement("div");
      ampm.classList.add("ampm");
      digitsRef["ampm"] = ampm;
      fragment.appendChild(ampm);
      digital.appendChild(fragment);
    }
    const runClock = clockRunner(handRef, digitsRef);
    runClock();
    setInterval(runClock, 1000);
  }
  init();
}());
