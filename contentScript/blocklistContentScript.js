// function blockSite() {
//     document.body.innerHTML = '';
//     document.body.style.backgroundColor = 'black';
//     let blockMessage = document.createElement('h1');
//     blockMessage.style.color = 'yellow';
//     blockMessage.textContent = 'No way! You cannot access this site.';
//     document.body.appendChild(blockMessage);
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.command === "blockSite") {
//         blockSite();
//         console.log("site blocked");
//     }
// });

// // Send a "ready" signal to the background script
// chrome.runtime.sendMessage({command: "contentScriptReady"});
   
    
      

function blockSite() {
    let extensionUrl = chrome.runtime.getURL('contentScript/blocklist.html')
   // document.body.innerHTML = generateHTML();
    fetch(extensionUrl)
        .then(response => response.text())
        .then(html => {
            document.body.innerHTML = html;
        })
        .catch(error => {
            console.log('Error fetching blocklist:', error);
        });
} 
//function blockSite() {
//     document.body.innerHTML = '';
//     document.body.style.backgroundColor = 'black';
//     let blockMessage = document.createElement('h1');
//     blockMessage.style.color = 'yellow';
//     blockMessage.textContent = 'No way! You cannot access this site.';
//     document.body.appendChild(blockMessage);
       
       //document.body.innerHTML = generateHTML();
       //document.head.innerHTML = generateSTYLES();
       //break;
// }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "blockSite") {
        blockSite();
        console.log("site blocked");
    }
});

// Send a "ready" signal to the background script
chrome.runtime.sendMessage({command: "contentScriptReady"});
