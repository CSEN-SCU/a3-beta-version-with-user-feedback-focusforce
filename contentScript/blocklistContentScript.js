function blockSite() {
    document.body.innerHTML = '';
    // Use the local background image
    document.body.style.backgroundImage = `url(${chrome.runtime.getURL('images/WechatIMG142971.jpeg')})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    // Use Flexbox to center the text
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';  // Full viewport height
    let blockMessage = document.createElement('h1');
    blockMessage.style.color = 'black';  // Change text color to white
    blockMessage.style.fontSize = '2.9em';  // Increase text size
    blockMessage.textContent = 'No way! You cannot access this site.';
    // Create a semi-transparent white frame around the text
    blockMessage.style.padding = '20px';
    blockMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    blockMessage.style.borderRadius = '15px'; // rounded corners
    document.body.appendChild(blockMessage);
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "blockSite") {
        blockSite();
        console.log("site blocked");
    }
});

// Send a "ready" signal to the background script
chrome.runtime.sendMessage({command: "contentScriptReady"});