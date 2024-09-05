import {
    Box,
    Menu,
    MenuButton,
    IconButton,
    Spacer,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Text
} from '@chakra-ui/react'
import Image from "next/image";
import { MdOutlineMenu } from "react-icons/md";
import { useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Analysis from '@/components/analysis';

type Prop = {
    route: (path: string) => void
}

const Navbar = ({ route }: Prop) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<any>(null)
    const { data: session } = useSession();

    return (
        <Box
            display="flex"
            width="100%"
            height="auto"
            padding="20px"
            boxSizing="border-box"
        >
            <Box
                display="flex"
                alignItems="center"
                gap="10px"
                cursor="pointer"
                onClick={() => route('portfoliofinder')}
            >
                <Image
                    src="/assets/logo.webp"
                    alt="Logo de Portfolio Finder"
                    width={60}
                    height={60}
                />
                <Text
                    as="h1"
                    fontSize="20px"
                    fontWeight="600"
                >
                    Portafolio Finder
                </Text>
            </Box>
            <Spacer />
            {
                session ? (
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="10px"
                    >
                        <Button
                            fontSize="18px"
                            fontWeight="600"
                            marginRight="10px"
                            variant='outline'
                            colorScheme="gray.400"
                            _hover={{ bg: "gray.800" }}
                            onClick={() => signOut()}
                        >
                            Desconectar
                        </Button>
                    </Box>
                ) : <></>
            }
            {
                //@ts-ignore
                session && session.isValidUser ?
                    (
                        <Box alignSelf="center">
                            <Button
                                fontSize="18px"
                                fontWeight="600"
                                marginRight="10px"
                                variant='outline'
                                colorScheme="gray.400"
                                _hover={{ bg: "gray.800" }}
                                onClick={() => route('videos')}
                            >
                                Videos
                            </Button>
                            <Menu>
                                <MenuButton
                                    ref={btnRef}
                                    onClick={onOpen}
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<MdOutlineMenu />}
                                    variant='outline'
                                    colorScheme="gray.400"
                                    _hover={{ bg: "gray.800" }}
                                />
                                <Drawer
                                    isOpen={isOpen}
                                    placement='right'
                                    onClose={onClose}
                                    finalFocusRef={btnRef}
                                    colorScheme='black'
                                    size="full"

                                >
                                    <DrawerOverlay />
                                    <DrawerContent
                                        maxW="80%"
                                        background="#080808"
                                        borderLeft="1px"
                                        borderColor="gray.900"
                                    >
                                        <DrawerCloseButton />
                                        <DrawerHeader>Análisis independiente</DrawerHeader>
                                        <DrawerBody>
                                            <Analysis />
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                            </Menu>
                        </Box>
                    )
                    : <></>
            }

        </Box>
    );
}

export default Navbar;