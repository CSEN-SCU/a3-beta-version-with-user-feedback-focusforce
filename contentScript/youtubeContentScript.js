

function checkPage() {
    var url = new URL(window.location.href);

    if (url.hostname === 'www.youtube.com' && url.pathname == "/") {
        // the following code for blocking youtube elements are reused & modified from helloworld.js of the default template
        document.querySelector('ytd-browse[role="main"][page-subtype="home"] #contents').remove(); 
        document.querySelector('#guide-wrapper').remove();
        var message = document.createElement("p");
        message.textContent = "Hey, it's not the time to watch fun videos! A Leetcode a day, keeps rejection letter away.";
        message.style = "font-size: 50px; color: orange; text-align: center;";
        var primaryElement = document.getElementById("primary");
        primaryElement.appendChild(message);
        
    }



    if (url.hostname === 'www.youtube.com' && url.pathname === '/results') {
        var searchQuery = url.searchParams.get('search_query');

        if (!searchQuery.toLowerCase().includes('leetcode')) {
            chrome.runtime.sendMessage({ action: "closeTab" });
            
            // let primaryElement = document.querySelector('#primary');
            // if (primaryElement) {
            //     primaryElement.style.visibility = 'hidden';
            //     primaryElement.style.height = '0';
            // }
            // document.querySelector('#guide-wrapper').remove();

        }
        else {
            let primaryElement = document.querySelector('#primary');
            if (primaryElement) {
                primaryElement.style.visibility = 'visible';
                primaryElement.style.height = 'auto';
            }
        }
    }
}

// Create a MutationObserver to listen for changes to the page
var observer = new MutationObserver(checkPage);

// Start observing the document with the configured parameters
observer.observe(document, {childList: true, subtree: true});

// Run the checkPage function once at the start
checkPage();


