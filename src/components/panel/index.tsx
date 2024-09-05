import { Box } from "@chakra-ui/react";
import Mt5Settings from "../mt5Settings";
import { useState } from "react";
import {
    HandleFlies,
    getDateFromDocument,
    updateTable
} from "@/common/functions";
import DataTable from "../table";


const Panel = () => {
    const [dates, setDates] = useState<any>({})
    const [dataTable, setDataTable] = useState<any>()
    const [multipleFiles, setMultipleFiles] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [dataFilter, setdataFilter] = useState<any>(
        {
            forward: "",
            drawdown: 1000
        }
    );

    /**
     * @param event :Obtiene los archivos cargados.
     * handlerChangeFile: funciòn para escuchar y llamar la funciòn que procesa los datos.
     */
    const handlerChangeFile = async (event: any) => {
        const dataXml = event.target.files
        if (dataXml.length != 0) {
            const dates = await getDateFromDocument(dataXml)
            setDates(dates)
            await HandleFlies(dataXml)
            //*Guarda los archivos en un estados para acceder en otros componentes
            const nuevoArray = Object.keys(dataXml).map(function (clave) {
                return dataXml[clave];
            });
            setMultipleFiles(nuevoArray)
        }
    }

    //* Update: funciòn para actualizar
    const update = () => {
        setLoading(true)
        try {
            const tableValues = updateTable(
                new Date(dates.startDate),
                new Date(dates.endDate),
                new Date(dataFilter?.forward),
                Number(dataFilter?.drawdown)
            );
            if (tableValues) {
                setDataTable(tableValues)
                setLoading(false)
                setError(false)
            }
        } catch (error) {
            console.log("Error algo salio mal o la fecha ingresada es incorrecta", error)
            setError(true)
            setLoading(false)
        }

    }

    /**
     * 
     * @param event :Obtiene los archivos cargados.
     * handlerChangeFile: funciòn para escuchar la fecha del forward.
     */
    const handlerDate = (event: any) => {
        setLoading(false)
        const { name, value } = event.target
        setdataFilter({
            ...dataFilter,
            [name]: value
        })
    }

    //restablece todo los valores
    const resetValues = () => {
        setLoading(false)
        setDates([])
        setMultipleFiles([])
        setError(false)
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="100%"
            height="auto"
            padding="20px"
            gap="20px"
            boxSizing="border-box"
        >
            <Mt5Settings
                dates={dates}
                dataFilter={dataFilter}
                handlerChangeFile={() => handlerChangeFile(event)}
                btnUpdate={update}
                handlerDate={() => handlerDate(event)}
                onChange={() => handlerDate(event)}
                required={dataFilter.forward == "" ? true : false}
                loadingData={loading}
                error={error}
                reset={resetValues}
            />

            <DataTable
                title="RESULTS TABLE"
                data={dataTable}
                multipleFiles={multipleFiles}
            />

        </Box>
    );
}

export default Panel;