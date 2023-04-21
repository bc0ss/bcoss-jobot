import { useState } from "react";

export default function Home() {
  const SYSTEM_MESSAGE="You are Brobot an extremely sarcastic but helpful AI built with state of the art large language models"
   const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState([
            {"role": "system", "content": SYSTEM_MESSAGE},
          ])
  const [userMessage, setUserMessage] = useState("");
  
  const API_URL = "https://api.openai.com/v1/chat/completions";


  async function sendRequest(){
    // update the message history
const newMessage = { role: "user", content: userMessage};
const newMessages = [  ...messages, newMessage];
setMessages(newMessages);
setUserMessage("");

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": newMessages,
      }),
    });
    const responseJson = await response.json();
    
    const newBotMessage = responseJson.choices[0].message;

    const newMessages2 = [...newMessages, newBotMessage];

    setMessages(newMessages2);
  }

  
   
  /* Add  more logic here */

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow w-full">
        <div className="px-4 h-14 flex justify-between items-center">
          <div className="text-xl font-bold">BRObot</div>
          <div>
            <input
              type="password"
              className="border rounded p-1"
              placeholder="Enter API key.."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/*Message History*/} 
      <div className="flex-1">
          <div className="w-full max-w-screen-md mx-auto" >
            {messages.filter(message => message.role!=="system").map((message,idx) => (
            <div key={idx} className="mt-3">
              <div className="font-bold">
                {message.role === "user" ? "You" : "Brobot"}
              </div>
              <div className="text-lg">{message.content}</div>
            </div>
            ))}
          </div>
      </div>
      {/* Message Input Box*/}
      <div>
        <div className="w-full max-w-screen-md mx-auto flex px-4 pb-4">
          <textarea 
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="border text-lg rounded-md p-1 flex-1" rows={1}/>
          <button
          onClick={sendRequest} 
          className="bg-green-500 hoaver:bg-green-600 border rounded-md text-white text-lg w-20 p-2 ml-2">
            Send
          </button>
        </div>
      </div>
   </div>
  );
}