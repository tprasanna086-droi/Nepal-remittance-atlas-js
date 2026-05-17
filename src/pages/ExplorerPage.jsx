import { useState } from "react";
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

const TIER_COLORS = {
    Critical: "#C94040",
    High: "#E05C5C",
    Moderate: "#E8A84A",
    Low: "#4ECDC4",
};

export default function ExplorerPage({ districts }) {
    const sorted = [...districts].sort((a, b) =>
        a.district.localeCompare(b.district)
    );
    const [selected, setSelected] = useState(sorted[0]?.district || "");

    const row = districts.find((d) => d.district === selected);
    const natAvg = {
        absent_hh_rate:
            districts.reduce((s, d) => s + d.absent_hh_rate, 0) / districts.length,
        absent_pop_rate:
            districts.reduce((s, d) => s + d.absent_pop_rate, 0) / districts.length,
        pct_secondary_or_higher:
            districts.reduce((s, d) => s + d.pct_secondary_or_higher, 0) /
            districts.length,
        rdi_score:
            districts.reduce((s, d) => s + d.rdi_score, 0) / districts.length,
        literacy_rate_real:
            districts.reduce((s, d) => s + d.literacy_rate_real, 0) /
            districts.length,
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

    const top10 = [...districts]
        .sort((a, b) => b.rdi_score - a.rdi_score)
        .slice(0, 10);

    const diff = row
        ? (row.absent_hh_rate - natAvg.absent_hh_rate).toFixed(1)
        : 0;
    const diffLabel = diff > 0 ? `+${diff}pp above` : `${diff}pp below`;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>District Explorer</h1>
                <p className={styles.sub}>
                    Select any district and compare it against the national average
                </p>
            </div>

            <div className={styles.selectWrap}>
                <select
                    className={styles.select}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    {sorted.map((d) => (
                        <option key={d.district} value={d.district}>
                            {d.district}
                        </option>
                    ))}
                </select>
            </div>

            {row && (
                <>
                    <div className={styles.profileBar}>
                        <div
                            className={styles.tierBadge}
                            style={{ background: TIER_COLORS[row.rdi_tier] }}
                        >
                            {row.rdi_tier} Dependency
                        </div>
                        <h2 className={styles.districtName}>{row.district}</h2>
                        <p className={styles.provinceName}>{row.province} Province</p>
                    </div>

                    <div className={styles.metricsRow}>
                        <div className={styles.metricCard}>
                            <span className={styles.metricVal}>{row.rdi_score.toFixed(1)}</span>
                            <span className={styles.metricKey}>RDI Score</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricVal}>#{row.rdi_rank}</span>
                            <span className={styles.metricKey}>National Rank</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricVal}>{row.absent_hh_rate.toFixed(1)}%</span>
                            <span className={styles.metricKey}>HH Migration Rate</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricVal}>{row.pct_secondary_or_higher.toFixed(1)}%</span>
                            <span className={styles.metricKey}>Secondary Edu %</span>
                        </div>
                        <div className={styles.metricCard}>
                            <span className={styles.metricVal}>{row.literacy_rate_real.toFixed(1)}%</span>
                            <span className={styles.metricKey}>Literacy Rate</span>
                        </div>
                    </div>

                    <div className={styles.insightBanner}>
                        <strong>{row.district}</strong> ranks{" "}
                        <strong>#{row.rdi_rank}/75</strong> in remittance dependency.{" "}
                        <strong>{row.absent_hh_rate.toFixed(1)}%</strong> of households
                        have at least one member abroad —{" "}
                        <strong>{diffLabel}</strong> the national average of{" "}
                        <strong>{natAvg.absent_hh_rate.toFixed(1)}%</strong>.
                    </div>

                    <div className={styles.charts}>
                        <div className={styles.chartCard}>
                            <h3 className={styles.chartTitle}>
                                {row.district} vs National Average
                            </h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="#2E3248" />
                                    <PolarAngleAxis
                                        dataKey="axis"
                                        tick={{ fill: "#8A8FA8", fontSize: 12 }}
                                    />
                                    <Radar
                                        name="National Avg"
                                        dataKey="national"
                                        stroke="#4ECDC4"
                                        fill="#4ECDC4"
                                        fillOpacity={0.1}
                                        strokeDasharray="4 4"
                                        strokeWidth={2}
                                    />
                                    <Radar
                                        name={row.district}
                                        dataKey="district"
                                        stroke="#E8C547"
                                        fill="#E8C547"
                                        fillOpacity={0.2}
                                        strokeWidth={2}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#1A1D27",
                                            border: "1px solid #2E3248",
                                            borderRadius: 8,
                                            color: "#F0F0F0",
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                            <div className={styles.radarLegend}>
                                <span className={styles.legendItem}>
                                    <span className={styles.legendLine} style={{ background: "#E8C547" }} />
                                    {row.district}
                                </span>
                                <span className={styles.legendItem}>
                                    <span className={styles.legendLine} style={{ background: "#4ECDC4", opacity: 0.6 }} />
                                    National Average
                                </span>
                            </div>
                        </div>

                        <div className={styles.chartCard}>
                            <h3 className={styles.chartTitle}>Top 10 Districts by RDI</h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart
                                    data={top10}
                                    layout="vertical"
                                    margin={{ left: 16, right: 32, top: 8, bottom: 8 }}
                                >
                                    <XAxis
                                        type="number"
                                        tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                        axisLine={{ stroke: "#2E3248" }}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        type="category"
                                        dataKey="district"
                                        tick={{ fill: "#F0F0F0", fontSize: 12 }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={80}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "#1A1D27",
                                            border: "1px solid #2E3248",
                                            borderRadius: 8,
                                            color: "#F0F0F0",
                                        }}
                                        formatter={(v) => [v.toFixed(1), "RDI Score"]}
                                    />
                                    <Bar dataKey="rdi_score" radius={[0, 6, 6, 0]}>
                                        {top10.map((d) => (
                                            <Cell
                                                key={d.district}
                                                fill={
                                                    d.district === selected
                                                        ? "#E8C547"
                                                        : TIER_COLORS[d.rdi_tier]
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}