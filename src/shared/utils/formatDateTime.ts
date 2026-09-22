const formatter = new Intl.DateTimeFormat('pt-BR', {
	day: '2-digit',
	month: '2-digit',
	hour: '2-digit',
	minute: '2-digit'
});

export function formatDateTime(isoDate: string) {
	return formatter.format(new Date(isoDate));
}
