export function calculate(data, id){
 const plan=data.plans.find(p=>p.id===id)||data.plans[1];
 const items=plan.costs.map(x=>({...x,perPerson:x.unit*data.fx[x.currency]*x.qty/(x.scope==='group'?data.people:1)}));
 const base=items.reduce((a,x)=>a+x.perPerson,0),reserve=base*data.reserve,total=base+reserve;
 const categories={};for(const x of items)categories[x.category]=(categories[x.category]||0)+x.perPerson;
 categories.Tartalék=reserve;
 return {plan,items,base,reserve,total,group:total*data.people,remaining:plan.cap-total,categories,flightMaximum:plan.cap/(1+data.reserve)-(base-items.find(x=>x.key==='flight').perPerson)};
}
export function dateAt(start,i){const d=new Date(start+'T12:00:00Z');d.setUTCDate(d.getUTCDate()+i);return d.toISOString().slice(0,10);}
export function timeMinutes(t){const [h,m]=t.split(':').map(Number);return h*60+m;}
export function dayTotals(day){const totals={visit:0,travel:0,rest:0,buffer:0};for(const s of day.slots)totals[s.kind]+=timeMinutes(s.end)-timeMinutes(s.start);return totals;}

export function paymentSchedule(data,id){
 const c=calculate(data,id),p=c.plan,stages=[],assigned=new Map();
 const add=(id,title,from,to,note,allocations,kind='recommended')=>{
  const items=allocations.map(({key,fraction=1})=>{
   const cost=c.items.find(x=>x.key===key);if(!cost)throw Error(`Ismeretlen fizetési tétel: ${p.id}/${key}`);
   assigned.set(key,(assigned.get(key)||0)+fraction);
   return {key,fraction,label:cost.label,amount:cost.perPerson*fraction,source:cost.source};
  });
  const amount=items.reduce((sum,x)=>sum+x.amount,0);
  if(items.length)stages.push({id,title,from,to,label:from===to?from:from+' – '+to,note,kind,items,amount,group:amount*data.people});
 };
 const has=keys=>keys.filter(k=>c.items.some(x=>x.key===k)).map(key=>({key}));
 const asOf=data.asOf||'2026-11-15';
 add('booking','Döntés után: repülő és poggyász',asOf,asOf,'A repülő teljes árát a foglaláskor kell rendezni. A bőröndöt is ekkor venném hozzá. A feltüntetett ár nem tartja fenn a helyeket.',has(['flight','bag']));
 add('visa','E-vízum',dateAt(p.start,-35),dateAt(p.start,-30),'Saját kényelmes időzítés. A hivatalos portál legalább 7 nappal indulás előtti igénylést kér. A díj a kérelem beadásakor fizetendő.',has(['visa']));
 const advanceKeys=[...new Set(['gem','nightbus','daybus',...(p.prepayKeys||[])])];
 add('advance','Időpontos múzeumjegy és buszjegyek',dateAt(p.start,-28),dateAt(p.start,-14),'Csak a megfelelő dátumos készlet és az egész út visszaigazolása után. Ha még nem nyílt meg az értékesítés, az összeget félretenném; előleget nem feltételezünk.',has(advanceKeys));
 add('insurance','Utasbiztosítás',dateAt(p.start,-14),dateAt(p.start,-7),'A keret alap utasbiztosításra szól, nem feltételez útlemondási fedezetet. Ha azt is kértek, a kötési határidőt már az első foglaláskor ellenőrizni kell.',has(['insurance']));
 if(c.items.some(x=>x.key==='other')){
  add('preparation','Útipatika előkészítése',dateAt(p.start,-7),dateAt(p.start,-3),'A 11 500 Ft-os egyéb keret része, nem új költség.',[{key:'other',fraction:2000/11500}]);
  add('bud','Budapesti reptéri kijutás',p.start,p.start,'A 11 500 Ft-os egyéb keretből. Az indulási napra tervezett összeg.',[{key:'other',fraction:3500/11500}]);
 }
 for(const h of p.hotelPayments||[]){
  add('hotel-'+h.id,h.title||h.hotel,h.date,h.date,h.note,h.keys.map(key=>({key})),h.verified?'provider':'recommended');
 }
 const rest=c.items.filter(x=>!assigned.has(x.key)).map(x=>({key:x.key}));
 if(c.items.some(x=>x.key==='other'))rest.push({key:'other',fraction:6000/11500});
 add('trip','Útközben: étel, belépők és helyi közlekedés',p.start,p.end,'Napi kiadási keret. A sofőrök, hajók és kirándulások fizetését az írásos ajánlat rögzítse. Ha előre kérnek fizetést, ezt a meglévő összeget kell korábbra áttenni, nem még egyszer hozzáadni. Készpénz és bankkártya együtt értendő.',rest);
 for(const x of c.items){if(Math.abs((assigned.get(x.key)||0)-1)>1e-8)throw Error(`Hibás fizetési felosztás: ${p.id}/${x.key}`);}
 stages.sort((a,b)=>a.to.localeCompare(b.to)||a.from.localeCompare(b.from));
 let cumulative=0;for(const s of stages){cumulative+=s.amount;s.cumulative=cumulative;}
 if(Math.abs(cumulative-c.base)>.005)throw Error('A fizetések nem egyeznek az alapköltséggel.');
 const deposit=p.deposit?p.deposit.unit*data.fx[p.deposit.currency]*(p.deposit.qty||1)/(p.deposit.scope==='group'?data.people:1):0;
 const beforeDeparture=stages.filter(s=>s.to<p.start).reduce((sum,s)=>sum+s.amount,0),onTrip=c.base-beforeDeparture;
 return {asOf,stages,base:c.base,reserve:c.reserve,total:c.total,deposit,depositNote:p.deposit?.note||'',beforeDeparture,onTrip,contingencyTarget:c.reserve,availableByDeparture:onTrip+c.reserve+deposit,totalWithLiquidity:c.total+deposit};
}
