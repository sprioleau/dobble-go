import styles from "./index.module.scss";

import OutlinedText from "@/components/OutlinedText";

const scores = [
	{ name: "Kira", points: 129 },
	{ name: "Femi", points: 119 },
	{ name: "Ada", points: 88 },
];

export default function LeaderboardTable() {
	return (
		<table className={styles["table"]}>
			<thead>
				<tr>
					<th>
						<OutlinedText>Name</OutlinedText>
					</th>
					<th>
						<OutlinedText>Score</OutlinedText>
					</th>
				</tr>
			</thead>
			<tbody>
				{scores.map(({ name, points }, index) => (
					<tr key={name}>
						<td>
							<OutlinedText>{`${index + 1}. ${name}`}</OutlinedText>
						</td>
						<td>
							<OutlinedText>{points}</OutlinedText>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
