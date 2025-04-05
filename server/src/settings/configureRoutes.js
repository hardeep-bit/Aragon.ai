import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const files = fs.readdirSync(path.join(__dirname, '../routings'));

	for (const file of files) {
		if (file.endsWith('.js')) {
			const filePath = path.join(__dirname, '../routings', file);
			const modulePath = `file://${filePath}`;
			await import(modulePath);
		}
	}
};
