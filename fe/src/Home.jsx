import React, { useState } from "react";
import {
    Box,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Button,
} from "@chakra-ui/react";
import { TbTemperature, TbRulerMeasure2, TbCloud, TbDroplet, TbPlant, TbWallet, TbDeviceDesktop, TbLocation, TbArrowRight, TbClock } from "react-icons/tb"; // Example icon from react-icons
import Footer from "@/components/Footer"
import HistoryTable from "@/components/HistoryTable"
import AccountCard from "./components/AccountCard";
import AboutFarm from "./components/AboutFarm";
import Gauge from "./components/Gauge";

function App() {
    let [temp, setTemp] = useState(0)

    return (
        <>
            <div className="top-0 fixed p-2 bg-green-500 z-50 w-full">
                <h1 className="text-xl font-bold text-white">Infarmerity Dashboard</h1>
            </div>
            <div className="mx-auto container mt-14">
                <AboutFarm />
                <Box p={4}>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} spacing={4} mb={8}>
                        <Card bg="green.50" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="blue.400">
                                        <TbLocation size={24} />
                                    </Box>

                                    <Heading size="sm" color="blue.600">
                                        Farm Location
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                                    ITERA, Bandar Lampung
                                </Text>
                                <br />
                                <Button colorScheme="blue" rightIcon={<TbArrowRight />}>View Location</Button>
                            </CardBody>
                        </Card>
                        <Card bg="white" borderLeft="4px solid" borderColor="blue.400" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="blue.400">
                                        <TbCloud size={24} />
                                    </Box>

                                    <Heading size="sm" color="blue.600">
                                        Local Weather
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Text fontSize="5xl" fontWeight="bold" color="blue.700">
                                    Sunny
                                </Text>
                                <Text color={"black"}>Institut Teknologi Sumatera, Bandar Lampung</Text>
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={4} mb={8}>
                        <Card bg="white" borderLeft="4px solid" borderColor="orange.400" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="orange.400">
                                        <TbTemperature size={24} />
                                    </Box>

                                    <Heading size="sm" color="black">
                                        Plant Temperature
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Gauge value={44.2} type="°C" />
                                {/* <Text fontSize="5xl" fontWeight="bold" color="orange.500">
                                    40%
                                </Text> */}
                            </CardBody>
                        </Card>
                        <Card bg="white" borderLeft="4px solid" borderColor="blue.500" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="blue.500">
                                        <TbRulerMeasure2 size={24} />
                                    </Box>

                                    <Heading size="sm" color="black">
                                        Water Level
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Gauge value={10} max={100} type=" cm" left={"Normal"} right={""} />
                            </CardBody>
                        </Card>
                        <Card bg="white" borderLeft="4px solid" borderColor="green.600" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="green.600">
                                        <TbPlant size={24} />
                                    </Box>

                                    <Heading size="sm" color="black">
                                        Soil Moisture
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Gauge value={10} max={100} type=" cm" left={"Normal"} right={""} />
                            </CardBody>
                        </Card>
                        <Card bg="white" borderLeft="4px solid" borderColor="green.400" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="green.400">
                                        <TbDroplet size={24} />
                                    </Box>

                                    <Heading size="sm" color="green.600">
                                        Plant Humidity
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Gauge value={10} max={100} type=" cm" left={"Normal"} right={""} />
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                    <Heading size={"md"} mb={5}>Blockchain Information</Heading>
                    <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
                        <HistoryTable />
                    </SimpleGrid>
                </Box>
            </div>
            <Footer />
        </>
    );
}

export default App;
