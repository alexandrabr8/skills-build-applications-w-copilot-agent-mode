import dotenv from 'dotenv';
import mongoose, { Types } from 'mongoose';

import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

dotenv.config();

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const teamIds = {
  cardioCrew: new Types.ObjectId(),
  strengthSquad: new Types.ObjectId(),
  flexForce: new Types.ObjectId(),
};

const userIds = {
  maya: new Types.ObjectId(),
  jordan: new Types.ObjectId(),
  priya: new Types.ObjectId(),
  theo: new Types.ObjectId(),
};

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  await Team.insertMany([
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

  await User.insertMany([
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

  await Activity.insertMany([
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

  await LeaderboardEntry.insertMany([
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

  await Workout.insertMany([
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
    await mongoose.connection.close();
  });