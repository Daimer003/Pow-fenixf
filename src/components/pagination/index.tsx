import {
    Button,
    HStack,
    Box,
    Text,
    Badge
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

interface Props {
    currentPage: any,
    totalItems: any,
    itemsPerPage: any,
    onPageChange: any
}

const Paginator = (
    {
        currentPage,
        totalItems,
        itemsPerPage,
        onPageChange
    }: Props) => {
    const totalItemsNum = typeof totalItems === 'number' ? totalItems : 0;
    const itemsPerPageNum = typeof itemsPerPage === 'number' ? itemsPerPage : 1;
    const totalPages = Math.max(Math.ceil(totalItemsNum / itemsPerPageNum), 1);

    //* Mostrar solo 3 posiciones a la vez
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    //* Ajustar el inicio si estamos cerca del final
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return (
        <HStack
            width="100%"
            justifyContent="center"
            display="flex"
            spacing={2}
            justify="center"
            mt={4}
            position="fixed"
            bottom="0"
            background="black"
            padding="20px"
            boxSizing='border-box'
            left="0"
            right="0"
        >
            <Box
                display="flex"
                width="100%"
                flexDirection="row"
                justifyContent="center"
                maxWidth="1500px"
                position="relative"
            >
                <Box
                    display="flex"
                    position="absolute"
                    left="0"
                    marginLeft="20px"
                >
                    <Text
                        fontSize='lg'
                        fontWeight='bold'
                        color="gray"
                    >
                        Total items
                        <Badge ml='1' fontSize='0.8em' colorScheme='green'>
                            <span>{totalItems}</span>
                        </Badge>
                    </Text>

                </Box>
                <Box
                    display="flex"
                    gap="5px"
                >
                    <Button
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                        leftIcon={<ChevronLeftIcon />}
                        size="sm"
                    >
                        Atrás
                    </Button>
                    {[...Array(endPage - startPage + 1)].map((_, index) => (
                        <Button
                            key={startPage + index}
                            onClick={() => onPageChange(startPage + index)}
                            backgroundColor={currentPage === startPage + index ? 'green.800' : 'gray'} color="white.900"
                            size="sm"
                        >
                            {startPage + index}
                        </Button>
                    ))}
                    <Button
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                        rightIcon={<ChevronRightIcon />}
                        size="sm"
                    >
                        Adelante
                    </Button>
                </Box>
            </Box>
        </HStack>
    );
};

export default Paginator;
