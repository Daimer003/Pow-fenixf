import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
    Box,
    Skeleton,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import Paginator from '../pagination';


interface Props {
    title?: string,
    data: {

        headers: string[];
        data: any[];
    },
    globalEp: number,
}

const ResultTable = ({ title, data, globalEp }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [dataTable, setDataTable] = useState<any>([])
    const itemsPerPage = 10; //* Numero de filas 

    useEffect(() => {
        setDataTable(data?.data)
    }, [data?.data])

    const dataPager = Array.isArray(dataTable) ? dataTable : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleData = dataPager.slice(startIndex, startIndex + itemsPerPage).map((item, index) => {
        return {
            id: startIndex + index + 1,
            ...item,
        };
    });


    //* Pagina
    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    };

    return (
        <Box
            display={data?.headers ? "flex" : "none"}
            flexDirection="column"
            width="100%"
            height="auto"
            gap="20px"
        >
            <Text
                as="h2"
                fontSize="xxx-small"
                fontWeight="300"
            >
                {title}
            </Text>
            <TableContainer
                border="1px"
                borderColor="gray.800"
                borderRadius="8px"
                marginBottom="50px"
            >
                <Skeleton
                    isLoaded={data?.headers ? true : false}
                    startColor="#606060"
                    endColor="#2e2d2d"
                >
                    <Table
                        variant='striped'
                        minHeight="100px"
                        size='sm'
                        marginBottom="80px"
                    >
                        <Thead height="50px">
                            <Tr>
                                {
                                    data.headers?.map((hd: string, i: any) => {
                                        return <Th
                                            key={i}
                                            fontFamily="'Poppins', sans-serif"
                                        >
                                            {hd}
                                        </Th>
                                    })
                                }
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                visibleData?.map((row: any, j: number) => {
                                    return (
                                        <Tr key={j}>
                                            {data.headers.map((header: string, i: number) => {

                                                return (
                                                    <Td key={j + i + header} color={
                                                        i == row.length - 1 && row[i] >= globalEp ? "red" : "#ffdfe5"
                                                    } >
                                                        {row[i]}
                                                    </Td>
                                                )
                                            }
                                            )}
                                        </Tr>
                                    );
                                })
                            }
                        </Tbody>
                    </Table>
                </Skeleton>
            </TableContainer>
            <Paginator
                currentPage={currentPage}
                totalItems={dataTable?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
}

export default ResultTable;