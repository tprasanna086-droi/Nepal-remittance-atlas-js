import { useState } from "react";
import { useAtlasData } from "./useAtlasData";
import Sidebar from "./Sidebar";
import AtlasPage from "./pages/AtlasPage";
import ExplorerPage from "./pages/ExplorerPage";
import ProvincePage from "./pages/ProvincePage";
import MigrationPage from "./pages/MigrationPage";
import styles from "./App.module.css";

export default function App() {
  const [page, setPage] = useState("atlas");
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
      <Sidebar page={page} setPage={setPage} />
      <main className={styles.main}>
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
          <div className={styles.placeholder}>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--accent)" }}>
              The Research
            </h1>
            <p style={{ color: "var(--text-muted)" }}>Coming next</p>
          </div>
        )}
      </main>
    </div>
  );
}