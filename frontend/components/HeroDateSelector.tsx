import React from 'react'
import DatePicker from 'react-day-picker'
import { Button, Popover, Position } from 'evergreen-ui'
import { GiCalendar as CalendarIcon } from 'react-icons/gi'
import useFlight from "../hooks/useFlight";

type HeroDateSelectorProps = {
    title: string
    isInvalid?: boolean
}

const HeroDateSelector: React.FC<HeroDateSelectorProps> = ({ title, isInvalid }) => {
    const [value, setValue] = React.useState('')
    const [isDanger, setIsDanger] = React.useState(false)
    const { setDate } = useFlight()

    React.useEffect(() => {
        setIsDanger(!!isInvalid)
    }, [isInvalid])

    const WEEKDAYS_SHORT = {
        ro: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    }

    const WEEKDAYS_LONG = {
        ro: ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă']
    }

    const MONTHS = {
        ro: [
            'Ianuarie',
            'Februarie',
            'Martie',
            'Aprilie',
            'Mai',
            'Iunie',
            'Iulie',
            'August',
            'Septembrie',
            'Octombrie',
            'Noiembrie',
            'Decembrie'
        ]
    }

    const FIRST_DAY_OF_WEEK = {
        ro: 1
    }

    const LABELS = {
        ro: { nextMonth: 'Luna viitoare', previousMonth: 'Luna trecută' }
    }

    const [selectedDay, setSelectedDay] = React.useState<Date>(new Date())

    const handleDayClick = (date: Date) => {
        if (date < new Date()) {
            return
        }

        setSelectedDay(date)
        setValue(date.toLocaleDateString('ro-RO'))
        setDate(date)
        setIsDanger(false)
    }

    const Content = () => {
        const locale = 'ro'

        return (
            <DatePicker
                locale={locale}
                months={MONTHS[locale]}
                weekdaysLong={WEEKDAYS_LONG[locale]}
                weekdaysShort={WEEKDAYS_SHORT[locale]}
                firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
                labels={LABELS[locale]}
                fromMonth={new Date()}
                selectedDays={selectedDay}
                onDayClick={handleDayClick}
            />
        )
    }

    return (
        <Popover position={Position.BOTTOM} content={Content}>
            <div>
                <Button intent={isDanger ? 'danger' : 'default'} iconBefore={CalendarIcon}>{value || title}</Button>
            </div>
        </Popover>
    )
}

export default HeroDateSelector