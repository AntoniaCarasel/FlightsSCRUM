import 'react-day-picker/lib/style.css'
import 'antd/dist/antd.css'

import '../styles/globals.css'
import '../styles/pages/home.css'
import '../styles/pages/search.css'
import '../styles/pages/offer.css'
import '../styles/pages/dashboard.css'

import type { AppProps } from 'next/app'
import { Layout } from '../components'

import { AuthProvider } from '../hooks/useAuth'
import { FlightProvider } from '../hooks/useFlight'
import { OfferProvider } from '../hooks/useOffer'

function MyApp({ Component, pageProps }: AppProps) {
    const { page } = pageProps

    return (
        <AuthProvider>
            <FlightProvider>
                <OfferProvider>
                    <Layout page={page}>
                        <Component {...pageProps} />
                    </Layout>
                </OfferProvider>
            </FlightProvider>
        </AuthProvider>
    )
}

export default MyApp
