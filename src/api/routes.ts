const apiUrl = `${import.meta.env.VITE_API_URL}/api/v2`

export const apiBase = apiUrl
export const streamUrl = apiBase + '/stream'
export const chatUrl = apiBase + '/chat'
export const getChatsUrl = apiBase + '/chats?desc=true'
export const getStreamsUrl = apiBase + '/chat/archive'
export const indexesUrl = apiBase + '/indexes'
export const institutionsUrl = apiBase + '/institutions'
export const signinUrl = apiBase + '/sign_in'
export const signoutUrl = apiBase + '/sign_out'
export const resetPasswordMailUrl = apiBase + '/send_reset_password_email'
export const resetPasswordUrl = apiBase + '/reset_password'
export const userUrl = apiBase + '/user/me'
export const contactUrl = apiBase + '/user/contact'
export const feedbackUrl = apiBase + '/feedback/add'
export const getSheetsUrl = apiBase + '/get_sheets'
export const getChunksUrl = apiBase + '/get_chunks'