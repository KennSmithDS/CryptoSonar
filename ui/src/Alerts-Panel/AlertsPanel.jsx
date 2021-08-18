import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState } from 'react'; // , useCallback, useEffect
// import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import AlertTable from './AlertTable';
import InvalidWalletAlert from "./InvalidWalletAlert";
import Loader from "react-loader-spinner";
import './AlertsPanel.css';

import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

const apiKey = process.env.REACT_APP_BSC_API_KEY;
const bscUrl = process.env.REACT_APP_BSC_API_ENDPOINT;

const startBlock = "0";
const endBlock = "999999999";
const sortOrder = "desc";

export function AlertsPanel(props) {

  const wallet = props.selectedWallet;

  const [showWarning, setShowWarning] = useState(false);
  const [alertList, setAlertList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [validWallet, setValidWallet] = useState(true);

  async function bscScanHandler() {
    console.log(`Trying to make a new request for ${wallet.address}`);
    setIsLoading(true);

    const apiUrl = `${bscUrl}&address=${wallet.address}&startblock=${startBlock}&endblock=${endBlock}&sort=${sortOrder}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status !== "0") {
      const filteredKeyValues = data.result.map((tx, i) => {
        return {
          id: i,
          timeStamp: tx.timeStamp,
          hash: tx.hash,
          contractAddress: tx.contractAddress,
          walletAddress: wallet.address,
          toAddress: tx.to,
          value: tx.value,
          tokenName: tx.tokenName,
          tokenSymbol: tx.tokenSymbol,
          tokenDecimal: tx.tokenDecimal
        }
      })
      setAlertList(filteredKeyValues)
      setIsLoading(false);
    } else if (data.status === "0") {
      console.log('Invalid wallet found');
      setShowWarning(true);
      // setValidWallet(false);
    }
  };

  // useEffect(() => {
  //   setValidWallet(true);
  // }, [props.selectedWallet]);

  useEffect(() => {
    // setValidWallet(true);
    setAlertList(null);

    if (props.selectedWallet.address) {
      bscScanHandler();
      const handleApiRefresh = setInterval(bscScanHandler, 60000);
      return (() => {
        console.log('Clearing refresh interval');
        clearInterval(handleApiRefresh);
      });
    }
  }, [props.selectedWallet.address]);

  return (
    <div>
      <div>
        {props.selectedWallet.address ? <h2 className="alerts-header">Trading Alerts for {wallet.alias}'s BSC Wallet</h2> : <h2>Select a wallet to see alerts</h2>}
      </div>
      <Container className="alerts-container">
        {alertList ? <AlertTable alertList={alertList} setSelectedAlert={props.setSelectedAlert} /> : <Loader
          type="Rings"
          color="#34daad"
          height={125}
          width={125}
          timeout={10000}
        />}
        {/* {!validWallet && <ToastContainer />} */}
        <InvalidWalletAlert message={`Entry for ${wallet.alias} has invalid address ${wallet.address}`} showWarning={showWarning} setShowWarning={setShowWarning} />
      </Container>
    </div>
  );
}

export default AlertsPanel;