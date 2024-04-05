import { IllustrationCard } from '@abdulrhmangoni/am-store-library'

export default function BadRequest() {
    return (
        <IllustrationCard
            title="Bad Request"
            illustratorType="unexpected"
            message="This Error happends may because of your network or because the server recived unexpected input"
            fullPage withRefreshButton
        />
    )
}
