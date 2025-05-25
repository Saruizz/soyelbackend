import { jest } from '@jest/globals';

const mockDb = {
  one: jest.fn(),
  none: jest.fn(),
  $pool: {
    end: jest.fn()
  }
};

const mockPool = {
  end: jest.fn()
};

beforeEach(() => {
  jest.clearAllMocks();
});

export { mockDb as db, mockPool as pool };