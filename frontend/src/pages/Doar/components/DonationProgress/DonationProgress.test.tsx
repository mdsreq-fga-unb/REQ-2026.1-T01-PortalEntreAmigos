import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DonationProgress } from './DonationProgress';
import { renderWithProviders } from '../../../../test/utils/renderWithProviders';

describe('RF10 — DonationProgress', () => {
  const chartData = [
    { name: 'Arroz', value: 30, color: '#ff0000' },
    { name: 'Feijão', value: 20, color: '#00ff00' },
  ];

  it('exibe título e progresso global', () => {
    renderWithProviders(
      <DonationProgress data={chartData} globalProgress={50} title="Meta da Campanha" />,
    );
    expect(screen.getByText('Meta da Campanha')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /compartilhar/i })).toBeInTheDocument();
  });
});
