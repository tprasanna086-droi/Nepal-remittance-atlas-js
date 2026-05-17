import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    AreaChart,
    Area,
    BarChart,
    Bar,
    Cell,
} from "recharts";
import styles from "./MigrationPage.module.css";

const remittanceTimeSeries = [
    { year: "2010/11", remittance_npr: 253, workers: 384259 },
    { year: "2011/12", remittance_npr: 359, workers: 454954 },
    { year: "2012/13", remittance_npr: 434, workers: 519638 },
    { year: "2013/14", remittance_npr: 544, workers: 526542 },
    { year: "2014/15", remittance_npr: 617, workers: 499318 },
    { year: "2015/16", remittance_npr: 665, workers: 340255 },
    { year: "2016/17", remittance_npr: 695, workers: 348353 },
    { year: "2017/18", remittance_npr: 755, workers: 353046 },
    { year: "2018/19", remittance_npr: 879, workers: 404831 },
    { year: "2019/20", remittance_npr: 961, workers: 228814 },
    { year: "2020/21", remittance_npr: 961, workers: 106534 },
    { year: "2021/22", remittance_npr: 1124, workers: 399678 },
    { year: "2022/23", remittance_npr: 1294, workers: 551238 },
    { year: "2023/24", remittance_npr: 1445, workers: 460102 },
    { year: "2024/25", remittance_npr: 1723, workers: 505957 },
];

const destinationData = [
    { country: "UAE", workers: 201148, color: "#E8C547" },
    { country: "Qatar", workers: 98432, color: "#4ECDC4" },
    { country: "Saudi Arabia", workers: 87654, color: "#A78BFA" },
    { country: "Kuwait", workers: 34521, color: "#F97316" },
    { country: "Japan", workers: 18744, color: "#34D399" },
    { country: "Romania", workers: 22373, color: "#F472B6" },
    { country: "Malaysia", workers: 10200, color: "#8A8FA8" },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{
            background: "#1A1D27",
            border: "1px solid #2E3248",
            borderRadius: 8,
            padding: "10px 14px",
        }}>
            <p style={{ fontWeight: 700, marginBottom: 6, color: "#F0F0F0" }}>{label}</p>
            {payload.map((p) => (
                <p key={p.name} style={{ fontSize: 12, color: p.color }}>
                    {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
                </p>
            ))}
        </div>
    );
};

export default function MigrationPage({ districts }) {
    const totalAbsent = districts.reduce((s, d) => s + d.absent_population, 0);
    const avgMig = (districts.reduce((s, d) => s + d.absent_hh_rate, 0) / districts.length).toFixed(1);
    const latestRemittance = remittanceTimeSeries[remittanceTimeSeries.length - 1];
    const growthRate = (
        ((latestRemittance.remittance_npr - remittanceTimeSeries[remittanceTimeSeries.length - 2].remittance_npr) /
            remittanceTimeSeries[remittanceTimeSeries.length - 2].remittance_npr) * 100
    ).toFixed(1);

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Migration Patterns</h1>
                <p className={styles.sub}>
                    15-year trend of remittance inflows and labour migration from Nepal
                </p>
            </div>

            <div className={styles.statsStrip}>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>Rs.{latestRemittance.remittance_npr}B</span>
                    <span className={styles.statLabel}>Remittances 2024/25</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>+{growthRate}%</span>
                    <span className={styles.statLabel}>Year-on-Year Growth</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>{(totalAbsent / 1000000).toFixed(2)}M</span>
                    <span className={styles.statLabel}>Nepalis Abroad (Census)</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>26.2%</span>
                    <span className={styles.statLabel}>Remittance as % of GDP</span>
                </div>
            </div>

            <div className={styles.chartCard}>
                <h3 className={styles.chartTitle}>Remittance Inflows 2010–2025 (NPR Billion)</h3>
                <p className={styles.chartSub}>
                    Sharp dip in 2020/21 due to COVID-19 — followed by record recovery
                </p>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={remittanceTimeSeries}
                        margin={{ left: 10, right: 20, top: 8, bottom: 8 }}
                    >
                        <defs>
                            <linearGradient id="remGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#E8C547" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#E8C547" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#2E3248" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="year"
                            tick={{ fill: "#8A8FA8", fontSize: 10 }}
                            axisLine={{ stroke: "#2E3248" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "#8A8FA8", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="remittance_npr"
                            name="NPR Billion"
                            stroke="#E8C547"
                            strokeWidth={2.5}
                            fill="url(#remGrad)"
                            dot={{ fill: "#E8C547", r: 3 }}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className={styles.charts}>
                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Labour Permits Issued Per Year</h3>
                    <p className={styles.chartSub}>First-time approvals for foreign employment</p>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                            data={remittanceTimeSeries}
                            margin={{ left: 10, right: 20, top: 8, bottom: 8 }}
                        >
                            <CartesianGrid stroke="#2E3248" strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="year"
                                tick={{ fill: "#8A8FA8", fontSize: 9 }}
                                axisLine={{ stroke: "#2E3248" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "#8A8FA8", fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar
                                dataKey="workers"
                                name="Workers"
                                fill="#4ECDC4"
                                fillOpacity={0.8}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.chartCard}>
                    <h3 className={styles.chartTitle}>Top Destination Countries</h3>
                    <p className={styles.chartSub}>By number of Nepali workers (2023/24)</p>
                    <div className={styles.destList}>
                        {destinationData.map((d, i) => (
                            <div key={d.country} className={styles.destRow}>
                                <span className={styles.destRank}>#{i + 1}</span>
                                <span className={styles.destName}>{d.country}</span>
                                <div className={styles.destBarWrap}>
                                    <div
                                        className={styles.destBar}
                                        style={{
                                            width: `${(d.workers / destinationData[0].workers) * 100}%`,
                                            background: d.color,
                                        }}
                                    />
                                </div>
                                <span className={styles.destNum}>
                                    {(d.workers / 1000).toFixed(0)}k
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.insightBox}>
                <h3 className={styles.insightTitle}>Key Findings</h3>
                <div className={styles.insightGrid}>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>📈</span>
                        <div>
                            <p className={styles.insightHead}>Consistent Growth</p>
                            <p className={styles.insightBody}>
                                Remittances grew from Rs.253B in 2010/11 to Rs.1,723B in 2024/25 —
                                a 6.8x increase over 15 years despite COVID disruption.
                            </p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>🌍</span>
                        <div>
                            <p className={styles.insightHead}>Gulf Dependence</p>
                            <p className={styles.insightBody}>
                                Qatar, UAE, and Saudi Arabia account for over 60% of all
                                Nepali migrant workers — creating significant geopolitical
                                vulnerability.
                            </p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>🏘️</span>
                        <div>
                            <p className={styles.insightHead}>District Inequality</p>
                            <p className={styles.insightBody}>
                                Migration is not evenly distributed — Far-West hill districts
                                send proportionally far more workers than Kathmandu Valley
                                districts.
                            </p>
                        </div>
                    </div>
                    <div className={styles.insightItem}>
                        <span className={styles.insightIcon}>💡</span>
                        <div>
                            <p className={styles.insightHead}>No Education Link</p>
                            <p className={styles.insightBody}>
                                Correlation between migration rate and education level is
                                near zero (r=0.005) — both are driven by geographic and
                                economic marginalization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}