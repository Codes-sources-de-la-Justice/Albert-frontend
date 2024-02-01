import { ArchiveType } from 'types'
import { GlobalRowContainer } from '../Global/GlobalRowContainer'
import { MeetingAdditionalResponse } from './MeetingAdditionalResponse'
import { MeetingMainResponse } from './MeetingMainResponse'

/*
 *	Contains text response from the bot and additional informations like sheets and chunks, useful links
 */
export function MeetingResponse({ archive }: { archive: ArchiveType | undefined }) {
  return (
    <GlobalRowContainer extraClass="fr-grid-row--center">
      <MeetingMainResponse archive={archive} />
      <MeetingAdditionalResponse archive={archive} />
    </GlobalRowContainer>
  )
}