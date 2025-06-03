import { jest } from "@jest/globals";

const db = {
  one: jest.fn(),
  none: jest.fn(),
  oneOrNone: jest.fn(),
  result: jest.fn(),
  any: jest.fn(),
  task: jest.fn((cb: any) => cb(db)),
  $pool: {
    end: jest.fn(),
  },
};

const mockPool = {
  end: jest.fn(),
  connect: jest.fn(),
  query: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

export { db, mockPool };
export default db;
