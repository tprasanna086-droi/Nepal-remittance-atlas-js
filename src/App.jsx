import { useState } from "react";
import { useAtlasData } from "./useAtlasData";
import TopNav from "./TopNav";
import HomePage from "./pages/HomePage";
import AtlasPage from "./pages/AtlasPage";
import ExplorerPage from "./pages/ExplorerPage";
import ProvincePage from "./pages/ProvincePage";
import MigrationPage from "./pages/MigrationPage";
import ResearchPage from "./pages/ResearchPage";
import styles from "./App.module.css";

export default function App() {
  const [page, setPage] = useState("home");
  const { districts, geojson, loading, error } = useAtlasData();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingInner}>
          <span className={styles.loadingFlag}>🇳🇵</span>
          <p className={styles.loadingText}>Loading Atlas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.loading}>
        <p style={{ color: "var(--high)" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <TopNav page={page} setPage={setPage} districts={districts} />
      <main className={styles.main}>
        {page === "home" && (
          <HomePage setPage={setPage} />
        )}
        {page === "atlas" && (
          <AtlasPage districts={districts} geojson={geojson} />
        )}
        {page === "explorer" && (
          <ExplorerPage districts={districts} />
        )}
        {page === "province" && (
          <ProvincePage districts={districts} />
        )}
        {page === "migration" && (
          <MigrationPage districts={districts} />
        )}
        {page === "research" && (
          <ResearchPage districts={districts} />
        )}
      </main>
    </div>
  );
}