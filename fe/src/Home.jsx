import React, { useState, useEffect } from "react";
import {
    Box,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Button,
    Spinner,
} from "@chakra-ui/react";
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { TbTemperature, TbRulerMeasure2, TbCloud, TbDroplet, TbPlant, TbWallet, TbDeviceDesktop, TbLocation, TbArrowRight, TbClock } from "react-icons/tb"; // Example icon from react-icons
import Footer from "@/components/Footer"
import HistoryTable from "@/components/HistoryTable"
import AccountCard from "@/components/AccountCard";
import AboutFarm from "@/components/AboutFarm";
import Gauge from "@/components/Gauge";
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function App() {
    const [data, setData] = useState([]);
    const [wallet, setWalletInformation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let userData = userSession.loadUserData();
        setWalletInformation(userData)

        //IoT Blynk
        const urls = [
            'https://sgp1.blynk.cloud/external/api/get?token=CTzFHspbQ6_1awP5Jf2scatALgPFEmpn&V0',
            'https://sgp1.blynk.cloud/external/api/get?token=CTzFHspbQ6_1awP5Jf2scatALgPFEmpn&V1'
        ];
        setLoading(true);
        Promise.all(urls.map(url => fetch(url).then(res => res.json())))
            .then(results => {
                setData(results);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch data: ', err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="m-5 w-full h-screen flex justify-center items-center animate-pulse"><Spinner></Spinner></div>
    }

    return (
        <>
            <div className="top-0 fixed p-2 bg-green-500 z-50 w-full">
                <h1 className="text-xl font-bold text-white">Infarmerity Dashboard</h1>
            </div>
            <div className="mx-auto container mt-14">
                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }}>
                    <AccountCard wallet={wallet} />
                    <AboutFarm />
                </SimpleGrid>
                <Box mx={2}>
                    <SimpleGrid columns={{ base: 1, md: 1, lg: 1 }} spacing={2} mb={2}>
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
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={2} mb={8}>
                        <Card bg="white" variant={"outline"}>
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
                                <Gauge value={data[0]} type="°C" />
                                {/* <Text fontSize="5xl" fontWeight="bold" color="orange.500">
                                    40%
                                </Text> */}
                            </CardBody>
                        </Card>
                        <Card bg="white" variant={"outline"}>
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
                        <Card bg="white" variant={"outline"}>
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
                        <Card bg="white" variant={"outline"}>
                            <CardHeader>
                                <Box display="flex" alignItems="center" gap={2}>

                                    <Box color="green.400">
                                        <TbDroplet size={24} />
                                    </Box>

                                    <Heading size="sm">
                                        Plant Humidity
                                    </Heading>
                                </Box>
                            </CardHeader>
                            <CardBody>
                                <Gauge value={data[1]} max={100} type=" cm" left={"Normal"} right={""} />
                            </CardBody>
                        </Card>
                    </SimpleGrid>
                    <Heading size={"md"} mb={5}>TRX History</Heading>
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
