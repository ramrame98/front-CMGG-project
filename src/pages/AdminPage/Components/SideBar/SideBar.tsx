import React, { ReactNode, useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiBell,
  FiMenu,
} from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { MdPersonalVideo } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import { RiMoneyCnyCircleLine } from "react-icons/ri";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
interface LinkItemProps {
  name: string;
  icon: IconType;
  subItems: {
    [key: string]: string;
  };
}
const LinkItems: Array<LinkItemProps> = [
  {
    name: "Dashboard",
    icon: AiOutlineUser,
    subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  },
  {
    name: "User",
    icon: AiOutlineUser,
    subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  },
  // {
  //   name: "Lecture",
  //   icon: BiMoviePlay,
  //   subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  // },
  {
    name: "Lecture",
    icon: MdPersonalVideo,
    subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  },
  {
    name: "Instructor",
    icon: BsPersonVcard,
    subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  },
  {
    name: "Pay",
    icon: RiMoneyCnyCircleLine,
    subItems: { sub1: "sub1", sub2: "sub2", sub3: "sub3" },
  },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const mainColor = "#003c93;";
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      {/* mobilenav */}
      {/* <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} /> */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          subItems={link.subItems}
          name={link.name}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
  subItems: Record<string, string>;
}
const NavItem = ({ icon, name, subItems, ...rest }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box>
      <Flex
        // border="1px"
        justify="center"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#003c93;",
          color: "white",
        }}
        onClick={handleClick}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        <Text>{name}</Text>
        <Spacer />
        {Object.keys(subItems).length > 0 && (
          <IconButton
            color="black"
            _hover={{
              color: "black",
              bg: "none",
            }}
            bg="none"
            aria-label="Toggle sub items"
            icon={<ChevronDownIcon />}
            size="xs"
            ml={2}
            transform={isOpen ? "rotate(180deg)" : ""}
            transition="transform 0.2s"
            onClick={handleClick}
          />
        )}
      </Flex>
      {isOpen && (
        <Flex
          flexDirection="column"
          w="100%"
          alignItems="flex-start"
          justifyContent="center"
        >
          {Object.keys(subItems).map((subItem) => (
            <Button
              w="90%"
              bg="white"
              p="4"
              mx="4"
              key={subItem}
              // w="100%"
              fontWeight="400"
              textAlign="left"
              _hover={{ bg: "rgb(236 243 253)" }}
            >
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                zIndex={-1}
                // style={{ display: "none" }}
              />
              <Text textAlign="left" w="100%">
                {subItems[subItem]}
              </Text>
            </Button>
          ))}
        </Flex>
      )}
    </Box>
  );
};
interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"md"} src={"https://ifh.cc/g/6FHysR.jpg"} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="md" pb="3px">
                    오뚜니
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    관리자
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
