// One-time: downloads Panchang + General Sans (Fontshare, free for commercial use)
// into src/app/fonts so the site stops depending on api.fontshare.com at runtime.
// Run from the project root:  node scripts/fetch-fonts.mjs
import { mkdir, writeFile } from "node:fs/promises";

const FILES = {
  "Panchang-800.woff2": "BBOB5VAX4DF6FK5U27HLFW2VBLISCNKC/MIAKLBXTHJJTUKTXLTZZ76B3RNR3JBSO/BYZ4XKAY33UX3C5BSZV4BEIU2HQF4PD7",
  "GeneralSans-300.woff2": "HFTXPYOBEE22ON2ZH2TDSTBQLGERA7LU/4AOH2PGTMHZO2YX5HMTOAV52ONC3WIXE/TW4KNQIPR4LNP4I6I6C6HKQ23B2EQAU5",
  "GeneralSans-400.woff2": "MFQT7HFGCR2L5ULQTW6YXYZXXHMPKLJ3/YWQ244D6TACUX5JBKATPOW5I5MGJ3G73/7YY3ZAAE3TRV2LANYOLXNHTPHLXVWTKH",
  "GeneralSans-700.woff2": "KWXO5X3YW4X7OLUMPO4X24HQJGJU7E2Q/VOWUQZS3YLP66ZHPTXAFSH6YACY4WJHT/NIQ54PVBBIWVK3PFSOIOUJSXIJ5WTNDP",
};

await mkdir("src/app/fonts", { recursive: true });
for (const [name, path] of Object.entries(FILES)) {
  const res = await fetch(`https://cdn.fontshare.com/wf/${path}.woff2`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(`src/app/fonts/${name}`, buf);
  console.log(`saved ${name} (${buf.length} bytes)`);
}
