import styles from "./page.module.scss";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import MenuCard from "@/components/MenuCard";

export default function HomePage() {
	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<section className={styles["section"]}>
				<header>
					<h1 className="sr-only">Dobble Go</h1>
					<div className={styles["logo"]}>
						<Logo />
					</div>
				</header>
				<Menu />
			</section>
			<aside>
				<MenuCard />
			</aside>
		</main>
	);
}
