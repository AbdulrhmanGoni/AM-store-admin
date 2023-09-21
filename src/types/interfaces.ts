
interface submetEvent {
    preventDefault: () => void,
    currentTarget: HTMLFormElement | undefined
}

interface PromiseState {
    isError?: boolean,
    isLoading?: boolean,
}


export type { submetEvent, PromiseState }