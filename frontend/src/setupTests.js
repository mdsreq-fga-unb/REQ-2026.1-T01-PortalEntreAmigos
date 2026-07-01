import '@testing-library/jest-dom';

// Recharts (DonationProgress) depende de ResizeObserver no jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};