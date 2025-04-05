import {
	generate
} from 'express-app-generator';
import config from "config";
import cors from "cors";

const serverConfig = config.get('server');
const pid = process.pid;

const addConfigurations = app => {
	app.use(cors());
};

const generateExpress = () => {
	return new Promise((res, rej) => {
		generate(serverConfig.port, '/src/apis', (err, app, server) => {
			if (err) return rej(err);
			console.log(`listening on ${serverConfig.port}`);
			console.log(`Started Process ${pid}`);
			addConfigurations(app);
			global.app = app;
			return res({ app, server });
		});
	});
};

const expressSettings = async () => {
	return await generateExpress();
};

export default expressSettings;