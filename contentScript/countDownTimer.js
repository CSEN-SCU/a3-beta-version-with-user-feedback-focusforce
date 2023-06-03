// 创建倒计时器元素
function createCountdownElement() {
  const countdownElement = document.createElement("div");
  countdownElement.id = "countdown";
  document.body.appendChild(countdownElement);
}

// 倒计时器
function countdownTimer(targetTime) {
  const countdownElement = document.getElementById("countdown");
  const timerInterval = setInterval(updateCountdown, 1000);

  function updateCountdown() {
    const currentTime = new Date().getTime();
    const timeRemaining = targetTime - currentTime;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      countdownElement.textContent = "Countdown Finished!";
      showNotification("Countdown Finished!");
    } else {
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  function showNotification(message) {
    // 使用您自己的弹出通知逻辑
    alert(message);
  }
}

// 创建开始按钮
function createStartButton() {
  const startButton = document.createElement("button");
  startButton.id = "startButton";
  startButton.textContent = "Start Countdown";
  startButton.addEventListener("click", startCountdown);
  document.body.appendChild(startButton);
}

// 开始倒计时
function startCountdown() {
  const inputHours = parseInt(document.getElementById("hoursInput").value, 10);
  const inputMinutes = parseInt(document.getElementById("minutesInput").value, 10);
  const inputSeconds = parseInt(document.getElementById("secondsInput").value, 10);

  if (isNaN(inputHours) || isNaN(inputMinutes) || isNaN(inputSeconds)) {
    alert("Please enter valid time values.");
    return;
  }

  const currentTime = new Date();
  const targetTime = new Date();
  targetTime.setHours(currentTime.getHours() + inputHours);
  targetTime.setMinutes(currentTime.getMinutes() + inputMinutes);
  targetTime.setSeconds(currentTime.getSeconds() + inputSeconds);

  countdownTimer(targetTime.getTime());
}

// 创建倒计时输入框
function createCountdownInputs() {
  const hoursInput = document.createElement("input");
  hoursInput.id = "hoursInput";
  hoursInput.placeholder = "Hours";
  document.body.appendChild(hoursInput);

  const minutesInput = document.createElement("input");
  minutesInput.id = "minutesInput";
  minutesInput.placeholder = "Minutes";
  document.body.appendChild(minutesInput);

  const secondsInput = document.createElement("input");
  secondsInput.id = "secondsInput";
  secondsInput.placeholder = "Seconds";
  document.body.appendChild(secondsInput);
}

// 创建倒计时器及相关元素
createCountdownElement();
createStartButton();
createCountdownInputs();
