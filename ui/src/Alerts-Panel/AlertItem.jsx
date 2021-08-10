import Link from 'react';

export default function AlertItem(props) {

    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const dateFormat = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };

    const alertRow = (
        <tr>
            <td>{props.id}</td>
            <td><a target="_blank" href={`https://bscscan.com/address/${props.contractAddress}`}>{props.tokenName}</a></td>
            <td>{props.tokenSymbol}</td>
            <td>{Math.round((props.tokenQuantity / 10 ** props.tokenDecimal) * 100) / 100}</td>
            <td>{currencyFormatter.format(props.tokenValue)}</td>
            <td><a target="_blank" href={`https://bscscan.com/tx/${props.transaction}`}>Tx Link</a></td>
            <td>{new Date(props.timeStamp * 1000).toLocaleDateString('us-EN', dateFormat)}</td>
        </tr>
    );

    return (
        <>
            {alertRow}
        </>
    );
}