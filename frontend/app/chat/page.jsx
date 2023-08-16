"use client";
import { useState, useRef, useEffect } from "react";
import prevChats from "./prev-chats/prevChats";
import {
  Input,
  ActionIcon,
  AppShell,
  Navbar,
  rem,
  Button,
  Avatar,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconGhost2Filled } from "@tabler/icons-react";
import { IconPlus, IconArrowAutofitRight } from "@tabler/icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import axios from "axios";
import TransformModal from "../../components/TransformModal";
import { randomUUID } from "crypto";
import { toast } from "react-hot-toast";
export default function Chat() {
  const [user] = useAuthState(auth);

  const [currQuestion, setCurrQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [virtualUrl, setVirtualUrl] = useState("");

  function addToChats(text, type) {
    const c = chats;
    c.push({ text, type });
    setChats(c);
    chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
  }

  function addToLocalStorage(text) {
    const obj = {
      productID: Math.floor(Math.random() * 1000000),
      productImage: text,
      productName: `[CUSTOM]: ${chats[chats.length - 2].text}`,
      type: "CUSTOM",
      productPrice: 5000,
    };
    console.log(obj);

    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart == null) {
      cart = [];
    }
    cart.push(obj);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Added to cart");
  }

  const chatsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currQuestion === "") return;

    addToChats(currQuestion, "q");
    setCurrQuestion("Fetching response ....");
    setLoading(true);

    // API call to send question to backend

    // Receiving answer from backend
    axios.post("http://localhost:8080/prompt").then((res) => {
      console.log(res.data.image_url);
      addToChats(res.data.image_url, "a");
      setLoading(false);
      setCurrQuestion("");
    });

    // setTimeout(() => {
    //   const resp = "This is the response from backend";
    //   addToChats(resp, "a");
    //   setLoading(false);
    //   setCurrQuestion("");
    // }, 1000);
  };

  const responses = [
    "Sure! Fetching your designs in a second",
    "Of course! Just a moment while I gather your designs.",
    "Absolutely, I'll get your designs ready in no time.",
    "Certainly! Your designs will be with you shortly.",
    "No problem, I'm on it. Your designs are coming right up!",
    "You got it! Give me a second to retrieve your designs.",
    "Sure thing! I'm fetching your designs as we speak.",
    "Not a problem! I'll have your designs for you in a moment.",
    "Sure, I'll make sure your designs are in your hands shortly.",
    "Absolutely, I'm working on getting your designs right now.",
  ];

  const [newInput, setNewInput] = useState("");
  const [isNewchat, setChatStatus] = useState(false);
  const [currChat, showCurrChat] = useState({
    name: "",
    convo: [],
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Virtual Try On"
        centered
        size="70%"
      >
        <TransformModal clothImageUrl={virtualUrl} />
      </Modal>
      <AppShell
        style={{
          height: "100%",
          width: "85%",
          overflow: "hidden",
          margin: "auto",
        }}
        padding="md"
      >
        <div className="w-[100%] h-[75%]  ml-auto">
          <div
            className="w-[100%] h-full  overflow-y-scroll bg-[#363746] "
            ref={chatsRef}
          >
            {user && (
              <div className="p-[20px] text-[1.2rem] text-[#D1D5DB] flex items-center gap-2 bg-[#363746]">
                <IconGhost2Filled style={{ marginRight: "10px" }} />
                <p style={{ marginLeft: "20px" }}>
                  Hi {user.displayName}, I am Ghosty. How can I help
                  you today?
                </p>
              </div>
            )}
            {chats?.map((c, i) => (
              <div
                className={`p-[20px] text-[1.2rem] text-[#D1D5DB] flex items-center gap-2  ${
                  c.type === "q" ? "bg-[#363746]" : "bg-[#2B2C39]"
                }`}
              >
                {c.type === "q" ? (
                  <Avatar
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                ) : (
                  <IconGhost2Filled
                    style={{
                      marginRight: "10px",
                      marginTop: "-12.5rem",
                    }}
                  />
                )}{" "}
                {c.type == "q" ? (
                  <p style={{ marginLeft: "20px" }}>{c.text} </p>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    {`${responses[Math.floor(i % responses.length)]}`}
                    <img height="150px" width="150px" src={c.text} />
                    <div style={{ display: "flex" }}>
                      <Button
                        onClick={() => {
                          open();
                          setVirtualUrl(c.text);
                        }}
                        variant="outline"
                        size="md"
                        radius="md"
                        color="gray"
                      >
                        Virtual Try On
                      </Button>

                      <Button
                        onClick={() => {
                          addToLocalStorage(c.text);
                        }}
                        variant="outline"
                        size="md"
                        radius="md"
                        color="blue"
                        style={{ marginLeft: "10px" }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center bg-[#363746]">
            <form onSubmit={handleSubmit} className=" w-[80%]">
              <Input
                placeholder="Ask me anything"
                size="xl"
                style={{ width: "100%", marginBottom: "10px" }}
                onChange={(event) =>
                  setCurrQuestion(event.target.value)
                }
                value={currQuestion}
                disabled={loading}
                rightSection={
                  <ActionIcon
                    color="primary"
                    style={{}}
                    type="submit"
                  >
                    <IconArrowAutofitRight size="2rem" />
                  </ActionIcon>
                }
              />
            </form>
          </div>
        </div>
      </AppShell>
    </>
  );
}
