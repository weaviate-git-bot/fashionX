"use client";
import { useState } from "react";
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
      const arrIndex = prevChats.findIndex(
        (obj) => obj.name == currChat.name
      );
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
    <>
      <AppShell
        style={{ height: "85%", width: "80%" }}
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
        <div className="">
          <div
            className=""
            style={{
              position: "absolute",
              bottom: 220,
              left: 150,
              minWidth: "60%",
            }}
          >
            <form onSubmit={handleSubmit} className="">
              <Input
                placeholder="Your twitter"
                size="xl"
                style={{ width: "100%" }}
                rightSection={
                  <ActionIcon
                    color="primary"
                    style={{ marginBottom: "8px" }}
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
