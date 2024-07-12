export function splitPaths(input: string): string[] {
	// Use a regex that splits on commas, but not within quotes
	const paths = input.match(/(?:[^,"]|"(?:\\.|[^"])*")+/g) || [];

	return paths
		.map((path) => {
			// Trim whitespace and remove any surrounding quotes
			path = path.trim().replace(/^["']|["']$/g, '');
			// Ensure "/" is preserved
			return path === '' ? '/' : path;
		})
		.filter(Boolean);
}
