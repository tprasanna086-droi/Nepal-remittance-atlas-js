import styles from "./Sidebar.module.css";

const pages = [
    { id: "atlas", icon: "🗺️", label: "The Atlas" },
    { id: "explorer", icon: "🔍", label: "District Explorer" },
    { id: "province", icon: "🏔️", label: "Provincial Analysis" },
    { id: "migration", icon: "📈", label: "Migration Patterns" },
    { id: "research", icon: "📋", label: "The Research" },
];

export default function Sidebar({ page, setPage }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <span className={styles.brandTop}>Nepal Remittance</span>
                <span className={styles.brandAccent}>Atlas</span>
                <span className={styles.brandSub}>
                    Mapping how remittances shape Nepal's 75 districts
                </span>
            </div>

            <div className={styles.divider} />

            <nav className={styles.nav}>
                {pages.map((p) => (
                    <button
                        key={p.id}
                        className={page === p.id ? styles.navBtnActive : styles.navBtn}
                        onClick={() => setPage(p.id)}
                    >
                        <span className={styles.navIcon}>{p.icon}</span>
                        <span className={styles.navLabel}>{p.label}</span>
                    </button>
                ))}
            </nav>

            <div className={styles.divider} />

            <div className={styles.footer}>
                <p className={styles.footerName}>Prasanna Thapa</p>
                <p className={styles.footerSub}>Nepal · 2026</p>
                <p className={styles.footerSub}>Data: NRB · CBS Nepal · World Bank</p>

                <a href="https://github.com/tprasanna086-droi/Nepal-remittance-atlas-js"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.footerLink}
                >
                    View on GitHub
                </a>
            </div>
        </aside >
    );
}