// This script runs in the background
// It can be used to send messages to the content script
let whiteList = ["leetcode.com", "https://neetcode.io/", "chat.openai.com/","https://www.youtube.com/"];
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

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'loading') {
//         chrome.tabs.sendMessage(tabId, { command: 'stopTimer' });
//     } else if (changeInfo.status === 'complete') {
//         chrome.tabs.sendMessage(tabId, { command: 'startTimer' });
//     }
// });





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

// function checkBlockedStatus(details) {
//     chrome.storage.sync.get(['blockedList', 'whiteList'], function(result) {
//         let blockedList = result.blockedList || [];
//         let whiteList = ["leetcode.com", "youtube.com", "neetcode.io/practice"];


        // let url = new URL(details.url);
        // let isBlocked = blockedList.some(blockedUrl => {
        //     let regex = new RegExp(blockedUrl);
        //     return regex.test(url.href);
        // });
        // let isOnWhiteList = whiteList.some(whiteListedUrl => {
        //     let regex = new RegExp(whiteListedUrl);
        //     return regex.test(url.href);
        // });

        
        // if (!isBlocked && !isOnWhiteList) {
        //     // If the URL is not in the blocked list or white list, start the timer
        //     chrome.tabs.sendMessage(details.tabId, { 
        //         command: "startTimer"
        //     }, function(response) {
        //         if (chrome.runtime.lastError) {
        //             console.error(chrome.runtime.lastError);
        //         }
        //     });
      
        // } else if (isBlocked) {
        //     // If the URL is in the blocked list, send a message to block the site
        //     chrome.tabs.sendMessage(details.tabId, { 
        //         command: "blockSite"
        //     }, function(response) {
        //         if (chrome.runtime.lastError) {
        //             console.error(chrome.runtime.lastError);
        //         }
        //     });

//         }  else if (isOnWhiteList) {
//             // If the URL is in the white list, stop the timer
//             chrome.tabs.sendMessage(details.tabId, { 
//                 command: "stopTimer"
//             }, function(response) {
//                 if (chrome.runtime.lastError) {
//                     console.error(chrome.runtime.lastError);
//                 }
//             });
//         }
//     });
// }

/*
function checkBlockedStatus(details) {
    chrome.storage.sync.get(['blockedList'], function(result) {
        let blockedList = result.blockedList || [];

        let url = new URL(details.url);
        let isBlocked = blockedList.some(blockedUrl => {
            let regex = new RegExp(blockedUrl);
            return regex.test(url.href);
        });

        let isOnWhiteList = whiteList.some(whiteListedUrl => {
            let regex = new RegExp(whiteListedUrl);
            return regex.test(url.href);
        });

        if (!isBlocked && !isOnWhiteList) {
            // If the URL is not in the blocked list or white list, start the timer if it is not already running
            if (!tabTimers[details.tabId]) {
                // If a timer is not already running for this tab, start it
                let startTime = Date.now();
                chrome.storage.sync.set({ [`startTime_${details.tabId}`]: startTime }, function() {
                    console.log('Start time stored for tab', details.tabId);
                });
                chrome.tabs.sendMessage(details.tabId, { 
                    command: "startTimer"
                }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                });
            }
        } else {
            // If the URL is in the blocked list or the white list, stop the timer and clear the stored start time
            chrome.storage.sync.remove(`startTime_${details.tabId}`, function() {
                console.log('Start time cleared for tab', details.tabId);
            });
            chrome.tabs.sendMessage(details.tabId, { 
                command: "stopTimer"
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });
}
*/


function cleanLocalStorageAndTabs() {
    // Clean all the local storage
    chrome.storage.sync.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });

    // Close all tabs
    chrome.tabs.query({}, function(tabs) {
        for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.remove(tabs[i].id);
        }

        // Open new tabs with whitelisted URLs
        let whiteListUrls = ["https://leetcode.com", "https://www.youtube.com", "https://chat.openai.com/"];
        for (let i = 0; i < whiteListUrls.length; i++) {
            chrome.tabs.create({ url: whiteListUrls[i] });
        }

        // Focus on the leetcode page
        chrome.tabs.query({url: "https://leetcode.com"}, function(tabs) {
            if (tabs[0]) {
                chrome.tabs.update(tabs[0].id, {active: true});
            }
        });
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "cleanLocalStorageAndTabs") {
        cleanLocalStorageAndTabs();
    }
});


// Add an event listener for when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        // If the tab navigates to a different URL, clear the start time for the tab
        chrome.storage.sync.remove(`startTime_${tabId}`, function() {
            console.log('Start time cleared for tab', tabId);
        });
        delete tabStartTimes[tabId];
    }
});
function checkBlockedStatus(details) {
    chrome.storage.sync.get(['blockedList'], function(result) {
        let blockedList = result.blockedList || [];

        let url = new URL(details.url);
        let isBlocked = blockedList.some(blockedUrl => {
            let regex = new RegExp(blockedUrl);
            return regex.test(url.href);
        });

        let isOnWhiteList = whiteList.some(whiteListedUrl => {
            let regex = new RegExp(whiteListedUrl);
            return regex.test(url.href);
        });

        if (!isBlocked && !isOnWhiteList) {
            // If the URL is not in the blocked list or white list, start the timer if it is not already running
            chrome.storage.sync.get([`startTime_${details.tabId}`], function(result) {
                let startTime = result[`startTime_${details.tabId}`];
                if (!startTime) {
                    // If a start time is not already saved for this tab, set it to the current time
                    startTime = Date.now();
                    chrome.storage.sync.set({ [`startTime_${details.tabId}`]: startTime }, function() {
                        console.log('Start time stored for tab', details.tabId);
                    });
                }
                if (!tabTimers[details.tabId]) {
                    // If a timer is not already running for this tab, start it
                    chrome.tabs.sendMessage(details.tabId, { 
                        command: "startTimer"
                    }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError);
                        }
                    });
                }
            });
        } else {
            if (isBlocked) {
            // If the URL is in the blocked list, send a message to block the site
            chrome.tabs.sendMessage(details.tabId, { 
                command: "blockSite"
            });}
            
            // If the URL is in the blocked list or the white list, stop the timer and clear the stored start time
            chrome.storage.sync.remove(`startTime_${details.tabId}`, function() {
                console.log('Start time cleared for tab', details.tabId);
            });
            chrome.tabs.sendMessage(details.tabId, { 
                command: "stopTimer"
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                }
            });
        }
    });
}

