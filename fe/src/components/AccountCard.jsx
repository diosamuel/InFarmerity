import { useState } from "react";
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
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import CryptoPaymentCard from "./Premi.jsx"
import { TbWallet } from "react-icons/tb"; // Example icon from react-icons

function AccountCard() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <><Card bg="purple.50" borderColor="purple.400" variant={"outline"} className="w-full md:w-4/12">
            <CardHeader>
                <Flex alignItems="center" gap={3}>
                    {/* Wallet Icon */}
                    <Box color="purple.500">
                        <TbWallet size={28} />
                    </Box>
                    <Heading size="md" color="black">
                        Wallet Information
                    </Heading>
                </Flex>
            </CardHeader>
            <CardBody className="flex flex-col justify-between">
                <Stack spacing={3}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="md" fontWeight="medium">
                            Address:
                        </Text>
                        <Text fontSize="md" fontWeight="bold" color="gray.700">
                            STXW31298321
                        </Text>
                    </Flex>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="md" fontWeight="medium">
                            Amount:
                        </Text>
                        <Text fontSize="md" fontWeight="bold" color="green.500">
                            4.3 STX (~$4.5 USD)
                        </Text>
                    </Flex>
                </Stack>
                <Stack spacing={3}>
                    <Button colorScheme="purple" variant={"outline"} disabled={true} onClick={onOpen}>Pay Premi</Button>
                    <Button colorScheme="purple" disabled={true}>Claim Insurance (20 STX)</Button>
                    {/* <Button variant={"outline"} colorScheme="red">Logout</Button> */}
                </Stack>
            </CardBody>
        </Card>
        <CryptoPaymentCard isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </>)
}

export default AccountCard