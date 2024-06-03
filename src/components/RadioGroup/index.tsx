import styles from "./index.module.scss";

type Props = {
	options: {
		value: string;
		label?: React.ReactNode;
	}[];
	activeValue: string;
	onChange: (value: string) => void;
};

export default function RadioGroup({ options, activeValue, onChange }: Props) {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		onChange(value);
	}

	return (
		<div className={styles["radio-group"]}>
			{options.map(({ value, label }) => (
				<label
					key={value}
					className={styles["label"]}
				>
					<input
						className={styles["input"]}
						type="radio"
						name="radio-group"
						checked={value === activeValue}
						onChange={handleChange}
					/>
					{label && <span className={styles["label-text"]}>{label}</span>}
				</label>
			))}
			<div
				className={styles["active-indicator"]}
				style={
					{
						"--offset-x": `${options.findIndex(({ value }) => value === activeValue) * 100}%`,
					} as React.CSSProperties
				}
			/>
		</div>
	);
}
