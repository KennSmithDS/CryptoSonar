export function HorizontalFlexContainer({
    flex,
    children,
    height,
    width,
    align,
    justify,
    paddingHorizontal,
    paddingVertical,
    flexWrap,
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                flex: flex,
                margin: 0,
                padding: 0,
                height: height,
                width: width,
                alignItems: align,
                justifyContent: justify,
                padding: `${paddingVertical} ${paddingHorizontal}`,
                flexWrap: flexWrap,
            }}
        >
            {children}
        </div>
    );
}
HorizontalFlexContainer.defaultProps = {
    paddingHorizontal: "0px",
    paddingVertical: "0px",
};