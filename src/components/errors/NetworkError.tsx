import { IllustrationCard } from '@abdulrhmangoni/am-store-library'

export default function NetworkError() {
    return (
        <IllustrationCard
            title="Network Error"
            illustratorType="network"
            message="There is problem in your network, please check your internet"
            withRefreshButton fullPage
        />
    )
}
