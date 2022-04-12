import React from 'react'
import { Button, Pane, Position, SelectMenu } from 'evergreen-ui'
import { FaSuitcaseRolling as CompanyIcon } from 'react-icons/fa'

import type { CompanyType } from '../interfaces'

type CompanySelectorProps = {
    companies: CompanyType[]
    title: string
    className?: string
    isInvalid?: boolean
    onChange: (selecteCompany: CompanyType) => void
}

const CompanySelector: React.FC<CompanySelectorProps> = ({ companies, title, className, onChange }) => {
    const [value, setValue] = React.useState('')
    const [id, setId] = React.useState(NaN)

    return (
        <Pane className={`${className || ''} company-selector`}>
            <SelectMenu
                title={title}
                options={companies.map((company) => ({
                    label: company.name,
                    value: `${company.id}`
                }))}
                position={Position.BOTTOM}
                selected={`${id}`}
                filterPlaceholder="Caută o companie"
                onSelect={(selected) => {
                    const company = companies.find((c) => `${c.id}` === selected.value)
                    if (!company) {
                        return
                    }

                    setId(company.id)
                    setValue(company.name)
                    onChange(company)
                }}
                onDeselect={() => {
                    setId(NaN)
                    setValue('')
                }}
            >
                <Button size="large" iconBefore={CompanyIcon}>{value || title}</Button>
            </SelectMenu>
        </Pane>
    )
}

export default CompanySelector