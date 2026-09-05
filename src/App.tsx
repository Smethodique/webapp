import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Works from '@/pages/Works';
import CaseStudy from '@/pages/CaseStudy';
import About from '@/pages/About';
import Contact from '@/pages/Contact';

const StorePage = lazy(() => import('@/pages/StorePage'));

export default function App() {
  return (
    <Routes>
      {/* Store landing pages are fully standalone: their own branded
          header/footer chrome, no portfolio Navbar/Footer. */}
      <Route
        path="stores/:slug"
        element={
          <Suspense fallback={<div className="min-h-[100dvh] bg-ink-950" />}>
            <StorePage />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="works" element={<Works />} />
        <Route path="works/:slug" element={<CaseStudy />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
