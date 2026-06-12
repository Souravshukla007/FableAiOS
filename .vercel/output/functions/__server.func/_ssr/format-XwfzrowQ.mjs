function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
function formatINRShort(n) {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(1) + "Cr";
  if (n >= 1e5) return "₹" + (n / 1e5).toFixed(1) + "L";
  if (n >= 1e3) return "₹" + (n / 1e3).toFixed(1) + "K";
  return "₹" + Math.round(n);
}
function formatPct(n, digits = 0) {
  return (n * 100).toFixed(digits) + "%";
}
function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 864e5);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
export {
  formatPct as a,
  formatDate as b,
  formatINRShort as c,
  formatINR as f,
  relativeTime as r
};
