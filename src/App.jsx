import React, { useState, useRef, useEffect, use } from 'react';
import './App.css'

function App() {
  // チャットメッセージを格納するState
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messageAreaRef = useRef(null); // メッセージエリアの参照を作成

  // メッセージ取得API
  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');

      if (!response.ok) {
        console.error('エラー： ${response.status}');
        return
      }
      const data = await response.json();
      console.log('メッセージ取得成功:', data)
      setMessages(data)
    } catch (error) {
      console.error('メッセージ取得失敗:', error);
    }
  }

  const sendMessage = async (messageText) => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: messageText }),
      });

      if (!response.ok) {
        console.error('エラー： ${response.status}');
        return
      }

      const data = await response.json();
      console.log('メッセージ送信成功:', data)
      fetchMessages(); // メッセージを再取得して更新
    } catch (error) {
      console.error('メッセージ送信失敗:', error);
    }
  }

  // メッセージ入力関数
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // メッセージ送信関数
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      sendMessage(inputValue); // メッセージ送信APIを呼び出す
      // メッセージが自分のものであることを示すプロパティを追加
      // setMessages([...messages, { text: inputValue, isMine: true }]);
      setInputValue(''); // 入力フィールドをクリア
    }
  };

  useEffect(() => {
    // コンポーネントがマウントされたときにメッセージを取得
    fetchMessages();
  }, []);

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
