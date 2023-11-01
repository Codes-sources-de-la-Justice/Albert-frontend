import { NOT_SET } from "../../constants/status"

export const	initialQuestion = {
	model_name: "albert-light",
	mode: 'simple',
	query: '',
	limit: 0,
	user_text: '',
	context: '',
	institution: '',
	links: '',
	temperature: 20,
}

export const	initialUserChoices = {
	ressources: NOT_SET,
	sheets: NOT_SET,
	feedback: NOT_SET,
	newQuestion: NOT_SET,
	oldQuestion: NOT_SET,
}

export const	initialAuth = {
	username: '',
	email: '',
	userToken: '',
	isLogin: false,
	authFailed: false,
}

export const	initialStream = {
	response: [],
	historyStream: [],
	isStoppable: true,
	isStreaming: false,
}