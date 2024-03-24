import React from "react";
import {Box, BoxProps} from "./Box";

export type CardProps = {
    flex?: BoxProps["flex"];
    xAxis?: BoxProps["xAxis"];
    yAxis?: BoxProps["yAxis"];
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = (props) => {
    return(
        <Box flex={props.flex} xAxis={props.xAxis} yAxis={props.yAxis} style={{ ...props.style }}>
            {props.children}
        </Box>
    )
}