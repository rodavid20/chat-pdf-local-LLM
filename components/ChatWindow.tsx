'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { CircleX, LoaderCircle, Trash } from 'lucide-react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { resetChatEngine } from "@/app/actions";

export interface ChatMessage {
  role: "human" | "ai" | "ref"
  statement: string
}

interface ChatWindowProps {
  isLoading: boolean,
  loadingMessage: string,
  startChat: (input: string) => void,
  messages: ChatMessage[],
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isLoading,
  loadingMessage,
  messages,
  setMessages,
  startChat,
}) => {
  const [input, setInput] = useState("")
  const messageClass = "rounded-3xl p-3 block relative max-w-max"
  const aiMessageClass = `text-start rounded-bl bg-gray-300 float-left text-gray-700 ${messageClass}`
  const humanMessageClass = `text-end rounded-br bg-green-300 text-gray-700 float-right ${messageClass}`
  const refMessageClass = `text-start rounded-bl bg-gray-200 float-left text-gray-800 ${messageClass}`
  
  
  const resetChat = async () => {
    await resetChatEngine();
    setMessages([])
  }

  return (
    <div className="h-full flex flex-col justify-stretch w-[42vw] border-2 border-gray-200 rounded-xl p-2">
      <div className="flex gap2 justify-between mx-4">
        <span className="flex gap-2 mt-2 text-gray-500">
          {isLoading && (
            <LoaderCircle className="animate-spin" />
          )}
          {loadingMessage}
        </span>
        <span className="flex items-center">
          <Button onClick={resetChat} className="px-2 py-0" disabled={isLoading} title="Refresh Chat">
            <Trash size={20} className="text-gray-400" />
          </Button>
        </span>
      </div>
      <hr className="mt-3" />
      <div className="flex flex-col justify-end gap-3 flex-grow">
        <div className="invisible flex-grow h-max" />
        {/* <div className="relative"> */}
        {messages.map((message, index) => {
          return (
            <div key={index} className="w-full">
              <div className={((message.role === "ai") ? aiMessageClass :  (message.role === "ref" ? refMessageClass : humanMessageClass ) )}>{message.statement}</div>
            </div>
          );
        })}
        {/* </div> */}
        <div className="flex gap-2 mx-2 items-center justify-between">
          <Input
            disabled={isLoading}
            className="text-md"
            type="text"
            placeholder="Send a message..."
            value={input}
            onChange={e => { setInput(e.target.value) }}
          />
          <div className="flex gap-2 items-center">
            <Button
              variant={"outline"}
              disabled={isLoading}
              onClick={() => {
                setInput("")
                startChat(input)
              }}>Send
            </Button>
            {isLoading && (
              <LoaderCircle className="animate-spin" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow