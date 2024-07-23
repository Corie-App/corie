export class Logger {
	static log(message: string): void {
		if ((window as any).corieDebug) {
			console.log(message);
		} else {
			console.log(message);
		}
	}
}
