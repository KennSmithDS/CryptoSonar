import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import React, { useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import { Container, NavLink } from 'react-bootstrap';
import AlertTable from './AlertTable';
import InvalidWalletAlert from "./InvalidWalletAlert";
import NewTransactionAlert from "./NewTransactionAlert";
import Loader from "react-loader-spinner";
import './AlertsPanel.css';

import dotenv from 'dotenv';
dotenv.config({ path: "../../.env" });

const apiKey = process.env.REACT_APP_BSC_API_KEY;
const bscUrl = process.env.REACT_APP_BSC_API_ENDPOINT;

const startBlock = "0";
const endBlock = "999999999";
const sortOrder = "desc";



// function useLastSeenTransaction(key, defaultValue) {
//   const [lastSeen, setLastSeen] = useState(() => {
//     const storedData = window.localStorage.getItem(key);

//     return storedData !== null
//       ? JSON.parse(storedData)
//       : defaultValue;
//   });

//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(lastSeen));
//   }, [key, lastSeen]);

//   return [lastSeen, setLastSeen];
// }

function useLastSeenFromWallet(walletAddress) {
  const [lastSeen, setLastSeen] = useLocalStorage("LastSeen", {});
  const lastSeenTransaction = walletAddress && lastSeen[walletAddress] || null;

  const setLastSeenTransaction = useCallback((newTransactionHash) => {
    setLastSeen({ ...lastSeen, [walletAddress]: newTransactionHash })
  }, [lastSeen, walletAddress]);

  return [lastSeenTransaction, setLastSeenTransaction];
}

export function AlertsPanel(props) {

  const wallet = props.selectedWallet;

  // const [lastSeen, setLastSeen] = useLastSeenTransaction("LastSeen", {});
  const [lastSeen, setLastSeen] = useLastSeenFromWallet(wallet.address);
  const [showWarning, setShowWarning] = useState(false);
  const [showNewAlerts, setShowNewAlerts] = useState(false);
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

  useEffect(() => {
    if (!alertList || alertList.length === 0) {
      console.log('Bailing!');
      return;
    }

    const lastHash = alertList[0].hash;

    if (!lastSeen || lastHash !== lastSeen) {
      console.log(`Updating last seen ${lastSeen} value in local storage to ${lastHash}`);
      setShowNewAlerts(true);
      setLastSeen(lastHash);
    }
  }, [alertList]);

  useEffect(() => {
    // setValidWallet(true);
    setAlertList(null);

    if (props.selectedWallet.address) {
      bscScanHandler();
      const handleApiRefresh = setInterval(bscScanHandler, 60000); // 3600000 - updates every hour
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
        <InvalidWalletAlert message={`Entry for ${wallet.alias} has invalid address ${wallet.address}`} showWarning={showWarning} setShowWarning={setShowWarning} />
        <NewTransactionAlert message={`New transaction(s) found for ${wallet.alias}`} showWarning={showNewAlerts} setShowWarning={setShowNewAlerts} />
      </Container>
    </div>
  );
}

export default AlertsPanel;