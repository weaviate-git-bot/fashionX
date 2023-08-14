import React from "react";
import {
  IconShoppingCart,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react";
import {
  useMantineColorScheme,
  ActionIcon,
  Group,
  TextInput,
  Modal,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";

const HeaderComponets = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Customize your product"
        centered
        size="lg"
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        {/* Modal content */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/emoji/48/magic-wand.png"
            alt="magic-wand"
            className="hover:border-cyan-500"
            style={{
              border:
                "1px solid rgb(38 38 38 / var(--tw-border-opacity))",
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
        </div>
      </Modal>
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
        <Link href="/">
          {" "}
          <div className="text-3xl ml-3">Fashion-X</div>
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
      <Group>
        <ActionIcon onClick={open}>
          <IconPlus size="2rem" stroke={1.5} />
        </ActionIcon>

        <Group spacing={7}>
          <IconShoppingCart size="2rem" stroke={1.5} />
        </Group>
      </Group>
    </>
  );
};

export default HeaderComponets;
