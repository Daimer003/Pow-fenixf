import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const LayoutMain = ({ children }: Props) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            width="100%"
            height="auto"
            position="relative"
        >
            <Box
                display="flex"
                justifyContent="center"
                width="640px"
                height="100%"
                backgroundImage="/assets/logo.svg"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                position="absolute"
                zIndex="0"
            ></Box>
            {children}
        </Box>
    );
}

export default LayoutMain;