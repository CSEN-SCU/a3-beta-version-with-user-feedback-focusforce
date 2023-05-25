[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=11115984&assignment_repo_type=AssignmentRepo)

# LeetsFocus Version 1.0 Beta

Current Function:

1. **Unmodifiable White list** (leetcode, neetcode)
    
2. **Flexible Grey list:** (with timer) if opened a website neither on white list nor in the blocked list, a timer will pop up.
    
3. **Strict block list**: websites added in block lists will be totally blocked if accessing its URL
    
If you want to modify the blocked lists, you will have to answer a coding question or complex algorithms question to get the modify button.


**Bugs that Need to be Fixed**

1. 白名单相关

    1.1 neetcode和leetcode界面仍有timer计时，需要消除掉
    
    1.2 把chatGPT增加到白名单中

    1.3 清除掉现有的allow list function
  
  
2. 灰名单的timer位置，现在固定在页面右上角无法移动位置。更改至鼠标滑动到timer范围内timer自动消失，否则会挡住一部分网页功能

4. block list



**Need to improve - UI (Han, Chunadi)**

    - 选择合适的complex question
    
    - popup页面美化 - 分栏：block list，white list，grey list
    
    - 让白名单上的网站显示出来并无法更改


**Need to improve - function**

    - grey list；正计时，倒计时两种模式选择；timer增加提示性话语；
    
    - leetcode页面上加入计时器：思考思路的计时器（倒计时10分钟）结束后可以选择开始做题或直接问chatGPT（生成一段prompt供复制黏贴）
    
    - 艾宾浩斯记忆曲线获取一天前的题，一天前的题 && 两天前的题， 三天前的题（已research，难以实现）
    



# How to load the extension to local for developers @Chuandi, @Han

0. Switch to 'develop' branch of this repository, choose 'download the code as ZIP', then unzip it locally

1. Go to the Extensions page by entering chrome://extensions in a new tab. (By design chrome:// URLs are not linkable.)
    -> Alternatively, click on the Extensions menu puzzle button and select Manage Extensions at the bottom of the menu.
    -> Or, click the Chrome menu, hover over More Tools, then select Extensions.
    
 
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the 'Load unpacked' button and select the extension's file directory.

![alt text](https://user-images.githubusercontent.com/36625317/233700422-adeff59a-a61c-4835-94ee-aba861cd6d9f.png)

Ta-da! The extension has been successfully installed. Because no extension icons were included in the manifest, a generic icon will be created for the extension.
