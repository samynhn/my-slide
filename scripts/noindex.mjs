// Post-build: keep the site out of search engines and make SPA routes work on GitHub Pages.
import { readdirSync, readFileSync, writeFileSync, statSync, copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const META = '<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />';

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('name="robots"')) writeFileSync(file, html.replace(/<head([^>]*)>/i, `<head$1>\n    ${META}`));
}

writeFileSync(join(dist, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
writeFileSync(join(dist, '.nojekyll'), '');
if (existsSync(join(dist, 'index.html'))) copyFileSync(join(dist, 'index.html'), join(dist, '404.html'));
console.log('noindex applied to', dist);
