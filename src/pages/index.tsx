import Head from "next/head";
import {
  Box,
} from "@chakra-ui/react";
import LayoutMain from "@/components/share/layouts/layoutMain";
import Navbar from "@/components/share/navbar";
import Home from "@/components/views/home";
import Videos from "./videos";
import { useState } from "react";
import PortfolioFinder from "./portfolio-finder";



export default function Login() {
  const [route, setRoute] = useState<string>("home")
  const [routing, _] = useState<any>({
    home: <Home route={() => setRoute('portfoliofinder')} />,
    portfoliofinder: <PortfolioFinder />,
    videos: <Videos />
  })

  //* Actualiza la ruta para cargar el componente 
  const deviate = (path: string) => {
    setRoute(path)
  }

  return (
    <>
      <Head>
        <title>Buscador de estrategias: Ingresa</title>
        <meta name="og:description" content="Buscador de estrategias creado para facilitar tu proceso de selección de setfiles y creación de portafolio" />
        <meta name="og:viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="/assets/logo.jpg" />
        <meta name="og:image" content="https://fenixforexfx.com/assets/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buscador de estrategias: Ingresa" />
        <meta name="twitter:description" content="Buscador de estrategias creado para facilitar tu proceso de selección de setfiles y creación de portafolio" />
        <meta name="twitter:image" content="https://fenixforexfx.com/" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="rating" content="General" />
        <meta name="language" content="es" />
        <meta name="author" content="Academia Fenix Forex FX" />
        <meta name="keywords" content="Forex Trading, estrategias de Forex, optimización de Forex, MT5, análisis de Forex, academia de Forex, señales de trading, cursos de trading" />
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        height="100vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          maxWidth="90vw"
          height="auto"
        >
          <Navbar route={(path) => deviate(path)} />
          <LayoutMain>
            {routing[route as string]}
          </LayoutMain>
        </Box>
      </Box >
    </>
  );
}
