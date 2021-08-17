import React from 'react';
import { Table } from 'react-bootstrap';
import AlertItem from './AlertItem';
import './AlertItem.css';

export function AlertTable(props) {

    const alerts = props.alertList;
    // console.log(alerts);

    const tableRows = alerts.map((alert) => (
        <AlertItem
            className="alert-container"
            key={alert.id}
            id={alert.id}
            contractAddress={alert.contractAddress}
            walletAddress={alert.walletAddress}
            toAddress={alert.toAddress}
            tokenName={alert.tokenName}
            tokenSymbol={alert.tokenSymbol}
            tokenDecimal={alert.tokenDecimal}
            tokenQuantity={alert.value}
            tokenValue={0} // create function to convert quantity to BUSD { alert.usdValue }
            transaction={alert.hash}
            timeStamp={alert.timeStamp}
            setSelectedAlert={props.setSelectedAlert}
        />
    ))

    return (
        <Table bordered hover responsive striped variant="dark">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Token Name</th>
                    <th>Token Symbol</th>
                    <th>Quantity</th>
                    <th>Order</th>
                    {/* <th>USDT Value</th> */}
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