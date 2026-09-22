import { useState } from 'react';
import type { IProductSheetContentProps } from './ProductSheetContentTypes';

export function useProductSheetContentController({ product, onAdd }: IProductSheetContentProps) {
	const [quantity, setQuantity] = useState(1);
	const [notes, setNotes] = useState('');

	function handleIncrease() {
		setQuantity((current) => current + 1);
	}

	function handleDecrease() {
		setQuantity((current) => Math.max(1, current - 1));
	}

	function handleChangeNotes(value: string) {
		setNotes(value);
	}

	function handleAdd() {
		onAdd({ quantity, notes: notes.trim() || null });
	}

	return {
		quantity,
		notes,
		totalCents: product.priceCents * quantity,
		handleIncrease,
		handleDecrease,
		handleChangeNotes,
		handleAdd
	};
}
