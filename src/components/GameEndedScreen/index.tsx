import styles from "./index.module.scss";

import Button from "../Button";
import OutlinedText from "../OutlinedText";

type Props = {
	shouldDisplayTimeExpiredMessage: boolean;
	restart: () => void;
};

export default function GameEndedScreen({ shouldDisplayTimeExpiredMessage, restart }: Props) {
	return (
		<div className={styles["game-ended-screen"]}>
			<p>
				<OutlinedText>{shouldDisplayTimeExpiredMessage ? "Time's up!" : "Finished!"}</OutlinedText>
			</p>
			<Button onClick={restart}>Restart</Button>
		</div>
	);
}
