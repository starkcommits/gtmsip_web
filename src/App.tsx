import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { SiteLayout } from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import FeaturesHub from "./pages/FeaturesHub";
import FeatureDetail from "./pages/FeatureDetail";
import HowItWorks from "./pages/HowItWorks";
import UseCases from "./pages/UseCases";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import About from "./pages/About";
import {
  CookiesPage,
  DataDeletionPage,
  MetaDataUsePage,
  PrivacyPage,
  TermsPage,
} from "./pages/LegalPages";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesHub />} />
            <Route path="/features/:slug" element={<FeatureDetail />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<About />} />
            <Route path="/legal/privacy" element={<PrivacyPage />} />
            <Route path="/legal/terms" element={<TermsPage />} />
            <Route path="/legal/cookies" element={<CookiesPage />} />
            <Route path="/legal/data-deletion" element={<DataDeletionPage />} />
            <Route path="/legal/meta-data-use" element={<MetaDataUsePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
