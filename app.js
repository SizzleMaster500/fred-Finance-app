const $=s=>document.querySelector(s);
const fmt=n=>'CHF '+Number(n||0).toLocaleString('de-CH',{maximumFractionDigits:0});
const defaultState={name:'',income:3200,bills:[{name:'Health insurance',amount:285,day:25,category:'Insurance'},{name:'Phone',amount:49,day:12,category:'Phone'},{name:'Rent & utilities',amount:1116,day:1,category:'Housing'}],goal:1000,saved:600,transactions:[{name:'Groceries',amount:120,type:'expense',category:'Food'},{name:'Shopping',amount:180,type:'expense',category:'Shopping'},{name:'Train',amount:60,type:'expense',category:'Transport'},{name:'Coffee & lunch',amount:45,type:'expense',category:'Food'},{name:'Cinema',amount:30,type:'expense',category:'Leisure'}],completed:[],onboard:false,confidence:'',interest:'',winter:false};
let state;try{state={...defaultState,...JSON.parse(localStorage.getItem('fred-prototype-v1')||'{}')}}catch{state=structuredClone(defaultState)}
let tab='home',step=0;
const save=()=>localStorage.setItem('fred-prototype-v1',JSON.stringify(state));
const fred=()=>`<img src="assets/${state.winter?'fred-winter':'fred-classic'}.png" alt="Fred, your friendly purple money companion">`;
const totalBills=()=>state.bills.reduce((a,b)=>a+Number(b.amount),0);
const totalSpent=()=>state.transactions.filter(t=>t.type==='expense').reduce((a,t)=>a+Number(t.amount),0);
const totalIncome=()=>state.income+state.transactions.filter(t=>t.type==='income').reduce((a,t)=>a+Number(t.amount),0);
const left=()=>totalIncome()-totalBills()-totalSpent();
const shell=(body)=>{$('#content').innerHTML=body;document.querySelectorAll('.bottom button').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));$('#greeting').textContent=state.name?`Hey, ${escapeHTML(state.name)}! 👋`:'Hey there! 👋'};
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function home(){
 const remaining=left(),spent=totalSpent();
 shell(`<div class="fred-hero">${fred()}<div class="speech">${remaining>=0?"You're doing great! 💜 Let's take a quick look at your money.":"We've got a little budget puzzle to solve. I'll help you work through it! 💜"}</div></div>
 <div class="card overview"><div class="smallcap">▣ Your monthly overview</div><div class="big">${fmt(remaining)}</div><div class="sub">Estimated after recurring bills and recorded spending · not your bank balance</div><div class="metrics"><div class="metric"><span>Income</span><strong>${fmt(totalIncome())}</strong></div><div class="metric"><span>Bills</span><strong>${fmt(totalBills())}</strong></div><div class="metric"><span>Spent</span><strong>${fmt(spent)}</strong></div></div></div>
 <div class="card"><div class="goalrow"><h3 style="margin:0">🎯 Savings goal</h3><span class="pill">${Math.min(100,Math.round(state.saved/Math.max(1,state.goal)*100))}%</span></div><div class="goalrow"><b>My first savings goal</b><span>${fmt(state.saved)} / ${fmt(state.goal)}</span></div><div class="bar"><div style="width:${Math.min(100,state.saved/Math.max(1,state.goal)*100)}%"></div></div><button class="secondary" style="margin-top:12px" id="addSaving">+ Add CHF 25 saved</button></div>
 <div class="card"><h3 style="margin-top:0">💜 Fred's tip</h3><p style="font-size:14px">Try setting aside a little money each month for annual bills. Your future self will thank you!</p><button class="secondary" id="goLearn">Learn about Swiss taxes →</button></div>
 <div class="card"><h3>Quick actions</h3><div class="grid2"><div class="tile" id="goBills" role="button" tabindex="0">📅<b>My bills</b><p>Upcoming payments</p></div><div class="tile" id="goBudget" role="button" tabindex="0">📊<b>My budget</b><p>Expenses and income</p></div></div></div>`);
 $('#addSaving').onclick=()=>{state.saved+=25;save();render()};
 $('#goLearn').onclick=()=>go('learn');$('#goBills').onclick=()=>go('bills');$('#goBudget').onclick=()=>go('budget');
}
function budget(){
 const spent=totalSpent(), categories={};state.transactions.filter(t=>t.type==='expense').forEach(t=>categories[t.category]=(categories[t.category]||0)+Number(t.amount));
 const colors=['#9b74dc','#59bba0','#f3c45b','#b2a1ee','#8dd6bb','#d9a4d3'];
 const gradient=Object.entries(categories).reduce((acc,[cat,amount],i)=>{let start=acc.p,end=start+amount/Math.max(spent,1)*100;acc.parts.push(`${colors[i%colors.length]} ${start}% ${end}%`);acc.p=end;return acc},{p:0,parts:[]}).parts.join(',');
 shell(`<h2 class="heading">Your budget 📊</h2><div class="card overview"><div class="smallcap">Estimated money remaining</div><div class="big">${fmt(left())}</div><div class="sub">Based only on the information you've entered</div></div>
 <div class="card"><h3>Spending by category</h3><div style="display:flex;align-items:center;gap:20px"><div style="width:135px;height:135px;border-radius:50%;background:conic-gradient(${gradient||'#eee 0% 100%'});display:grid;place-items:center;flex-shrink:0"><div style="width:83px;height:83px;background:white;border-radius:50%;display:grid;place-items:center;text-align:center;font-weight:900;font-size:14px">${fmt(spent)}<br><small style="font-size:10px">spent</small></div></div><div style="flex:1">${Object.entries(categories).map(([cat,n],i)=>`<div class="goalrow" style="margin:6px 0;font-size:12px"><span><span style="color:${colors[i%colors.length]}">●</span> ${escapeHTML(cat)}</span><b>${Math.round(n/Math.max(spent,1)*100)}%</b></div>`).join('')||'No expenses yet'}</div></div></div>
 <div class="card"><h3>Income & goals</h3><div class="field"><label>Monthly take-home income (CHF)</label><input type="number" min="0" id="incomeField" value="${state.income}"></div><div class="field"><label>Savings target (CHF)</label><input type="number" min="1" id="goalField" value="${state.goal}"></div><button class="primary" id="saveBudget">Save changes</button></div>
 <div class="card"><h3>Recent transactions</h3>${state.transactions.slice().reverse().map((t,i)=>`<div class="txrow listitem"><div class="iconbubble">${t.type==='income'?'💰':'🛍️'}</div><div class="flex1"><strong>${escapeHTML(t.name)}</strong><div class="muted">${escapeHTML(t.category)}</div></div><strong style="color:${t.type==='income'?'#278665':'#46334f'}">${t.type==='income'?'+':'−'}${fmt(t.amount)}</strong></div>`).join('')||'<p>No transactions yet.</p>'}</div>`);
 $('#saveBudget').onclick=()=>{state.income=Math.max(0,Number($('#incomeField').value)||0);state.goal=Math.max(1,Number($('#goalField').value)||1);save();render()};
}
const lessons=[
 {id:'tax',icon:'🧾',title:'Swiss taxes, made simple',time:'2 min',content:'In Switzerland, your tax situation depends on factors such as canton, municipality, income and whether you are taxed at source. A tax return documents relevant income, assets and deductions. Keep salary certificates and other documents organized. If you receive a tax bill, plan ahead rather than assuming tax is already deducted from every paycheck.'},
 {id:'3a',icon:'🌱',title:'What is Säule 3a?',time:'3 min',content:'Säule 3a is a form of tied retirement saving in Switzerland. Eligible contributions can offer tax advantages, but withdrawals are generally restricted and investing through a 3a product involves market risk. The best choice depends on your circumstances and eligibility.'},
 {id:'credit',icon:'💳',title:'Credit card interest',time:'2 min',content:'If you do not pay your credit card balance in full by the required date, interest and fees may apply under your card agreement. Check the actual rate and repayment terms; small purchases can become expensive when balances accumulate.'},
 {id:'invest',icon:'📈',title:'Investing basics',time:'3 min',content:'Investing can help money grow over long periods, but returns are never guaranteed and you can lose money. Learn about diversification, fees, risk and time horizons before choosing investments.'}
];
function learn(){
 const focus=state.interest==='tax'?'tax':state.interest==='saving'?'3a':state.interest==='spending'?'credit':'tax';
 const ordered=[...lessons].sort((a,b)=>(b.id===focus)-(a.id===focus));
 shell(`<h2 class="heading">Money Academy 🎓</h2><div class="card lesson"><span class="pill">RECOMMENDED FOR YOU</span><h2>${ordered[0].icon} ${ordered[0].title}</h2><p>Small lessons. Real-life money skills. No judgment.</p><button class="primary" data-lesson="${ordered[0].id}">Start lesson →</button></div><div class="card"><h3>Your learning journey</h3><div class="goalrow"><b>${state.completed.length} / ${lessons.length} lessons</b><span class="pill">Money Explorer 🌱</span></div><div class="bar"><div style="width:${state.completed.length/lessons.length*100}%;background:#a079e4"></div></div></div>
 <div class="card"><h3>Explore lessons</h3>${lessons.map(l=>`<div class="billrow listitem"><div class="iconbubble">${l.icon}</div><div class="flex1"><strong>${l.title}</strong><div class="muted">${l.time} · ${state.completed.includes(l.id)?'✓ Completed':'Beginner-friendly'}</div></div><button class="secondary" data-lesson="${l.id}">Open</button></div>`).join('')}</div>`);
 document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>openLesson(b.dataset.lesson));
}
function openLesson(id){const l=lessons.find(x=>x.id===id);shell(`<h2 class="heading">Money Academy 🎓</h2><div class="card fred-hero">${fred()}<div class="speech">Let's learn something useful together! 📚</div></div><div class="card"><span class="pill">${l.time} LESSON</span><h2>${l.icon} ${l.title}</h2><p style="line-height:1.75">${l.content}</p><div class="notice">Educational information only. Financial and tax rules vary by personal circumstances. Verify current details with official sources.</div><button class="primary" id="completeLesson" style="margin-top:18px">${state.completed.includes(id)?'✓ Completed — back to lessons':'Mark lesson complete ✓'}</button></div>`);$('#completeLesson').onclick=()=>{if(!state.completed.includes(id))state.completed.push(id);save();learn()}}
function bills(){
 const now=new Date(),current=now.getDate();
 shell(`<h2 class="heading">Your bills 📅</h2><div class="card fred-hero">${fred()}<div class="speech">Let's keep your important payments organized. You got this!</div></div>
 <div class="card overview"><div class="smallcap">Total monthly recurring bills</div><div class="big">${fmt(totalBills())}</div><div class="sub">Estimated from the bills you've entered</div></div>
 <div class="card"><h3>Recurring payments</h3>${state.bills.slice().sort((a,b)=>a.day-b.day).map((b,i)=>`<div class="billrow listitem"><div class="iconbubble">📄</div><div class="flex1"><strong>${escapeHTML(b.name)}</strong><div class="muted">Every month · day ${b.day} · ${escapeHTML(b.category)}</div></div><strong>${fmt(b.amount)}</strong></div>`).join('')}<button class="secondary" id="addBill" style="width:100%;margin-top:10px">+ Add recurring bill</button></div>
 <div class="card"><h3>Document Vault 📂</h3><p class="muted">Coming in a later secure beta: organize invoices, receipts and tax documents. Please don't upload personal documents to this prototype.</p><div class="notice">For now, this demo stores manually entered information in your browser only. It does not process payments or send reminders.</div></div>`);
 $('#addBill').onclick=()=>{const name=prompt('Bill name (e.g. Internet)');if(!name)return;const amount=Number(prompt('Monthly amount in CHF'));if(!Number.isFinite(amount)||amount<=0)return alert('Please enter a valid amount.');const day=Number(prompt('Day of month (1–28)','15'));if(!Number.isInteger(day)||day<1||day>28)return alert('Please enter a day from 1 to 28.');state.bills.push({name:name.slice(0,60),amount,day,category:'Other'});save();render()};
}
function onboard(){
 const screens=[
 {title:"Hey! I'm Fred 👋",body:"Your friendly money buddy. I'll help you get organized, understand money, and build good habits.",kind:'intro'},
 {title:"What should I call you?",body:"Let's make this a little more personal. You can skip this.",kind:'name'},
 {title:"How confident do you feel?",body:"There's no wrong answer, and you can change your learning path later.",kind:'confidence',options:['🌱 I’m just starting','🙂 I know the basics','😎 Pretty confident']},
 {title:"What matters most to you?",body:"I'll suggest lessons that match your goals.",kind:'interest',options:['🧾 Taxes & paperwork','💰 Saving & 3a','🛍️ Spending habits','📊 Just getting organized']},
 {title:"Let's set up your money",body:"About how much take-home income do you receive each month? Use example numbers if you prefer.",kind:'income'},
 {title:"Your monthly bills",body:"Roughly how much do your regular bills add up to? We'll let you organize them individually later.",kind:'bills'},
 {title:"Your first goal 🎯",body:"What would you like to save toward?",kind:'goal'}
 ];const s=screens[step];
 shell(`<div class="card onboard"><div class="progress"><div style="width:${(step+1)/screens.length*100}%"></div></div>${fred()}<h2>${s.title}</h2><p>${s.body}</p>
 ${s.kind==='name'?`<label>Your nickname<input id="onName" placeholder="Optional" value="${escapeHTML(state.name)}"></label>`:''}
 ${s.kind==='confidence'||s.kind==='interest'?s.options.map((o,i)=>`<button class="choice ${state[s.kind]===String(i)?'chosen':''}" data-choice="${i}">${o}</button>`).join(''):''}
 ${s.kind==='income'?`<label>Monthly income (CHF)<input id="onIncome" type="number" min="0" value="${state.income}"></label>`:''}
 ${s.kind==='bills'?`<label>Monthly bills total (CHF)<input id="onBills" type="number" min="0" value="${totalBills()}"></label>`:''}
 ${s.kind==='goal'?`<label>First savings goal (CHF)<input id="onGoal" type="number" min="1" value="${state.goal}"></label>`:''}
 <button class="primary" id="nextStep" style="margin-top:18px">${step===screens.length-1?'Create my Vault ✨':'Continue →'}</button><button class="skip" id="skipStep">${step===screens.length-1?'Use these defaults':'Skip for now'}</button></div>`);
 document.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{state[s.kind]=b.dataset.choice;save();onboard()});
 const advance=()=>{if(step===screens.length-1){state.onboard=true;save();go('home')}else{step++;onboard()}};
 $('#nextStep').onclick=()=>{if(s.kind==='name')state.name=$('#onName').value.trim().slice(0,32);if(s.kind==='income')state.income=Math.max(0,Number($('#onIncome').value)||0);if(s.kind==='bills'){const v=Math.max(0,Number($('#onBills').value)||0);state.bills=[{name:'Monthly bills (estimate)',amount:v,day:1,category:'General'}]}if(s.kind==='goal')state.goal=Math.max(1,Number($('#onGoal').value)||1);save();advance()};
 $('#skipStep').onclick=advance;
}
function go(t){tab=t;render();window.scrollTo(0,0)}
function render(){if(!state.onboard)return onboard();({home,budget,learn,bills}[tab]||home)()}
document.querySelectorAll('.bottom button').forEach(b=>b.addEventListener('click',()=>b.dataset.tab==='add'?$('#modal').showModal():go(b.dataset.tab)));
$('#winterToggle').onclick=()=>{state.winter=!state.winter;save();render()};
$('#closeModal').onclick=()=>$('#modal').close();
$('#entryForm').onsubmit=e=>{e.preventDefault();const name=$('#entryName').value.trim(),amount=Number($('#entryAmount').value);if(!name||!Number.isFinite(amount)||amount<=0)return;state.transactions.push({name,amount,type:$('#entryType').value,category:$('#entryCategory').value});save();$('#entryForm').reset();$('#modal').close();go('budget')};
render();