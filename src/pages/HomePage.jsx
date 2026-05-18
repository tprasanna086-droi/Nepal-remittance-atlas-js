import styles from "./HomePage.module.css";

export default function HomePage({ setPage }) {
    return (
        <div className={styles.page}>

            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.badge}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        Research-Grade Data Journalism
                    </div>

                    <h1 className={styles.heroTitle}>
                        Nepal's Migration Crisis Has
                        <span className={styles.heroAccent}> Two Faces</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        75 districts. Two independent indices. One critical finding that challenges everything we thought about remittance dependency.
                    </p>

                    <div className={styles.heroCards}>
                        <div className={styles.findingCard}>
                            <p className={styles.findingLabel}>Key Finding</p>
                            <p className={styles.findingNumber}>0.049</p>
                            <p className={styles.findingTitle}>Correlation Coefficient</p>
                            <p className={styles.findingDesc}>Statistical independence between dependency and vulnerability</p>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <p className={styles.statNumber}>75</p>
                                <p className={styles.statLabel}>Districts Analyzed</p>
                            </div>
                            <div className={styles.statCard}>
                                <p className={styles.statNumber}>2.19M</p>
                                <p className={styles.statLabel}>Nepalis Abroad</p>
                            </div>
                            <div className={styles.statCard}>
                                <p className={styles.statNumber}>26%</p>
                                <p className={styles.statLabel}>Share of GDP</p>
                            </div>
                            <div className={styles.statCard}>
                                <p className={styles.statNumber}>7</p>
                                <p className={styles.statLabel}>Provinces</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.ctaRow}>
                        <button className={styles.ctaPrimary} onClick={() => setPage("atlas")}>
                            Explore the Dashboard
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <button className={styles.ctaSecondary} onClick={() => setPage("research")}>
                            Read the Research
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section className={styles.statBanner}>
                <div className={styles.statBannerInner}>
                    <div className={styles.statBannerDot} />
                    <div>
                        <h2 className={styles.statBannerTitle}>Statistical Independence: r = 0.049</h2>
                        <p className={styles.statBannerText}>
                            This research reveals a surprising statistical independence (p &gt; 0.05) between migration dependency and structural vulnerability across Nepal's districts — suggesting that remittance flows and local development challenges operate on <span className={styles.statBannerAccent}>separate axes</span>.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.exploreSection}>
                <div className={styles.exploreInner}>
                    <div className={styles.exploreHeader}>
                        <h2 className={styles.exploreTitle}>Explore the Data</h2>
                        <p className={styles.exploreSubtitle}>Four interactive tools to understand Nepal's migration landscape from every angle.</p>
                    </div>

                    <div className={styles.cardGrid}>
                        <button className={styles.pageCard} onClick={() => setPage("atlas")}>
                            <div className={styles.cardIcon} style={{ background: "linear-gradient(135deg, #000 0%, #444 100%)" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>The Atlas</h3>
                            <p className={styles.cardDesc}>Interactive choropleth maps of RDI and RVI across 75 districts</p>
                        </button>

                        <button className={styles.pageCard} onClick={() => setPage("explorer")}>
                            <div className={styles.cardIcon} style={{ background: "linear-gradient(135deg, #666 0%, #222 100%)" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>District Explorer</h3>
                            <p className={styles.cardDesc}>Deep-dive analysis into individual districts with comparative metrics</p>
                        </button>

                        <button className={styles.pageCard} onClick={() => setPage("province")}>
                            <div className={styles.cardIcon} style={{ background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Provincial Analysis</h3>
                            <p className={styles.cardDesc}>Compare migration patterns and vulnerability across 7 provinces</p>
                        </button>

                        <button className={styles.pageCard} onClick={() => setPage("migration")}>
                            <div className={styles.cardIcon} style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #000 100%)" }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Migration Patterns</h3>
                            <p className={styles.cardDesc}>Time series data and destination breakdowns for remittance flows</p>
                        </button>
                    </div>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerInner}>
                    <div className={styles.footerTop}>
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogoMark}>N</div>
                            <p className={styles.footerBrandName}>Nepal Remittance Atlas</p>
                            <p className={styles.footerBrandDesc}>Research-grade data journalism on migration and remittances</p>
                        </div>
                        <div className={styles.footerCol}>
                            <p className={styles.footerColTitle}>Explore</p>
                            <button className={styles.footerLink} onClick={() => setPage("atlas")}>Interactive Dashboard</button>
                            <button className={styles.footerLink} onClick={() => setPage("research")}>Research Paper</button>
                        </div>
                        <div className={styles.footerCol}>
                            <p className={styles.footerColTitle}>Data Sources</p>
                            <p className={styles.footerText}>Nepal Rastra Bank</p>
                            <p className={styles.footerText}>World Bank Migration Data</p>
                            <p className={styles.footerText}>Nepal Living Standards Survey</p>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p className={styles.footerCopy}>© 2026 Prasanna Thapa · Nepal Remittance Atlas. All rights reserved.</p>
                        <a href="https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js" target="_blank" rel="noreferrer" className={styles.footerGithub}>View on GitHub →</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}