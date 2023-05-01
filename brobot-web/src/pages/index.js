import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Head from "next/head";
//import { createParser } from "eventsource-parser";
//import TextareaAutosize from "react-textarea-autosize";
import Navbar from "../components/Navbar";
import { useUser } from "@supabase/auth-helpers-react";
import toast, { Toaster } from "react-hot-toast";
import { streamOpenAIResponse } from "@/utils/openai";

export default function Home() {
  const user = useUser();
  const SYSTEM_MESSAGE="You are Brobot an extremely sarcastic but helpful AI built with state of the art large language models";
  
  const [messages, setMessages] = useState([
            {"role": "system", "content": SYSTEM_MESSAGE},
          ]);
  
  const [userMessage, setUserMessage] = useState("");
  
  const API_URL = "/api/chat";

  // update the message history
  const sendRequest = async () => {
    console.log(user)
    if (!user) {  // comes from useUser();
      toast.error("Please log in to send a message!");
      return;
    }

    if (!userMessage) {
      toast.error("Please enter a message before you hit send");
    }

    const oldUserMessage = userMessage;
    const oldMessages = messages;

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userMessage,
      },
    ];

    setMessages(updatedMessages);
    setUserMessage("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: updatedMessages,
          stream: true,
        }),
      });

      if (response.status !== 200) {
        throw new Error(
          `OpenAI API returned an error. Please ensure you've provided the right API key. Check the "Console" or "Network" of your browser's developer tools for details.`
        );
      }

      streamOpenAIResponse(response, (newMessage) => {
        const updatedMessages2 = [
          ...updatedMessages,
          { role: "assistant", content: newMessage },
        ];

        setMessages(updatedMessages2);
      });
    } catch (error) {
      console.error("error", error);

      setUserMessage(oldUserMessage);
      setMessages(oldMessages);
      window.alert("Error:" + error.message);
    }
};
  
   
  /* Add  more logic here */

  return (
    <>
    <Head>
      <title>Brobot - AI Thing</title>
    </Head>
    <Toaster />
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />
      {/*Message History*/} 
      <div className="flex-1 overflow-y-scroll ">
          <div className="w-full max-w-screen-md mx-auto px-4" >
            {messages.filter(message => message.role!=="system").map((message,idx) => (
            <div key={idx} className="my-3">
              <div className="font-bold">
                {message.role === "user" ? "You" : "Brobot"}
              </div>
              <div className="text-lg prose"><ReactMarkdown>{message.content}</ReactMarkdown></div>
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
    </>
  );
}