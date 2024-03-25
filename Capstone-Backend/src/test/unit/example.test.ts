function sum(one: number, two: number) {
  return one + two;
}

import app from '../../app';
const request = require('supertest');
const path = require('path');

describe('Example Test Suite', () => {
  test('Example Test', () => {
    const res = sum(4, 9);
    expect(res).toBe(13);
  });
});

describe('Basic Auth Test Suite', () => {
  test('Unauthorized test', async () => {
    const res = await request(app).get('/secureHealth');
    expect(res.statusCode).toBe(401);
  });

  test('Authorized test', async () => {
    await request(app).get('/secureHealth')
    .auth('user1@email.com', 'pass1')
    .expect(200);
  });
});

describe('Local S3 Test Suite', () => {
  test('Create S3 and DynamoDB object', async () => {
    const filePath = path.join(__dirname, '../images/shoulderpress.webp');
    const createRes = await request(app).post('/api/exercise')
    .auth('user1@email.com', 'pass1')
    .set('Content-Type', 'image/webp')
    .attach('image', filePath)
    .field('name', 'Shoulder Press')
    .field('primaryMuscles', 'Shoulders')
    .field('secondaryMuscles', 'Triceps')
    .field('type', 'Weighted_Reps')
    .field('met', '5')
    .field('equipment', 'Dumbbell');
    expect(createRes.statusCode).toBe(201);
  });

  test('Retrieve S3 and DynamoDB object', async () => {
    const res = await request(app).get('/api/exercise/Shoulder Press')
    .auth('user1@email.com', 'pass1');
    expect(res.status).toBe(200);

    const exercise = res.body;
    expect(exercise.name).toBe('Shoulder Press');
    expect(exercise.primaryMuscles).toEqual(expect.arrayContaining(['Shoulders']));
    expect(exercise.secondaryMuscles).toEqual(expect.arrayContaining(['Triceps']));
    expect(exercise.type).toBe('Weighted_Reps');
    expect(parseFloat(exercise.met)).toBeCloseTo(5);
    expect(exercise.equipment).toBe('Dumbbell');
  });
});
