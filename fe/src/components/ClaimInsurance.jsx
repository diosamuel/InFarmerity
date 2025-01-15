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

import { AppConfig, UserSession, showConnect, openContractCall } from '@stacks/connect';
import { STACKS_TESTNET } from '@stacks/network';
import { uintCV, stringAsciiCV, stringCV, stringUtf8CV, PostConditionMode, fetchCallReadOnlyFunction, standardPrincipalCV, cvToJSON } from "@stacks/transactions";
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });


export default function ClaimConfirmationModal({ isOpen, onClose }) {
    const handleClaim = async () => {
        const txOptions = {
            contractAddress: 'ST1AYA1J87KWP7MT2966QSTFVVWZNPFTW9ZZRT8ED',
            contractName: 'insurance',
            functionName: 'claim-insurance',
            functionArgs: [],
            network: STACKS_TESTNET,
            postConditionMode: PostConditionMode.Allow,
            // postConditions:[postCondition],
            onFinish: (data) => {
                console.log('Transaction finished:', data);
                setLoading(false);
            },
        };

        await openContractCall(txOptions);
        console.log(txOptions)
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirmation</ModalHeader>
                <ModalBody>
                    <Text>Are you sure you want to claim?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="red" onClick={onClose} mr={3}>
                        No
                    </Button>
                    <Button colorScheme="green" onClick={handleClaim}>
                        Yes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}