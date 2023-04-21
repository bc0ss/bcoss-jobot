import { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const API_URL = "https://api.openai.com/v1/chat/completions";

  async function sendRequest(){
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Hellow!"}]
      })
    })
  return response
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

      <div className="p-4">
        <button className="border rounded-md p-2 bg-blue-500 hover:bg-blue-600 text-white"
        ONCLICK={sendRequest}>
          Send Request
        </button>
      </div>
    </div>
  );
}