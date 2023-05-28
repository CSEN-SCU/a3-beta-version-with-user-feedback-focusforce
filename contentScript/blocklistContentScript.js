function blockSite() {
    document.body.innerHTML = '';
    document.body.style.backgroundColor = 'black';
    let blockMessage = document.createElement('h1');
    blockMessage.style.color = 'yellow';
    blockMessage.textContent = 'No way! You cannot access this site.';
    document.body.appendChild(blockMessage);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "blockSite") {
        blockSite();
    }
});

// Send a "ready" signal to the background script
chrome.runtime.sendMessage({command: "contentScriptReady"});
