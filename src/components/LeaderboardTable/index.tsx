import styles from "./index.module.scss";

import OutlinedText from "@/components/OutlinedText";
import { Score } from "@/db/types";

type Props = {
	leaderboardEntries: Score[];
};

export default function LeaderboardTable({ leaderboardEntries }: Props) {
	return (
		<>
			{leaderboardEntries.length === 0 ? (
				<OutlinedText>No entries</OutlinedText>
			) : (
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
						{leaderboardEntries.map(({ name, score, id }, index) => (
							<tr key={id}>
								<td>
									<OutlinedText>{`${index + 1}. ${name}`}</OutlinedText>
								</td>
								<td>
									<OutlinedText>{score}</OutlinedText>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</>
	);
}
