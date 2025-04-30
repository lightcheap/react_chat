import React, { useState } from 'react';
import './App.css'

function App() {
  // チャットメッセージを格納するState
  const [messages, setMessages] = React.useState([]);
  const [inputValue, setInputValue] = useState('');

  // メッセージ入力関数
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // メッセージ送信関数
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue(''); // 入力フィールドをクリア
    }
  };

  return (
    <div className="chat-container">
      {/* チャットメッセージ表示部分 */}
      <div className="message-area">
        {/* メッセージエリア */}
        {messages.map((message, index) => (

          <div key={index} className="message">
            {message}
          </div>

        ))}
      </div>
      {/* メッセージ入力部分 */}
      <div className="input-area">
        <input
          type="text"
          placeholder="メッセージを入力..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleSendMessage}>送信</button>
      </div>
    </div>
  );
}

export default App;
