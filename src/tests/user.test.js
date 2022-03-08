import mongoose from 'mongoose';
import supertest from 'supertest';

import { createUserSessionHandler } from '../api/components/session/controller';
import * as SessionService from '../api/components/session/service';
import * as UserService from '../api/components/user/service';

import createServer from './createServer';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();
const sessionId = new mongoose.Types.ObjectId().toString();

const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password123',
  passwordConfirmation: 'Password123'
};

const userPayload = {
  _id: userId,
  email: 'test@example.com',
  name: 'Jane Doe'
};

const sessionPayload = {
  _id: sessionId,
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.29.0',
  createdAt: new Date('2022-02-28T16:00:00.0000Z'),
  updatedDate: new Date('2022-02-28T16:00:00.0000Z')
};

describe('USER', () => {
  // user registration
  describe('user registration', () => {
    describe('given username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app).post('/api/v1/users').send(userInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe('given the passwords do not match', () => {
      it('should return a 400', async () => {
        const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockReturnValueOnce(userPayload);

        const { statusCode } = await supertest(app)
          .post('/api/v1/users')
          .send({ ...userInput, passwordConfirmation: 'does not match' });

        expect(statusCode).toBe(400);
        expect(createUserServiceMock).not.toHaveBeenCalledWith(userInput);
      });
    });

    describe('given the user service throws errors', () => {
      it('should return a 409 error', async () => {
        const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockRejectedValueOnce('oh no :(');

        const { statusCode } = await supertest(app).post('/api/v1/users').send(userInput);

        expect(statusCode).toBe(409);
        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('create user session', () => {
    describe('given the username and password are valid', () => {
      it('should return a signed active token and a refresh token', async () => {
        jest.spyOn(UserService, 'validatePassword').mockReturnValueOnce(userPayload);
        jest.spyOn(SessionService, 'createSession').mockReturnValueOnce(sessionPayload);

        const req = {
          get: () => {
            return 'a user agent';
          },
          body: {
            email: 'test@example.com',
            password: 'Password123',
            passwordConfirmation: 'Password123'
          }
        };

        const send = jest.fn();
        const status = jest.fn().mockReturnValueOnce({ send });

        const res = { status };

        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String)
        });
      });
    });
  });

  // a user can login with a valid email and password
});
