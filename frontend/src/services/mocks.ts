import bannerImg from '../assets/donation_banner.png';
import heroImg from '../assets/hero.png';
import { DonationItem } from '../pages/Doar/components/DonationSelector/DonationSelector';

// --- Mocks para a página de Campanhas ---
export const activeCampaignMock = {
  id: 1,
  image: bannerImg,
  progress: 63,
  endDate: '30/5',
  title: 'Arrecadação de alimentos',
  description: 'Ajude a levar comida para famílias em situação de vulnerabilidade.',
};

export const closedCampaignsMock = [
  {
    id: 2,
    image: heroImg,
    progress: 110,
    endDate: '10/3',
    title: 'Arrecadação encerrada',
    description: 'Ajude a levar comida para famílias em situação de vulnerabilidade.',
  },
  {
    id: 3,
    image: bannerImg,
    progress: 100,
    endDate: '25/12',
    title: 'Natal Solidário',
    description: 'Arrecadação de brinquedos e roupas para crianças.',
  },
  {
    id: 4,
    image: heroImg,
    progress: 105,
    endDate: '12/10',
    title: 'Dia das Crianças',
    description: 'Levamos alegria e presentes para as crianças da comunidade.',
  },
];

// --- Mocks para a página de Doação ---
export const donationItemsMock: DonationItem[] = [
  { id: '1', name: 'Alimento 1', color: '#D946EF', collected: 5, goal: 30 }, // fuchsia
  { id: '2', name: 'Alimento 2', color: '#4F46E5', collected: 10, goal: 30 }, // indigo
  { id: '3', name: 'Alimento 3', color: '#16A34A', collected: 15, goal: 30 }, // green
  { id: '4', name: 'Alimento 4', color: '#FDE047', collected: 24, goal: 30 }, // yellow
];

export const donationChartDataMock = [
  { name: 'Falta', value: 46, color: '#CBD5E1' }, // gray
  { name: 'Alimento 1', value: 5, color: '#D946EF' },
  { name: 'Alimento 2', value: 10, color: '#4F46E5' },
  { name: 'Alimento 3', value: 15, color: '#16A34A' },
  { name: 'Alimento 4', value: 24, color: '#FDE047' },
];

export const globalProgressMock = 60;

// --- Mocks para a página de Transparência ---
export const transparencyReportsMock = [
  {
    id: 1,
    title: 'Cesta Básica - Outubro/2025',
    subtitle: 'comprovante - R$ 120.000,00',
  },
  {
    id: 2,
    title: 'Agasalho Solidário - Junho/2025',
    subtitle: 'comprovante - R$ 60.000,00',
  },
  {
    id: 3,
    title: 'Páscoa Doce - Abril/2025',
    subtitle: 'comprovante - R$ 30.000,00',
  },
  {
    id: 4,
    title: 'Volta às Aulas - Fevereiro/2025',
    subtitle: 'comprovante - R$ 45.000,00',
  },
];
