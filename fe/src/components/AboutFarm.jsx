import React from "react";
import { TbDeviceDesktop, TbClock, TbPlant, TbMapPin, TbCalendarEvent } from "react-icons/tb";
import { Alert, AlertIcon, Box, AlertTitle, AlertDescription } from "@chakra-ui/react";
import AccountCard from "@/components/AccountCard"
function AboutFarm() {
    return (
        <div className="flex flex-col md:flex-row gap-4 mx-4">
            <div className="border p-4 rounded-lg space-y-1 w-full md:w-8/12">
                <h1>Your Farm</h1>
                {/* Farm Type */}
                <div className="flex items-center gap-2">
                    <TbPlant size={18} className="text-green-500" />
                    <h1 className="font-medium">Farm Type: Corn and Rice</h1>
                </div>

                {/* Planting Time */}
                <div className="flex items-center gap-2">
                    <TbCalendarEvent size={18} className="text-green-500" />
                    <h1 className="font-medium">Planting Time: Monday, December 18, 2024</h1>
                </div>

                {/* Expected Harvest */}
                <div className="flex items-center gap-2">
                    <TbClock size={18} className="text-green-500" />
                    <h1 className="font-medium">
                        Expected Harvest: Monday, March 18, 2025 (~3 Months)
                    </h1>
                </div>

                {/* Area Size */}
                <div className="flex items-center gap-2">
                    <TbMapPin size={18} className="text-green-500" />
                    <h1 className="font-medium">Area Size: 4 Hectares</h1>
                    <a href="#" className="text-blue-500 underline">
                        View Area
                    </a>
                </div>

                {/* Device Information */}
                <div className="flex items-center gap-2">
                    <TbDeviceDesktop size={18} className="text-green-500" />
                    <h1 className="flex items-center gap-2 font-medium">Device: ESP32 - Infarmerity IoT Device <div className="flex text-sm items-center gap-1 bg-green-100 text-green-400 px-2 py-1 rounded-full"><div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>Online</div></h1>
                </div>

                {/* Alert */}
                <br />
                <Alert status="warning">
                    <AlertIcon />
                    <Box>
                        <AlertTitle>Crop Failure!</AlertTitle>
                        <AlertDescription>
                            Your plant has been failure, STX insurance will coming soon
                        </AlertDescription>
                        <div className="flex items-center gap-2">
                            <TbClock size={18} className="text-gray-500" />
                            <p className="text-sm">Last Update: Monday, December 18, 2024, 12:21:23</p>
                        </div>
                    </Box>
                </Alert>
            </div>
            <AccountCard />
        </div>
    );
}

export default AboutFarm;
