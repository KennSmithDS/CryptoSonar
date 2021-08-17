import { Button } from 'react-bootstrap';
import './AlertItem.css';
import { InfoSquare } from 'react-bootstrap-icons'

export function AlertItem(props) {

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const alertRow = (
        <tr onClick={() => props.setSelectedAlert(props.contractAddress)} style={{ cursor: "pointer" }}>
            <td>{props.id}</td>
            <td><Button variant="outlined" href={`https://bscscan.com/address/${props.contractAddress}`} target="_blank" className="token-button">{props.tokenName}</Button></td>
            <td>{props.tokenSymbol}</td>
            <td>{(Math.round((props.tokenQuantity / 10 ** props.tokenDecimal) * 100) / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>{props.toAddress == props.walletAddress ? <div className="order-buy">Buy</div> : <div className="order-sell">Sell</div>}</td>
            {/* <td>{currencyFormatter.format(props.tokenValue)}</td> */}
            <td>
                <a href={`https://bscscan.com/tx/${props.transaction}`} target="_blank" rel="noreferrer">
                    <InfoSquare style={{ color: "#FFFFFF", height: "35%", width: "35%" }} />
                </a>
            </td>
            {/* <td>{new Date(props.timeStamp * 1000).toLocaleDateString('us-EN', dateFormat)}</td> */}
            <td>{new Date(props.timeStamp * 1000).toUTCString()}</td>
        </tr>
    );

    return (
        <>
            {alertRow}
        </>
    );
}

export default AlertItem;