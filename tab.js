console.log("tab.js script loaded");

// tab.js is for opening all the designated tabs once "Start Flowing" is Clicked.

// Function to open a tab
function openTab(evt, tabName) {
    console.log("openTab function called with: ", tabName);

    // Hide all other tab contents
    let tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++) {
        tabcontents[i].style.display = 'none';
    }

    // Remove the active class from all tabs
    let tablinks = document.getElementsByClassName('tablinks');
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';

    console.log("Finished openTab function");
}

// Get all tab buttons and add event listeners
let tablinks = document.getElementsByClassName('tablinks');
for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].addEventListener('click', function(evt) {
        openTab(evt, this.getAttribute('data-tab-id'));
    });
    
}

// Set the default tab to open
document.getElementById('defaultOpen').click();

console.log("Finished openTab function");
