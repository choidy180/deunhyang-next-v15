import StyledComponentsRegistry from "../../lib/registry";
import Navigation from "../../components/navigation";
import GlobalStyle from "./GlobalStyle";
import { PropsWithChildren } from "react";

export default function RootLayout({children}: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <title>Deunhyang, 든향</title>
            </head>
            <body>
                <StyledComponentsRegistry>
                    <GlobalStyle/>
                    <Navigation/>
                    {children}
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
