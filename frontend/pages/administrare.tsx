import React from 'react'
import moment from 'moment'
import { NextPage } from 'next'
import Link from 'next/link'
import { TimePicker } from 'antd'
import { BiChevronRight as RightIcon } from 'react-icons/bi'
import { Button, TextInputField, toaster } from 'evergreen-ui'

import { AirportType, CompanyType } from '../interfaces'
import { HeroAirportSelector, HeroDateSelector, CompanySelector, NewFlightDialog } from '../components'
import { addFlight, getAirports, getCompanies } from '../db'
import useFlight from '../hooks/useFlight'

type DashboardPageProps = {
    page: string
    airports: AirportType[]
    companies: CompanyType[]
}

const DashboardPage: NextPage<DashboardPageProps> = ({ airports, companies }) => {
    const [arriveTime, setArriveTime] = React.useState(moment())
    const [departureTime, setDepartureTime] = React.useState(moment())
    const [company, setCompany] = React.useState<CompanyType>()
    const [price, setPrice] = React.useState<number>(200)
    const [isNewFlightDialogActive, setIsNewFlightDialogActive] = React.useState(false)
    const { flight } = useFlight()

    const onArriveTimeChange = (time: any) => {
        setArriveTime(time)
    }

    const onDepartureTimeChange = (time: any) => {
        setDepartureTime(time)
    }

    const onCompanyChange = (selectedCompany: CompanyType) => {
        setCompany(selectedCompany)
    }

    const onSave = async (confirmed: boolean) => {
        if (!confirmed) {
            setIsNewFlightDialogActive(false)
            return
        }

        if (
            !flight ||
            !flight.arrival ||
            !flight.date ||
            !flight.departure ||
            !company ||
            !departureTime ||
            !arriveTime
        ) {
            toaster.danger('Adăugarea unui nou zbor nu este posibilă!', {
                description: 'Nu ați completat toate datele din formular.'
            })
            setIsNewFlightDialogActive(false)
            return
        }

        const date = flight.date.toISOString().split('T')[0]
        const etd = departureTime.format('HH:mm')
        const eta = arriveTime.format('HH:mm')

        console.log({ flight, company, date, etd, eta })

        const ok = await addFlight(flight.departure, flight.arrival, company, date, etd, eta, price)

        if (ok) {
            toaster.success('Zborul a fost adăugat cu success!')
        } else {
            toaster.danger('Adăugarea unui nou zbor nu este posibilă!', {
                description: 'Nu ați completat corect datele din formular sau a intervenit o eroare.'
            })
        }

        setIsNewFlightDialogActive(false)
    }

    return (
        <main className="container">
            <div className="new-flight">
                <h2>Adaugă un nou zbor</h2>
                <div>
                    <h3>Data</h3>
                    <HeroDateSelector title="Data" />
                </div>

                <div className="airports">
                    <h3>Plecare</h3>
                    <h3>Destinație</h3>
                    <HeroAirportSelector type="departure" title="Selectează aeroport" airports={airports} />
                    <HeroAirportSelector type="arrival" title="Selectează aeroport" airports={airports} />
                    <TimePicker placeholder="Ora de plecare" value={departureTime} onChange={onDepartureTimeChange} />
                    <TimePicker placeholder="Ora de sosire" value={arriveTime} onChange={onArriveTimeChange} />
                </div>

                <div className="company">
                    <h3>Companie</h3>
                    <CompanySelector title="Selectează compania" companies={companies} onChange={onCompanyChange} />
                </div>

                <div className="price">
                    <h3>Preț</h3>
                    <TextInputField
                        value={price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseInt(e.target.value))}
                        type="number"
                        placeholder="Completează prețul zborului"
                        inputHeight={38}
                    />
                </div>

                <div className="submit">
                    <Button appearance="primary" size="large" onClick={() => setIsNewFlightDialogActive(true)}>
                        Salvează
                    </Button>
                </div>
            </div>

            <NewFlightDialog isActive={isNewFlightDialogActive} onClose={onSave} />
        </main>
    )
}

const getStaticProps = async () => {
    const airports: AirportType[] = await getAirports()
    const companies: CompanyType[] = await getCompanies()

    return {
        props: {
            page: 'dashboard',
            airports,
            companies
        }
    }
}

export default DashboardPage

export { getStaticProps }
