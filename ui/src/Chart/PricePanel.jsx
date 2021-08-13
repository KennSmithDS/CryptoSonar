import { Container } from 'react-bootstrap';
import PriceChart from './PriceChart';

export function PricePanel(props) {

    return (
        props.contractAddress ? <PriceChart contractAddress={props.contractAddress} /> : <p>No token selected from alert list!</p>
    );
}

export default PricePanel;