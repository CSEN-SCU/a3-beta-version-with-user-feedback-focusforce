(function () {
    // If the current URL is a LeetCode URL, return early to prevent double timer
    if (window.location.hostname.includes("leetcode.com"||"openai.com"||"youtube.com")) {
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
      
      let timeSpentText = "";
      if (hours > 0) {
        timeSpentText += hours + " hours ";
      }
      if (minutes > 0 || hours > 0) {
        timeSpentText += minutes + " minutes ";
      }
      timeSpentText += seconds + " seconds";
  
      return  timeSpentText;
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
              // Create the parent div
              let parentElement = document.createElement("div");
              parentElement.id = "parentElement";
              document.body.appendChild(parentElement);
            
              // Create the textElement
              let textElement = document.createElement("div");
              textElement.id = "textElement";
              textElement.textContent = "Current Session";
              parentElement.appendChild(textElement);
            
              // Create the timerElement
              timerElement = document.createElement("div");
              timerElement.id = "timerElement";
              parentElement.appendChild(timerElement);

              // Create the buttonElement
             /* let buttonElement = document.createElement("button");
              buttonElement.id = "buttonElement";
              buttonElement.textContent = "switch";
              parentElement.appendChild(buttonElement);*/

              // 添加鼠标悬停和移出事件监听器
              parentElement.addEventListener("mouseenter", function() {
                parentElement.style.display = "none";
              });

              parentElement.addEventListener("mouseleave", function() {
                parentElement.style.display = "block";
                });
          
            }
            
  
            if (!timerInterval) {
              startTime = storedTime;
              let lastAlertTime = 0; // 记录上次触发提示的时间
              timerInterval = setInterval(function () {
                let timeElapsed = Date.now() - startTime;
                if (timerElement) {
                  timerElement.textContent = formatTime(timeElapsed);
                  // check 5min
                  if (timeElapsed >= 5 * 60 * 1000 && timeElapsed - lastAlertTime >= 5 * 60 * 1000) {
                   // clearInterval(timerInterval);
                    //timerInterval = null;
                    lastAlertTime = timeElapsed; // 更新上次触发提示的时间
                    alert("You have been browsing this page for 5 minutes！");
                  }
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
  
