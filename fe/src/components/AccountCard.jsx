import { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Text,
    Stack,
    Button,
    Flex,
    Link,
    useDisclosure,
} from "@chakra-ui/react";
import CryptoPaymentCard from "./CryptoPaymentCard.jsx";
import ClaimInsurance from "./ClaimInsurance.jsx";
import { TbWallet } from "react-icons/tb";
import axios from "axios";

function AccountCard({ wallet }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isClaimOpen, onOpen: onClaimOpen, onClose: onClaimClose } = useDisclosure();
    const [amount, setAmount] = useState(null);
    const [claimStatus, setClaimStatus] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://api.testnet.hiro.so/extended/v1/address/${wallet?.profile?.stxAddress?.testnet}/stx`
                );
                setAmount(response.data);
            } catch (err) {
                console.error("Error fetching wallet balance:", err);
            }
        };
        if (wallet?.profile?.stxAddress?.testnet) {
            fetchData();
        }
    }, [wallet]);

    return (
        <>
            <Card variant="outline" className="mx-2">
                <CardHeader>
                    <Flex alignItems="center" gap={1}>
                        <Box color="blue.500">
                            <TbWallet size={28} />
                        </Box>
                        <Heading size="md" color="black">
                            Stacks Wallet
                        </Heading>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Stack spacing={4}>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text fontSize="4xl" fontWeight="bold" color="green.500">
                                {(amount?.balance || 0) / 1000000} STX
                            </Text>
                        </Flex>
                        <Text fontSize="xs" color="gray.700">
                            {wallet?.profile?.stxAddress?.testnet || ""}
                        </Text>
                        <Link
                            href={`https://explorer.stacks.co/address/${wallet?.profile?.stxAddress?.testnet}?chain=testnet`}
                            fontSize="md"
                            fontWeight="medium"
                            isExternal
                        >
                            View Hiro Explorer
                        </Link>
                        <Button colorScheme="blue" variant="solid" isDisabled onClick={onOpen}>
                            Pay Premium
                        </Button>
                        <Button
                            colorScheme="blue"
                            variant={claimStatus ? "solid" : "subtle"}
                            isDisabled={!claimStatus}
                            onClick={onClaimOpen}
                        >
                            {claimStatus ? "Claim Insurance" : "Claimed!"}
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
            <CryptoPaymentCard isOpen={isOpen} onClose={onClose} />
            <ClaimInsurance isOpen={isClaimOpen} onClose={onClaimClose} />
        </>
    );
}

export default AccountCard;
