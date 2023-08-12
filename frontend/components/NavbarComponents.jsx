import React, { useEffect } from "react";
import {
  IconSun,
  IconMoonStars,
  IconShoppingCart,
  IconSearch,
} from "@tabler/icons-react";
import {
  useMantineColorScheme,
  ActionIcon,
  Group,
  TextInput,
} from "@mantine/core";
import Image from "next/image";
// import useLoginModal from "../hooks/useLoginModal";
// import useAuthHook from "../hooks/useAuthHook";

const HeaderComponets = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <div className="flex items-center cursor-pointer">
        <div>
          <Image
            alt="Logo"
            src="https://www.nicepng.com/png/detail/802-8027356_fashion-clipart-fashion-icon-fashion-icon-png.png"
            width="50"
            height="50"
            className="rounded-full"
          />{" "}
        </div>
        <div className="text-2xl ml-3">Fashion-X</div>
      </div>
      <Group>
        <TextInput
          placeholder="Search Dress"
          rightSection={<IconSearch size="1.2rem" />}
        />
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
            color:
              theme.colorScheme === "dark"
                ? theme.colors.yellow[4]
                : theme.colors.blue[6],
          })}
        >
          {colorScheme === "dark" ? (
            <IconSun size="1.2rem" />
          ) : (
            <IconMoonStars size="1.2rem" />
          )}
        </ActionIcon>

        <Group spacing={7}>
          <IconShoppingCart size="1.2rem" stroke={1.5} />
        </Group>
      </Group>
    </>
  );
};

export default HeaderComponets;
