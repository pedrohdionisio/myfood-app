import { toCuisineLabel } from './toCuisineLabel';

describe('toCuisineLabel', () => {
	it('should join the cuisine names with a dot', () => {
		expect(
			toCuisineLabel([
				{ id: 'cuisine-1', slug: 'italiana', name: 'Italiana' },
				{ id: 'cuisine-2', slug: 'pizza', name: 'Pizza' }
			])
		).toBe('Italiana · Pizza');
	});
});
