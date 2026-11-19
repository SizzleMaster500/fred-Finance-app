export const total=(arr)=>arr.reduce((sum,item)=>sum+Number(item.amount||0),0);
export const income=s=>Number(s.income||0)+total(s.transactions.filter(t=>t.type==='income'));
export const bills=s=>total(s.bills);
export const spending=s=>total(s.transactions.filter(t=>t.type==='expense'));
export const remaining=s=>income(s)-bills(s)-spending(s);
export const byCategory=s=>Object.entries(s.transactions.filter(t=>t.type==='expense').reduce((a,t)=>(a[t.category]=(a[t.category]||0)+Number(t.amount),a),{})).map(([name,value])=>({name,value}));
export const money=n=>new Intl.NumberFormat('de-CH',{style:'currency',currency:'CHF',maximumFractionDigits:0}).format(n);
export const xp=(s,lessons)=>lessons.filter(l=>s.completed.includes(l.id)).reduce((sum,l)=>sum+l.xp,0);
