import { useState } from 'react';

export function usePasswordInputController() {
	const [isVisible, setIsVisible] = useState(false);

	function handleToggleVisibility() {
		setIsVisible((current) => !current);
	}

	return {
		isVisible,
		handleToggleVisibility
	};
}
