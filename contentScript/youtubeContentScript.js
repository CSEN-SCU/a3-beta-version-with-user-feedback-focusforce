

function checkPage() {
    var url = new URL(window.location.href);

    if (url.hostname === 'www.youtube.com' && url.pathname == "/") {
        // the following code for blocking youtube elements are reused & modified from helloworld.js of the default template
        document.querySelector('ytd-browse[role="main"][page-subtype="home"] #contents').remove(); 
        document.querySelector('#guide-wrapper').remove();
        
     var divContainer = document.createElement("div");
        divContainer.style.display = "flex"; // this will arrange child elements in a row
        divContainer.style.justifyContent = "space-between"; // this creates some space between child elements

        // Create message element
        var message = document.createElement("div"); // Changed p to div for better line control
        message.innerHTML = `<p style="margin-bottom: 20px;">Hey, it's not the time!</p><p style="margin-top: 20px;">A leetcode a day, keeps Rejection Away. :)</p>`; // Use innerHTML to insert multiple lines
        message.style = "font-size: 50px; color: orange; text-align: center; margin: auto; border: 3px solid orange; border-radius: 15px; width: 1100px; height: 650px; padding: 10px; display: flex; align-items: center; justify-content: center; flex-direction: column; box-sizing: border-box;"; // set border and size same as the image, added border-radius for rounded corners, added padding, flex styling for centering text, added box-sizing
        divContainer.appendChild(message);

        // Create an image element
        var image = document.createElement("img");
        image.src = chrome.runtime.getURL('images/WechatIMG431.jpeg');
        image.style = "display: block; margin: auto; width: 1100px; height: 650px;"; // Set image style
        divContainer.appendChild(image);

        var primaryElement = document.getElementById("primary");
        primaryElement.appendChild(divContainer); // Append the div container to primaryElement
        
    }



    if (url.hostname === 'www.youtube.com' && url.pathname === '/results') {
        var searchQuery = url.searchParams.get('search_query');

        if (!searchQuery.toLowerCase().includes('leetcode')) {
            chrome.runtime.sendMessage({ action: "closeTab" });

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


