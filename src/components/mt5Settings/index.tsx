import {
    Box,
    Flex,
    Text,
    Divider,
    Input,
    Skeleton,
    Button,
} from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";


interface Props {
    dates: any,
    dataFilter: any,
    handlerDate: () => void,
    onChange: () => void,
    handlerChangeFile: () => void,
    btnUpdate: () => void,
    required: boolean,
    loadingData: boolean,
    error: boolean,
    reset: () => void
}

const Mt5Settings = (
    {
        dates,
        dataFilter,
        handlerDate,
        onChange,
        handlerChangeFile,
        btnUpdate,
        required,
        loadingData,
        error,
        reset
    }: Props) => {


    return (
        <Flex
            display="flex"
            flexDirection="column"
            width="100%"
            gap="20px"
            marginBottom={"70px"}
        >
            <Text
                as="h2"
                fontSize="xxx-small"
                fontWeight="300"
            >
                MT5 SETTINGS
            </Text>
            <Box
                background="rgba(0, 0, 0, 0.34)"
                padding="10px"
                boxSizing="border-box"
                borderRadius="8px"
                backdropFilter='auto'
                backdropBlur='20px'
            >
                <Box
                    display="flex"
                    width="100%"
                    flexDirection="column"
                    gap="10px"

                >
                    <Box
                        display="flex"
                        width="100%"
                        flexDirection="column"
                        gap="10px"

                    >
                        <Box
                            display="flex"
                            gap="20px"
                        >
                            <Flex
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width="100%"
                                height="100px"
                                cursor="pointer"
                                as="label"
                                htmlFor="file-input"
                                borderWidth="1px"
                                borderRadius="md"
                                p={2}
                                _hover={{
                                    bg: 'gray.900',
                                }}
                            >
                                <Input
                                    size="md"
                                    type="file"
                                    display="none"
                                    id="file-input"
                                    accept=".xml"
                                    multiple
                                    onChange={handlerChangeFile}
                                    defaultValue=""
                                    style={{
                                        padding: "3px"
                                    }}
                                />

                                {
                                    Object.keys(dates).length != 0 ?
                                        <Box
                                            display="flex"
                                            gap="10px"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            onClick={reset}
                                        >
                                            <FaCheckDouble fontSize="30px" color="green" />
                                            <Text as="span" color="white.900">Archivos cargados</Text>
                                        </Box>
                                        :
                                        <Box
                                            display="flex"
                                            gap="10px"
                                            flexDirection="column"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <FaFileUpload fontSize="30px" color="white.900" />
                                            <Text as="span" color="white.900">Selecciona los archivos</Text>
                                        </Box>
                                }
                            </Flex>
                        </Box>
                        <Text as="p" color="white.900">

                            &#x2022; Al subir los archivos .xml del back y forward las fechas, Start Date y End Date se rellenaran de manera automatica, podras modificarlas si lo
                            ves conveniente.
                            <br />
                            &#x2022; Se requiere la fecha Forward Date para poder realizar el calculo.
                            <br />
                            &#x2022; El Target DrawDown esta por defecto en 1000, puede ser modificado de ser necesario.

                        </Text>
                    </Box>
                    <Divider />
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="20px"
                    >
                        <Box
                            display="flex"
                            width="100%"
                            flexDirection="row"
                            gap="20px"
                        >
                            <Box width="100%">
                                <Text
                                    marginBottom="5px"
                                    as="h4"
                                    color="white.900"
                                >
                                    Fecha de inicio
                                </Text>
                                <Skeleton
                                    isLoaded={Object.keys(dates).length != 0}
                                    borderRadius="8px"
                                    startColor="#606060"
                                    endColor="#2e2d2d"
                                >
                                    <Input
                                        size="md"
                                        type="date"
                                        colorScheme="gray"
                                        defaultValue={dates?.startDate}
                                    />
                                </Skeleton>
                            </Box>
                            <Box width="100%">
                                <Text
                                    marginBottom="5px"
                                    as="h4"
                                    color="white.900"
                                >
                                    Fecha final
                                </Text>
                                <Skeleton
                                    isLoaded={Object.keys(dates).length != 0}
                                    borderRadius="8px"
                                    startColor="#606060"
                                    endColor="#2e2d2d"
                                >
                                    <Input
                                        size="md"
                                        type="date"
                                        colorScheme="gray"
                                        defaultValue={dates?.endDate}
                                    />
                                </Skeleton>
                            </Box>
                            <Box width="100%">
                                <Text
                                    marginBottom="5px"
                                    as="h4"
                                    color="white.900"
                                >
                                    Fecha del forward
                                </Text>
                                <Input
                                    size="md"
                                    type="date"
                                    name="forward"
                                    colorScheme="gray"
                                    variant={"outline"}
                                    onChange={handlerDate}
                                />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            width="100%"
                            flexDirection="row"
                            gap="20px"
                        >
                            <Box
                                display="flex"
                                width="100%"
                                alignItems="center"
                                gap="20px"
                            >
                                <Box width="100%">
                                    <Text
                                        marginBottom="5px"
                                        as="h4"
                                        color="white.900"
                                    >
                                        Reducción objetivo (TDD)
                                    </Text>
                                    <Input
                                        name="drawdown"
                                        size="md"
                                        type="number"
                                        placeContent="0"
                                        value={dataFilter.drawdown}
                                        onChange={onChange}
                                    />
                                </Box>
                            </Box>
                            <Box width="100%">
                                <Text
                                    marginBottom="5px"
                                    as="h4"
                                    color="white.900"
                                >
                                    Balance
                                </Text>
                                <Input
                                    placeholder="0"
                                    size="md"
                                    type="number"
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {
                    error &&
                    <Text
                        margin="10px 0 0 0"
                        color="red.300"
                        fontSize="md"
                    >
                        ⚠️ No hay resultados que coincidan con las condiciones del filtro. ⚠️
                    </Text>
                }
                <Box >
                    <Button
                        width="100%"
                        color="white.900"
                        variant='outline'
                        colorScheme="gray.400"
                        _hover={{ bg: "gray.800" }}
                        onClick={btnUpdate}
                        isDisabled={required}
                        isLoading={loadingData}
                        marginTop="10px"
                    >
                        Cargar tabla
                    </Button>
                </Box>
            </Box>
        </Flex>
    );
}

export default Mt5Settings;