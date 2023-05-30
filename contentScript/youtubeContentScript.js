

function checkPage() {
    var url = new URL(window.location.href);

    if (url.hostname === 'www.youtube.com' && url.pathname == "/") {
        // the following code for blocking youtube elements are reused & modified from helloworld.js of the default template
        document.querySelector('ytd-browse[role="main"][page-subtype="home"] #contents').remove(); 
        document.querySelector('#guide-wrapper').remove();
        document.querySelector('#contentContainer').remove();
        //document.querySelector('ytd-mini-guide-renderer #contents').remove();
        var message1 = document.createElement("p");
        message1.textContent = "Hey, it's not the time to watch fun videos! ";
        message1.style = "font-size: 40px; color: orange; text-align: center;";
        message1.style.textAlign = "center";
        //message.style.backgroundColor = "skyblue";
        //message.style.fontSize = "20px";
        var primaryElement = document.getElementById("primary");
        primaryElement.appendChild(message1);  

        var message2 = document.createElement("p");
        message2.textContent = "A Leetcode a day, keeps rejection letter away.";
        message2.style = "font-size: 40px; color: orange; text-align: center;";
        message2.style.textAlign = "center";
        //message.style.backgroundColor = "skyblue";
        //message.style.fontSize = "20px";
        var primaryElement = document.getElementById("primary");
        primaryElement.appendChild(message2);   
        message2.style.marginLeft = "0px"; // 调整文字元素的左边距  
        message2.style.marginBottom = "10px"; // 调整文字元素的底边距 

        // Create an image element
       var image = document.createElement("img");
       image.src = "https://jella.tw/blog/wp-content/uploads/2021/01/%E5%B0%88%E6%B3%A8%E5%8A%9B.png"; // Replace with the actual path to your image
       image.style = "display: block; margin: 0 auto;"; // Set image style for center alignment
       image.style.width = "1100px";
       image.style.height = "650px";
       //image.style.margin = "0 auto";
       //image.style.float = "center";
       image.style.marginLeft = "0px"; // 调整图片元素的左边距   
       
  

    
    
       // Append the image element to primaryElement
       primaryElement.appendChild(image);
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


