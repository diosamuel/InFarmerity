import React from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link,
} from "@chakra-ui/react";

function HistoryTable() {
    const transactions = [
        {
            no: 1,
            date: "2024-12-18",
            stx: "4.3 STX",
            month: "December",
            explorer: "https://explorer.stacks.co/txid/abc123?chain=mainnet",
        },
        {
            no: 2,
            date: "2024-11-20",
            stx: "3.2 STX",
            month: "November",
            explorer: "https://explorer.stacks.co/txid/def456?chain=mainnet",
        },
        {
            no: 3,
            date: "2024-10-15",
            stx: "2.1 STX",
            month: "October",
            explorer: "https://explorer.stacks.co/txid/ghi789?chain=mainnet",
        },
    ];

    return (
        <TableContainer
            maxHeight="400px" // Set a specific height for the table
            overflowY="auto" // Enable vertical scrolling
            border="1px solid"
            borderColor="gray.300"
            borderRadius="md"
        >
            <Table variant="simple" colorScheme="blue">
                {/* Table Head */}
                <Thead>
                    <Tr>
                        <Th>No</Th>
                        <Th>Date</Th>
                        <Th>STX Token</Th>
                        <Th>Month</Th>
                        <Th>Block Explorer</Th>
                    </Tr>
                </Thead>
                {/* Table Body */}
                <Tbody>
                    {[...transactions].map((tx) => (
                        <Tr key={tx.no}>
                            <Td>{tx.no}</Td>
                            <Td>{tx.date}</Td>
                            <Td>{tx.stx}</Td>
                            <Td>{tx.month}</Td>
                            <Td>
                                <Link
                                    href={tx.explorer}
                                    color="blue.500"
                                    isExternal
                                    fontWeight="bold"
                                >
                                    View
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default HistoryTable;
