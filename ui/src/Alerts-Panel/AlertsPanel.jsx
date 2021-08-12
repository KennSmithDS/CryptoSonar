import React, { useState } from 'react'; // , useCallback, useEffect
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
// import { makeBitQueryCall } from '../utils/bitqueryApi';
// import { makeBscScanCall } from '../utils/bscscanApi';

import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

export function AlertsPanel(props) {

  const apiKey = process.env.REACT_APP_BSC_API_KEY;
  // console.log(apiKey);

  const bscUrl = process.env.REACT_APP_BSC_API_ENDPOINT;
  // console.log(bscUrl);

  const startBlock = "0";
  const endBlock = "999999999";
  const sortOrder = "desc";

  const wallet = props.selectedWallet;
  console.log(`Fetching transaction data for wallet address: ${wallet.address}`);

  const apiUrl = `${bscUrl}&address=${wallet.address}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;
  // console.log(`Fetching transaction data with url string: ${apiUrl`});

  const [alertList, setAlertList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const bscScanHandler = useCallback((address) => {

  async function bscScanHandler() {
    setIsLoading(true);
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

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
  }
  // })
  // .catch ((err) => { console.log(err) })
  // }, [alertList]);

  // useEffect(() => {
  //   setInterval(bscScanHandler(), 30000);
  // }, [bscScanHandler]);

  return (
    <div>
      <div>
        {wallet.alias === undefined && <h2>Select a wallet to see alerts</h2>}
        {!wallet.alias === undefined && <h2>Trading Alerts for {wallet.alias}</h2>}
      </div>
      <div>
        <button onClick={bscScanHandler}>Click me once a wallet is selected!</button>
      </div>
      <Container className="alert-container">
        {!isLoading && alertList.length > 0 && <AlertTable alertList={alertList} />}
        {!isLoading && alertList.length === 0 && wallet.alias === undefined && <p>No data available</p>}
        {!isLoading && alertList.length === 0 && !wallet.alias === undefined && <p>No transaction data found for {wallet.address}</p>}
        {isLoading && <Loader
          type="Puff"
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000} //3 secs
        />}
      </Container>
    </div>
  );
}

export default AlertsPanel;