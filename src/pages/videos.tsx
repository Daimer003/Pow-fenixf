
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Card from "@/components/share/card/card";
import { motion } from 'framer-motion'
import Head from "next/head";
import moment from "moment";

interface Folder {
    parent_folder: { name: string };
    name: string;
}

//*Animation
const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -0, y: 20 }
}

const Videos = () => {
    const { data: session } = useSession();
    const router = useRouter()
    const [groups, setGroups] = useState<any>([]);
    const [selectGroup, setSelectGroup] = useState<any>("Grabaciones")

    //Filtra por grupos los videos
    const filterParentFolder = (folders: any) => {
        const groupedData: { [key: string]: Folder[] } = {};

        folders.forEach((folder: any) => {
            const folderName = folder.parent_folder.name;
            if (!groupedData[folderName]) {
                groupedData[folderName] = [];
            }
            groupedData[folderName].push(folder);
        });
        return groupedData;
    }

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch('/api/vimeo/get-videos');
            const data = await response.json();

            if (data.error) {
                console.error(data.error);
            } else {

                data.data.sort((a: any, b: any) => {
                    const atimestamp = new Date(a.created_time).getTime();
                    const btimestamp = new Date(b.created_time).getTime();

                    return atimestamp - btimestamp;
                })
                const group = await filterParentFolder(data.data)
                setGroups(group);
            }
        };

        fetchVideos();
    }, []);


    useEffect(() => {
        //@ts-ignore
        if (!session) {
            router.push("/")
        }
    }, [session])



    return (
        <>
            <Head>
                <title>Buscador de estrategias: Videos</title>
                <meta name="og:description" content="Buscador de estrategias creado para facilitar tu proceso de selección de setfiles y creación de portafolio" />
                <meta name="og:viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:image" content="/assets/logo.jpg" />
                <meta name="og:image" content="https://fenixforexfx.com/assets/logo.jpg" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Buscador de estrategias: Ingresa" />
                <meta name="twitter:description" content="Buscador de estrategias creado para facilitar tu proceso de selección de setfiles y creación de portafolio" />
                <meta name="twitter:image" content="https://fenixforexfx.com/" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="rating" content="General" />
                <meta name="language" content="es" />
                <meta name="author" content="Academia Fenix Forex FX" />
                <meta name="keywords" content="Forex Trading, estrategias de Forex, optimización de Forex, MT5, análisis de Forex, academia de Forex, señales de trading, cursos de trading" />
            </Head>

            <Box w='100%'>
                <motion.article
                    initial="hidden"
                    animate="enter"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.4, type: 'easeInOut' }}
                    style={{ position: 'relative' }}
                >
                    <Box
                        display="flex"
                        flexDirection='column'
                        justifyContent="center"
                        width="100%"
                        height="auto"
                        zIndex="99"
                        marginTop="40px"
                        gap="40px"
                    >
                        <Box
                            display='flex'
                            width="100%"
                            gap='20px'
                        >
                            {
                                Object.keys(groups)?.map((groupName: any, index: number) => (
                                    <Button
                                        key={index}
                                        color="white.900"
                                        variant='outline'
                                        colorScheme="gray.400"
                                        bg={
                                            selectGroup == groupName ?
                                                "green.900" :
                                                "transparent"
                                        }
                                        _hover={{ bg: "gray.800" }}
                                        onClick={() => setSelectGroup(groupName)}
                                    >
                                        {groupName}
                                    </Button>
                                ))
                            }
                        </Box>
                        <SimpleGrid
                            columns={[1, 2, null, 3]} spacing='30px'
                            width='100%'
                            gap={20}
                            marginBottom='100px'
                        >
                            {
                                groups?.length != 0 ?
                                    groups[selectGroup]?.map((video: any, i: number) => (
                                        <Box w='100%' height='300px' key={i} >
                                            <Card
                                                url={video.player_embed_url}
                                                title={video.name}
                                                description={video.description}
                                                text={`creado ${moment(video.created_time).format("YYYY.MM.DD")}`}
                                            />

                                        </Box>
                                    ))
                                    :
                                    [1, 2, 3, 4, 5, 6, 7].map((_: any, i) => (
                                        <SimpleGrid
                                            key={i}
                                            gap={20}
                                            columns={[1, 2, null, 3]} spacing='30px'
                                        >

                                            <Skeleton
                                                width="450px"
                                                startColor='green.900' endColor='brack'
                                                isLoaded={false}
                                                borderRadius="16px">
                                                <Box
                                                    display="flex"
                                                    content=""
                                                    position="relative"
                                                    width="450px"
                                                    height="300px"
                                                    borderRadius="16px"
                                                />
                                            </Skeleton>
                                        </SimpleGrid>
                                    ))

                            }
                        </SimpleGrid >
                    </Box>
                </motion.article>
            </Box>
        </>
    );
}

export default Videos;