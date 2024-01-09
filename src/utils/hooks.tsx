import { chatUrl, getChatsUrl, streamUrl } from "../constants/api"
import { EventSourcePolyfill } from "event-source-polyfill"
import { setHeaders, setUserQuestion } from "./setData"
import { onCloseStream } from "./eventsEmitter"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, Question, RootState } from "../../types"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useFetch = async (url: string, method: string, props) => {
	const { data, headers } = props
	const credentials = "include"

	try {
		const response = await fetch(url, {
			method: method,
			credentials: credentials,
			headers,
			body: data === undefined ? "" : data,
		})

		if (url.includes("start")) return response
		else {
			const jsonData = await response.json()

			return jsonData
		}
	} catch (error) {
		console.error("An error occurred: ", error)

		return error
	}
}

function handleStreamMessage(e, dispatch, stream_chat) {
	try {
		const jsonData = JSON.parse(e.data)

		if (jsonData == "[DONE]") {
			stream_chat.close()

			return dispatch({ type: "STOP_AGENT_STREAM" })
		} else {
			return dispatch({ type: "GET_AGENT_STREAM", nextResponse: jsonData })
		}
	} catch (error) {
		console.error("An error occurred: ", error)

		return error
	}
}

function handleStreamError(e, stream_chat) {
	if (stream_chat) {
		stream_chat.close()

		return stream_chat
	}
}

/*
 **	Manage stream
 */
export const useStream = async (dispatch, id: number) => {
	const stream_chat = new EventSourcePolyfill(`${streamUrl}/${id}/start`, {
		headers: setHeaders(true),
		withCredentials: true,
	})

	dispatch({ type: "RESET_AGENT_STREAM" })
	stream_chat.onmessage = function (e) {
		handleStreamMessage(e, dispatch, stream_chat)
	}
	stream_chat.onerror = function (e) {
		handleStreamError(e, stream_chat)
	}
	onCloseStream(() => {
		if (stream_chat) {
			stream_chat.close()
		}
		dispatch({ type: "SET_INITIAL_STREAM" })
		dispatch({ type: "RESET_USER" })
	})
}

/*
 **  Generates new stream from a chatId
 */
export async function generateStream(question: Question, dispatch, chatId: number) {
	const headers = setHeaders(false)
	const stream_data = setUserQuestion(question)
	const stream = await useFetch(streamUrl + `/chat/${chatId}`, "POST", {
		data: JSON.stringify(stream_data),
		headers,
	})
	dispatch({ type: "SET_STREAM_ID", nextStreamId: stream.id })

	return await useStream(dispatch, stream.id)
}