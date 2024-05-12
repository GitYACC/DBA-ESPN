import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ 
    Component, 
    pageProps: { session, ...pageProps} 
}: AppProps) {
    return (
        <SessionProvider 
            session={session}
            basePath="/"
            // Re-fetch every 10 minutes
            refetchInterval={10 * 60}
            refetchOnWindowFocus={true}
        >
            <Component {...pageProps} />
        </SessionProvider>
    )
}
