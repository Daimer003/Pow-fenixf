import {
    Box,
    Text,
    useClipboard,
    Tooltip,
} from "@chakra-ui/react";

import Image from "next/image";
import { CiUser } from "react-icons/ci";

interface Props {
    url: string,
    title: string,
    description: string,
    text: string
}

const Card = ({
    url,
    title,
    description,
    text
}: Props) => {
    const { onCopy } = useClipboard(description);

    const maxDescriptionLength = 100;
    const shortDescription = description && description.length > maxDescriptionLength ?
        description.slice(0, maxDescriptionLength - 3) + '...' :
        description;

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            maxWidth="450px"
            height="auto"
            minHeight="300px"
            borderRadius="16px"
            overflow="hidden"
            gap="6px"
            border="1px"
            borderColor="gray.900"
            background="rgba(0, 0, 0, 0.84)"
        >
            <Box
                width="100%"
                maxHeight="220px"
                overflow="hidden"
            >
                <iframe src={url}
                    width={"100%"}
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Como utilizar el buscador de estrategias 1/2"
                />
            </Box>
            <Box
                display="flex"
                padding="10px"
                gap="10px"
            >
                <Box
                    display="flex"
                    flexDir="column"
                    gap="5px"
                >
                    <Text as="h3" fontSize="large" fontWeight="800">{title}</Text>
                    <Tooltip label={description} placement="bottom">
                        <Text as="p" fontSize="medium" fontWeight="300" color="gray">{shortDescription}</Text>
                    </Tooltip>
                    <Text as="p" fontSize="medium" fontWeight="300" color="gray">{text}</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default Card;