import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import { SiteLayout } from "./layouts/SiteLayout";

// Synchronous critical import: Homepage renders with zero dynamic chunk latency
import HomePage from "./pages/HomePage";

// Secondary routes lazy-loaded on demand
const FeaturesHub = lazy(() => import("./pages/FeaturesHub"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const SolutionDetail = lazy(() => import("./pages/SolutionDetail"));
const BlogHub = lazy(() => import("./pages/BlogHub"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const UseCases = lazy(() => import("./pages/UseCases"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Security = lazy(() => import("./pages/Security"));
const About = lazy(() => import("./pages/About"));
const PrivacyPage = lazy(() =>
  import("./pages/LegalPages").then((m) => ({ default: m.PrivacyPage })),
);
const TermsPage = lazy(() =>
  import("./pages/LegalPages").then((m) => ({ default: m.TermsPage })),
);
const CookiesPage = lazy(() =>
  import("./pages/LegalPages").then((m) => ({ default: m.CookiesPage })),
);
const DataDeletionPage = lazy(() =>
  import("./pages/LegalPages").then((m) => ({ default: m.DataDeletionPage })),
);
const MetaDataUsePage = lazy(() =>
  import("./pages/LegalPages").then((m) => ({ default: m.MetaDataUsePage })),
);
const NotFound = lazy(() => import("./pages/NotFound"));

/** Visual loading fallback: seamless, non-shifting placeholder */
function PageFallback() {
  return (
    <div
      aria-label="Loading page content"
      className="min-h-[50vh] w-full flex items-center justify-center"
    >
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-brand-500/20 border-t-brand-500" />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/features" element={<FeaturesHub />} />
              <Route path="/features/:slug" element={<FeatureDetail />} />
              <Route path="/solutions/:slug" element={<SolutionDetail />} />
              <Route path="/blog" element={<BlogHub />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
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
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
