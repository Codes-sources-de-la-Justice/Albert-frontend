import { archiveTabsTitle } from "../../utils/manageTabs";

export function DisplayArchiveHead() {
	
    return <thead>
		<tr>
			{archiveTabsTitle.map((title, index) => {
				return <th key={index} className="archive-tabs-title fr-p-2w">
					{title.name}
				</th>
			})}
		</tr>
	</thead>
}