import React from "react";
import "./components.css";

export type BoxProps = {
    flex?: "flex-row" | "flex-column";
    xAxis?: "start" | "center" | "end" | "space-around" | "space-between";
    yAxis?: "start" | "center" | "end" | "space-around" | "space-between";
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = (props) => {

    function getStyle () {
        let style: React.CSSProperties = {};
        if (props.flex) {
            style = { ...style, display: "flex", flexDirection: props.flex === "flex-row" ? "row" : "column" };
        }
        if (props.xAxis) {
            style = { ...style, ...(props.flex === "flex-row" ? { justifyContent: props.xAxis } : { alignItems: props.xAxis })}
        }
        if (props.yAxis) {
            style = { ...style, ...(props.flex === "flex-row" ? { alignItems: props.yAxis } : { justifyContent: props.yAxis })}
        }

        return style;
    }

    return(
        <div style={{ ...getStyle(), ...props.style }}>
            {props.children}
        </div>
    )
}