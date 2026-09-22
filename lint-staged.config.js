module.exports = {
	'*.{js,jsx,ts,tsx,json,jsonc}': ['biome check --write --no-errors-on-unmatched'],
	'*.{css,md}': ['biome format --write --no-errors-on-unmatched']
};
