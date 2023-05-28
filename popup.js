let isTimerRunning = false;
let startTime;
let totalTime = 0;

let whiteList = ["leetcode.com", "neetcode.io/practice"];
let timerInterval;

let isEditEnabled = false; // Flag to enable/disable edit mode

// Function to display the block list
function displayBlockList(blockedList) {
    const blockListContainer = document.getElementById('blockListContainer');
    blockListContainer.innerHTML = ''; // Clear previous content

    blockedList.forEach(function(blockedUrl) {
        const listItem = document.createElement('li');
        listItem.textContent = blockedUrl;

        if (isEditEnabled) { // if edit mode is enabled then show delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteBlockedUrl(blockedUrl);
            });

            listItem.appendChild(deleteButton);
        }
        blockListContainer.appendChild(listItem);
    });
}

// Function to delete a blocked URL from the block list
function deleteBlockedUrl(url) {
    chrome.storage.sync.get(['blockedList'], function(result) {
        const blockedList = result.blockedList || [];
        const updatedBlockedList = blockedList.filter(function(blockedUrl) {
            return blockedUrl !== url;
        });
        chrome.storage.sync.set({blockedList: updatedBlockedList}, function() {
            console.log('Block list updated.');
        });
    });
}

// Update the block list display
function updateBlockListDisplay() {
    chrome.storage.sync.get(['blockedList'], function(result) {
        const blockedList = result.blockedList || [];
        displayBlockList(blockedList);
    });
}

// Add an event listener to automatically update the block list display when storage changes
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.blockedList) {
        updateBlockListDisplay();
    }
});


// Add event listener for "Clean Up Browsing" button
document.getElementById('cleanButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({command: "cleanLocalStorageAndTabs"}, function(response) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        }
    });
});




// Function to refresh the block list
function refreshBlockList() {
    chrome.storage.sync.get(['blockedList'], function(result) {
        const blockedList = result.blockedList || [];
        displayBlockList(blockedList);
    });
}

// Add event listener for "Modify" button
document.getElementById('modifyButton').addEventListener('click', function() {
    // Show the modification section
    document.getElementById('modifySection').style.display = 'block';
});

// Add event listener for "Submit Answer" button
document.getElementById('submitAnswerButton').addEventListener('click', function() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value;

    if (answer == "13") { // Check if the answer is correct
        isEditEnabled = true; // Enable edit mode
        answerInput.value = ''; // Clear the input field
        document.getElementById('modifySection').style.display = 'none'; // Hide the modification section
        updateBlockListDisplay(); // Update the block list to show the delete buttons
    } else {
        alert('Incorrect answer! Please try again.'); // Show an alert if the answer is incorrect
        answerInput.value = ''; // Clear the input field
    }
});



  

document.getElementById('blockForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let blockInput = document.getElementById('blockInput');
    let blockUrl = blockInput.value;
    blockInput.value = ''; // Clear the input field

    chrome.storage.sync.get(['blockedList'], function(result) {
        let blockedList = result.blockedList || [];
        blockedList.push(blockUrl);
        chrome.storage.sync.set({blockedList: blockedList}, function() {
            console.log('Block list updated.');
            updateBlockListDisplay();
        });
   
    });
});

document.getElementById('allowForm').addEventListener('submit', function(e) {
e.preventDefault();
let allowInput = document.getElementById('allowInput');
let allowUrl = allowInput.value;
allowInput.value = ''; // Clear the input field
chrome.storage.sync.get(['whiteList'], function(result) {
    let whiteList = result.whiteList || ['leetcode.com', 'neetcode.io/practice'];
    whiteList.push(allowUrl);
    chrome.storage.sync.set({whiteList: whiteList}, function() {
        console.log('Allow list updated.');
    });
});
});

// Update the block list display when the popup is opened
updateBlockListDisplay();

refreshBlockList();