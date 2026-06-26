"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importStar(require("mongoose"));
const models_1 = require("../models");
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const teamIds = {
    cardioCrew: new mongoose_1.Types.ObjectId(),
    strengthSquad: new mongoose_1.Types.ObjectId(),
    flexForce: new mongoose_1.Types.ObjectId(),
};
const userIds = {
    maya: new mongoose_1.Types.ObjectId(),
    jordan: new mongoose_1.Types.ObjectId(),
    priya: new mongoose_1.Types.ObjectId(),
    theo: new mongoose_1.Types.ObjectId(),
};
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(mongoUri);
    await Promise.all([
        models_1.Activity.deleteMany({}),
        models_1.LeaderboardEntry.deleteMany({}),
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    await models_1.Team.insertMany([
        {
            _id: teamIds.cardioCrew,
            name: 'Cardio Crew',
            mascot: 'Lightning Octopus',
            coach: 'Alex Rivera',
            memberCount: 2,
        },
        {
            _id: teamIds.strengthSquad,
            name: 'Strength Squad',
            mascot: 'Iron Kraken',
            coach: 'Sam Chen',
            memberCount: 1,
        },
        {
            _id: teamIds.flexForce,
            name: 'Flex Force',
            mascot: 'Stretch Star',
            coach: 'Nina Patel',
            memberCount: 1,
        },
    ]);
    await models_1.User.insertMany([
        {
            _id: userIds.maya,
            username: 'maya_moves',
            displayName: 'Maya Johnson',
            email: 'maya.johnson@example.com',
            teamId: teamIds.cardioCrew,
            age: 29,
            fitnessGoal: 'Improve 10K race pace',
        },
        {
            _id: userIds.jordan,
            username: 'jord_lifts',
            displayName: 'Jordan Smith',
            email: 'jordan.smith@example.com',
            teamId: teamIds.strengthSquad,
            age: 34,
            fitnessGoal: 'Build full-body strength',
        },
        {
            _id: userIds.priya,
            username: 'priya_pace',
            displayName: 'Priya Desai',
            email: 'priya.desai@example.com',
            teamId: teamIds.cardioCrew,
            age: 26,
            fitnessGoal: 'Stay consistent with weekly activity',
        },
        {
            _id: userIds.theo,
            username: 'theo_flow',
            displayName: 'Theo Martins',
            email: 'theo.martins@example.com',
            teamId: teamIds.flexForce,
            age: 41,
            fitnessGoal: 'Increase mobility and core stability',
        },
    ]);
    await models_1.Activity.insertMany([
        {
            userId: userIds.maya,
            activityType: 'Running',
            durationMinutes: 42,
            caloriesBurned: 430,
            distanceMiles: 4.8,
            activityDate: new Date('2026-06-20T07:15:00.000Z'),
        },
        {
            userId: userIds.jordan,
            activityType: 'Strength Training',
            durationMinutes: 55,
            caloriesBurned: 390,
            activityDate: new Date('2026-06-21T18:30:00.000Z'),
        },
        {
            userId: userIds.priya,
            activityType: 'Cycling',
            durationMinutes: 47,
            caloriesBurned: 410,
            distanceMiles: 11.2,
            activityDate: new Date('2026-06-22T12:00:00.000Z'),
        },
        {
            userId: userIds.theo,
            activityType: 'Yoga',
            durationMinutes: 35,
            caloriesBurned: 160,
            activityDate: new Date('2026-06-23T06:45:00.000Z'),
        },
        {
            userId: userIds.maya,
            activityType: 'Swimming',
            durationMinutes: 38,
            caloriesBurned: 330,
            distanceMiles: 1.1,
            activityDate: new Date('2026-06-24T16:20:00.000Z'),
        },
    ]);
    await models_1.LeaderboardEntry.insertMany([
        {
            userId: userIds.maya,
            username: 'maya_moves',
            teamName: 'Cardio Crew',
            rank: 1,
            points: 1820,
            weeklyMinutes: 215,
        },
        {
            userId: userIds.priya,
            username: 'priya_pace',
            teamName: 'Cardio Crew',
            rank: 2,
            points: 1710,
            weeklyMinutes: 202,
        },
        {
            userId: userIds.jordan,
            username: 'jord_lifts',
            teamName: 'Strength Squad',
            rank: 3,
            points: 1645,
            weeklyMinutes: 188,
        },
        {
            userId: userIds.theo,
            username: 'theo_flow',
            teamName: 'Flex Force',
            rank: 4,
            points: 1415,
            weeklyMinutes: 156,
        },
    ]);
    await models_1.Workout.insertMany([
        {
            title: 'Morning Mobility Reset',
            focusArea: 'Mobility',
            difficulty: 'beginner',
            durationMinutes: 20,
            exercises: ['Cat-cow flow', 'Worlds greatest stretch', 'Hip airplanes', 'Dead bugs'],
        },
        {
            title: 'Tempo 5K Builder',
            focusArea: 'Cardio',
            difficulty: 'intermediate',
            durationMinutes: 36,
            exercises: ['Easy jog warmup', 'Tempo intervals', 'Stride repeats', 'Cooldown walk'],
        },
        {
            title: 'Total Strength Circuit',
            focusArea: 'Strength',
            difficulty: 'advanced',
            durationMinutes: 45,
            exercises: ['Goblet squats', 'Push presses', 'Renegade rows', 'Walking lunges'],
        },
    ]);
    console.log('Created sample users, teams, activities, leaderboard entries, and workouts.');
}
seedDatabase()
    .catch((error) => {
    console.error('Failed to seed octofit_db', error);
    process.exitCode = 1;
})
    .finally(async () => {
    await mongoose_1.default.connection.close();
});
