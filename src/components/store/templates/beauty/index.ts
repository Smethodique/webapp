import type { ComponentType } from 'react';
import MiyaCouture from './MiyaCouture';
import MyriamBouafi from './MyriamBouafi';
import Atelier44 from './Atelier44';
import MerakiStudio from './MerakiStudio';
import HappySensSpa from './HappySensSpa';
import HammamLePacha from './HammamLePacha';
import BeautyByRiihaab from './BeautyByRiihaab';
import StudioGlem from './StudioGlem';
import ElHassaniBarber from './ElHassaniBarber';
import AliBarbershop from './AliBarbershop';

/**
 * Beauty & Elegance sector — one bespoke full-page template per store.
 * Contract: each component receives the normalized StorePageTheme and
 * renders the COMPLETE page chrome (StoreHeader … StoreBooking …
 * StoreFooter) inside the CSS-var wrapper provided by StorePage.
 */
export const beautyTemplates: Record<string, ComponentType<{ store: any }>> = {
  'miya-couture': MiyaCouture,
  'myriam-bouafi': MyriamBouafi,
  'atelier-44': Atelier44,
  'meraki-studio': MerakiStudio,
  'happy-sens-spa': HappySensSpa,
  'hammam-le-pacha': HammamLePacha,
  'beauty-by-riihaab': BeautyByRiihaab,
  'studio-glem': StudioGlem,
  'el-hassani-barber': ElHassaniBarber,
  'ali-barbershop': AliBarbershop,
};

export default beautyTemplates;
