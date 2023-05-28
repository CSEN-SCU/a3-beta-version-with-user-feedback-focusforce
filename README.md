Please Refre to README.md on the Final-Submission Branch.

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11115984&assignment_repo_type=AssignmentRepo)

# LeetFlow Version 2.5 Beta

**Current Function:**

1. **White list** (leetcode, youtube)

    1.1 Leetcode Timer & Reminder

    1.2 Youtube Search Filter & Blocker
    
2. **Flexible Grey list:** (with timer) if opened a website neither on white list nor in the blocked list, a timer will pop up.
    
3. **Strict block list**: websites added in block lists will be totally blocked if accessing its URL. If you want to modify the blocked lists, you will have to answer a question to get the modify button.

============================================================

**Bugs that Need to be Fixed**

**Blocking Function**

	- Redesign the blocking styling. Current is too simple

**Youtube Filtering**

	- Redesign the blocking styling. Current is too simple
	- Add an alert before it closes the tab when user types in some non-leetcode related words.
	- Add more keyword texts - algorithms, interview questions, etc


**Leetcode Timing**

	- Change the wording of the finish button, into something like “Finish today’s task”.


**Leetcode Reminder on ID Page**

	- Change the styling of the word. Make it easier to get notified.

**Timer on GreyList**

	- Change the styling of the Timer, to make it able to hide when user’s mouse is on it, in case user wants to click on his/her icon which is under the timer
    
	- Add a global alert when it reaches 5 mins.

**Popup Format**

	- Redesign it into 4 columns bars. To the very left, there is a logo where the clear button’s at. 1st is block list settings, 2nd is grey list’s timing mode settings, 3rd is  white list’s settings - saying that you cannot change the whitelisted sites.
    
	- Good to have: Let users enter leetcode id/ Track recent ACs / Randomly choosing a problem
        
============================================================



# How to load the extension to local for developers @Chuandi, @Han

0. Switch to 'develop' branch of this repository, choose 'download the code as ZIP', then unzip it locally

1. Go to the Extensions page by entering chrome://extensions in a new tab. (By design chrome:// URLs are not linkable.)
    -> Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
    -> Or, click the Chrome menu, hover over More Tools, then select Extensions.
    
 
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the 'Load unpacked' button and select the extension's file directory.

![alt text](https://user-images.githubusercontent.com/36625317/233700422-adeff59a-a61c-4835-94ee-aba861cd6d9f.png)

Ta-da! The extension has been successfully installed. Because no extension icons were included in the manifest, a generic icon will be created for the extension.
