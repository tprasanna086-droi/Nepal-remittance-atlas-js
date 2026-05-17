import { useEffect, useRef, useState } from "react";
import styles from "./AtlasPage.module.css";

const TIER_COLORS = {
    Critical: "#C94040",
    High: "#E05C5C",
    Moderate: "#E8A84A",
    Low: "#4ECDC4",
};

function getColor(score) {
    if (score >= 60) return TIER_COLORS.Critical;
    if (score >= 45) return TIER_COLORS.High;
    if (score >= 25) return TIER_COLORS.Moderate;
    return TIER_COLORS.Low;
}

export default function AtlasPage({ districts, geojson }) {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (!geojson || !districts.length) return;
        if (mapInstanceRef.current) return;

        import("leaflet").then((L) => {
            const map = L.map(mapRef.current, {
                center: [28.4, 84.1],
                zoom: 7,
                zoomControl: true,
                scrollWheelZoom: true,
            });

            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
                {
                    attribution: "© CartoDB",
                    subdomains: "abcd",
                    maxZoom: 19,
                }
            ).addTo(map);

            const districtMap = {};
            districts.forEach((d) => {
                districtMap[d.district.toLowerCase()] = d;
            });

            L.geoJSON(geojson, {
                style: (feature) => {
                    const name = (
                        feature.properties.DISTRICT ||
                        feature.properties.district ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    const match = Object.keys(districtMap).find(
                        (k) => k === name || name.includes(k) || k.includes(name)
                    );

                    const data = match ? districtMap[match] : null;
                    const score = data ? data.rdi_score : 0;

                    return {
                        fillColor: getColor(score),
                        fillOpacity: 0.75,
                        color: "#0F1117",
                        weight: 1,
                    };
                },
                onEachFeature: (feature, layer) => {
                    const name = (
                        feature.properties.DISTRICT ||
                        feature.properties.district ||
                        ""
                    )
                        .trim()
                        .toLowerCase();

                    const match = Object.keys(districtMap).find(
                        (k) => k === name || name.includes(k) || k.includes(name)
                    );

                    const data = match ? districtMap[match] : null;

                    layer.on({
                        mouseover: (e) => {
                            e.target.setStyle({ fillOpacity: 1, weight: 2, color: "#E8C547" });
                            if (data) setSelected(data);
                        },
                        mouseout: (e) => {
                            e.target.setStyle({ fillOpacity: 0.75, weight: 1, color: "#0F1117" });
                        },
                        click: (e) => {
                            if (data) setSelected(data);
                        },
                    });

                    if (data) {
                        layer.bindTooltip(
                            `<strong>${data.district}</strong><br/>RDI: ${data.rdi_score.toFixed(1)} — ${data.rdi_tier}`,
                            { sticky: true, className: "atlas-tooltip" }
                        );
                    }
                },
            }).addTo(map);

            mapInstanceRef.current = map;
        });

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [geojson, districts]);

    const top5 = [...districts]
        .sort((a, b) => b.rdi_score - a.rdi_score)
        .slice(0, 5);

    const totalAbsent = districts.reduce((s, d) => s + d.absent_population, 0);
    const highCount = districts.filter((d) => d.rdi_tier === "High" || d.rdi_tier === "Critical").length;
    const avgMig = (districts.reduce((s, d) => s + d.absent_hh_rate, 0) / districts.length).toFixed(1);

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>Nepal Remittance Dependency Atlas</h1>
                <p className={styles.heroSub}>
                    Mapping how $8B+ in annual remittances shape the economic fabric of 75 districts
                </p>
            </div>

            <div className={styles.statsStrip}>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>75</span>
                    <span className={styles.statLabel}>Districts Mapped</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>{avgMig}%</span>
                    <span className={styles.statLabel}>Avg Household Migration</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>{highCount}</span>
                    <span className={styles.statLabel}>High + Critical Districts</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statNum}>{(totalAbsent / 1000000).toFixed(2)}M</span>
                    <span className={styles.statLabel}>Total Absent Population</span>
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.mapWrap}>
                    <div ref={mapRef} className={styles.map} />
                    <div className={styles.legend}>
                        {Object.entries(TIER_COLORS).map(([tier, color]) => (
                            <div key={tier} className={styles.legendItem}>
                                <span className={styles.legendDot} style={{ background: color }} />
                                <span className={styles.legendLabel}>{tier}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.sidebar}>
                    {selected ? (
                        <div className={styles.infoCard}>
                            <div
                                className={styles.infoTier}
                                style={{ background: TIER_COLORS[selected.rdi_tier] }}
                            >
                                {selected.rdi_tier} Dependency
                            </div>
                            <h2 className={styles.infoName}>{selected.district}</h2>
                            <p className={styles.infoProvince}>{selected.province} Province</p>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoStat}>
                                    <span className={styles.infoVal}>{selected.rdi_score.toFixed(1)}</span>
                                    <span className={styles.infoKey}>RDI Score</span>
                                </div>
                                <div className={styles.infoStat}>
                                    <span className={styles.infoVal}>#{selected.rdi_rank}</span>
                                    <span className={styles.infoKey}>National Rank</span>
                                </div>
                                <div className={styles.infoStat}>
                                    <span className={styles.infoVal}>{selected.absent_hh_rate.toFixed(1)}%</span>
                                    <span className={styles.infoKey}>HH Migration Rate</span>
                                </div>
                                <div className={styles.infoStat}>
                                    <span className={styles.infoVal}>{selected.pct_secondary_or_higher.toFixed(1)}%</span>
                                    <span className={styles.infoKey}>Secondary Edu %</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.infoPlaceholder}>
                            <span className={styles.infoPlaceholderIcon}>🗺️</span>
                            <p>Hover over or click a district to see its details</p>
                        </div>
                    )}

                    <div className={styles.top5}>
                        <h3 className={styles.top5Title}>Top 5 Most Dependent</h3>
                        {top5.map((d, i) => (
                            <div key={d.district} className={styles.top5Row}>
                                <span className={styles.top5Rank}>#{i + 1}</span>
                                <span className={styles.top5Name}>{d.district}</span>
                                <span
                                    className={styles.top5Score}
                                    style={{ color: TIER_COLORS[d.rdi_tier] }}
                                >
                                    {d.rdi_score.toFixed(1)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}