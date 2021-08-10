import { Container } from 'react-bootstrap';
import PriceChart from './PriceChart';

export function PricePanel(props) {

    const testAddress = "0x1ad7dbe0d521ca1ae72decc06f1570aa43c781a2";

    return (
        <Container>
            <PriceChart contractAddress={testAddress} />
        </Container>
    );
}

export default PricePanel;