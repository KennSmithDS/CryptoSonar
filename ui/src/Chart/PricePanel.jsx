import PriceChart from './PriceChart';

export function PricePanel(props) {

    console.log(`Getting price chart from dex.guru for ${props.contractAddress}`);

    return (
        props.contractAddress !== null ? <PriceChart contractAddress={props.contractAddress} /> : <p>No token selected from alert list!</p>
    );
}

export default PricePanel;