import Logo from "@/components/Logo";
import styles from "./page.module.scss";
import OutlinedText from "@/components/OutlinedText";
import BackToMenuPageLink from "@/components/BackToMenuPageLink";

export default function HowToPlayPage() {
	return (
		<main
			className={styles.main}
			data-background="pink"
		>
			<Logo />
			<ol className={styles.list}>
				<li>
					<OutlinedText>Find the symbol that exists on both cards. There is only 1.</OutlinedText>
				</li>
				<li>
					<OutlinedText>Select that symbol on either card to reveal the next card.</OutlinedText>
				</li>
				<li>
					<OutlinedText>Continue selecting symbols until there are no more cards left.</OutlinedText>
				</li>
				<li>
					<OutlinedText>
						Selecting the wrong symbol will remove a point from your score, so be as fast an accurate as possible.
					</OutlinedText>
				</li>
			</ol>
			<BackToMenuPageLink />
		</main>
	);
}
