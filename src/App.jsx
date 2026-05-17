import { useState } from "react";
import { useAtlasData } from "./useAtlasData";
import Sidebar from "./Sidebar";
import AtlasPage from "./pages/AtlasPage";
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
        {page !== "atlas" && (
          <div className={styles.placeholder}>
            <h1>{page}</h1>
            <p style={{ color: "var(--text-muted)" }}>Coming soon</p>
          </div>
        )}
      </main>
    </div>
  );
}