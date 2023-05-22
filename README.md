[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11115984&assignment_repo_type=AssignmentRepo)

# Extension Name: LeetCodePal Version 2.0 Beta - Updated on May 22 (In 'develop' branch)
Current Function:
    - Unmodifiable White list (leetcode, neetcode, openaiGPT, google)
    - Flexible Grey list: (with timer) if opened a website neither on white list nor in the blocked list, a timer will pop up.
    - Strict block list: websites added in block lists will be totally blocked if accessing its URL
        - If you want to modify the blocked lists, you will have to answer a coding question or complex algorithms question to get the modify button.

Need to improve - 样式方面
    - 选择合适的coding question
    - popup页面美化
    - 让白名单上的网站显示出来并无法更改

Need to improve - 功能方面
    - grey list从正计时改成倒计时
    - leetcode页面上加入计时器
    - 艾宾浩斯记忆曲线获取一天前的题，一天前的题 && 两天前的题， 三天前的题。



# How to load the extension to local for developers @Chuandi, @Han

0. Switch to 'develop' branch of this repository, choose 'download the code as ZIP', then unzip it locally

1. Go to the Extensions page by entering chrome://extensions in a new tab. (By design chrome:// URLs are not linkable.)
    -> Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
    -> Or, click the Chrome menu, hover over More Tools, then select Extensions.
    
 
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the 'Load unpacked' button and select the extension's file directory.

![alt text](https://user-images.githubusercontent.com/36625317/233700422-adeff59a-a61c-4835-94ee-aba861cd6d9f.png)

Ta-da! The extension has been successfully installed. Because no extension icons were included in the manifest, a generic icon will be created for the extension.
