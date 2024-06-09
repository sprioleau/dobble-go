import Logo from "@/components/Logo";
import styles from "./page.module.scss";
import OutlinedText from "@/components/OutlinedText";
import BackToMenuPageLink from "@/components/BackToMenuPageLink";

const instructions = [
	"Find the symbol that exists on both cards. There is only 1.",
	"Select that symbol on either card to reveal the next card.",
	"Continue selecting symbols until there are no more cards left.",
	"Selecting the wrong symbol will remove a point from your score, so be as fast an accurate as possible.",
];

export default function HowToPlayPage() {
	const fontSize = "2rem";

	return (
		<main
			className={styles.main}
			data-background="pink"
		>
			<Logo />
			<ol className={styles.list}>
				{instructions.map((instruction) => (
					<li
						key={instruction}
						style={{ fontSize }}
					>
						<OutlinedText fontSize={fontSize}>{instruction}</OutlinedText>
					</li>
				))}
			</ol>
			<BackToMenuPageLink />
		</main>
	);
}
