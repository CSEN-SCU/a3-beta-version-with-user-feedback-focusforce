(function () {
    // If the current URL is a LeetCode URL, return early to prevent double timer
    if (window.location.hostname.includes("leetcode.com")) {
      return;
    }
  
    let timerElement;
    let timerInterval;
    let tabId;
    let startTime;
  
    // Function to format time
    function formatTime(timeElapsed) {
      let totalSeconds = Math.round(timeElapsed / 1000);
      let hours = Math.floor(totalSeconds / 3600);
      let minutes = Math.floor((totalSeconds % 3600) / 60);
      let seconds = totalSeconds % 60;
  
      let timeSpentText = "Time spent: ";
      if (hours > 0) {
        timeSpentText += hours + " hours ";
      }
      if (minutes > 0 || hours > 0) {
        timeSpentText += minutes + " minutes ";
      }
      timeSpentText += seconds + " seconds";
  
      return timeSpentText;
    }
  
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
      if (request.command === "startTimer") {
        // Get tab id from background script
        chrome.runtime.sendMessage({ command: "getTabId" }, function (response) {
          tabId = response.tabId;
  
          // Retrieve the stored start time
          chrome.storage.sync.get([`startTime_${tabId}`], function (result) {
            let storedTime = result[`startTime_${tabId}`] || Date.now();
            if (!timerElement) {
              // Create the timer element
              timerElement = document.createElement("div");
              timerElement.id = "timerElement";
              document.body.appendChild(timerElement);
            }
  
            if (!timerInterval) {
              startTime = storedTime;
              timerInterval = setInterval(function () {
                let timeElapsed = Date.now() - startTime;
                if (timerElement) {
                  timerElement.textContent = formatTime(timeElapsed);
                }
              }, 1000);
            }
          });
        });
      } else if (request.command === "stopTimer") {
        // When timer stops, clear the stored time for this tab
        if (tabId) {
          chrome.storage.sync.remove(`startTime_${tabId}`, function () {
            console.log("Start time cleared for tab", tabId);
          });
        }
        if (timerElement) {
          // Remove the timer element
          document.body.removeChild(timerElement);
          timerElement = null;
        }
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
      }
    });
  
    // Send a "ready" signal to the background script
    chrome.runtime.sendMessage({ command: "timerContentScriptReady" });
  })();
  