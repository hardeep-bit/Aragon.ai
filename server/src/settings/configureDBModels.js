import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';

export default async () => {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const { app } = global;

	await Promise.all(
		fs.readdirSync(path.join(__dirname, '../models'))
			.filter(file => file.endsWith('.js'))
			.map(async (file) => {
				const modelPath = path.join(__dirname, '../models', file);
				await import(modelPath);
			})
	);

	app.db = mongoose.models;
	return app;
};
