export interface IRatingInputProps {
	value: number;
	errorMessage?: string;
	onSelect: (rating: number) => void;
}
