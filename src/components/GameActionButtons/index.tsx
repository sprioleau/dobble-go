import styles from "./index.module.scss";

import Pause from "@/components/Icons/Pause";
import Play from "@/components/Icons/Play";
import RotationOff from "@/components/Icons/RotationOff";
import RotationOn from "@/components/Icons/RotationOn";
import SoundOff from "@/components/Icons/SoundOff";
import SoundOn from "@/components/Icons/SoundOn";

type Props = {
	isPaused: boolean;
	isSoundOn: boolean;
	isCardRotationOn: boolean;
	onTogglePlayPause: () => void;
	onToggleSoundOnOff: () => void;
	onToggleCardRotationOnOff: () => void;
};

export default function GameActionButtons({
	isPaused,
	isSoundOn,
	isCardRotationOn,
	onTogglePlayPause,
	onToggleSoundOnOff,
	onToggleCardRotationOnOff,
}: Props) {
	return (
		<div className={styles["game-action-buttons"]}>
			<div>
				<button
					title={isPaused ? "Play" : "Pause"}
					className={styles["action-button"]}
					onClick={onTogglePlayPause}
				>
					{isPaused ? <Play /> : <Pause />}
				</button>
				<button
					title={!isSoundOn ? "Unmute" : "Mute"}
					className={styles["action-button"]}
					onClick={onToggleSoundOnOff}
				>
					{isSoundOn ? <SoundOff /> : <SoundOn />}
				</button>
				<button
					title={!isCardRotationOn ? "Enable Rotation" : "Disable Rotation"}
					className={styles["action-button"]}
					onClick={onToggleCardRotationOnOff}
				>
					{isCardRotationOn ? <RotationOff /> : <RotationOn />}
				</button>
			</div>
		</div>
	);
}
