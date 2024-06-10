import { useEffect } from "react";
import { AudioLoadOptions, useAudioPlayer } from "react-use-audio-player";

export default function useSound(src: string, options?: AudioLoadOptions) {
	const audioPlayer = useAudioPlayer();

	useEffect(() => {
		audioPlayer.load(src, { html5: true, ...options });
		return () => audioPlayer.cleanup();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return audioPlayer;
}
