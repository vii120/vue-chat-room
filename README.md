# Vue.js Chat Room

![home](https://i.imgur.com/DgV370q.png)

## Demo

https://vii120.github.io/vue-chat-room/dist/

## Intro

使用**Vue.js**結合**Firebase即時資料庫**(Realtime Database)來建立線上聊天室

版面設計參考了Yahoo!奇摩即時通的舊版樣式

### 聊天功能

需先輸入名字才能夠開始聊天，聊天時，**自己的名字會以灰色顯示**，其他人的名字會以深藍色顯示

一旦開始聊天後，名字會預設為不可修改，若想要修改，可點選旁邊的"X"按鈕以輸入新名字


### 暫存使用者名稱

開始聊天後，會自動儲存使用者所輸入的名字(localStorage)，下次造訪聊天室時，可看到自己上次聊天所用的名字

若要修改或清除紀錄，可點選名字輸入框旁邊的"X"按鈕

### RWD

設計較適合行動裝置的響應式版面

<img src="https://i.imgur.com/1P7wxXt.png" width="360" alt="rwd">
