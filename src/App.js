import './App.css';
import chatLogo from './assets/chatgptLogo.svg';
import Logo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import home from './assets/home.svg';
import rocket from './assets/rocket.svg';
import saved from './assets/bookmark.svg';
import msgImg from './assets/message.svg';
import sendImg from './assets/send.svg';
import UserIcon from './assets/user-icon.png';
import runChat from './openApi.js';
import { useEffect, useRef, useState } from 'react';
function App() {
  const msgEnd = useRef(null);
  const [inputValue,setInputValue] = useState("");
  const [messages,setMessages] = useState([{
    text:"Hi, I am ChatGPT, How i can help you?!",
    isBot:true
  }])
  async function handleSend(){
    const text = inputValue;
    setInputValue("");
    setMessages(
      [
        ...messages,
        {text,isBot:false},

      ])
    const res = await runChat(text);

    setMessages(
      [
        ...messages,
        {text,isBot:false},
        {text:res,isBot:true}

      ]
  )
    // console.log(res); 
  }

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])

  const handleEnter = async (e)=>{
    if(e.key == 'Enter') await handleSend();
  }
  const handleQuery = async (e) => {
    const text = e.target.value;
    setInputValue("");
    setMessages(
      [
        ...messages,
        {text,isBot:false},

      ])
    const res = await runChat(text);

    setMessages(
      [
        ...messages,
        {text,isBot:false},
        {text:res,isBot:true}

      ]
  )
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className='upperSide'>
          <div className='upperSideTop'><img src={Logo} alt='' className='logo'/><span className='brand'>ChatGPT</span></div>
          <button className='midBtn' onClick={()=>window.location.reload()}><img className='addBtn' src={addBtn}/>New Chat</button>
          <div className='upperSideBottom'>
              <button className='query' onClick={handleQuery} value={"What is Programming?"}><img src={msgImg}/>What is Programming?</button>
              <button className='query' onClick={handleQuery} value={"How to use API?"}><img src={msgImg}/>How to use API?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className='listItems'><img src={home} className='listItemImgs'/>Home</div>
          <div className='listItems'><img src={saved} className='listItemImgs'/>Saved</div>
          <div className='listItems'><img src={rocket} className='listItemImgs'/>Upgrade to pro</div>
        </div>
      </div>
      <div className='main'>
      <div className='upperSideTop'><img src={Logo} alt='' className='logo'/><span className='brand'>ChatGPT</span></div>
        <div className='chats'>
        {messages.map((msg,i)=>
          <div key={i} className={msg.isBot?"chat bot" : "chat"}>
          <img src={msg.isBot?chatLogo:UserIcon}/> <p className='txt'>{msg.text}</p>
          </div>
        )}
        <div ref={msgEnd}/>
        </div>
        <div className='chatFooter'>
          <div className='inp'>
              <input value={inputValue} onKeyDown={handleEnter} onChange={(e)=>{setInputValue(e.target.value)}} placeholder='Send a Message' type='text' name='' id=''/><button onClick={handleSend} className='send'><img src={sendImg}/></button>
          </div>
          <p>Chat GPT may inaccurate information about people, places and facts</p>
        </div>
      </div>
    </div>
  );
}

export default App;
