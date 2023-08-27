// mock module in test file using this code
// jest.mock('@/lib/auth/utils');

module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true),
};

// to safety TS
export {};
