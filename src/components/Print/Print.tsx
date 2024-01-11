import React, { useEffect, useState } from "react"
import { Button } from "@codegouvfr/react-dsfr/Button"
import ReactToPrint from "react-to-print"
import { Chatbot } from "../../pages/Chatbot"
import { MeetingPage } from "../Meeting/MeetingPage"
import { ArchiveType, Chat } from "../../../types"
import { useFetch } from "../../utils/hooks"
import { getStreamsUrl } from "../../constants/api"

/**********************************************************************************************
		
	**	Print selected archive thanks to ReactToPrint OR go back to Archive summary

 **********************************************************************************************/

interface PrintProps {
	selectedChat: Chat
	setArchiveTab: React.Dispatch<React.SetStateAction<number | null>>
}

export const Print = React.forwardRef<HTMLDivElement, PrintProps>(
	({ selectedChat, setArchiveTab }, ref) => {
		const handleClick = () => {
			setArchiveTab(null)
		}

		const [archive, setArchive] = useState<ArchiveType>()
		const token = localStorage.getItem("authToken")

		const getStreamsFromChat = async () => {
			const res = await useFetch(getStreamsUrl + `/${selectedChat.id}`, "GET", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: null,
			})

			console.log("res CELUI CI: ", res)

			setArchive(res.streams[res.streams.length - 1])
		}

		useEffect(() => {
			getStreamsFromChat()
		}, [])

		useEffect(() => {
			console.log("stream: ", archive)
		}, [archive])

		return (
			<>
				<div className="flex w-screen">
					<Button
						iconId="fr-icon-arrow-left-s-line-double"
						className="fr-mt-4w fr-ml-6w fr-mx-1w"
						onClick={handleClick}
						priority="tertiary"
					>
						{" "}
					</Button>
					<ReactToPrint
						trigger={() => (
							<Button iconId="fr-icon-printer-line" className="fr-mt-4w" priority="tertiary">
								{" "}
							</Button>
						)}
						content={() => (ref && "current" in ref ? ref.current : null)}
					/>
				</div>
				<div ref={ref as React.RefObject<HTMLDivElement>}>
					{/* {selectedChat.type === "qa" && <Chatbot archive={archive} />}
					{selectedChat.type === "meeting" && (
						<MeetingPage currQuestion={archive.messages[0].text} archive={archive} />
					)} */}
				</div>
			</>
		)
	}
)
