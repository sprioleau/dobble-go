export default function getDuplicateItems(array: number[]) {
	return array.filter((item, index) => array.indexOf(item) !== index);
}
