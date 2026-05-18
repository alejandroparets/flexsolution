import { Router, type IRouter } from "express";
import { db, visitsTable } from "@workspace/db";
import { sql, count, desc } from "drizzle-orm";

const router: IRouter = Router();

const PRIVATE_IP = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|::1$|^$)/;

async function geoLookup(ip: string): Promise<{
  country: string | null;
  countryCode: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
}> {
  if (PRIVATE_IP.test(ip)) return { country: "Local", countryCode: "XX", city: "Dev", lat: null, lng: null };
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,city,lat,lon`);
    const data = await res.json() as Record<string, unknown>;
    if (data.status !== "success") return { country: null, countryCode: null, city: null, lat: null, lng: null };
    return {
      country: typeof data.country === "string" ? data.country : null,
      countryCode: typeof data.countryCode === "string" ? data.countryCode : null,
      city: typeof data.city === "string" ? data.city : null,
      lat: typeof data.lat === "number" ? data.lat : null,
      lng: typeof data.lon === "number" ? data.lon : null,
    };
  } catch {
    return { country: null, countryCode: null, city: null, lat: null, lng: null };
  }
}

router.post("/track", async (req, res) => {
  const page = typeof req.body?.page === "string" ? req.body.page : "/";
  const rawIp = req.ip ?? req.socket.remoteAddress ?? "";
  const ip = rawIp.replace(/^::ffff:/, "");

  res.status(202).json({ ok: true });

  const geo = await geoLookup(ip);
  await db.insert(visitsTable).values({
    ip,
    page,
    country: geo.country,
    countryCode: geo.countryCode,
    city: geo.city,
    lat: geo.lat ?? undefined,
    lng: geo.lng ?? undefined,
  });
});

router.get("/analytics/stats", async (_req, res) => {
  const [totalRow] = await db.select({ total: count() }).from(visitsTable);

  const todayRow = await db.execute(
    sql`SELECT COUNT(*)::int AS today FROM visits WHERE created_at >= CURRENT_DATE`
  );

  const byCountry = await db
    .select({
      country: visitsTable.country,
      countryCode: visitsTable.countryCode,
      visits: count(),
    })
    .from(visitsTable)
    .groupBy(visitsTable.country, visitsTable.countryCode)
    .orderBy(desc(count()))
    .limit(10);

  const byDay = await db.execute(
    sql`SELECT DATE(created_at) AS day, COUNT(*)::int AS visits
        FROM visits
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY day
        ORDER BY day`
  );

  res.json({
    total: totalRow?.total ?? 0,
    today: (todayRow.rows[0] as { today: number })?.today ?? 0,
    byCountry,
    byDay: byDay.rows,
  });
});

router.get("/analytics/locations", async (_req, res) => {
  const locs = await db.execute(
    sql`SELECT lat, lng, country, country_code AS "countryCode", COUNT(*)::int AS visits
        FROM visits
        WHERE lat IS NOT NULL AND lng IS NOT NULL
        GROUP BY lat, lng, country, country_code`
  );
  res.json(locs.rows);
});

export default router;
