import { UserChatTools } from '../User/UserChatTools'
import { Avatar } from './Avatar'

export function AvatarToolsContainer() {
  return (
    <div>
      <div className="w-fit bg-red-500">
        <Avatar user="agent" />
      </div>
      <UserChatTools isArchive={false} />
    </div>
  )
}
