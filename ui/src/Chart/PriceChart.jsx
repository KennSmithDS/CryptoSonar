import './PriceChart.css';
import Iframe from "react-iframe";

export default function PriceChart(props) {

    return (
        <Iframe className="price-chart-frame" src={`https://dex.guru/token/${props.contractAddress}-bsc`}
            frameborder="0"
            allowtransparency="true"
            allowfullscreen="true"
            overflow="auto"
        />
    );
}