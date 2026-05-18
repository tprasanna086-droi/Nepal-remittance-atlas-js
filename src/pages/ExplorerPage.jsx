import { useState, useEffect } from "react";
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";
import styles from "./ExplorerPage.module.css";

const RDI_COLORS = {
    Critical: "#C94040",
    High: "#E05C5C",
    Moderate: "#E8A84A",
    Low: "#4ECDC4",
};

const RVI_COLORS = {
    Critical: "#7B2D8B",
    High: "#9B59B6",
    Moderate: "#F4A460",
    Low: "#3CB371",
};

function RVIGauge({ score, tier }) {
    const pct = Math.min(Math.max(score, 0), 100);
    const color = RVI_COLORS[tier] || "#9B59B6";

    return (
        <div className={styles.gaugeWrap}>
            <svg width="240" height="130" viewBox="0 0 240 130">
                <path d="M 20 120 A 100 100 0 0 1 220 120" fill="none" stroke="#e0e0e0" strokeWidth="18" strokeLinecap="round" />
                <path d="M 20 120 A 100 100 0 0 1 220 120" fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" strokeDasharray={`${(pct / 100) * 314} 314`} />
                <text x="120" y="95" textAnchor="middle" fill="#000000" fontSize="30" fontWeight="800" fontFamily="Playfair Display, serif">
                    {score.toFixed(1)}
                </text>
                <text x="120" y="118" textAnchor="middle" fill={color} fontSize="12" fontWeight="700">
                    {tier} Vulnerability
                </text>
                <text x="20" y="138" textAnchor="middle" fill="#666666" fontSize="11">0</text>
                <text x="220" y="138" textAnchor="middle" fill="#666666" fontSize="11">100</text>
            </svg>
            <p className={styles.gaugeLabel}>RVI Score — Structural Vulnerability</p>
        </div>
    );
}

export default function ExplorerPage({ districts }) {
    const sorted = [...districts].sort((a, b) => a.district.localeCompare(b.district));
    const [selected, setSelected] = useState(sorted[0]?.district || "");

    useEffect(() => {
        function handleSearch(e) {
            const name = e.detail;
            const found = districts.find(d => d.district.toLowerCase() === name.toLowerCase());
            if (found) setSelected(found.district);
        }
        window.addEventListener("atlasSearch", handleSearch);
        if (window.__atlasSearchDistrict) {
            const found = districts.find(d => d.district.toLowerCase() === window.__atlasSearchDistrict.toLowerCase());
            if (found) { setSelected(found.district); window.__atlasSearchDistrict = null; }
        }
        return () => window.removeEventListener("atlasSearch", handleSearch);
    }, [districts]);

    const row = districts.find((d) => d.district === selected);

    const natAvg = {
        absent_hh_rate: districts.reduce((s, d) => s + d.absent_hh_rate, 0) / districts.length,
        absent_pop_rate: districts.reduce((s, d) => s + d.absent_pop_rate, 0) / districts.length,
        pct_secondary_or_higher: districts.reduce((s, d) => s + d.pct_secondary_or_higher, 0) / districts.length,
        rdi_score: districts.reduce((s, d) => s + d.rdi_score, 0) / districts.length,
        literacy_rate_real: districts.reduce((s, d) => s + d.literacy_rate_real, 0) / districts.length,
        rvi_final_score: districts.reduce((s, d) => s + d.rvi_final_score, 0) / districts.length,
        mpi_headcount_proxy: districts.reduce((s, d) => s + d.mpi_headcount_proxy, 0) / districts.length,
    };

    function norm(val, key) {
        const mn = Math.min(...districts.map((d) => d[key]));
        const mx = Math.max(...districts.map((d) => d[key]));
        return mx === mn ? 50 : ((val - mn) / (mx - mn)) * 100;
    }

    const radarData = [
        { axis: "HH Migration", district: norm(row?.absent_hh_rate, "absent_hh_rate"), national: norm(natAvg.absent_hh_rate, "absent_hh_rate") },
        { axis: "Absent Pop %", district: norm(row?.absent_pop_rate, "absent_pop_rate"), national: norm(natAvg.absent_pop_rate, "absent_pop_rate") },
        { axis: "Education", district: norm(row?.pct_secondary_or_higher, "pct_secondary_or_higher"), national: norm(natAvg.pct_secondary_or_higher, "pct_secondary_or_higher") },
        { axis: "RDI Score", district: norm(row?.rdi_score, "rdi_score"), national: norm(natAvg.rdi_score, "rdi_score") },
        { axis: "Literacy", district: norm(row?.literacy_rate_real, "literacy_rate_real"), national: norm(natAvg.literacy_rate_real, "literacy_rate_real") },
    ];

    const top10RVI = [...districts].sort((a, b) => b.rvi_final_score - a.rvi_final_score).slice(0, 10);

    const diff = row ? (row.absent_hh_rate - natAvg.absent_hh_rate).toFixed(1) : 0;
    const diffLabel = diff > 0 ? `+${diff}pp above` : `${diff}pp below`;
    const rviDiff = row ? (row.rvi_final_score - natAvg.rvi_final_score).toFixed(1) : 0;
    const rviDiffLabel = rviDiff > 0 ? `+${rviDiff} above` : `${rviDiff} below`;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>District Explorer</h1>
                <p className={styles.sub}>Select any district to see both its Migration Dependency (RDI) and Structural Vulnerability (RVI)</p>
            </div>

            <div className={styles.selectWrap}>
                <select className={styles.select} value={selected} onChange={(e) => setSelected(e.target.value)}>
                    {sorted.map((d) => (
                        <option key={d.district} value={d.district}>{d.district}</option>
                    ))}
                </select>
            </div>

            {row && (
                <>
                    <div className={styles.profileBar}>
                        <div className={styles.badgeRow}>
                            <div className={styles.tierBadge} style={{ background: RDI_COLORS[row.rdi_tier] }}>RDI: {row.rdi_tier}</div>
                            <div className={styles.tierBadge} style={{ background: RVI_COLORS[row.rvi_final_tier] }}>RVI: {row.rvi_final_tier}</div>
                        </div>
                        <h2 className={styles.districtName}>{row.district}</h2>
                        <p className={styles.provinceName}>{row.province} Province</p>
                    </div>

                    <div className={styles.twoCol}>
                        <div className={styles.leftCol}>
                            <div className={styles.sectionLabel}>Migration Dependency (RDI)</div>
                            <div className={styles.metricsRow}>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal} style={{ color: RDI_COLORS[row.rdi_tier] }}>{row.rdi_score.toFixed(1)}</span>
                                    <span className={styles.metricKey}>RDI Score</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>#{row.rdi_rank}</span>
                                    <span className={styles.metricKey}>RDI Rank</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>{row.absent_hh_rate.toFixed(1)}%</span>
                                    <span className={styles.metricKey}>HH Migration</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>{row.absent_pop_rate.toFixed(1)}%</span>
                                    <span className={styles.metricKey}>Pop Abroad</span>
                                </div>
                            </div>

                            <div className={styles.insightBanner}>
                                <strong>{row.district}</strong> ranks <strong>#{row.rdi_rank}/75</strong> in migration intensity.{" "}
                                <strong>{row.absent_hh_rate.toFixed(1)}%</strong> of households have a member abroad —{" "}
                                <strong>{diffLabel}</strong> the national average of <strong>{natAvg.absent_hh_rate.toFixed(1)}%</strong>.
                            </div>

                            <div className={styles.sectionLabel} style={{ marginTop: 20 }}>Structural Vulnerability (RVI)</div>
                            <div className={styles.metricsRow}>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal} style={{ color: RVI_COLORS[row.rvi_final_tier] }}>{row.rvi_final_score.toFixed(1)}</span>
                                    <span className={styles.metricKey}>RVI Score</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>#{row.rvi_final_rank}</span>
                                    <span className={styles.metricKey}>RVI Rank</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>{row.mpi_headcount_proxy.toFixed(1)}%</span>
                                    <span className={styles.metricKey}>MPI Poverty</span>
                                </div>
                                <div className={styles.metricCard}>
                                    <span className={styles.metricVal}>{row.literacy_rate_real.toFixed(1)}%</span>
                                    <span className={styles.metricKey}>Literacy Rate</span>
                                </div>
                            </div>

                            <div className={styles.insightBanner} style={{ borderLeftColor: RVI_COLORS[row.rvi_final_tier] }}>
                                <strong>{row.district}</strong> ranks <strong>#{row.rvi_final_rank}/75</strong> in structural vulnerability.{" "}
                                RVI score of <strong>{row.rvi_final_score.toFixed(1)}</strong> is{" "}
                                <strong>{rviDiffLabel}</strong> the national average of <strong>{natAvg.rvi_final_score.toFixed(1)}</strong>.
                            </div>

                            <div className={styles.independenceBox}>
                                <span className={styles.independenceIcon}>🔬</span>
                                <div>
                                    <p className={styles.independenceHead}>RDI ≠ RVI — Statistical Independence</p>
                                    <p className={styles.independenceBody}>
                                        Spearman r = 0.049 (p &gt; 0.05). A district's migration intensity does not predict its structural vulnerability. These are two distinct dimensions requiring different policy responses.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.rightCol}>
                            <RVIGauge score={row.rvi_final_score} tier={row.rvi_final_tier} />
                            <div className={styles.chartCard}>
                                <h3 className={styles.chartTitle}>RDI Profile vs National Average</h3>
                                <ResponsiveContainer width="100%" height={260}>
                                    <RadarChart data={radarData}>
                                        <PolarGrid stroke="#e0e0e0" />
                                        <PolarAngleAxis dataKey="axis" tick={{ fill: "#333333", fontSize: 11 }} />
                                        <Radar name="National Avg" dataKey="national" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.1} strokeDasharray="4 4" strokeWidth={2} />
                                        <Radar name={row.district} dataKey="district" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} strokeWidth={2} />
                                        <Tooltip contentStyle={{ background: "#ffffff", border: "1.6px solid #e0e0e0", borderRadius: 8, color: "#000000" }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                                <div className={styles.radarLegend}>
                                    <span className={styles.legendItem}>
                                        <span className={styles.legendLine} style={{ background: "#ef4444" }} />{row.district}
                                    </span>
                                    <span className={styles.legendItem}>
                                        <span className={styles.legendLine} style={{ background: "#4ECDC4" }} />National Average
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.chartCardFull}>
                        <h3 className={styles.chartTitle}>Top 10 Most Structurally Vulnerable Districts (RVI)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={top10RVI} layout="vertical" margin={{ left: 16, right: 32, top: 8, bottom: 8 }}>
                                <XAxis type="number" tick={{ fill: "#666666", fontSize: 11 }} axisLine={{ stroke: "#e0e0e0" }} tickLine={false} domain={[0, 100]} />
                                <YAxis type="category" dataKey="district" tick={{ fill: "#000000", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                                <Tooltip contentStyle={{ background: "#ffffff", border: "1.6px solid #e0e0e0", borderRadius: 8, color: "#000000" }} formatter={(v) => [v.toFixed(1), "RVI Score"]} />
                                <Bar dataKey="rvi_final_score" radius={[0, 6, 6, 0]}>
                                    {top10RVI.map((d) => (
                                        <Cell key={d.district} fill={d.district === selected ? "#ef4444" : RVI_COLORS[d.rvi_final_tier]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </div>
    );
}