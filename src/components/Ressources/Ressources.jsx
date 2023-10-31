import { askingSpecificDocumentation } from "../../constants/ressources";
import { DisplayRessources } from "./DisplayRessources";
import { QuestionnaireBot } from "../Global/QuestionnaireBot";
import { NOT_SET } from "../../constants/status";
import { useSelector } from "react-redux";

export function Ressources({ archive }) {
	const	user = useSelector((state) => state.user);
	const	ressources = useSelector((state) => state.ressources);

	return (
		<div>
			{ressources.isConfirmed != NOT_SET && archive === NOT_SET ?
				<></>
				:
				<div className="col-message">
					<QuestionnaireBot
						id='ressources'
						question={askingSpecificDocumentation}
						type={'sheets'}
						archive={archive}
					/>
					<div className="user-feedback-container">
						{!user.choices.ressources && <DisplayRessources archive={archive}/>}
					</div>
				</div>
			}
		</div>
	);
}