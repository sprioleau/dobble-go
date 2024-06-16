import { useEffect } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";

export default function useSound(src: string, options?: AudioLoadOptions) {
	const audioPlayer = useAudioPlayer();

	useEffect(() => {
		function handleUserInteraction() {
			audioPlayer.load(src, {
				html5: true,
				initialVolume: 0.5,
				onload: () => {
					window.removeEventListener("click", handleUserInteraction);
				},
				...options,
			});
		}

		window.addEventListener("click", handleUserInteraction);

		return () => {
			window.removeEventListener("click", handleUserInteraction);
			audioPlayer.cleanup();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return audioPlayer;
}
