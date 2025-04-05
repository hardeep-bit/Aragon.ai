import express from "./settings/configureExpress.js";
import configureDBModels from "./settings/configureDBModels.js";
import configureRoutes from "./settings/configureRoutes.js";
import configureDB from "./settings/configureMongoDB.js";

const runAragonApp = () => {
	express()
		.then(({ app }) => {
			app.on('dbConnected', async function () {
				await configureDBModels();
				configureRoutes();
			});
			configureDB();
		}).catch(err => {
			console.log(err);
		});
}

runAragonApp();