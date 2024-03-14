import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { ArchiveType, InitialFeedback, RootState } from '@types'
import { getChunksUrl } from '@api'
import { resultMeetingTitle } from '@constants/meeting'
import { useFetch } from '@utils/hooks'
import { setHeaders } from '@utils/setData'
import { Feedback } from '../Feedbacks/Feedback'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSecondaryTitle } from '../Global/GlobalSecondaryTitle'
import { GlobalStream } from '../Global/GlobalStream'
import Separator from 'components/Global/Separator'

/*****************************************************************************************

		** MeetingStream 
			Prints answer stream with GlobalStream
			
		** MeetingFeedback: set isGood & send feedback with thumbs icons
		** ResponseExplanation: display chunks associated to response

 *****************************************************************************************/
export function MeetingStream() {
  const stream = useSelector((state: RootState) => state.stream)
  const user = useSelector((state: RootState) => state.user)
  const agentResponse = stream.historyStream[0]
  const [chunks, setChunks] = useState([])
  const [feedback, setFeedback] = useState(InitialFeedback)

  useEffect(() => {
    if (!user.chunks.length) return

    setChunks(user.chunks)
  }, [user.chunks])
  return (
    <>
      <h3>Réponse proposée par Albert</h3>
      {stream.isStreaming ? (
        <GlobalStream response={stream.response} />
      ) : (
        <GlobalParagraph>{agentResponse}</GlobalParagraph>
      )}
      {/* [      {!stream.isStreaming && stream.historyStream.length !== 0 && <MeetingFeedback />}
] */}
      {!stream.isStreaming && stream.historyStream.length !== 0 && (
        <div className="fr-mt-5w ">
          <Feedback feedback={feedback} setFeedback={setFeedback} />
          <Separator extraClass="fr-mt-5w" />
        </div>
      )}
    </>
  )
}
