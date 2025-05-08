import React, { useState, useRef, useEffect } from 'react';
import './App.css'

function App() {
  // チャットメッセージを格納するState
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messageAreaRef = useRef(null); // メッセージエリアの参照を作成

  // メッセージ入力関数
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // メッセージ送信関数
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      // メッセージが自分のものであることを示すプロパティを追加
      setMessages([...messages, { text: inputValue, isMine: true }]);
      setInputValue(''); // 入力フィールドをクリア
    }
  };

  useEffect(() => {
    // メッセージが更新されたらスクロールを最下部に移動
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      {/* チャットメッセージ表示部分 */}
      <div className="message-area" ref={messageAreaRef}>
        {/* メッセージエリア */}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isMine ? 'my-message' : 'other-message'}`}
          >
            {message.text}
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
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage}>送信</button>
      </div>
    </div>
  );
}

export default App;
