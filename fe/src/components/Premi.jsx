// Import necessary libraries
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Text,
    Box,
    Button
} from "@chakra-ui/react"
import React, {useState} from 'react';
import { openSTXTransfer } from '@stacks/connect';
import { userSession } from "../user-session";

const CryptoPaymentCard = ({ isOpen, onOpen, onClose }) => {
    // Function to handle the payment process
    const [recipient,setRecipient] = useState("ST339DQJQX8BMB0W6H9H02A06A5T6B592VJVP3M93")
    const handlePay = () => {
        openSTXTransfer({
            recipient: recipient, // Replace with the actual recipient address
            amount: 100000, // Amount in microSTX (0.1 STX = 100,000 microSTX)
            memo: 'Payment for services',
            onFinish: (data) => {
                console.log('Transaction successful:', data);
                alert('Payment successful!');
            },
            appDetails: {
                name: 'CryptoPay',
                icon: 'https://example.com/icon.png', // Replace with your app's icon URL
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Pay with STX</ModalHeader>
                <ModalBody>
                    <p className="text-sm">{recipient}</p>
                    <Text mb={4}>
                        Make a secure payment of <strong>0.1 STX</strong> using Stacks.
                    </Text>
                    <Button colorScheme="blue" onClick={handlePay} w="full" mb={4}>
                        Pay 0.1 STX woy koplak
                    </Button>
                    <Button variant="outline" onClick={onClose} w="full">
                        Close
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CryptoPaymentCard;
