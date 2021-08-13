import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState, useRef } from 'react'; // , useCallback, useEffect
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';
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
  const [validWallet, setValidWallet] = useState(true);

  async function bscScanHandler() {

    const apiUrl = `${bscUrl}&address=${wallet.address}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;

    setValidWallet(true)
    setIsLoading(true);
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (walletSelected && data.status !== "0") {
      const filteredKeyValues = data.result.map((tx, i) => {
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
    } else if (walletSelected && data.status === "0") {
      setValidWallet(false);
    }

  };

  useEffect(() => {
    if (props.selectedWallet.address !== undefined) {
      setWalletSelected(true);
    }
    bscScanHandler();
  }, [props]);

  return (
    <div>
      <div>
        {walletSelected ? <h2>Trading Alerts for {wallet.alias}</h2> : <h2>Select a wallet to see alerts</h2>}
      </div>
      <Container className="alert-container">
        {walletSelected && !isLoading ? <AlertTable alertList={alertList} /> : <Loader
          type="Rings"
          color="#00BFFF"
          height={125}
          width={125}
          timeout={10000}
        />}
        {!validWallet && <p>Invalid wallet address entered!</p>}
      </Container>
    </div>
  );
}

export default AlertsPanel;