const formatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL'
});

export function formatPrice(cents: number) {
	return formatter.format(cents / 100);
}
