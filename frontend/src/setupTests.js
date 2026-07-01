import '@testing-library/jest-dom';

// Recharts (DonationProgress) depende de ResizeObserver no jsdom
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};