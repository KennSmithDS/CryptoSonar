import React, { useEffect, useState, useRef } from 'react'; // , useCallback, useEffect
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import { makeBitQueryCall } from '../utils/bitqueryApi';
// import { makeBscScanCall } from '../utils/bscscanApi';

import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

const apiKey = process.env.REACT_APP_BSC_API_KEY;
const bscUrl = process.env.REACT_APP_BSC_API_ENDPOINT;

const startBlock = "0";
const endBlock = "999999999";
const sortOrder = "desc";

export function AlertsPanel(props) {

  const wallet = props.selectedWallet;
  console.log(`Fetching transaction data for wallet address: ${wallet.address}`);

  const [alertList, setAlertList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [walletSelected, setWalletSelected] = useState(false);
  // const [walletActive, setWalletActive] = useState('inherit');
  // const walletRef = useRef();
  // console.log(walletRef);

  // const bscScanHandler = useCallback((address) => {

  async function bscScanHandler() {

    const apiUrl = `${bscUrl}&address=${wallet.address}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;

    setIsLoading(true);
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    let filteredKeyValues;

    if (walletSelected) {
      filteredKeyValues = data.result.map((tx, i) => {
        return {
          id: i,
          timeStamp: tx.timeStamp,
          hash: tx.hash,
          contractAddress: tx.contractAddress,
          value: tx.value,
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          tokenDecimal: tx.tokenDecimal
        }
      })
      setAlertList(filteredKeyValues)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setWalletSelected(true);
    bscScanHandler();
  }, [props]);

  return (
    <div>
      <div>
        {walletSelected ? <h2>Trading Alerts for {wallet.alias}</h2> : <h2>Select a wallet to see alerts</h2>}
      </div>
      <Container className="alert-container">
        {walletSelected && !isLoading ? <AlertTable alertList={alertList} /> : <Loader
          type="pacman"
          color="#00BFFF"
          height={125}
          width={125}
          timeout={10000}
        />}
      </Container>
    </div>
  );
}

export default AlertsPanel;

// {!walletSelected && <p>No data available</p>}
// {!isLoading && walletSelected && <AlertTable alertList={alertList} />}
// {!isLoading && alertList.length === 0 && wallet.alias === undefined && <p>No data available</p>}
// {!isLoading && alertList.length === 0 && !wallet.alias === undefined && <p>No transaction data found for {wallet.address}</p>}
// {isLoading && walletSelected && <Loader
//   type="Puff"
//   color="#00BFFF"
//   height={200}
//   width={200}
//   timeout={10000}
// />}