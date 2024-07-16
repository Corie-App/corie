export const cn = (...inputs: string[]) => {
	return inputs.filter(Boolean).join(' ');
};

export const generateUUID = (size: number = 16): string => {
	const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = 0; i < size; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
};
