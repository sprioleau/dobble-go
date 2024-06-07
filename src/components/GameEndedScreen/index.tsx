import Button from "../Button";
import OutlinedText from "../OutlinedText";

type Props = {
	restart: () => void;
};

export default function GameEndedScreen({ restart }: Props) {
	return (
		<>
			<p>
				<OutlinedText>Finished!</OutlinedText>
			</p>
			<Button onClick={restart}>Restart</Button>
		</>
	);
}
