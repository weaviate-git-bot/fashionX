import React from "react";
import {
  IconShoppingCart,
  IconSearch,
  IconPlus,
  IconBrandGoogle,
  IconWand,
} from "@tabler/icons-react";
import {
  useMantineColorScheme,
  ActionIcon,
  Group,
  TextInput,
  Modal,
  Avatar,
  Tooltip,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

const HeaderComponets = ({ auth, provider, cartopen }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const signIn = async (e) => {
    e.preventDefault();
    await auth
      .signInWithPopup(provider)
      .catch((error) => alert(error.message))
      .then(() => {
        const user = auth.currentUser;
        console.log(user);
      });
  };

  const [user, loading] = useAuthState(auth);

  return (
    <>

      <div className="flex items-center cursor-pointer">
        <div>
          <Image
            alt="Logo"
            src="/icon.jpg"
            width="50"
            height="50"
            className="rounded-full"
          />{" "}
        </div>
        <Link href="/">
          {" "}
          <div className="text-3xl ml-5 font-bold mt-1">Fashion-X</div>
        </Link>
      </div>
      <Group spacing={7}>
        <TextInput
          placeholder="Search Dress"
          rightSection={<IconSearch size="2rem" />}
          size="lg"
          style={{ borderRadius: "50%" }}
        />
      </Group>
      <Group style={{ marginRight: "10px" }}>
        <Tooltip label="Customize">
          <ActionIcon type="a" onClick={() => { window.location = "/chat" }}>
            <IconPlus size="2rem" stroke={1.5} />
          </ActionIcon>
        </Tooltip>

        <Group spacing={9}>
          <IconShoppingCart onClick={cartopen} size="2rem" stroke={1.5} />
        </Group>
        {user ? (
          <Tooltip label="Logout">
            <ActionIcon
              onClick={() => {
                auth.signOut();
              }}
            >
              <Avatar
                src={user?.photoURL}
                alt={user?.displayName || "user logo"}
              />
            </ActionIcon>
          </Tooltip>
        ) : (
          <ActionIcon onClick={signIn}>
            <IconBrandGoogle size="2rem" stroke={1.5} />
          </ActionIcon>
        )}
      </Group>
    </>
  );
};

export default HeaderComponets;
