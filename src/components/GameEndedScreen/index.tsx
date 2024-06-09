import styles from "./index.module.scss";

import Button from "../Button";
import OutlinedText from "../OutlinedText";

type Props = {
	restart: () => void;
};

export default function GameEndedScreen({ restart }: Props) {
	return (
		<div className={styles["game-ended-screen"]}>
			<p>
				<OutlinedText>Finished!</OutlinedText>
			</p>
			<Button onClick={restart}>Restart</Button>
		</div>
	);
}
