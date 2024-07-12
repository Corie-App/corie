import { RuleConflict } from './types';

export function checkForRuleConflicts(allowlist: string[], blocklist: string[]): RuleConflict | null {
	const normalize = (path: string) => path.trim().replace(/\/+/g, '/').replace(/\/$/, '');

	for (const allowRule of allowlist) {
		const normalizedAllowRule = normalize(allowRule);

		for (const blockRule of blocklist) {
			const normalizedBlockRule = normalize(blockRule);

			if (isConflict(normalizedAllowRule, normalizedBlockRule)) {
				return {
					type: 'allowlist',
					allowRule,
					blockRule,
				};
			}
		}
	}

	return null;
}

function isConflict(allowRule: string, blockRule: string): boolean {
	if (blockRule === '') return true; // Root path blocks everything
	if (allowRule === blockRule) return true; // Exact match

	const allowParts = allowRule.split('/');
	const blockParts = blockRule.split('/');

	for (let i = 0; i < blockParts.length; i++) {
		if (blockParts[i] === '*') return true; // Wildcard in block rule
		if (i >= allowParts.length) return false; // Block rule is longer
		if (blockParts[i] !== allowParts[i]) return false; // Mismatch
	}

	return blockParts.length <= allowParts.length; // Block rule is a prefix of allow rule
}
