import { useEffect, useRef, useState } from "react";
import { Globe2, Users, CalendarCheck, TrendingUp, Lock } from "lucide-react";

const PASS_KEY = "fx_admin_auth";
const DEFAULT_PASS = "flexadmin2026";

interface Stats {
  total: number;
  today: number;
  byCountry: { country: string | null; countryCode: string | null; visits: number }[];
  byDay: { day: string; visits: number }[];
}

interface Location {
  lat: number;
  lng: number;
  country: string;
  countryCode: string;
  visits: number;
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function FlagEmoji({ code }: { code: string | null }) {
  if (!code || code === "XX") return <span>🌐</span>;
  const chars = [...code.toUpperCase()].map((c) => String.fromCodePoint(c.codePointAt(0)! + 127397));
  return <span>{chars.join("")}</span>;
}

function MiniBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-orange-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

// Simple SVG world map — dots for visited locations
function GlobeMap({ locations }: { locations: Location[] }) {
  const GlobeComponent = useRef<React.ComponentType<Record<string, unknown>> | null>(null);
  const [GlobeLoaded, setGlobeLoaded] = useState(false);
  const [dims, setDims] = useState({ w: 600, h: 500 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("react-globe.gl").then((mod) => {
      GlobeComponent.current = (mod.default ?? mod) as React.ComponentType<Record<string, unknown>>;
      setGlobeLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: Math.max(height, 380) });
    });
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  const points = locations.map((l) => ({
    lat: l.lat,
    lng: l.lng,
    size: Math.min(0.4 + l.visits * 0.08, 1.2),
    color: "#f97316",
    label: `${l.country}: ${l.visits} visita${l.visits !== 1 ? "s" : ""}`,
  }));

  if (!GlobeLoaded || !GlobeComponent.current) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-400 text-sm">
        Cargando globo…
      </div>
    );
  }

  const G = GlobeComponent.current;

  return (
    <div ref={wrapRef} className="w-full" style={{ height: 420 }}>
      <G
        width={dims.w}
        height={dims.h}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.06}
        pointLabel="label"
        atmosphereColor="#f97316"
        atmosphereAltitude={0.18}
      />
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");

  useEffect(() => {
    Promise.all([
      fetch(`${BASE}/api/analytics/stats`).then((r) => r.json()),
      fetch(`${BASE}/api/analytics/locations`).then((r) => r.json()),
    ])
      .then(([s, l]) => {
        setStats(s as Stats);
        setLocations(l as Location[]);
      })
      .finally(() => setLoading(false));
  }, [BASE]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">Cargando estadísticas…</div>
      </div>
    );
  }

  const maxCountry = stats?.byCountry[0]?.visits ?? 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <Globe2 className="text-orange-500 w-6 h-6" />
        <h1 className="text-xl font-bold text-gray-800">Panel de visitas · FlexSolution</h1>
        <span className="ml-auto text-xs text-gray-400">/admin</span>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Users className="text-white w-6 h-6" />}
            label="Visitas totales"
            value={stats?.total ?? 0}
            color="bg-orange-500"
          />
          <StatCard
            icon={<CalendarCheck className="text-white w-6 h-6" />}
            label="Visitas hoy"
            value={stats?.today ?? 0}
            color="bg-sky-500"
          />
          <StatCard
            icon={<TrendingUp className="text-white w-6 h-6" />}
            label="Países distintos"
            value={stats?.byCountry.filter((c) => c.country && c.countryCode !== "XX").length ?? 0}
            color="bg-emerald-500"
          />
        </div>

        {/* Globe */}
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 pt-5 pb-2">
            <h2 className="text-white font-semibold text-base">Origen de las visitas</h2>
            <p className="text-gray-400 text-xs mt-0.5">Cada punto representa visitas desde esa ubicación</p>
          </div>
          {locations.length === 0 ? (
            <div className="flex items-center justify-center h-80 text-gray-500 text-sm">
              Aún no hay datos de ubicación suficientes. ¡Las visitas irán apareciendo aquí!
            </div>
          ) : (
            <GlobeMap locations={locations} />
          )}
        </div>

        {/* Country table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Visitas por país</h2>
          {(stats?.byCountry.length ?? 0) === 0 ? (
            <p className="text-gray-400 text-sm">Aún no hay visitas registradas.</p>
          ) : (
            <ul className="space-y-3">
              {stats?.byCountry.map((c, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="text-xl w-7 text-center">
                    <FlagEmoji code={c.countryCode} />
                  </span>
                  <span className="w-36 text-sm text-gray-700 truncate">
                    {c.country ?? "Desconocido"}
                  </span>
                  <MiniBar value={c.visits} max={maxCountry} />
                  <span className="text-sm font-semibold text-gray-800 w-10 text-right">
                    {c.visits}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Daily chart (simple bars) */}
        {(stats?.byDay.length ?? 0) > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Últimos 30 días</h2>
            <div className="flex items-end gap-1 h-28 overflow-x-auto pb-1">
              {(() => {
                const maxV = Math.max(...(stats?.byDay ?? []).map((d) => d.visits), 1);
                return stats?.byDay.map((d, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 min-w-[18px]">
                    <div
                      className="w-full bg-orange-400 rounded-t hover:bg-orange-500 transition-colors cursor-default"
                      style={{ height: `${(d.visits / maxV) * 96}px` }}
                      title={`${d.day}: ${d.visits} visitas`}
                    />
                  </div>
                ));
              })()}
            </div>
            <p className="text-xs text-gray-400 mt-2">Pasa el ratón por encima para ver el detalle</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === DEFAULT_PASS) {
      sessionStorage.setItem(PASS_KEY, "1");
      onAuth();
    } else {
      setError(true);
      setPass("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="text-orange-500 w-5 h-5" />
          <h1 className="font-bold text-gray-800 text-lg">Acceso administrador</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setError(false); }}
            placeholder="Contraseña"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs">Contraseña incorrecta</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState(() => !!sessionStorage.getItem(PASS_KEY));

  if (!auth) return <PasswordGate onAuth={() => setAuth(true)} />;
  return <Dashboard />;
}
