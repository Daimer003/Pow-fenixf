import Head from "next/head";
import {
  Box,
} from "@chakra-ui/react";
import Panel from "@/components/panel";
import AuthChecker from "@/components/auth";
import { motion } from 'framer-motion'

//*Animation
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

export default function PortfolioFinder() {
  return (
    <AuthChecker>
      <Head>
        <title>Buscador de estrategias: Inicio</title>
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
          <motion.article
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.4, type: 'easeInOut' }}
            style={{ position: 'relative' }}
          >
            <Panel />
          </motion.article>
        </Box>
      </Box >
    </AuthChecker>
  );
}
