import type { ComponentType } from 'react';
import type { StorePageTheme } from '@/data/stores';
import HeibaiCoffee from './HeibaiCoffee';
import HyunaHouse from './HyunaHouse';
import KeshCup from './KeshCup';
import SinyaCoffee from './SinyaCoffee';
import LeRouget from './LeRouget';
import NonoSeaTaste from './NonoSeaTaste';
import Mofi from './Mofi';
import LeTarbouche from './LeTarbouche';
import LahlouCo from './LahlouCo';
import Les3Dousoeurs from './Les3Dousoeurs';

export type StoreTemplate = ComponentType<{ store: StorePageTheme }>;

/** One unique template per hospitality store, keyed by slug. */
export const hospitalityTemplates: Record<string, StoreTemplate> = {
  'heibai-coffee': HeibaiCoffee,
  'hyuna-house': HyunaHouse,
  'kesh-cup': KeshCup,
  'sinya-coffee': SinyaCoffee,
  'le-rouget': LeRouget,
  'nono-sea-taste': NonoSeaTaste,
  mofi: Mofi,
  'le-tarbouche': LeTarbouche,
  'lahlou-co': LahlouCo,
  'les-3-dousoeurs': Les3Dousoeurs,
};

export default hospitalityTemplates;
