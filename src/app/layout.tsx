import StyledComponentsRegistry from "../../lib/registry";
import Navigation from "./components/navigation";
import GlobalStyle from "./GlobalStyle";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
