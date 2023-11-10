export function	TagSheets(props) {
	const	{ sheetId } = props;
	const	tags = ['Allocations destinées aux familles', 'Particulier', sheetId];

	return (
		<div className="wrap-message">
			{tags.map((tag, index) => {
				return <div className="sheets-tags" key={index}>
					{tag}
				</div>
			})}
		</div>
	);
}