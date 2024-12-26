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
} from "@chakra-ui/react";
import { TbWallet } from "react-icons/tb"; // Example icon from react-icons
function AccountCard() {
    return <Card bg="purple.50" borderColor="purple.400" variant={"outline"} className="w-full md:w-4/12">
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
                <Button colorScheme="purple" disabled={true}>Claim Insurance (20 STX)</Button>
                <Button variant={"outline"} colorScheme="red">Logout</Button>
            </Stack>
        </CardBody>
    </Card>
}

export default AccountCard