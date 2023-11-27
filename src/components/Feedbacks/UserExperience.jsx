import { Avatar } from "../Chat/Avatar";
import { Feedback } from "./Feedback";
import { askingQuality, redoAskingQuality } from "../../constants/feedback";
import { useSelector } from 'react-redux';
import { GlobalColContainer } from "../Global/GlobalColContainer";
import { GlobalRowContainer } from "../Global/GlobalRowContainer";

const	AskingResponseQuality = ({ tabsLen }) => {
	return (
		<div className='streaming fr-mb-2w fr-p-3v fr-ml-3v'>
			<div>{tabsLen > 1 ? redoAskingQuality : askingQuality}</div>
		</div>
	);
}

export function UserExperience({ isArchive }) {
	const	stream = useSelector((state) => state.stream);
	const	tabsLen = stream.historyStream.length;

	return (
		<>
			{stream.activeTab === tabsLen && <div>
				<GlobalRowContainer>
					<Avatar
						user='agent'
					/>
					<AskingResponseQuality
						tabsLen={tabsLen}
					/>
				</GlobalRowContainer>
				<Feedback
					isFirst={tabsLen === 1}
					isArchive={isArchive}
				/>
			</div>}
		</>
	);
}