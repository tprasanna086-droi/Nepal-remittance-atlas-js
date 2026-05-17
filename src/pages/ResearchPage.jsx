import styles from "./ResearchPage.module.css";

export default function ResearchPage({ districts }) {
    const top5RDI = [...districts]
        .sort((a, b) => b.rdi_score - a.rdi_score)
        .slice(0, 5);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.workingPaper}>Working Paper · Nepal Economic Research · 2026</div>
                <h1 className={styles.title}>
                    Remittance Dependency vs. Structural Vulnerability
                </h1>
                <p className={styles.subtitle}>
                    Evidence of Divergence Across Nepal's Districts and Implications for Escaping the Migration Trap
                </p>
                <p className={styles.author}>Prasanna Thapa · Nepal · 2026</p>
                <p className={styles.dataSources}>
                    Data: CBS Nepal 2021 Census · OPHI/DHS 2022 · NRB 2024 · World Bank 2023
                </p>
            </div>

            <div className={styles.abstractBox}>
                <h3 className={styles.abstractLabel}>Abstract</h3>
                <p className={styles.abstractText}>
                    Nepal's status as one of the world's most remittance-dependent economies — receiving over 25% of GDP from abroad — masks significant district-level variation in both migration intensity and structural vulnerability. This paper constructs two complementary indices for Nepal's 75 districts: a <strong>Migration Dependency Index (RDI)</strong> measuring active migration intensity, and a <strong>Remittance Vulnerability Index (RVI)</strong> measuring structural vulnerability using Principal Component Analysis of three district-level indicators. After correcting for circularity, we find a near-zero Spearman correlation (r = 0.049, p &gt; 0.05) between migration intensity and structural vulnerability — confirming they are statistically independent dimensions. Karnali and Madhesh provinces concentrate the highest structural vulnerability, while Far-West and Mid-West hill districts lead in migration intensity.
                </p>
            </div>

            <div className={styles.grid}>
                <div className={styles.main}>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Two Indices, Not One</h2>
                        <p className={styles.body}>
                            This atlas constructs two complementary indices. Treating remittance dependency as a single phenomenon leads to misdirected policy — the two dimensions are statistically independent.
                        </p>
                        <div className={styles.indexGrid}>
                            <div className={styles.indexCard} style={{ borderTop: "3px solid #E8C547" }}>
                                <span className={styles.indexLabel} style={{ color: "#E8C547" }}>RDI</span>
                                <h3 className={styles.indexName}>Migration Dependency Index</h3>
                                <p className={styles.indexDesc}>
                                    Measures active migration intensity — how many households and people are currently abroad.
                                </p>
                                <div className={styles.formulaBox}>
                                    <p className={styles.formula}>
                                        RDI = 0.40 × (Absent HH Rate)<br />
                                        + 0.35 × (Absent Pop Rate)<br />
                                        + 0.25 × (1 − Education Score)
                                    </p>
                                </div>
                                <p className={styles.indexNote}>Min-max normalized to 0–100. Theory-driven weights.</p>
                            </div>

                            <div className={styles.indexCard} style={{ borderTop: "3px solid #4ECDC4" }}>
                                <span className={styles.indexLabel} style={{ color: "#4ECDC4" }}>RVI</span>
                                <h3 className={styles.indexName}>Remittance Vulnerability Index</h3>
                                <p className={styles.indexDesc}>
                                    Measures structural vulnerability — poverty, literacy, and education — with no migration variables to avoid circularity.
                                </p>
                                <div className={styles.formulaBox}>
                                    <p className={styles.formula}>
                                        RVI = PCA(PC1) on:<br />
                                        MPI Poverty Rate<br />
                                        + Literacy Rate (inverted)<br />
                                        + Secondary Education (inverted)
                                    </p>
                                </div>
                                <p className={styles.indexNote}>PC1 explains 63.35% of variance. KMO = 0.58. Rescaled to 0–100.</p>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>RVI Tier Distribution</h2>
                        <p className={styles.body}>
                            Structural vulnerability tiers use Jenks Natural Breaks optimization — minimizing within-class variance rather than arbitrary cutoffs.
                        </p>
                        <div className={styles.tierTable}>
                            {[
                                { tier: "Critical", count: 12, pct: "16.0%", color: "#C94040", desc: "Extreme structural vulnerability. Highest poverty + lowest education." },
                                { tier: "High", count: 35, pct: "46.7%", color: "#E05C5C", desc: "Significant vulnerability. 62.7% of all districts are High or Critical." },
                                { tier: "Moderate", count: 22, pct: "29.3%", color: "#E8A84A", desc: "Moderate vulnerability. Mixed structural indicators." },
                                { tier: "Low", count: 6, pct: "8.0%", color: "#4ECDC4", desc: "Low vulnerability. Concentrated in Bagmati / urban areas." },
                            ].map((t) => (
                                <div key={t.tier} className={styles.tierRow}>
                                    <div className={styles.tierDot} style={{ background: t.color }} />
                                    <div className={styles.tierBadge} style={{ background: t.color + "22", color: t.color }}>
                                        {t.tier}
                                    </div>
                                    <div className={styles.tierCount}>{t.count} districts ({t.pct})</div>
                                    <div className={styles.tierDesc}>{t.desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.callout}>
                            62.7% of Nepal's districts — 47 out of 75 — face High or Critical structural vulnerability.
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Key Findings</h2>

                        <div className={styles.findingCard} style={{ borderLeft: "4px solid #4ECDC4" }}>
                            <div className={styles.findingNum}>FINDING 1 — GEOGRAPHY OVER POVERTY</div>
                            <h3 className={styles.findingHead}>Remittance dependency follows geography, not poverty</h3>
                            <p className={styles.findingBody}>
                                The 14 most dependent districts are concentrated in Nepal's Far-West and Mid-West hill regions — not in the Terai, which has higher poverty rates. Kailali, Dhanusa and Pyuthan lead with household migration rates above 34%. This suggests dependency is driven by geographic isolation and lack of local opportunity, not by poverty alone.
                            </p>
                        </div>

                        <div className={styles.findingCard} style={{ borderLeft: "4px solid #E8C547", background: "rgba(232, 197, 71, 0.05)" }}>
                            <div className={styles.findingNum} style={{ color: "#E8C547" }}>FINDING 2 — THE HEADLINE FINDING ⭐</div>
                            <h3 className={styles.findingHead}>Migration intensity and structural vulnerability are statistically independent</h3>
                            <p className={styles.findingBody}>
                                After correcting for circularity, Spearman r = 0.049 (p &gt; 0.05) between RDI and clean RVI. A district can be high migration + low vulnerability, low migration + high vulnerability, high on both, or low on both. These two dimensions cannot be captured by any single index — Nepal requires genuinely differentiated policy.
                            </p>
                            <div className={styles.statHighlight}>r = 0.049 · p &gt; 0.05 · Statistically independent</div>
                        </div>

                        <div className={styles.findingCard} style={{ borderLeft: "4px solid #A78BFA" }}>
                            <div className={styles.findingNum} style={{ color: "#A78BFA" }}>FINDING 3 — INTERGENERATIONAL ESCALATION</div>
                            <h3 className={styles.findingHead}>Education and migration are complements, not substitutes</h3>
                            <p className={styles.findingBody}>
                                District migration rate and education level are uncorrelated (r = 0.005, p = 0.968). But education loads positively with migration intensity in PCA (r = 0.49, p &lt; 0.0001). Remittances fund education not to reduce migration — but to enable migration to higher-income destinations. Children of Gulf workers target the US, Australia, and Europe. The dependency does not end. It upgrades.
                            </p>
                        </div>

                        <div className={styles.findingCard} style={{ borderLeft: "4px solid #F97316" }}>
                            <div className={styles.findingNum} style={{ color: "#F97316" }}>FINDING 4 — SCALE</div>
                            <h3 className={styles.findingHead}>20 years of data shows dependency deepening, not easing</h3>
                            <p className={styles.findingBody}>
                                Remittance inflows grew 24x between 2005 and 2024 — from NPR 58 billion to NPR 1,400 billion. Labour permits grew from 139,000 to 505,000 new permits annually. Even COVID-19, which caused a 66% drop in permits in 2020, resulted in a stronger rebound by 2022. Nepal's remittance dependency is not a transitional phase — it is a structural feature of the economy.
                            </p>
                        </div>

                        <div className={styles.findingCard} style={{ borderLeft: "4px solid #F472B6" }}>
                            <div className={styles.findingNum} style={{ color: "#F472B6" }}>FINDING 5 — DESTINATION SHIFT</div>
                            <h3 className={styles.findingHead}>UAE has overtaken Malaysia as the top destination</h3>
                            <p className={styles.findingBody}>
                                In 2024/25, UAE received 201,148 new Nepali workers — 39.8% of all new permits — up from 28.5% the previous year. Malaysia dropped to just 2% following a government ban. Japan-bound permits grew 221% (5,839 to 18,744) and Romania 70% (13,137 to 22,373) — consistent with intergenerational escalation toward higher-income destinations.
                            </p>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Policy Implications</h2>
                        <div className={styles.quoteBox}>
                            <p className={styles.quoteText}>
                                "The districts most dependent on remittances are not random — they are the districts that development reached last. The data suggests that reducing remittance dependency requires not just economic policy, but geographic equity."
                            </p>
                            <p className={styles.quoteAttrib}>— Prasanna Thapa, Nepal Remittance Dependency Atlas, 2026</p>
                        </div>
                        <div className={styles.policyGrid}>
                            <div className={styles.policyCard}>
                                <span className={styles.policyIcon}>🏫</span>
                                <h4 className={styles.policyHead}>Education Access & Vocational Training</h4>
                                <p className={styles.policyBody}>
                                    The most dependent districts — Pyuthan, Achham, Doti — have secondary education rates below 55%. Making secondary education compulsory and establishing vocational training centers in Far-West and Mid-West districts would give young people an economic alternative to foreign labour migration.
                                </p>
                            </div>
                            <div className={styles.policyCard}>
                                <span className={styles.policyIcon}>🏭</span>
                                <h4 className={styles.policyHead}>Decentralization of Industry & Institutions</h4>
                                <p className={styles.policyBody}>
                                    Nepal's economic infrastructure is heavily concentrated in Kathmandu. Students from Kailali or Doti must travel to Kathmandu even for a basic +2 degree. Establishing industries, colleges, and government institutions in high-dependency districts would create local employment and reduce outmigration pressure.
                                </p>
                            </div>
                        </div>
                        <div className={styles.warningBox}>
                            ⚠️ These recommendations are based on district-level aggregate analysis. Household-level data and qualitative research would be needed to design specific interventions. This analysis identifies where to focus — not how to implement.
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Limitations</h2>
                        <div className={styles.limitationsList}>
                            {[
                                "District-level analysis may mask household-level patterns and intra-district variation. Ecological fallacy applies — district correlations cannot establish household-level causal relationships.",
                                "India migration is significantly undercounted — no work permits required for India-bound workers. True migration intensity of border districts is likely higher than RDI reflects.",
                                "Remittance figures are national-level proxies and may not reflect actual district-level inflows.",
                                "Education data represents only the absent population, not total population by education level.",
                                "PCA conducted on n=75 districts — at the lower bound for stable PCA. Replication with municipality-level data (n=753) would strengthen findings.",
                                "Moran's I confirms significant spatial clustering in RVI (I=0.571, p<0.05). Districts are not independent observations — future work should apply spatial lag models.",
                            ].map((l, i) => (
                                <div key={i} className={styles.limitationItem}>
                                    <span className={styles.limitationNum}>{i + 1}</span>
                                    <p className={styles.limitationText}>{l}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>References</h2>
                        <div className={styles.refList}>
                            {[
                                "Abson, D.J., Dougill, A.J., and Stringer, L.C. (2012). Using Principal Component Analysis for information-rich socio-ecological vulnerability mapping in Southern Africa. Applied Geography, 35(1-2), 515-524.",
                                "CBS Nepal (2021). National Population and Housing Census 2021. Central Bureau of Statistics, Government of Nepal.",
                                "De Haas, H. (2010). Migration and development: A theoretical perspective. International Migration Review, 44(1), 227-264.",
                                "Mishra, et al. (2022). The role of remittances in household spending in rural Nepal. Economies, 13(6), 163.",
                                "NRB (2022). Annual Report Fiscal Year 2021/22. Nepal Rastra Bank. Kathmandu.",
                                "Paudel, R.C. (2019). Regional disparities in remittance utilization in Nepal. Economic Journal of Nepal.",
                                "Shrestha, N. (2022). Do remittances reshape household expenditures? Evidence from Nepal. World Development, 157, 105933.",
                                "World Bank (2023). Migration and Remittances Data. World Bank Open Data.",
                            ].map((r, i) => (
                                <p key={i} className={styles.refItem}>[{i + 1}] {r}</p>
                            ))}
                        </div>
                    </section>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.sideCard}>
                        <h3 className={styles.sideTitle}>Top 5 by RDI Score</h3>
                        <p className={styles.sideNote}>Migration intensity ranking</p>
                        {top5RDI.map((d, i) => (
                            <div key={d.district} className={styles.sideRow}>
                                <span className={styles.sideRank}>#{i + 1}</span>
                                <div className={styles.sideInfo}>
                                    <span className={styles.sideName}>{d.district}</span>
                                    <span className={styles.sideProv}>{d.province}</span>
                                </div>
                                <span className={styles.sideScore}>{d.rdi_score.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sideCard}>
                        <h3 className={styles.sideTitle}>Statistical Summary</h3>
                        {[
                            { label: "RDI Range", value: "17.9 – 69.1" },
                            { label: "RVI Range", value: "0.0 – 100.0" },
                            { label: "RVI Mean", value: "53.8" },
                            { label: "RVI Std Dev", value: "20.3" },
                            { label: "RDI–RVI Spearman r", value: "0.049" },
                            { label: "PC1 Variance", value: "63.35%" },
                            { label: "KMO Score", value: "0.58" },
                            { label: "Robustness ρ", value: "> 0.90" },
                        ].map((s) => (
                            <div key={s.label} className={styles.statRow}>
                                <span className={styles.statLabel}>{s.label}</span>
                                <span className={styles.statVal}>{s.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sideCard}>
                        <h3 className={styles.sideTitle}>Data Sources</h3>
                        {[
                            { name: "CBS Nepal 2021", desc: "Absentee households & population", url: "https://censusnepal.cbs.gov.np" },
                            { name: "OPHI/DHS 2022", desc: "Multidimensional Poverty Index", url: "https://ophi.org.uk" },
                            { name: "Nepal Rastra Bank", desc: "Remittance inflows, macroeconomic data", url: "https://nrb.org.np" },
                            { name: "World Bank WDI", desc: "Poverty, literacy, GDP indicators", url: "https://data.worldbank.org/country/nepal" },
                            { name: "geoJSON-Nepal", desc: "District boundary shapefiles", url: "https://github.com/mesaugat/geoJSON-Nepal" },
                        ].map((s) => (
                            <div key={s.name} className={styles.sourceRow}>
                                <a href={s.url} target="_blank" rel="noreferrer" className={styles.sourceName}>
                                    {s.name} ↗
                                </a>
                                <p className={styles.sourceDesc}>{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sideCard}>
                        <h3 className={styles.sideTitle}>Tech Stack</h3>
                        {[
                            { name: "React + Vite", role: "Frontend framework" },
                            { name: "Leaflet.js", role: "Choropleth map" },
                            { name: "Recharts", role: "Charts & visualizations" },
                            { name: "CBS Nepal Census", role: "Primary data source" },
                            { name: "Claude Code", role: "AI coding assistant" },
                        ].map((t) => (
                            <div key={t.name} className={styles.techRow}>
                                <span className={styles.techName}>{t.name}</span>
                                <span className={styles.techRole}>{t.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}