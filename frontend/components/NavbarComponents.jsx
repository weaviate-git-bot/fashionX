import React from "react";
import {
  IconShoppingCart,
  IconSearch,
  IconPlus,
  IconBrandGoogle,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Group,
  TextInput,
  Avatar,
  Tooltip,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";

const HeaderComponets = ({ auth, provider, cartopen }) => {
  const signIn = async (e) => {
    e.preventDefault();
    await auth
      .signInWithPopup(provider)
      .catch((error) => alert(error.message))
      .then(() => {
        const user = auth.currentUser;
        console.log(user);
        toast.success("Login Successfully");
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
          <div className="text-3xl ml-5 font-bold mt-1">
            Fashion-X
          </div>
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
        {user && (
          <>
            {" "}
            <Tooltip label="Customize">
              <ActionIcon
                type="a"
                onClick={() => {
                  window.location = "/chat";
                }}
              >
                <IconPlus size="2rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Cart">
              <Group spacing={9}>
                <IconShoppingCart
                  onClick={cartopen}
                  size="2rem"
                  stroke={1.5}
                />
              </Group>
            </Tooltip>
          </>
        )}
        {user ? (
          <Tooltip label="Logout">
            <ActionIcon
              onClick={() => {
                auth.signOut();
                toast.success("Logout Successfully");
              }}
            >
              <Avatar
                src={user?.photoURL}
                alt={user?.displayName || "user logo"}
              />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Log In">
            <ActionIcon onClick={signIn}>
              <IconBrandGoogle size="2rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
    </>
  );
};

export default HeaderComponets;
