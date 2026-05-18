import { useState, useRef, useEffect } from "react";
import styles from "./TopNav.module.css";

export default function TopNav({ page, setPage, districts }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const searchRef = useRef(null);

    const dashboardPages = [
        { id: "atlas", label: "The Atlas" },
        { id: "explorer", label: "District Explorer" },
        { id: "province", label: "Provincial Analysis" },
        { id: "migration", label: "Migration Patterns" },
    ];

    function handleSearch(q) {
        setSearchQuery(q);
        if (!q.trim()) { setSearchResults([]); return; }
        const results = districts.filter((d) =>
            d.district.toLowerCase().includes(q.toLowerCase()) ||
            d.province.toLowerCase().includes(q.toLowerCase())
        ).slice(0, 6);
        setSearchResults(results);
    }

    function handleSearchSelect(district) {
        setPage("explorer");
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
        window.__atlasSearchDistrict = district.district;
        window.dispatchEvent(new CustomEvent("atlasSearch", { detail: district.district }));
    }

    useEffect(() => {
        function handleClick(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const isDashboardPage = ["atlas", "explorer", "province", "migration"].includes(page);

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>

                <button className={styles.logo} onClick={() => setPage("home")}>
                    <div className={styles.logoMark}>N</div>
                    <div className={styles.logoText}>
                        <span className={styles.logoTitle}>Nepal Remittance Atlas</span>
                        <span className={styles.logoSub}>Research-Grade Data</span>
                    </div>
                </button>

                <div className={styles.navPill}>
                    <button
                        className={page === "home" ? styles.navBtnActive : styles.navBtn}
                        onClick={() => setPage("home")}
                    >
                        Home
                    </button>

                    <button
                        className={isDashboardPage ? styles.navBtnActive : styles.navBtn}
                        onClick={() => setPage("atlas")}
                    >
                        Dashboard
                    </button>

                    <button
                        className={page === "research" ? styles.navBtnActive : styles.navBtn}
                        onClick={() => setPage("research")}
                    >
                        Research
                    </button>
                </div>

                <div className={styles.rightActions}>
                    <div className={styles.searchWrapper} ref={searchRef}>
                        {searchOpen ? (
                            <div className={styles.searchExpanded}>
                                <input
                                    autoFocus
                                    className={styles.searchInput}
                                    placeholder="Search districts or provinces..."
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                {searchResults.length > 0 && (
                                    <div className={styles.searchDropdown}>
                                        {searchResults.map((d) => (
                                            <button key={d.district} className={styles.searchResult} onClick={() => handleSearchSelect(d)}>
                                                <span className={styles.searchResultName}>{d.district}</span>
                                                <span className={styles.searchResultSub}>{d.province}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {searchQuery && searchResults.length === 0 && (
                                    <div className={styles.searchDropdown}>
                                        <p className={styles.searchNoResult}>No districts found</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button className={styles.iconBtn} onClick={() => setSearchOpen(true)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <a href="https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js" target="_blank" rel="noreferrer" className={styles.iconBtn}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                    </a>
                </div>

            </div>
            {isDashboardPage && (
                <div className={styles.subNav}>
                    <div className={styles.subNavInner}>
                        <button
                            className={page === "atlas" ? styles.subNavBtnActive : styles.subNavBtn}
                            onClick={() => setPage("atlas")}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                            </svg>
                            Interactive Atlas
                            <span className={styles.subNavSub}>75 districts mapped</span>
                        </button>
                        <button
                            className={page === "explorer" ? styles.subNavBtnActive : styles.subNavBtn}
                            onClick={() => setPage("explorer")}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            District Deep-Dive
                            <span className={styles.subNavSub}>Detailed analysis</span>
                        </button>
                        <button
                            className={page === "province" ? styles.subNavBtnActive : styles.subNavBtn}
                            onClick={() => setPage("province")}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                            </svg>
                            Provincial Comparison
                            <span className={styles.subNavSub}>7 provinces</span>
                        </button>
                        <button
                            className={page === "migration" ? styles.subNavBtnActive : styles.subNavBtn}
                            onClick={() => setPage("migration")}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                            Migration Trends
                            <span className={styles.subNavSub}>Time series data</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}