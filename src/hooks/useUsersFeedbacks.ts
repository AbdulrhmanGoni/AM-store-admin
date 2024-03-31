import { useSlicedFetch, useWhenElementAppears } from '@abdulrhmangoni/am-store-library';
import host from '../CONSTANTS/API_hostName';
import useEventSource from './useEventSource';
import { useEffect } from 'react';

export interface UserFeedback {
    _id: string,
    subject: string,
    body: string,
    createdAt: string,
    userData?: {
        userName: string,
        avatar: string
    },
}

export default function useUsersFeedbacks() {

    const useSlicedFetchOptions = {
        autoFetchingFirstSlice: true,
        itemsIdPropertyName: "_id",
        isAdminsRequest: true
    }
    const url = `${host}/feedbacks`
    const {
        data: feedbacks,
        getNextSlice,
        isLoading,
        isError,
        addNewItem,
        deleteItem: deleteFeedback,
        refetch
    } = useSlicedFetch<UserFeedback>(url, "feedbacks", useSlicedFetchOptions);

    useWhenElementAppears("lastFeedbackId", getNextSlice)

    const feedbacksEventSource = useEventSource("feedbacks/receive-sse");

    function newFeedbacksHandler(event: MessageEvent<string>) {
        if (event.data) {
            const feedback = JSON.parse(event.data) as UserFeedback
            addNewItem(feedback, feedback._id);
        }
    }

    useEffect(() => {
        const eventSource = feedbacksEventSource()
        eventSource.addEventListener("message", newFeedbacksHandler)
        return () => { eventSource.close() }
    }, [])

    return {
        feedbacks,
        getNextSlice,
        isLoading,
        isError,
        refetch,
        deleteFeedback
    }
}
