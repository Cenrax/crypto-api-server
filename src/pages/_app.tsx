import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

function MyApp(props: AppProps): JSX.Element {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}
export default MyApp
