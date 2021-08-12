import Iframe from "react-iframe";
// import { Container } from 'react-bootstrap'
import { VerticalFlexContainer } from "../Layout/VerticalFlexContainer";
import { HorizontalFlexContainer } from "../Layout/HorizontalFlexContainer";
import { useEffect, useState } from "react";

export default function PriceChart(props) {

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return (
        <HorizontalFlexContainer justify="center">
            <VerticalFlexContainer align="center">
                <Iframe src={`https://charts.bogged.finance/${props.contractAddress}`}
                    frameborder="0"
                    width={windowDimensions.width}
                    height={windowDimensions.height}
                    allowtransparency="true"
                    allowfullscreen="true"
                    overflow="auto"
                />
            </VerticalFlexContainer>
        </HorizontalFlexContainer>
    );
}