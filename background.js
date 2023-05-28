// This script runs in the background
// It can be used to send messages to the content script
let whiteList = ["leetcode.com", "neetcode.io/practice"];
let defaultTimer = 60000; // Timer for non-whitelisted sites (in milliseconds, 60000 ms = 1 minute)

let tabTimers = {}; // Object to hold the timer for each tab
let tabStartTimes = {}; // Object to hold the start time for each tab

let contentScriptLoaded = false;



chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    checkBlockedStatus(details);
});

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    checkBlockedStatus(details);
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "timerContentScriptReady") {
        contentScriptLoaded = true;

    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "closeTab") {
        chrome.tabs.remove(sender.tab.id);
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.command == "getTabId") {
        sendResponse({tabId: sender.tab.id});
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'loading') {
        chrome.tabs.sendMessage(tabId, { command: 'stopTimer' });
    } else if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, { command: 'startTimer' });
    }
});


chrome.webNavigation.onCompleted.addListener(function(details) {
    checkBlockedStatus(details);
}, { url: [{ urlMatches: 'http://*/*' }, { urlMatches: 'https://*/*' }] });

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    // If a tab is closed, make sure to clear the timer for that tab
    if (tabTimers[tabId]) {
        clearTimeout(tabTimers[tabId]);
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    // When a tab is activated, pause the timer for the previous tab and start the timer for the new one
    if (tabTimers[activeInfo.previousTabId]) {
        pauseTimer(activeInfo.previousTabId);
    }
    if (tabTimers[activeInfo.tabId]) {
        startTimer(activeInfo.tabId);
    }
});

function startTimer(tabId) {
    if (tabTimers[tabId]) {
        clearTimeout(tabTimers[tabId]);
    }
    let startTime = Date.now();
    tabStartTimes[tabId] = startTime;
    tabTimers[tabId] = setTimeout(function() {
        // When the timer ends, redirect the tab
        chrome.tabs.update(tabId, { url: "timerexpired.html" });
    }, defaultTimer);
}

function pauseTimer(tabId) {
    clearTimeout(tabTimers[tabId]);
    // Calculate the remaining time for this timer
    let remainingTime = defaultTimer - (Date.now() - tabStartTimes[tabId]);
    // Start a new timer with the remaining time
    tabTimers[tabId] = setTimeout(function() {
        // When the timer ends, redirect the tab
        chrome.tabs.update(tabId, { url: "timerexpired.html" });
    }, remainingTime);
}

chrome.storage.sync.set({startTime: Date.now()}, function() {
    console.log('Start time stored.');
});

function checkBlockedStatus(details) {
    chrome.storage.sync.get(['blockedList', 'whiteList'], function(result) {
        let blockedList = result.blockedList || [];
        let whiteList = result.whiteList || ['leetcode.com', 'neetcode.io/practice'];

        let url = new URL(details.url);
        let isBlocked = blockedList.some(blockedUrl => {
            let regex = new RegExp(blockedUrl);
            return regex.test(url.href);
        });
        if (isBlocked) {
            // If the URL is in the blocked list, send a message to block the site
            chrome.tabs.sendMessage(details.tabId, { 
                command: "blockSite"
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        } else {
            let isOnWhiteList = whiteList.some(whiteListedUrl => {
                let regex = new RegExp(whiteListedUrl);
                return regex.test(url.href);
            });
            if (!isOnWhiteList) {
                // If the URL is not in the white list, send a message to start the timer
                chrome.tabs.sendMessage(details.tabId, { 
                    command: "startTimer"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                });
            } else {
                // If the URL is in the white list, send a message to stop the timer
                chrome.tabs.sendMessage(details.tabId, { 
                    command: "stopTimer"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                });
            }
        }
    });
}
