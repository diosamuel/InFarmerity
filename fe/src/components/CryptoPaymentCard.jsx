// Import necessary libraries
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
    fetchCallReadOnlyFunction,
    standardPrincipalCV,
    uintCV,
    cvToJSON,
} from "@stacks/transactions";
import { STACKS_TESTNET } from "@stacks/network";
import { AppConfig, UserSession,openContractCall } from "@stacks/connect";

const appConfig = new AppConfig(["store_write", "publish_data"]);
const userSession = new UserSession({ appConfig });

const CryptoPaymentCard = ({ isOpen, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [insuranceStatus, setInsuranceStatus] = useState(null);
    const sender = userSession.loadUserData()?.profile?.stxAddress?.testnet;

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const txOptions = {
                    contractAddress: "ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED",
                    contractName: "insurance",
                    functionName: "get-insurance-status",
                    functionArgs: [standardPrincipalCV(sender)],
                    network: STACKS_TESTNET,
                    senderAddress: sender,
                };
                const result = await fetchCallReadOnlyFunction(txOptions);
                setInsuranceStatus(cvToJSON(result)?.value?.value);
            } catch (err) {
                console.error("Error fetching insurance status:", err);
            }
        };
        if (sender) fetchStatus();
    }, [sender]);

    const handlePay = async () => {
        setLoading(true);
        try {
            const txOptions = {
                contractAddress: "ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED",
                contractName: "insurance",
                functionName: "pay-premium",
                functionArgs: [uintCV(40)], // Assuming 4 hectares
                network: STACKS_TESTNET,
                postConditionMode: 0,
                onFinish: () => {
                    location.reload()
                    setLoading(false)
                },
            };
            await openContractCall(txOptions);
        } catch (err) {
            console.error("Error during payment:", err);
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pay with STX</ModalHeader>
                <ModalBody>
                    <Text mb={4}>
                        Your Account: <strong>{sender}</strong>
                    </Text>
                    <Text mb={4}>
                        Make a secure payment of <strong>0.1 STX</strong> using Stacks.
                        Insurance premium will be paid every 6 months.
                    </Text>
                    {insuranceStatus?.["insurance-active"]?.value ? (
                        <Button colorScheme="green" variant="outline" w="full" mb={4}>
                            Insurance already Active
                        </Button>
                    ) : (
                        <Button
                            colorScheme="blue"
                            onClick={handlePay}
                            w="full"
                            mb={4}
                            isLoading={loading}
                        >
                            Pay Insurance 0.1 STX
                        </Button>
                    )}
                    <Button variant="outline" onClick={onClose} w="full">
                        Close
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CryptoPaymentCard;
