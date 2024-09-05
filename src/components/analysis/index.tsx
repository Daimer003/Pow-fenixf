
import {
    Box,
    Flex,
    Input,
    Text,
    Button,
    Divider,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Tooltip as TooltipCk,
    Select
} from "@chakra-ui/react";
import { useState } from "react";
import { Chart } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import {
    Chart as ChartJS,
    TimeScale,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title
} from "chart.js";
import { FaFileUpload } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import { MeasureType, chartDataUpdated, performAnalysis } from "@/common/functions";
import ProfitTable from "../profitTable";
import ResultTable from "../resultTable";

interface DataProps {
    profitPerYearTableHeaders: string[],
    profitPerYearTable: any[];
    resultDropTableHeaders: string[],
    resultDropTable: any[],
    maxGroupSum: number,
    chartData: any,
    exceededGlobalEP: number,
}

const Analysis = () => {

    ChartJS.register(
        ArcElement,
        TimeScale,
        Tooltip,
        Legend,
        CategoryScale,
        LineController,
        LineElement,
        PointElement,
        LinearScale,
        Title
    );

    const [csvFiles, setCsvFiles] = useState<any[]>([])
    const [showGraph, setShowGraph] = useState<boolean>(false);
    const [fileNames, setFileNames] = useState('');
    const [analysisParams, setNalysisParams] = useState({
        groupThreshold: 1000,
        timeDistance: 30,
        globalTreshold: 4000,
        measureType: MeasureType.GREATER
    })
    const [data, setData] = useState<DataProps>({
        profitPerYearTableHeaders: [],
        profitPerYearTable: [],
        resultDropTableHeaders: [],
        resultDropTable: [],
        maxGroupSum: 0,
        chartData: {},
        exceededGlobalEP: 0
    });

    const PerformAnalysisAndChartUpdate = async () => {
        const analisis = await performAnalysis(
            analysisParams.groupThreshold,
            analysisParams.timeDistance,
            analysisParams.measureType,
            csvFiles,
            analysisParams.globalTreshold
        );
        const chartData = await chartDataUpdated(csvFiles);

        setData({
            profitPerYearTableHeaders: analisis.profitPerYearTableHeader,
            profitPerYearTable: analisis.profitPerYearTable,
            resultDropTableHeaders: analisis.resultDropTableHeader,
            resultDropTable: analisis.resultDropTable,
            maxGroupSum: analisis.maxGroupSum,
            chartData,
            exceededGlobalEP: analisis.timesThatExceeded,
        })
    }

    /**
    * @param event :Obtiene el archivo cargado.
    * handlerChangeFile: funciòn para escuchar y llamar la funciòn que procesa los datos.
    */
    const handlerChangeFile = async (event: any) => {
        const dataCSV = event.target.files;
        setCsvFiles(dataCSV);
        const fileNames = Array.from(dataCSV).map((file: any) => file.name).join(', ');
        setFileNames(fileNames);
    }


    /**
    * @param event :Obtiene los parametros.
    * handlerChangeParams:
    */
    const handlerChangeParams = async (event: any) => {
        const { name, value } = event.target

        value && setNalysisParams(
            {
                ...analysisParams,
                [name]: value
            }
        )
    }

    return (
        <Box
            display="flex"
            flexDir="column"
            gap="20px"
        >
            <Text as="p">
                Utilice este botón para cargar los datos de su gráfico CSV en la herramienta de Analisis independiente
            </Text>
            <Box
                display="flex"
                flexDir="row"
                alignItems="center"
                gap="20px"
                border="1px"
                borderColor="gray.800"
                background="gray.900"
                borderRadius="8px"
                padding="10px"
                boxSizing="border-box"
            >
                <Flex
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    maxWidth="250px"
                    height="100px"
                    cursor="pointer"
                    as="label"
                    htmlFor="fileCSV-input"
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
                        accept=".csv"
                        id="fileCSV-input"
                        onChange={handlerChangeFile}
                        multiple
                        defaultValue=""
                        style={{
                            padding: "3px"
                        }}
                    />
                    {
                        Object.keys(csvFiles).length != 0 ?
                            <TooltipCk label={fileNames} hasArrow placement='auto-start'>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <FaCheckDouble fontSize="30px" color="green" />
                                    <Text as="span" color="white.900" padding={0} margin={0}>
                                        Archivos cargados
                                    </Text>
                                </Box>

                            </TooltipCk>
                            :
                            <Box
                                display="flex"
                                gap="10px"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <FaFileUpload fontSize="30px" color="white.900" />
                                <Text as="span" color="white.900">
                                    Selecciona los archivos
                                </Text>
                            </Box>
                    }
                </Flex>
                <Box
                    display="flex"
                    flexDir="row"
                    gap="20px"
                >
                    <Box
                        display="flex"
                        flexDir="column"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Text
                            marginBottom="5px"
                            as="h4"
                            color="white.900"
                            minHeight="45px"

                        >
                            Umbral de DD de grupo $:
                        </Text>
                        <Input
                            placeholder="0"
                            name="groupThreshold"
                            onChange={handlerChangeParams}
                            size="md"
                            type="number"
                            value={analysisParams.groupThreshold}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDir="column"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Text
                            marginBottom="5px"
                            as="h4"
                            color="white.900"
                        >
                            Distancia de tiempo (min):
                        </Text>
                        <Input
                            placeholder="0"
                            name="timeDistance"
                            onChange={handlerChangeParams}
                            size="md"
                            type="number"
                            value={analysisParams.timeDistance}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDir="column"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Text
                            marginBottom="5px"
                            as="h4"
                            color="white.900"
                            minHeight="45px"
                        >
                            Umbral global EP $:
                        </Text>
                        <Input
                            placeholder="0"
                            name="globalTreshold"
                            onChange={handlerChangeParams}
                            size="md"
                            type="number"
                            value={analysisParams.globalTreshold}
                        />
                    </Box>
                    <Box
                        display="flex"
                        flexDir="column"
                        width="100%"
                        justifyContent="space-between"
                    >
                        <Text
                            marginBottom="5px"
                            as="h4"
                            color="white.900"
                            minHeight="45px"
                        >
                            Tipo de medida:
                        </Text>
                        <Select
                            name="measureType"
                            onChange={handlerChangeParams}
                            value={analysisParams.measureType}
                        >
                            <option value="" disabled hidden>Selecciona una opción</option>
                            {
                                Object.values(MeasureType).map((MT: any) => {
                                    return <option
                                        key={MT}
                                        value={MT}
                                    >
                                        {MT.toUpperCase()}
                                    </option>
                                })
                            }

                        </Select>
                    </Box>

                </Box>
            </Box>

            <Box
                display="flex"
                flexDir="row"
                width="100%"
                gap="20px"
            >
                <Box
                    display="flex"
                    width="100%"
                    maxWidth="600px"
                    flexDir="column"
                    gap="20px"
                >
                    <Button
                        // onClick={onOpen}
                        width="100%"
                        height="100%"
                        variant='outline'
                        colorScheme="gray.400"
                        _hover={{ bg: "gray.800" }}
                        isDisabled={csvFiles.length ? false : true}
                        onClick={() => PerformAnalysisAndChartUpdate()}
                    >
                        Calcular Tablas
                    </Button>
                    <Button
                        // onClick={onOpen}
                        width="100%"
                        height="100%"
                        variant='outline'
                        colorScheme="gray.400"
                        isDisabled={data.profitPerYearTable.length ? false : true}
                        _hover={{ bg: "gray.800" }}
                        onClick={() => setShowGraph((prev) => !prev)}
                    >
                        {showGraph ? "Ocultar Grafica" : "Mostrar Grafica"}
                    </Button>
                </Box>
                <Box
                    width="100%"
                    border="1px"
                    borderColor="gray.800"
                    padding="10px"
                    boxSizing="border-box"
                    borderRadius="8px"
                >
                    <StatGroup>
                        <Stat>
                            <StatLabel>Grupo Mínimo DD:</StatLabel>
                            <StatNumber>{data.maxGroupSum ? Number(data.maxGroupSum.toFixed(2)) : ""}</StatNumber>
                            <StatHelpText>
                                <StatArrow type='increase' />
                                $
                            </StatHelpText>
                        </Stat>

                        <Stat>
                            <StatLabel>Se superó el umbral global de PE</StatLabel>
                            <StatNumber>{
                                data.exceededGlobalEP
                            }</StatNumber>
                            <StatHelpText>
                                <StatArrow type='decrease' />
                                veces
                            </StatHelpText>
                        </Stat>
                    </StatGroup>
                </Box>
            </Box>
            <Box position='relative' pt="10px">
                <Divider />
                {/*                 <AbsoluteCenter bg='black' px='4'>
                    Tablas
                </AbsoluteCenter> */}
                {
                    showGraph && data.chartData.data?.datasets ? (
                        <Chart type="line"
                            data={{
                                labels: data.chartData.data.labels,
                                datasets: data.chartData.data.datasets
                            }}
                            options={data.chartData.options}
                        />
                    ) :
                        (null)
                }
            </Box>

            {
                data.profitPerYearTable.length ? (
                    <>
                        <ProfitTable
                            title="GANANCIA/PÉRDIDA POR MES/AÑO"
                            data={{
                                headers: data.profitPerYearTableHeaders,
                                data: data.profitPerYearTable,
                            }}
                        />
                    </>
                )
                    : (
                        <>
                        </>
                    )

            }

            {
                data.resultDropTable.length ? (
                    <>
                        <ResultTable
                            title="SUPERPOSICIÓN DE DISTRIBUCIÓN"
                            data={{
                                headers: data.resultDropTableHeaders,
                                data: data.resultDropTable,
                            }}
                            globalEp={analysisParams.globalTreshold}
                        />
                    </>
                )
                    : (
                        <>
                        </>
                    )

            }




        </Box>
    );
}

export default Analysis;