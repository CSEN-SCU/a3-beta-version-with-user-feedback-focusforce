Please Refre to README.md on the Final-Submission Branch.
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11115984&assignment_repo_type=AssignmentRepo)

# LeetsFocus Version 2.5 Beta

**Current Function:**

1. **White list** (leetcode, youtube)

    1.1 Leetcode Timer & Reminder

    1.2 Youtube Search Filter & Blocker
    
2. **Flexible Grey list:** (with timer) if opened a website neither on white list nor in the blocked list, a timer will pop up.
    
3. **Strict block list**: websites added in block lists will be totally blocked if accessing its URL. If you want to modify the blocked lists, you will have to answer a question to get the modify button.

============================================================

**Bugs that Need to be Fixed**

1. 主页面相关（popup.js/ background.js）
    
    1.1 把chatGPT网站增加到白名单中

    1.2 Popup菜单里清除掉现有的allow list function，start
  
  
2. 灰名单相关(timerContentScript.js)

    2.1 timer现在固定在页面右上角无法移动位置。需要更改至鼠标滑动到timer范围内timer自动消失的效果，否则会挡住一部分网页功能
   
    2.2 timer每次刷新之后现在会重新计时，需要调整至刷新之后还可以计时



**Need to improve - UI (Han, Chunadi)**

    - 选择合适的complex question
    
    - popup页面美化 - 分栏：block list，white list，grey list
    
    - 让白名单上的网站显示出来并无法更改


**Need to improve - function**

    - Popup菜单增加选择正计时/倒计时选项（timer增加倒计时模式）
    
    - timer到5分钟左右会发送提醒
        



# How to load the extension to local for developers @Chuandi, @Han

0. Switch to 'develop' branch of this repository, choose 'download the code as ZIP', then unzip it locally

1. Go to the Extensions page by entering chrome://extensions in a new tab. (By design chrome:// URLs are not linkable.)
    -> Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
    -> Or, click the Chrome menu, hover over More Tools, then select Extensions.
    
 
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the 'Load unpacked' button and select the extension's file directory.

![alt text](https://user-images.githubusercontent.com/36625317/233700422-adeff59a-a61c-4835-94ee-aba861cd6d9f.png)

Ta-da! The extension has been successfully installed. Because no extension icons were included in the manifest, a generic icon will be created for the extension.
