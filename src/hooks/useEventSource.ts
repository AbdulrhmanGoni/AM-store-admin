import useApiRequest from "./useApiRequest";
import host from "../CONSTANTS/API_hostName";
import { EventSource } from 'extended-eventsource';

export default function useEventSource(sourcePath: string) {

    const { headers } = useApiRequest();

    return function () {
        const eventSource = new EventSource(`${host}/${sourcePath}`, {
            headers: { ...headers, 'Content-Type': 'text/event-stream' }, retry: 25000
        });
        return eventSource
    }
}