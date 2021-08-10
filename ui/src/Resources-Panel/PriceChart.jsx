export function PriceChart(props) {

    return (
        <div>
            <iframe src={`https://charts.bogged.finance/${props.contractAddress}`} sandbox='' />
        </div>
    );
}

export default PriceChart;