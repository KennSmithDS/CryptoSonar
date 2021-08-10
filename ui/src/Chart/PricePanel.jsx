import { Container } from 'react-bootstrap';
import PriceChart from './PriceChart';

export function PricePanel(props) {

    const testAddress = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3";

    return (
        <Container>
            <PriceChart contractAddress={testAddress} />
        </Container>
    );
}

export default PricePanel;