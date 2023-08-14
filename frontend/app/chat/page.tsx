"use client";
import { useState } from "react";
import prevChats from "./prev-chats/prevChats";

export default function Chat() {
  const handleChange = (chat) => {
    setChatStatus(false);
    showCurrChat({ ...chat });
    console.log(currChat);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showCurrChat({
      ...currChat,
      convo: [
        ...currChat.convo,
        {
          input: newInput,
          response: "typing...|",
        },
      ],
    });
    if (isNewchat) {
      prevChats.unshift(currChat);
    } else {
      const arrIndex = prevChats.findIndex((obj) => obj.name == currChat.name);
      prevChats[arrIndex] = currChat;
    }
  };

  const [newInput, setNewInput] = useState("");
  const [isNewchat, setChatStatus] = useState(false);
  const [currChat, showCurrChat] = useState({
    name: "",
    convo: [],
  });

  return (
    <div className="flex flex-row h-5/6">
      <div className="flex flex-col basis-1/5">
        {/* NEW CHAT BUTTON */}
        <div className="py-4">
          <button
            onClick={() => {
              setChatStatus(true);
              showCurrChat({ name: "lorem", convo: [] });
            }}
            className="flex w-4/5 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            New Chat +
          </button>
        </div>

        {/* CURRENT CHAT */}
        <div className="h-5/6">
          <div className="flex flex-col h-full overflow-y-auto">
            {prevChats.map((chat) => (
              <button
                onClick={() => handleChange(chat)}
                className="flex w-4/5 mt-6 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {chat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col basis-4/5 text-3xl">
        {/* SHOW CHAT ON CLICK */}
        <div className="h-full pb-5">
          <ul
            role="list"
            className="h-full flex flex-col justify-end w-4/5 mx-auto"
          >
            <div className="overflow-y-auto">
              {currChat.convo.map((chat) => (
                <>
                  <li className="flex w-full justify-between gap-x-6 mt-5 py-5 px-4 rounded-lg bg-gray-700">
                    {chat.input}
                  </li>
                  <li className="flex w-full flex-row items-center justify-center gap-x-6 mt-5 py-5 px-4 rounded-lg bg-gray-600">
                    <img
                      className="w-60 h-auto"
                      src={chat.response}
                      alt="image"
                    />
                    <button
                      type="button"
                      className="w-fit inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Virtual try-on
                    </button>
                  </li>
                </>
              ))}
            </div>
          </ul>
        </div>

        {/* CHATBOX */}
        <div className="flex h-20 w-full justify-around">
          <form onSubmit={handleSubmit} className="w-4/5 flex">
            <input
              id="chatbox"
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              name="chatbox"
              type="text"
              className="block w-full rounded-md border-0 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-3xl sm:leading-6"
            />
            <button
              type="submit"
              className="flex w-20 ml-4 items-center justify-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
