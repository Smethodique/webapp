import type { ComponentType } from 'react';
import type { StorePageTheme } from '@/data/stores';

import KrissBoxing from './KrissBoxing';
import LaCageGym from './LaCageGym';
import CrossfitSirocco from './CrossfitSirocco';
import SpartacusFight from './SpartacusFight';
import FadmaRugs from './FadmaRugs';
import Fenyadi from './Fenyadi';
import Casatribana from './Casatribana';
import SheSaidYes from './SheSaidYes';
import YourEvents from './YourEvents';
import Up2youEvent from './Up2youEvent';

export type LifestyleTemplate = ComponentType<{ store: StorePageTheme }>;

/**
 * One bespoke, full-page template per lifestyle store. Each template renders
 * the complete landing page (StoreHeader → unique sections → StoreBooking →
 * StoreFooter) inside its own branded shell.
 */
export const lifestyleTemplates: Record<string, LifestyleTemplate> = {
  'kriss-boxing': KrissBoxing,
  'la-cage-gym': LaCageGym,
  'crossfit-sirocco': CrossfitSirocco,
  'spartacus-fight': SpartacusFight,
  'fadma-rugs': FadmaRugs,
  fenyadi: Fenyadi,
  casatribana: Casatribana,
  'she-said-yes': SheSaidYes,
  'your-events': YourEvents,
  'up2you-event': Up2youEvent,
};

export {
  KrissBoxing,
  LaCageGym,
  CrossfitSirocco,
  SpartacusFight,
  FadmaRugs,
  Fenyadi,
  Casatribana,
  SheSaidYes,
  YourEvents,
  Up2youEvent,
};
