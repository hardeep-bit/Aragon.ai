import config from "config";
import mongoose from "mongoose";

const databaseConfig = config.get('database');

export default () => {
	const { app } = global;
	const db = mongoose.connection;

	// listeners
	db.on('connected', () => {
		console.info('DB Connected');
		app.emit('dbConnected');
	});

	db.on('error', (err) => {
		throw ('Mongoose default connection error: ' + err);
	});

	db.on('disconnected', () => {
		console.info('Again going to connect DB');
		connect(false);
	});

	const connect = () => {
		mongoose.connect(databaseConfig.url, { useNewUrlParser: true });
	};

	connect();
};