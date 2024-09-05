import { IDataTable } from '@/common/interfaces/function.interfaces';
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
    Input,
    Button,
    InputGroup,
    InputLeftElement,
    Spacer,
    InputRightElement,
    useDisclosure
} from '@chakra-ui/react'
import Pagination from '../pagination';
import { useEffect, useState } from 'react';
import { searchBackPass, removeDuplicates } from '@/common/functions';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import ModalComponent from '../modal';
import { DisplayColumns } from '@/common/interfaces/tableInterface';


interface Props {
    title?: string,
    data: {

        headers: string[];
        data: IDataTable[];
    },
    multipleFiles?: any,
}

const DataTable = ({ title, data, multipleFiles }: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; //* Numero de filas 
    const [dataTable, setDataTable] = useState<any>([])
    const [searchValue, setSearchValue] = useState<any>("")
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        setDataTable(data?.data)
    }, [data?.data])

    //* Asegúrese de que los datos sean una matriz y estén definidos
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

    /**
    * @param event :Obtiene los archivos cargados.
    * getSearch : funciòn para obtener el valor para buscar.
    */
    const getSearch = (event: any) => {
        const value = event.target.value
        setSearchValue(value)
        if (value == "" || value.length <= 2) {
            setDataTable(data?.data)
        }
    }

    //* Hacer la busqueda
    const search = () => {
        const res = searchBackPass(searchValue, data?.data)
        setDataTable(res)
        setCurrentPage(1);
    }

    const remove = async () => {
        const newData = removeDuplicates(data?.data);
        setDataTable(newData)
    }

    const deleteField = () => {
        setSearchValue(" ")
        setDataTable(data?.data)
    }


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
            <Box
                display="flex"
                width="100%"
                gap="20px"
            >
                <Box
                    display="flex"
                    maxWidth="400px"
                    gap="20px"
                >
                    <InputGroup>
                        <InputLeftElement pointerEvents='none'>
                            <IoSearchOutline color='gray.300' />
                        </InputLeftElement>
                        <Input
                            size="md"
                            type="text"
                            onChange={getSearch}
                            value={searchValue}
                            style={{
                                paddingLeft: "40px"
                            }}
                            placeholder="Search by Back Pass"
                        />
                        <InputRightElement
                            onClick={() => deleteField()}
                            cursor="pointer"
                        >
                            <IoMdClose color='gray.300' />
                        </InputRightElement>
                    </InputGroup>
                    <Button
                        onClick={() => search()}
                        color="white.900"
                        variant='outline'
                        colorScheme="gray.400"
                        _hover={{ bg: "gray.800" }}
                    >
                        Buscar
                    </Button>
                </Box>
                <Spacer />
                <Box
                    display="flex"
                    flexDirection="row"
                    gap="20px"
                >
                    <Button
                        onClick={onOpen}
                        variant='outline'
                        colorScheme="gray.400"
                        _hover={{ bg: "gray.800" }}
                    >
                        Convertir XML a Set
                    </Button>
                    <Button
                        onClick={() => remove()}
                        variant='outline'
                        colorScheme="gray.400"
                        _hover={{ bg: "gray.800" }}
                    >
                        Remove
                    </Button>

                </Box>
            </Box>
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
                                <Th>ID</Th>
                                {
                                    data?.headers.filter((h) => DisplayColumns.includes(h)).map((hd: any, i: any) => {
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
                                visibleData.map((row: IDataTable, j: number) => {
                                    return (
                                        <Tr key={j}>
                                            <Td>{row?.id}</Td>
                                            {data.headers.filter((h) => DisplayColumns.includes(h)).map((header: string, i: number) =>
                                            (
                                                <Td key={j + i + header + row[header]} color="#ffdfe5">
                                                    {row.hasOwnProperty(header) ? row[header] : ""}
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


            <Pagination
                currentPage={currentPage}
                totalItems={dataTable?.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
            {
                multipleFiles &&
                <ModalComponent
                    onClose={onClose}
                    onOpen={onOpen}
                    isOpen={isOpen}
                    dataTable={data}
                    multipleFiles={multipleFiles}
                />
            }
        </Box>
    );
}

export default DataTable;