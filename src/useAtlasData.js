import { useState, useEffect } from "react";
import Papa from "papaparse";

export function useAtlasData() {
    const [districts, setDistricts] = useState([]);
    const [geojson, setGeojson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                // Load CSV
                const csvRes = await fetch("/data/district_master.csv");
                const csvText = await csvRes.text();
                const parsed = Papa.parse(csvText, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                });

                const cleaned = parsed.data.map((d) => ({
                    district: String(d.district || "").trim(),
                    province: String(d.province || "").trim(),
                    rdi_score: Number(d.rdi_score) || 0,
                    rdi_tier: String(d.rdi_tier || "Low").trim(),
                    rdi_rank: Number(d.rdi_rank) || 0,
                    absent_hh_rate: Number(d.absent_hh_rate) || 0,
                    absent_population: Number(d.absent_population) || 0,
                    absent_pop_rate: Number(d.absent_pop_rate) || 0,
                    pct_secondary_or_higher: Number(d.pct_secondary_or_higher) || 0,
                    literacy_rate_real: Number(d.literacy_rate_real) || 0,
                    mpi_headcount_proxy: Number(d.mpi_headcount_proxy) || 0,
                    total_households: Number(d.total_households) || 0,
                }));

                // Load GeoJSON
                const geoRes = await fetch("/data/nepal-districts.geojson");
                const geoData = await geoRes.json();

                setDistricts(cleaned);
                setGeojson(geoData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    return { districts, geojson, loading, error };
}