import { IllustrationCard } from '@abdulrhmangoni/am-store-library'

export default function ServerError() {
    return (
        <IllustrationCard
            title="Server Error"
            illustratorType="server"
            message="There is unexpected error happends in our server"
            fullPage withRefreshButton
        />
    )
}
