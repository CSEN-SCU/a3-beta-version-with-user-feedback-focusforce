// This function creates a popup reminder
function popupReminder() {
    // Disconnect the observer
    observer.disconnect();
    
    const spanElements = document.getElementsByTagName("span");
    for (let span of spanElements) {
        if (span.textContent.trim() === "a day ago" || span.textContent.trim() === "2 days ago" ) {
            // Check if the popup already exists
            if (span.nextSibling && span.nextSibling.classList.contains("popup-reminder")) {
                continue;  // Skip this "a day ago" text, as it already has a popup
            }

            const popup = document.createElement("div");
            popup.classList.add("popup-reminder");
            popup.textContent = "→ do this problem again today to understand it better!";
            span.parentNode.insertBefore(popup, span.nextSibling);
        }
    }
    
    // Reconnect the observer
    observer.observe(document.body, observerConfig);
}

// This function will be called when the DOM updates
function handleDOMChange() {
    popupReminder();
}

// Setup a MutationObserver to call handleDOMChange on DOM updates
const observer = new MutationObserver(handleDOMChange);

// Configure the observer to monitor the entire DOM tree for additions and deletions of child nodes
const observerConfig = {
    childList: true,
    subtree: true
};

// Start observing the document with the configured parameters
observer.observe(document.body, observerConfig);

// Also call the popupReminder function initially
popupReminder();
