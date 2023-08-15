"use client";
import { useState , useRef  , useEffect} from "react";
import prevChats from "./prev-chats/prevChats";
import {
  Input,
  Tooltip,
  ActionIcon,
  AppShell,
  Navbar,
  rem,
  Button,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconAlertCircle,
} from "@tabler/icons-react";
import { IconPlus, IconArrowAutofitRight } from "@tabler/icons-react";

export default function Chat() {
  const handleChange = (chat) => {
    setChatStatus(false);
    showCurrChat({ ...chat });
    console.log(currChat);
  };

  const [currQuestion , setCurrQuestion] = useState('')
  const [loading , setLoading] =  useState(false)
  const [chats , setChats] = useState([])

  function addToChats(text , type){
    const c = chats 
    c.push({text  , type })
    setChats(c)
    chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
  }
  const chatsRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // showCurrChat({
    //   ...currChat,
    //   convo: [
    //     ...currChat.convo,
    //     {
    //       input: newInput,
    //       response: "typing...|",
    //     },
    //   ],
    // });
    // if (isNewchat) {
    //   prevChats.unshift(currChat);
    // } else {
    //   const arrIndex = prevChats.findIndex(
    //     (obj) => obj.name == currChat.name
    //   );
    //   prevChats[arrIndex] = currChat;
    // }
    if(currQuestion === '')return
    
    addToChats(currQuestion , 'q')
    setCurrQuestion('Fetching response ....')
    setLoading(true)
    
    // API call to send question to backend


    // Receiving answer from backend
    
    setTimeout(()=>{
      const resp = "This is the response from backend"
      addToChats(resp , 'a')
      setLoading(false)
      setCurrQuestion('')
    } , 1000)

  };

  const [newInput, setNewInput] = useState("");
  const [isNewchat, setChatStatus] = useState(false);
  const [currChat, showCurrChat] = useState({
    name: "",
    convo: [],
  });

  
  return (
    <>
      <AppShell
        style={{ height: "85%", width: "75%" , overflow:"hidden" }}
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} p="xs">
            <Button
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan" }}
              leftIcon={<IconPlus size={rem(18)} />}
              styles={(theme) => ({
                root: {
                  backgroundColor: "#00acee",
                  border: 0,
                  height: rem(42),
                  paddingLeft: rem(20),
                  paddingRight: rem(20),
                  "&:not([data-disabled])": theme.fn.hover({
                    backgroundColor: theme.fn.darken("#00acee", 0.05),
                  }),
                },

                leftIcon: {
                  marginRight: theme.spacing.md,
                },
              })}
            >
              Follow on Twitter
            </Button>
          </Navbar>
        }
      >
        <div className="w-[75%] h-[75%]  left-0 absolute top-0">
          <div className="w-[100%] h-full  overflow-y-scroll bg-[#363746] " ref={chatsRef}>
              {chats.map(c => (
                <div className={`p-[10px] text-[1.2rem] text-[#D1D5DB]  ${c.type==='q' ? 'bg-[#363746]' : 'bg-[#2B2C39]'}`}>
                  {c.text}
                </div>
              ))}
          </div>
          <div
            className="w-full flex justify-center items-center bg-[#363746]"
          >
            <form onSubmit={handleSubmit} className=" w-[80%]">
              <Input
                placeholder="Your twitter"
                size="xl"
                style={{ width: "100%" }}
                onChange={(event) => setCurrQuestion(event.target.value)}
                value = {currQuestion}
                disabled={loading}
                rightSection={
                  <button type="submit">
                    <ActionIcon
                    color="primary"
                    style={{ marginBottom: "8px" }}
                    >
                      <IconArrowAutofitRight size="2rem" />
                    </ActionIcon>
                  </button>
                }
              />
            </form>
          </div>
        </div>
      </AppShell>
    </>
  );
}
