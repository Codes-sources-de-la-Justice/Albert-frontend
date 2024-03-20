import Pagination from '@codegouvfr/react-dsfr/Pagination'
import type { Chunk, RootState, UserHistory, WebService } from '@types'
import Separator from 'components/Global/Separator'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '@constants/meeting'
import { CurrQuestionContext } from '@utils/context/questionContext'
import { rmContextFromQuestion } from '@utils/setData'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { MeetingCurrentResponse } from './MeetingCurrentResponse'
import { UsefulLinks } from './UsefulLinks'
import { useFetch } from '@utils/hooks'
import { streamUrl } from '@api'

/*****************************************************************************************************
    Displays Albert's response and the modify button
    Archive is undefined when the user is not on an archive

    GENERAL: display:
      - main informations: user prompt, stream response, response explanation / chunks
      - additional informations: sheets, related questions, webservices

    -----------------------------------------------------------------------------------------------

    **	archive: meeting page is not editable when the user is on an archive

  *****************************************************************************************************/

export function MeetingOutputs() {
  const { currQuestion } = useContext(CurrQuestionContext)
  const user = useSelector((state: RootState) => state.user)

  const [query, setQuery] = useState<string>(currQuestion.query)

  useEffect(() => {
    rmContextFromQuestion(query, setQuery)
  }, [])

  return (
    <div className="ft-container ">
      <div className="fr-mb-5w ">
        <h2 className="fr-my-2w">{meetingAppointmentTitle}</h2>
        {/*         <h5>{meetingAppointmentInformations}</h5>
          <GlobalParagraph extraClass="fr-background-alt--blue-france fr-p-2w">
            {query}
          </GlobalParagraph> */}
      </div>
      {/*       {user.history.length > 0 && (
          <DisplayResponse
            chunks={user.history[0].chunks}
            response={user.history[0].response}
            webservices={user.history[0].webservices}
          />
        )} */}
      <History history={user.history} />
      <MeetingCurrentResponse />
    </div>
  )
}

/**
 * Display a list of accordion, each one contains a user query and the bot's response with sources and useful links
 */
export function History({ history }: { history: UserHistory[] }) {
  const [openedAccordion, setOpenedAccordion] = useState(-1)
  return (
    <div className="fr-mt-5w">
      {history.map((h, index) => (
        <div className="fr-mb-1w " key={index}>
          <h3 className="fr-background-alt--blue-france">
            <button
              className="fr-accordion__btn text-black "
              aria-expanded="false"
              aria-controls={`history-${index}`}
              onClick={() => setOpenedAccordion((prev) => (prev === -1 ? index : -1))}
            >
              <p
                className={`${
                  openedAccordion === index
                    ? ''
                    : 'text-ellipsis overflow-hidden whitespace-nowrap block'
                } fr-text--lg`}
              >
                {h.query}
              </p>
            </button>
          </h3>
          <div className="fr-collapse" id={`history-${index}`}>
            <div className="fr-mb-2w">
              <DisplayResponse
                chunks={h.chunks}
                response={h.response}
                webservices={h.webservices}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Display the response of the bot with the sources and useful links
 */
export function DisplayResponse({
  chunks,
  response,
  webservices,
}: { chunks: Chunk[]; response: string; webservices: WebService[] }) {
  return (
    <>
      <DisplaySourceCards chunks={chunks} />
      <div className="fr-grid-row fr-mt-5w">
        <div
          className={webservices && webservices.length ? `fr-col-sm-8` : 'fr-col-sm-12'}
        >
          <h3>Réponse proposée par Albert</h3>
          <GlobalParagraph extraClass="fr-mr-3w">{response}</GlobalParagraph>
        </div>
        {webservices && webservices.length > 0 && (
          <UsefulLinks webservices={webservices} extraClass="fr-col-sm-4" />
        )}
        <Separator extraClass="fr-mt-5w" />
      </div>
    </>
  )
}

/**
 * Display an array of chunks in cards with a pagination
 */
export function DisplaySourceCards({ chunks }: { chunks: Chunk[] }) {
  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * 3
  const endIndex = startIndex + 3

  const getPageLinkProps = (pageNumber) => {
    const linkProps = {
      href: `#page-${pageNumber}`,
      title: `Page ${pageNumber}`,
      onClick: () => {
        setCurrentPage(pageNumber)
      },
    }

    return linkProps
  }
  return (
    <>
      <div className="fr-grid-row fr-col-12 justify-between fr-mt-1w items-center w-full ">
        <h3 className=" fr-mb-3v">Sources utilisées pour générer la réponse</h3>
        <Pagination
          count={Math.ceil(chunks.length / 3)}
          defaultPage={currentPage}
          getPageLinkProps={getPageLinkProps}
          className="fr-mt-3v"
        />
      </div>
      <div className="fr-grid-row fr-col-12 fr-mb-2w gap-2">
        {chunks.slice(startIndex, endIndex).map((c, index) => (
          <SourceCard key={`chunk-${index}`} title={c.title} text={c.text} url={c.url} />
        ))}
      </div>
    </>
  )
}

/**
 * A card that display the source of a response, we get informations for this from the chunks
 */
function SourceCard({ title, text, url }: { title: string; text: string; url: string }) {
  const domain = new URL(url).hostname.replace('www.', '')
  return (
    <div
      className="fr-col-12 fr-col-sm-4 border border-[rgba(221, 221, 221, 1)] fr-px-4w fr-py-2w max-w-[392px] fr-background-action--high-blue relative "
      style={{ position: 'relative' }}
    >
      <p className="font-bold line-clamp-2 fr-mb-2w ">{title}</p>
      <p className=" line-clamp-3 fr-mb-4w">{text}</p>
      <a
        className="font-bold mt-auto absolute bottom-0  fr-mb-2w no-external-link-icon "
        style={{ backgroundImage: 'none', textDecoration: 'none' }}
        href={url}
        rel="noopener noreferrer"
      >
        <Badge text={domain} />
      </a>
    </div>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <div className="fr-background-contrast--info fr-py-0.5v fr-px-2v  rounded">
      <p className="fr-text-action-high--blue-france">{text}</p>
    </div>
  )
}
