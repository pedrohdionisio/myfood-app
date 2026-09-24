import { createReviewSchema } from './createReviewSchema';

describe('createReviewSchema', () => {
	it('should leave an empty comment out', () => {
		expect(createReviewSchema.parse({ rating: 5, comment: '   ' })).toEqual({
			rating: 5,
			comment: undefined
		});
	});

	it('should reject a missing rating and a too short comment', () => {
		const result = createReviewSchema.safeParse({ rating: 0, comment: 'ok' });

		expect(result.error?.issues.map((issue) => issue.message)).toEqual([
			'Escolha uma nota de 1 a 5',
			'Escreva pelo menos 3 caracteres'
		]);
	});
});
