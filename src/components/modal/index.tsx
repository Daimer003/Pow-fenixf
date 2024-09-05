import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
    Badge,
    Select,
    Spacer,
    Stack,
    Checkbox,
    Input,
    Flex,
    InputGroup,
    InputLeftElement,
    InputRightElement,
} from '@chakra-ui/react'
import { xmlToSet } from '@/common/functions';
import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";

interface Props {
    onOpen: () => void,
    onClose: () => void,
    isOpen: boolean,
    multipleFiles: any,
    dataTable: any
}

const ModalComponent = ({
    onClose,
    isOpen,
    multipleFiles,
    dataTable

}: Props) => {
    const [applyLot, setApplyLot] = useState(true)
    const [dataConvert, setDataConvert] = useState<any>([])
    const [dataFiltered, setdataFiltered] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")
    const [file, setFile] = useState<any>({
        selectFile: "",
        base: null
    });

    //*Selecciona el archivo 
    const handlerChange = (event: any) => {
        const { name, value } = event.target;

        setFile({
            ...file,
            [name]: value,
        })

    }

    //*Carga el archivo base
    const handlerChangeBase = (event: any) => {
        const name = event.target.name
        const fileBase = event.target.files
        setFile({
            ...file,
            [name]: fileBase[0]
        })
    }

    const handlerChangeCheck = (event: any) => {
        const check = event.target.checked
        setApplyLot(check)
    }

    const downloadbleFiles = async () => {
        setLoading(true)
        const selectedXMLFile = multipleFiles.filter((f:any) => f.name == file.selectFile);
        const best10 = dataTable.data.filter((data: any) => file.selectFile.includes(data["Optimisation Name"]) ).slice(0,9);
        console.log(best10);
        const backPassIndices:any = {};
        best10.forEach((data:any , index:number) => {
        backPassIndices[data["Back Pass"]] = index+1;
        });
        const dFiles = await xmlToSet(selectedXMLFile[0], file.base, applyLot, dataTable.data)
        if (dFiles) {
            // Filtrar los archivos
            const matchingFiles = dFiles.filter(file => backPassIndices[file.name.split("_")[1].slice(0, -4)]);
            matchingFiles.sort((a, b) => {
                const aIndex = backPassIndices[a.name.split("_")[1].slice(0, -4)];
                const bIndex = backPassIndices[b.name.split("_")[1].slice(0, -4)];
                return aIndex - bIndex;
              });
            console.log(backPassIndices);
            console.log(matchingFiles);

            setDataConvert([...matchingFiles, ...dFiles])
            setdataFiltered(matchingFiles)
            setLoading(false)
        }
    }

    //*Borra todo los estados
    const clearAll = () => {
        setApplyLot(true)
        setDataConvert([])
        setLoading(false)
        setFile({
            selectFile: '',
            base: null
        })
    }


    /**
 * @param event :Obtiene los archivos cargados.
 * getSearch : funciòn para obtener el valor para buscar.
 */
    const getFilter = (event: any) => {
        const value = event && event.target.value || '';
        setSearchValue(value)
        if(value.length){
            const filteredArray = dataConvert.find((item: any) => {
                const itemName = item.name.toLowerCase();
                const v = value.toLowerCase();
    
                // Obtener el número del nombre del archivo
                const numberMatch = itemName.match(/_(\d+)\.set/);
                return (numberMatch && numberMatch[1] === v) ||  itemName.includes(v);
            });
    
            if (filteredArray) {
                setdataFiltered([filteredArray]);
            }    
        }
        else {
            setdataFiltered(dataConvert.slice(0,100));
        }
    }

    //*Borra el campo del input filter
    const deleteField = () => {
        setSearchValue("")
        getFilter(null);
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    display="flex"
                    position="relative"
                    maxWidth="900px"
                    background="black"
                    border="1px"
                    borderColor="gray"
                    margin="20px"
                    padding="10px"
                    boxSizing='border-box'
                >
                    <ModalHeader>Xml - setComverter</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        gap="20px"
                    >
                        <Box>
                            <Text as="p">
                                Esta herramienta convierte de manera automatica la optimizacion exportada en XML en un un archivo .set por cada una de las filas de la optimizacion.
                                Simplemente siga los siguientes pasos para obtener un nuevo archivo .set
                            </Text>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap="20px"
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                padding="10px"
                                boxSizing='border-box'
                                gap="10px"
                                background="gray.600"
                                borderRadius="8px"
                            >
                                <Box>
                                    <Badge
                                        display="flex"
                                        justifyContent="center"
                                        borderRadius="50%"
                                        border="1px"
                                        borderColor="gray.700"
                                        alignItems="center"
                                        width="50px"
                                        height="50px"
                                        colorScheme='gray'
                                        fontSize="24px"
                                    >
                                        1
                                    </Badge>
                                </Box>
                                <Text as="span">
                                    Seleciona el archivo .xml para buscar los .set (no importa si es forward o back)
                                </Text>
                                <Spacer />
                                <Select
                                    name="selectFile"
                                    onChange={handlerChange}
                                    value={file.selectFile}
                                >
                                    <option value="" disabled hidden>Selecciona una opción</option>
                                    {
                                        multipleFiles &&
                                        multipleFiles?.map((file: any, i: any) => {
                                            return <option
                                                key={i}
                                                value={file.name}
                                                data-file={file}
                                            >
                                                {file.name}
                                            </option>
                                        })
                                    }

                                </Select>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                gap="10px"
                                alignItems="center"
                                padding="10px"
                                boxSizing='border-box'
                                background="gray.700"
                                borderRadius="8px"
                            >
                                <Box>
                                    <Badge
                                        display="flex"
                                        justifyContent="center"
                                        borderRadius="50%"
                                        border="1px"
                                        borderColor="gray.600"
                                        alignItems="center"
                                        width="50px"
                                        height="50px"
                                        colorScheme='gray'
                                        fontSize="24px"
                                    >
                                        2
                                    </Badge>
                                </Box>
                                <Text as="span">
                                    Selecciona el archivo .set base que fue utilizado para la optimizacion.
                                </Text>
                                <Spacer />
                                <Flex
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    width="100%"
                                    height="40px"
                                    cursor="pointer"
                                    as="label"
                                    htmlFor="file-input"
                                    p={2}
                                >
                                    <Input
                                        size="md"
                                        type="file"
                                        accept=".set"
                                        // value={file?.base}
                                        onChange={handlerChangeBase}
                                        name="base"
                                        style={{
                                            padding: "4px"
                                        }}
                                    />
                                </Flex>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row"
                                gap="10px"
                                alignItems="center"
                                padding="10px"
                                boxSizing='border-box'
                                background="gray.600"
                                borderRadius="8px"
                            >
                                <Box>
                                    <Badge
                                        display="flex"
                                        justifyContent="center"
                                        borderRadius="50%"
                                        border="1px"
                                        borderColor="gray.700"
                                        alignItems="center"
                                        width="50px"
                                        height="50px"
                                        colorScheme='gray'
                                        fontSize="24px"
                                    >
                                        3
                                    </Badge>
                                </Box>
                                <Text as="span">
                                    Click en convertir y debajo aparecera una tabla con todos los archivos .set a descargar. filtre por nombre o por back pass. Si deja el check de Apply multiplier, esto aplicara el Lot Multiplier al nuevo archivo set, si existiera uno.
                                </Text>
                                <Spacer />
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    minWidth="300px"
                                    gap="10px"
                                    background="rgba(59, 58, 58, 0.44)"
                                    padding="10px"
                                    borderRadius="8px"
                                >
                                    <Button
                                        onClick={downloadbleFiles}
                                        isLoading={loading}
                                    >
                                        CONVERT
                                    </Button>
                                    <Stack spacing={5} direction='row'>
                                        <Checkbox
                                            defaultChecked
                                            onChange={handlerChangeCheck}
                                        >Apply Multiplier</Checkbox>
                                    </Stack>
                                </Box>
                            </Box>
                        </Box>
                        {
                            dataConvert.length > 0 &&
                            <Box
                                display="flex"
                                flexDirection="column"
                                gap="20px"
                            >
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap='20px'
                                >
                                    <Text as="h4">FILE DOWNLOAD</Text>
                                    <Text as="p">
                                        Descargar Archivo
                                        Descarga el archivo .set que requieras, tienes un buscador para buscar tanto por nombre como por back pass para facilitarte la busqueda del .set que necesites.

                                        el boton Clear all elimina todos los campos para que puedas volver a realizar los pasos anteriores.
                                    </Text>
                                    <Box
                                        display="flex"
                                        width="100%"
                                        gap="20px"
                                    >
                                        <InputGroup>
                                            <InputLeftElement pointerEvents='none'>
                                                <IoSearchOutline color='gray.300' />
                                            </InputLeftElement>
                                            <Input
                                                size="md"
                                                type="text"
                                                onChange={getFilter}
                                                value={searchValue}
                                                style={{
                                                    paddingLeft: "40px"
                                                }}
                                                placeholder="Filter by Back Pass"
                                            />
                                            <InputRightElement
                                                onClick={() => deleteField()}
                                                cursor="pointer"
                                            >
                                                <IoMdClose color='gray.300' />
                                            </InputRightElement>
                                        </InputGroup>
{/*                                         <Button
                                            onClick={filter}
                                            color="white.900"
                                            background="green.800"
                                        >
                                            Filter
                                        </Button> */}

                                    </Box>
                                    <Button
                                        onClick={clearAll}
                                        width="100%"
                                    >
                                        CLEAR ALL
                                    </Button>
                                </Box>
                                <Box
                                    width="100%"
                                    minHeight="100px"
                                    maxHeight="200px"
                                    background="gray.900"
                                    borderRadius="8px"
                                    overflow="auto"
                                    padding="10px"
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        gap="5px"
                                    >
                                        {
                                            
                                            dataFiltered.length && dataFiltered.map((list: any, i: any) => {
                                                return (
                                                    <Box
                                                        key={i}
                                                        display="flex"
                                                        alignItems="center"
                                                        width="100%"
                                                        height="35px"
                                                        cursor="pointer"
                                                        color='gray'
                                                        _hover={{
                                                            bg: "gray.800",
                                                            color: "gray.100"
                                                        }}
                                                    >
                                                        <a
                                                            style={{
                                                                width: "100%"
                                                            }}
                                                            href={list.url}
                                                            download={list.name}
                                                        >
                                                            <Box
                                                                display="flex"
                                                                width="100%"
                                                                height="35px"
                                                                alignItems="center"
                                                            >
                                                                <Text as="p">
                                                                    {list.name}</Text>
                                                                <Spacer />
                                                                <FaDownload />
                                                            </Box>

                                                        </a>

                                                    </Box>

                                                )
                                            })
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}

export default ModalComponent;