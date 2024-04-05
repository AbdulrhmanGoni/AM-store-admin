import { IllustrationCard } from '@abdulrhmangoni/am-store-library'

export default function UnexpectedError() {
    return (
        <IllustrationCard
            title="Unexpected Error"
            illustratorType="unexpected"
            message="There is unexpected happends, refrech the page and try again"
            fullPage withRefreshButton
        />
    )
}