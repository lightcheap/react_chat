import React from 'react';
import './App.css'

function App() {
  return (
    <div className="chat-container">
      {/* チャットメッセージ表示部分 */}
      <div className="message-area">
        {/* メッセージエリア */}
      </div>
      {/* メッセージ入力部分 */}
      <div className="input-area">
        <input type="text" placeholder="メッセージを入力..." />
        <button>送信</button>
      </div>
    </div>
  );
}

export default App;
