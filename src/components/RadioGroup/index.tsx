import styles from "./index.module.scss";

type Props<TValue> = {
	options: {
		value: TValue;
		label?: React.ReactNode;
	}[];
	activeValue: TValue;
	onChange: (value: TValue) => void;
};

export default function RadioGroup<TValue extends string>({ options, activeValue, onChange }: Props<TValue>) {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value as TValue;
		onChange(value);
	}

	return (
		<div
			className={styles["radio-group"]}
			style={{ "--items-count": options.length } as React.CSSProperties}
		>
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
						value={value}
						onChange={handleChange}
					/>
					{label && label}
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
