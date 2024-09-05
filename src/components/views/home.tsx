import { useEffect } from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    Divider,
    Alert,
    AlertIcon,
    AlertDescription,
} from "@chakra-ui/react";
import Image from "next/image";
import { RiDiscordFill } from "react-icons/ri";
import { useSession, signIn } from "next-auth/react";

type Prop = {
    route: () => void
}

const Home = ({ route }: Prop) => {
    const { data: session } = useSession();

    useEffect(() => {
        //@ts-ignore
        if (session && !session.isValidUser) {
            return;
        }

        //@ts-ignore
        if (session && session.isValidUser)
            route()
    }, [session])

    return (
        <Box
            background="rgba(0, 0, 0, 0.34)"
            padding="10px"
            boxSizing="border-box"
            borderRadius="8px"
            backdropFilter='auto'
            backdropBlur='20px'
        >
            <>
                <Flex
                    flexDirection="column"
                    width="100vw"
                    height="80vh"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack
                        flexDir={{ base: "column", md: "row" }}
                        maxW="900px"
                        mb="2"
                        justifyContent="center"
                        background="rgba(0, 0, 0, 0.34)"
                        alignItems="center"
                        border="1px"
                        borderColor="gray"
                        borderRadius="20px"
                        padding="20px"
                        boxSizing="border-box"
                        margin="20px"
                        gap="20px"
                    >
                        <Box
                            display="flex"
                            width="100%"
                            flexDir="column"
                            alignItems="center"
                        >
                            <Image
                                src="/assets/flame.png"
                                alt="Logo de Portfolio Finder"
                                width={60}
                                height={60}
                            />
                            <Heading textAlign="center" color="white.900">
                                Bienvenido a FenixFX
                            </Heading>
                            <Text as="p" textAlign="center">
                                En esta página encontrarás las herramientas que harán que tu proceso de optimización sea más rápido y efectivo.
                                ¿Qué esperas para comenzar?
                            </Text>
                        </Box>
                        <Divider orientation='vertical' />
                        <Box
                            display="flex"
                            flexDir="column"
                            gap="20px"
                            width="100%"
                        >
                            <Box minW={{ base: "70%", md: "468px" }}>
                                <Stack
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    boxShadow="md"
                                >
                                    <RiDiscordFill size="70px" color="#525fee" />
                                    <Button
                                        borderRadius={8}
                                        type="submit"
                                        variant='outline'
                                        colorScheme="gray.400"
                                        _hover={{ bg: "gray.800" }}
                                        width="70%"
                                        onClick={() => signIn("discord")}
                                    >
                                        Ingresa con Discord
                                    </Button>

                                </Stack>
                            </Box>
                            {
                                //@ts-ignore
                                session && !session.isValidUser ?
                                    <Box
                                        borderRadius={"10px"}
                                    >
                                        <Alert status='error' borderRadius="8px">
                                            <AlertIcon />
                                            <AlertDescription>
                                                Lo sentimos, tu cuenta no es parte del discord de la academia.
                                                <br />
                                                ponte en contacto por instagram a la cuenta @fenixforex
                                            </AlertDescription>
                                        </Alert>
                                    </Box>
                                    : <></>
                            }
                        </Box>
                    </Stack>
                </Flex>
            </>
        </Box>
    );
}

export default Home;