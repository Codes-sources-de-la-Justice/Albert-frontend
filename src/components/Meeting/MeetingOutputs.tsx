import Pagination from '@codegouvfr/react-dsfr/Pagination'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import type { ArchiveType, Chunk, RootState, WebService } from 'types'
import {
  meetingAppointmentInformations,
  meetingAppointmentTitle,
} from '../../constants/meeting'
import { CurrQuestionContext } from '../../utils/context/questionContext'
import { rmContextFromQuestion } from '../../utils/setData'
import { GlobalParagraph } from '../Global/GlobalParagraph'
import { GlobalSubtitle } from '../Global/GlobalSubtitle'
import { GlobalTitle } from '../Global/GlobalTitle'
import { MeetingResponse } from './MeetingResponse'
import { UsefulLinks } from './UsefulLinks'

/*****************************************************************************************************
	Displays Albert's response and the modify button
  Archive is undefined when the user is not on an archive

	GENERAL: display:
		- main informations: user prompt, stream response, response explanation / chunks
		- additional informations: sheets, related questions, webservices

	-----------------------------------------------------------------------------------------------

	**	archive: meeting page is not editable when the user is on an archive

 *****************************************************************************************************/

export function MeetingOutputs({
  archive,
}: {
  archive?: ArchiveType
}) {
  const { currQuestion } = useContext(CurrQuestionContext)
  const user = useSelector((state: RootState) => state.user)

  const [query, setQuery] = archive
    ? useState(archive.query)
    : useState<string>(currQuestion.query)

  useEffect(() => {
    rmContextFromQuestion(query, setQuery)
  }, [])

  return (
    <div className="ft-container">
      <GlobalTitle>{meetingAppointmentTitle}</GlobalTitle>
      <GlobalSubtitle>{meetingAppointmentInformations}</GlobalSubtitle>
      <GlobalParagraph>{query}</GlobalParagraph>
      {user.history.length > 0 && (
        <DisplayResponse
          chunks={user.history[0].chunks}
          response={user.history[0].response}
          webservices={user.history[0].webservices}
        />
      )}
      <History />
      <MeetingResponse archive={archive} />
    </div>
  )
}

/**
 * Display a list of accordion, each one contains a user query and the bot's response with sources and useful links
 */
function History() {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      {user.history.map(
        (h, index) =>
          index !== 0 && (
            <div className="mb-5" key={index}>
              <h3 className="fr-background-alt--blue-france text-ellipsis">
                <button
                  className="fr-accordion__btn text-black text-ellipsis"
                  aria-expanded="false"
                  aria-controls={`history-${index}`}
                >
                  <p className="text-ellipsis overflow-hidden whitespace-nowrap block">
                    {h.query}
                  </p>
                </button>
              </h3>
              <div className="fr-collapse" id={`history-${index}`}>
                <DisplayResponse
                  chunks={h.chunks}
                  response={h.response}
                  webservices={h.webservices}
                />
              </div>
            </div>
          )
      )}
    </>
  )
}

function DisplayResponse({
  chunks,
  response,
  webservices,
}: { chunks: Chunk[]; response: string; webservices: WebService[] }) {
  return (
    <>
      <DisplaySourceCards chunks={chunks} />
      <div className="fr-grid-row">
        <div className="flex flex-col fr-col-sm-8">
          <div className="text-xl font-bold">Synthèse par Albert</div>
          <GlobalParagraph>{response}</GlobalParagraph>
        </div>
        <UsefulLinks webservices={webservices} extraClass="fr-col-sm-4" />
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
      <div className="flex flex-col md:flex-row justify-between fr-mt-1w items-center w-full">
        <h6 className="text-xl font-bold">Sources de réponses</h6>
        <Pagination
          count={Math.ceil(chunks.length / 3)}
          defaultPage={currentPage}
          getPageLinkProps={getPageLinkProps}
          className="fr-mt-3v"
        />
      </div>
      <div className="fr-grid-row fr-mt-2v fr-mb-2w gap-2">
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
  return (
    <div className=" fr-col-12 fr-col-sm-4 border border-[rgba(221, 221, 221, 1)] fr-px-4w fr-py-2w max-w-[392px]">
      <h4 className=" ">{title}</h4>
      <p className=" line-clamp-3">{text}</p>
      <a
        className="line-clamp-1 font-bold mt-auto bottom"
        style={{ backgroundImage: 'none', textDecoration: 'none' }}
        href={url}
      >
        {url}
      </a>
    </div>
  )
}
