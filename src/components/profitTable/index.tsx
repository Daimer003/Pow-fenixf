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


interface Props {
    title?: string,
    data: {

        headers: string[];
        data: any[];
    },
}

const ProfitTable = ({ title, data }: Props) => {

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
                                data.data?.map(({ cells: row }: any, j: number) => {
                                    return (
                                        <Tr key={j}>
                                            {data.headers.map((header: string, i: number) =>
                                            (
                                                <Td key={j + i + header} color="#ffdfe5">
                                                    {Number.isNaN(Number(row[i])) ? row[i] : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row[i])}
                                                </Td>
                                            )
                                            )}
                                        </Tr>
                                    );
                                })
                            }
                        </Tbody>
                    </Table>
                </Skeleton>
            </TableContainer>
        </Box>
    );
}

export default ProfitTable;