import mongoose, { Schema, Types } from 'mongoose';

export interface TeamDocument {
  name: string;
  mascot: string;
  coach: string;
  memberCount: number;
}

export interface UserDocument {
  username: string;
  displayName: string;
  email: string;
  teamId: Types.ObjectId;
  age: number;
  fitnessGoal: string;
}

export interface ActivityDocument {
  userId: Types.ObjectId;
  activityType: string;
  durationMinutes: number;
  caloriesBurned: number;
  distanceMiles?: number;
  activityDate: Date;
}

export interface LeaderboardEntryDocument {
  userId: Types.ObjectId;
  username: string;
  teamName: string;
  rank: number;
  points: number;
  weeklyMinutes: number;
}

export interface WorkoutDocument {
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true },
    mascot: { type: String, required: true },
    coach: { type: String, required: true },
    memberCount: { type: Number, required: true, min: 0 },
  },
  { collection: 'teams', timestamps: true },
);

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    age: { type: Number, required: true, min: 13 },
    fitnessGoal: { type: String, required: true },
  },
  { collection: 'users', timestamps: true },
);

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceMiles: { type: Number, min: 0 },
    activityDate: { type: Date, required: true },
  },
  { collection: 'activities', timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardEntryDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    weeklyMinutes: { type: Number, required: true, min: 0 },
  },
  { collection: 'leaderboard', timestamps: true },
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
  },
  { collection: 'workouts', timestamps: true },
);

export const Team = mongoose.model<TeamDocument>('Team', teamSchema);
export const User = mongoose.model<UserDocument>('User', userSchema);
export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<LeaderboardEntryDocument>(
  'LeaderboardEntry',
  leaderboardSchema,
);
export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema);