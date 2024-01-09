import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup"
import { initButtonsLogin } from "../constants/connexion"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { signinUrl } from "../constants/api"
import { useFetch } from "../utils/hooks"
import { usernameOrPasswordError } from "../constants/errorMessages"
import { setUserInfos } from "../utils/manageConnexion"
import { LoginFields } from "../components/Auth/LoginFields"
import { loginFields } from "../constants/inputFields"
import { LoginContainer } from "../components/Auth/LoginContainer"
import { ButtonInformation } from "../components/Global/ButtonInformation"
import { UserAuth } from "src/utils/auth"

interface LoginProps {
	authFailed: boolean
	setAuthFailed: Dispatch<SetStateAction<boolean>>
	setUserAuth: Dispatch<SetStateAction<UserAuth>>
}

export function Login({ authFailed, setAuthFailed, setUserAuth }: LoginProps) {
	const [isDisable, setIsDisable] = useState(true)
	const [password, setPassword] = useState("")
	const [id, setId] = useState("")

	useEffect(() => {
		checkIfCompletedFields()
	}, [password])

	const checkIfCompletedFields = () => {
		if (password.length && ((id && id.length) || (password && password.length))) setIsDisable(false)
		else setIsDisable(true)
	}

	const handleChange = (e) => {
		e.preventDefault()

		if (e.target.name === "username") setId(e.target.value)
		if (e.target.name === "password") setPassword(e.target.value)

		checkIfCompletedFields()
	}

	const handleClick = async () => {
		// TODO: what if username contains @ ?
		const data = id.includes("@")
			? {
					email: id,
					password: password,
			  }
			: {
					username: id,
					password: password,
			  }

		setAuthFailed(false)

		const res = await useFetch(signinUrl, "POST", {
			data: JSON.stringify(data),
			headers: { "Content-Type": "application/json" },
		})

		if ((res.status && res.status !== 200) || !res.token) return setAuthFailed(true)

		return setUserInfos(res.token, setUserAuth)
	}

	return (
		<LoginContainer>
			<LoginFields fields={loginFields} handleChange={handleChange} />
			{authFailed && <ButtonInformation>{usernameOrPasswordError}</ButtonInformation>}
			<ButtonsGroup buttons={initButtonsLogin(handleClick, isDisable)} />
		</LoginContainer>
	)
}
