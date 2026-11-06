const PRIMARY = "https://api.abcz.workers.dev/api/fitlog";
const FALLBACK = "https://api.api-store.workers.dev/api/fitlog";

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function fetchWorkouts() {
  try {
    return await getJson(PRIMARY);
  } catch {
    return await getJson(FALLBACK);
  }
}

export async function fetchWorkout(id) {
  try {
    return await getJson(`${PRIMARY}/${id}`);
  } catch {
    return await getJson(`${FALLBACK}/${id}`);
  }
}
