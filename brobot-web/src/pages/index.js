javascript
import { useState } from "react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");

  /* Add more logic here */

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

      {/* Add more UI here */}
    </div>
  );
}