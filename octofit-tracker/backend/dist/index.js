"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        apiPort: port,
        apiBaseUrl,
        mongoUri,
    });
});
app.get('/api/users/', async (_request, response) => {
    response.json(await models_1.User.find().lean());
});
app.get('/api/teams/', async (_request, response) => {
    response.json(await models_1.Team.find().lean());
});
app.get('/api/activities/', async (_request, response) => {
    response.json(await models_1.Activity.find().lean());
});
app.get('/api/leaderboard/', async (_request, response) => {
    response.json(await models_1.LeaderboardEntry.find().sort({ rank: 1 }).lean());
});
app.get('/api/workouts/', async (_request, response) => {
    response.json(await models_1.Workout.find().lean());
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start OctoFit backend', error);
        process.exit(1);
    }
}
void startServer();
