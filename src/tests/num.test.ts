import request from 'supertest';
import App from '@/app';
import NumRoute from '@/routes/num.route';

const EXISTING_SESSION_ID = 'existing-session-id';
const GENERATED_SESSION_ID = 'generate-session-id';

jest.mock('uuid', () => ({
  v4: () => GENERATED_SESSION_ID,
}));

const setSessionDataMock = jest.fn();

jest.mock('../utils/inMemorySessionStore', () => ({
  setSessionData: (...arg) => setSessionDataMock(arg),
  getSessionData: (sessionId: string) => (sessionId === EXISTING_SESSION_ID ? { 10: 5 } : {}),
}));

beforeEach(() => {
  setSessionDataMock.mockReset();
});

const setup = () => {
  const numRoute = new NumRoute();
  const app = new App([numRoute]);

  return app;
};

describe('Testing /Num', () => {
  describe('[GET] /get-frequency', () => {
    it('should get the empty frequency when NO session id is available', () => {
      const app = setup();

      return request(app.getServer())
        .get('/num/get-frequency')
        .send()
        .expect(200)
        .expect({ data: { frequency: {} }, message: 'successfully get frequency' });
    });

    it('should get the correct frequency when session id is available', () => {
      const app = setup();

      return request(app.getServer())
        .get('/num/get-frequency')
        .set('nufreq-session-id', EXISTING_SESSION_ID)
        .send()
        .expect(200)
        .expect({ data: { frequency: { 10: 5 } }, message: 'successfully get frequency' });
    });
  });

  describe('[POST] /set-number', () => {
    it('should set the number and generate session id', done => {
      const app = setup();

      request(app.getServer())
        .post('/num/set-number')
        .send({ number: 10 })
        .expect(200)
        .expect({
          data: { isFib: false, sessionId: GENERATED_SESSION_ID },
          message: 'successfully set number',
        })
        .then(() => {
          expect(setSessionDataMock).toBeCalledWith([GENERATED_SESSION_ID, { 10: 1 }]);
          done();
        })
        .catch(err => done(err));
    });

    it('should set the number and use the existing session id', done => {
      const app = setup();

      request(app.getServer())
        .post('/num/set-number')
        .set('nufreq-session-id', EXISTING_SESSION_ID)
        .send({ number: 10 })
        .expect(200)
        .expect({
          data: { isFib: false, sessionId: EXISTING_SESSION_ID },
          message: 'successfully set number',
        })
        .then(() => {
          expect(setSessionDataMock).toBeCalledWith([EXISTING_SESSION_ID, { 10: 6 }]);
          done();
        })
        .catch(err => done(err));
    });

    it('should indicate the numebr is one of the first 1000 numbers in the Fibonacci sequence', () => {
      const app = setup();

      return request(app.getServer())
        .post('/num/set-number')
        .send({ number: 317811 })
        .expect(200)
        .expect({
          data: { isFib: true, sessionId: GENERATED_SESSION_ID },
          message: 'successfully set number',
        });
    });

    it('should return 400 if the request does not comform to the contract', () => {
      const app = setup();

      return request(app.getServer()).post('/num/set-number').send({ num: 10 }).expect(400).expect({
        message: 'property num should not exist, number must be a number conforming to the specified constraints',
      });
    });
  });
});
