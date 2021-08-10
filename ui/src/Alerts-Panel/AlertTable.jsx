import React from 'react';
import { Table } from 'react-bootstrap';
import AlertItem from './AlertItem';

export function AlertTable(props) {

    const DUMMY_ALERTS = [
        {
            id: "1",
            contractAddress: "0xb86abcb37c3a4b64f74f59301aff131a1becc787",
            tokenName: "Zilliqa",
            tokenSymbol: "ZIL",
            value: 39318438737685,
            tokenDecimal: 12,
            usdValue: 3.60,
            hash: "0x365eecddae42a65546f5b282733b8555cf9d0127bba09a70c10ebb758308b6e9",
            timeStamp: 1627846486
        },
        {
            id: "2",
            contractAddress: "0x1ad7dbe0d521ca1ae72decc06f1570aa43c781a2",
            tokenName: "CryptoNaught",
            tokenSymbol: "CRYPT",
            value: 9400000000000000000000000,
            tokenDecimal: 18,
            usdValue: 98.20,
            hash: "0x6a51d308d2b0ddbf948a778c0c610184295c418592e3bed4e076260b09b1c9ac",
            timeStamp: 1627835482
        },
        {
            id: "3",
            contractAddress: "0x1ad7dbe0d521ca1ae72decc06f1570aa43c781a2",
            tokenName: "CryptoNaught",
            tokenSymbol: "CRYPT",
            value: 788940823606426795120963,
            tokenDecimal: 18,
            usdValue: 8.24,
            hash: "0x5e3527eab9b7559f7be6c13d81927ffe37adb17ced20b6f236387d23bc0707f0",
            timeStamp: 1627835530
        }
    ];

    const tableRows = DUMMY_ALERTS.map((alert) => (
        <AlertItem
            key={alert.id}
            contractAddress={alert.contractAddress}
            tokenName={alert.tokenName}
            tokenSymbol={alert.tokenSymbol}
            tokenDecimal={alert.tokenDecimal}
            tokenQuantity={alert.value}
            tokenValue={alert.usdValue}
            transaction={alert.hash}
            timeStamp={alert.timeStamp}
        />
    ))

    return (
        <Table bordered condensed hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Token Name</th>
                    <th>Token Symbol</th>
                    <th>Quantity</th>
                    <th>USDT Value</th>
                    <th>Transaction</th>
                    <th>Timestamp</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </Table>
    );
}

export default AlertTable;