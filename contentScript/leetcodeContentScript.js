// Code Adapted from Yet-Another-Leetcode-Timer
// Source 1: https://github.com/djtran/Yet-Another-LeetCode-Timer/blob/master/src/leetcode/timer.js
// Source 2: https://github.com/djtran/Yet-Another-LeetCode-Timer/blob/master/src/leetcode/main.js
// This part of my extension is different than existing extension codebase in 3 aspects:
// 1) I've updated to Leetcode's latest UI, where a lot of web element's class names are changed.
// 2) I also changed the place of timer into the top of the Leetcode's UI making it more obvious.
// 3) I added the positive encouragement notification function so that when people finished tasks they can receive the notice.

(function() {
    let timerDisplay;
    let startTimerButton;
    let pauseTimerButton;
    let resetTimerButton;
    let startTime;
    let updatedTime;
    let difference;
    let tInterval;
    let savedTime;
    let paused = 0;
    let running = false;

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            savedTime = 0;
            paused = 0;
            running = true;
            timerDisplay.style.background = "#C7F1C7";
            startTimerButton.style.cursor = "auto";
            pauseTimerButton.style.cursor = "pointer";
            tInterval = setInterval(getShowTime, 1000);
        }
    }



    function pauseTimer() {
        if (!difference) {
            // if timer never started, don't allow pause button to do anything
        } else if (!paused) {
            clearInterval(tInterval);
            savedTime = difference;
            paused = 1;
            running = 0;
            timerDisplay.style.background = "";
            startTimerButton.style.cursor = "pointer";
            pauseTimerButton.style.cursor = "auto";
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        savedTime = 0;
        difference = 0;
        paused = 0;
        running = 0;
        timerDisplay.innerHTML = '00:00:00';
        startTimerButton.style.cursor = "pointer";
        pauseTimerButton.style.cursor = "auto";

    }

    function finishTimer() {
        clearInterval(tInterval);
        running = false;
        let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        let message = `You are the best! You've worked on ${hours} hours ${minutes} minutes ${seconds} seconds grinding LeetCode.`;
        alert(message);
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        if (savedTime) {
            difference = (updatedTime - startTime) + savedTime;
        } else {
            difference = updatedTime - startTime;
        }
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
    }

    function setupPage() {
        // Check if the current page is leetcode.com
        if (window.location.hostname.includes("leetcode.com")) {
            if (!document.getElementById("timerContainer")) {
                // Create a container element to hold the timer and buttons
                let container = document.createElement("div");
                container.id = "timerContainer";
                container.style.display = "flex";
                container.style.alignItems = "center";

                // Create the timer display
                timerDisplay = document.createElement("label");
                timerDisplay.classList.add('timer');
                timerDisplay.innerText = "00:00:00";
                timerDisplay.style.marginRight = "16px";
                timerDisplay.style.padding = "8px";
                container.appendChild(timerDisplay);

                // Create the start button
                startTimerButton = document.createElement("button");
                startTimerButton.textContent = "Start";
                startTimerButton.style.padding = "5px 10px";
                startTimerButton.style.marginRight = "10px";
                startTimerButton.onclick = startTimer;
                container.appendChild(startTimerButton);

                // Create the pause button
                pauseTimerButton = document.createElement("button");
                pauseTimerButton.textContent = "Pause";
                pauseTimerButton.style.padding = "5px 10px";
                pauseTimerButton.style.marginRight = "10px";
                pauseTimerButton.onclick = pauseTimer;
                container.appendChild(pauseTimerButton);

                // Create the reset button
                resetTimerButton = document.createElement("button");
                resetTimerButton.textContent = "Reset";
                resetTimerButton.style.padding = "5px 10px";
                resetTimerButton.onclick = resetTimer;
                container.appendChild(resetTimerButton);

                // Create the finish button
                finishTimerButton = document.createElement("button");
                finishTimerButton.textContent = "Finish";
                finishTimerButton.style.padding = "5px 10px";
                finishTimerButton.onclick = finishTimer;
                container.appendChild(finishTimerButton);

                // Find the reference node based on the XPath
                let referenceNode = document.evaluate("//*[@id='__next']/div/div/div/nav/div/div/div[1]/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (referenceNode) {
                    // Insert the container before the reference node
                    referenceNode.parentNode.insertBefore(container, referenceNode.nextSibling);
                }
            }
        }
    }

    // Delay the start of the timer to ensure it runs after the page is fully loaded
    setTimeout(setupPage, 1000);

    // Run setupPage every time the page is loaded
    window.addEventListener('load', setupPage);
})();
