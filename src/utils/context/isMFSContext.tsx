// This context keeps track of wether the user is browsing albert.etalab.gouv.fr or franceservices.etalab.gouv.fr
// because the front doesn't display the same content depending on the domain name

import { createContext, useState } from "react"

export const isMFSContext = createContext<boolean>(
	import.meta.env.VITE_API_URL === "https://franceservices.etalab.gouv.fr/api/v2"
)

export const MFSProvider = ({ children }) => {
	const [isMFS, setIsMFS] = useState<boolean>(
		import.meta.env.VITE_API_URL === "https://franceservices.etalab.gouv.fr/api/v2"
	)
	return <isMFSContext.Provider value={isMFS}>{children}</isMFSContext.Provider>
}
