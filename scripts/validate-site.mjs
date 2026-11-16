import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=new URL('../',import.meta.url),html=fs.readFileSync(new URL('index.html',base),'utf8'),d=JSON.parse(fs.readFileSync(new URL('trip-data.json',base),'utf8'));
for(const file of ['index.html','style.css','app.mjs','model.mjs','trip-data.json','egyiptom-2027.xlsx'])assert.ok(fs.statSync(new URL(file,base)).size>0);
assert.equal(d.plans.length,10);assert.ok(!html.includes('type="number"'));assert.ok(!html.includes('extraDays'));assert.ok(!html.includes('type="date"'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size);
for(const p of d.photos){assert.ok(p.author&&p.source&&p.license);assert.ok(fs.existsSync(new URL(p.file,base)));}
assert.equal(new Set(d.photos.map(p=>p.id)).size,d.photos.length);assert.ok(d.photos.length>=40);assert.ok(Object.keys(d.sources).length>=40);
for(const p of d.plans)for(const x of p.costs)if(x.source)assert.ok(d.sources[x.source]);
const routeKeys=new Set(['giza','cairo','spx','luxor','hurghada','saqqara','aswan','abu']);
for(const p of d.plans){assert.ok(p.route.every(k=>routeKeys.has(k)),p.id+' map route');assert.ok(p.routeLabels.every(row=>Array.isArray(row)&&row.length===2),p.id+' route labels');}
console.log(`Site validated: ${d.plans.length} plans, ${d.photos.length} photographs, ${Object.keys(d.sources).length} source records.`);

