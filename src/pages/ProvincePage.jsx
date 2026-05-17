import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ScatterChart,
    Scatter,
    ZAxis,
} from "recharts";
import styles from "./ProvincePage.module.css";

const PROVINCE_COLORS = {
    Koshi: "#4ECDC4",
    Madhesh: "#E05C5C",
    Bagmati: "#E8C547",
    Gandaki: "#A78BFA",
    Lumbini: "#F97316",
    Karnali: "#34D399",
    Sudurpashchim: "#F472B6",
};

export default function ProvincePage({ districts }) {
    const provinces = [...new Set(districts.map((d) => d.province))].sort();

    const provinceStats = provinces.map((prov) => {
        const ds = districts.filter((d) => d.province === prov);
        return {
            province: prov,
            avgRDI: ds.reduce((s, d) => s + d.rdi_score, 0) / ds.length,
            avgMig: ds.reduce((s, d) => s + d.absent_hh_rate, 0) / ds.length,
            avgEdu: ds.reduce((s, d) => s + d.pct_secondary_or_higher, 0) / ds.length,
            highCount: ds.filter((d) => d.rvi_final_tier === "High" || d.rvi_final_tier === "Critical").length,
            avgRVI: ds.reduce((s, d) => s + d.rvi_final_score, 0) / ds.length,
            totalAbsent: ds.reduce((s, d) => s + d.absent_population, 0),
            districtCount: ds.length,
            districts: ds,
        };
    });

    const scatterData = districts.map((d) => ({
        x: d.absent_hh_rate,
        y: d.pct_secondary_or_higher,
        z: d.rdi_score,
        name: d.district,
        province: d.province,
    }));

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Provincial Analysis</h1>
                <p className={styles.sub}>
                    How remittance dependency varies across Nepal's 7 provinces
                </p>
            </div>

            <div className={styles.provinceGrid}>
                {provinceStats.map((p) => (
                    <div
                        key={p.province}
                        className={styles.provinceCard}
                        style={{ borderTop: `3px solid ${PROVINCE_COLORS[p.province] || "#888"}` }}
                    >
                        <div className={styles.provinceHeader}>
                            <span
                                className={styles.provinceDot}
                                style={{ background: PROVINCE_COLORS[p.province] || "#888" }}
                            />
                            <h3 className={styles.provinceName}>{p.province}</h3>
                        </div>
                        <div className={styles.provinceStat}>
                            <span className={styles.provinceVal}>{p.avgRDI.toFixed(1)}</span>
                            <span className={styles.provinceKey}>Avg RDI</span>
                        </div>
                        <div className={styles.provinceStat}>
                            <span className={styles.provinceVal}>{p.avgRVI.toFixed(1)}</span>
                            <span className={styles.provinceKey}>Avg RVI</span>
                        </div>
                        <div className={styles.provinceStat}>
                            <span className={styles.provinceVal}>{p.highCount}</span>
                            <span className={styles.provinceKey}>High/Critical RVI</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.charts}>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Average RDI Score by Province</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={provinceStats}
                            margin={{ left: 0, right: 20, top: 8, bottom: 8 }}
                        >
                            <XAxis
                                dataKey="province"
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={{ stroke: "#2E3248" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "#1A1D27",
                                    border: "1px solid #2E3248",
                                    borderRadius: 8,
                                    color: "#F0F0F0",
                                }}
                                formatter={(v) => [v.toFixed(1), "Avg RDI"]}
                            />
                            <Bar dataKey="avgRDI" radius={[6, 6, 0, 0]}>
                                {provinceStats.map((p) => (
                                    <Cell
                                        key={p.province}
                                        fill={PROVINCE_COLORS[p.province] || "#888"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Average Household Migration % by Province</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={provinceStats}
                            margin={{ left: 0, right: 20, top: 8, bottom: 8 }}
                        >
                            <XAxis
                                dataKey="province"
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={{ stroke: "#2E3248" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "#1A1D27",
                                    border: "1px solid #2E3248",
                                    borderRadius: 8,
                                    color: "#F0F0F0",
                                }}
                                formatter={(v) => [v.toFixed(1) + "%", "Avg Migration"]}
                            />
                            <Bar dataKey="avgMig" radius={[6, 6, 0, 0]}>
                                {provinceStats.map((p) => (
                                    <Cell
                                        key={p.province}
                                        fill={PROVINCE_COLORS[p.province] || "#888"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Average RVI Score by Province</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={provinceStats}
                            margin={{ left: 0, right: 20, top: 8, bottom: 8 }}
                        >
                            <XAxis
                                dataKey="province"
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={{ stroke: "#2E3248" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    background: "#1A1D27",
                                    border: "1px solid #2E3248",
                                    borderRadius: 8,
                                    color: "#F0F0F0",
                                }}
                                formatter={(v) => [v.toFixed(1), "Avg RVI"]}
                            />
                            <Bar dataKey="avgRVI" radius={[6, 6, 0, 0]}>
                                {provinceStats.map((p) => (
                                    <Cell
                                        key={p.province}
                                        fill={PROVINCE_COLORS[p.province] || "#888"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className={styles.chartCardFull}>
                <h3 className={styles.chartTitle}>
                    Migration Rate vs Education Level — All 75 Districts
                </h3>
                <p className={styles.chartSub}>
                    Bubble size = RDI Score · No significant correlation found (r = 0.005)
                </p>
                <ResponsiveContainer width="100%" height={380}>
                    <ScatterChart margin={{ left: 20, right: 20, top: 8, bottom: 20 }}>
                        <XAxis
                            type="number"
                            dataKey="x"
                            name="HH Migration %"
                            tick={{ fill: "#8A8FA8", fontSize: 11 }}
                            axisLine={{ stroke: "#2E3248" }}
                            tickLine={false}
                            label={{
                                value: "Household Migration Rate (%)",
                                position: "insideBottom",
                                offset: -10,
                                fill: "#8A8FA8",
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="y"
                            name="Education %"
                            tick={{ fill: "#8A8FA8", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            label={{
                                value: "Secondary Education (%)",
                                angle: -90,
                                position: "insideLeft",
                                fill: "#8A8FA8",
                                fontSize: 12,
                            }}
                        />
                        <ZAxis type="number" dataKey="z" range={[40, 200]} />
                        <Tooltip
                            contentStyle={{
                                background: "#1A1D27",
                                border: "1px solid #2E3248",
                                borderRadius: 8,
                                color: "#F0F0F0",
                            }}
                            content={({ payload }) => {
                                if (!payload?.length) return null;
                                const d = payload[0].payload;
                                return (
                                    <div style={{ padding: "10px 14px" }}>
                                        <p style={{ fontWeight: 700, marginBottom: 4 }}>{d.name}</p>
                                        <p style={{ fontSize: 12, color: "#8A8FA8" }}>
                                            Migration: {d.x.toFixed(1)}%
                                        </p>
                                        <p style={{ fontSize: 12, color: "#8A8FA8" }}>
                                            Education: {d.y.toFixed(1)}%
                                        </p>
                                        <p style={{ fontSize: 12, color: "#E8C547" }}>
                                            RDI: {d.z.toFixed(1)}
                                        </p>
                                    </div>
                                );
                            }}
                        />
                        <Scatter
                            data={scatterData}
                            fill="#E8C547"
                            fillOpacity={0.7}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}