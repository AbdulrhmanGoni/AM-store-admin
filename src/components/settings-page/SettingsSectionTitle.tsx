import { JSX } from 'react'
import PageTitle from '../PageTitle'

interface SettingsSectionTitleProps {
    title: string,
    icon: JSX.Element
}

export default function SettingsSectionTitle({ title, icon }: SettingsSectionTitleProps) {
    return (
        <PageTitle
            title={title}
            description=""
            containerSX={{ mb: { md: -1 }, mt: 1, "& > h5": { mb: 0, fontSize: "1.3rem" } }}
            icon={icon}
            iconSize={20}
        />
    )
}
