import React from "react";
import {Box} from "../../components/Box";
import {Theme} from "../../data/constants/theme";
import {Card} from "../../components/Card";

export const Login: React.FC = () => {
    return(
        <Box flex="flex-row" style={{ width: "100vw", height: "100vh", boxSizing: "content-box", fontSize: Theme.Font.default }}>
            <Card style={{ width: "10%", height: "10%", backgroundColor: "red", margin: 10 }}></Card>
        </Box>
    );
}