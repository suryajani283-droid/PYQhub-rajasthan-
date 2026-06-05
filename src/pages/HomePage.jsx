import { Helmet } from 'react-helmet-async';
import HeroBanner from '../components/home/HeroBanner';
import ExamCategories from '../components/home/ExamCategories';
import PremiumBundles from '../components/home/PremiumBundles';
import FreePapers from '../components/home/FreePapers';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Rajasthan Competition PYQ | PYQHub Rajasthan</title>
        <meta name="description" content="RAS, REET, LDC, Patwari, Police previous year papers PDF download." />
      </Helmet>
      <HeroBanner />
      <ExamCategories />
      <PremiumBundles />
      <FreePapers />
    </>
  );
} 