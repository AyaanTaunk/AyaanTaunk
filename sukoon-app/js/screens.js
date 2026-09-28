/* View layer: one function per screen returns an HTML string. */
const badges = h => `${h.verified?'<span class="badge b-verif">✓ Verified</span>':''}${h.vouched?'<span class="badge b-vouch">★ Vouched</span>':''}`;
const healerCard = h => `
  <div class="card" onclick="nav('s-profile','${h.id}')">
    <div class="avatar ${h.av}">${h.init}</div>
    <div class="info">
      <h4>${h.name} ${badges(h)}</h4>
      <div class="role">${h.level} · ${h.yrs} yrs</div>
      <div class="tags">${h.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
      <div class="meta"><span class="rating">⭐ ${h.rating} (${h.reviews})</span><span class="price">₹${h.price.toLocaleString('en-IN')} / session</span></div>
    </div>
  </div>`;

const SCREENS = {
/* ---------------- SEEKER ---------------- */
's-discover': () => `
  <div class="top"><h2>Namaste, Aarav 🙏</h2><p>What would you like to work on today?</p></div>
  <div class="search">🔎 <input placeholder="Search healers, concerns, courses"></div>
  <div class="chips">${DATA.concerns.map((c,i)=>`<div class="chip ${i===0?'active':''}" onclick="pick(this)">${c}</div>`).join('')}</div>
  <div class="sec-title"><h3>Verified healers for you</h3><a onclick="toast('Filtered (prototype)')">See all</a></div>
  ${DATA.healers.map(healerCard).join('')}
  <div class="banner" onclick="nav('s-chakra')"><h4>Not sure where to start?</h4><p>Take the 2-min chakra check → get matched →</p></div>`,

's-chakra': () => `
  <div class="top"><button class="back" onclick="nav('s-discover')">‹</button><h2>Chakra check</h2><p>A quick self-assessment to match you</p></div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">Answer a few prompts about how you've been feeling. We'll suggest a focus area and the right healers. (Illustrative)</p></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Low energy / tired often</h5><p>Root & solar plexus</p></div><span>›</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Anxious / racing mind</h5><p>Heart & throat</p></div><span>›</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Trouble sleeping</h5><p>Crown & third eye</p></div><span>›</span></div>
  <div class="body"><button class="btn" onclick="nav('s-discover')">See my matches</button></div>`,

's-profile': (id) => { const h = DATA.healers.find(x=>x.id===id) || DATA.healers[0]; window._h=h; return `
  <div class="top">
    <button class="back" onclick="nav('s-discover')">‹</button>
    <div style="display:flex;gap:14px;align-items:center">
      <div class="avatar ${h.av}" style="width:64px;height:64px;flex:0 0 64px;font-size:22px">${h.init}</div>
      <div><h2 style="font-size:20px">${h.name}</h2><p>${h.level} · Bangalore</p></div>
    </div>
    <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap">${badges(h)}<span class="badge b-new">${h.repeat}</span></div>
  </div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">${h.bio}</p>
    <div class="list-item plain" style="margin:12px 0 0;cursor:default"><span>▶</span><div class="li-main"><h5>Intro video</h5><p>60-sec introduction (placeholder)</p></div></div>
    <p style="font-size:11.5px;color:var(--muted);margin-top:8px">Lineage: ${h.lineage}</p>
  </div>
  <div class="sec-title"><h3>Specializes in</h3></div>
  <div class="body" style="padding-top:0"><div class="tags">${h.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></div>
  <div class="sec-title"><h3>What clients say</h3></div>
  ${DATA.reviews.map(r=>`<div class="review"><p>"${r.t}"</p><div class="who">— ${r.w}</div></div>`).join('')}
  <div class="body">
    <button class="btn" onclick="nav('s-book')">Book a session</button><div style="height:10px"></div>
    <button class="btn ghost sm" onclick="nav('s-messages')">Message ${h.name.split(' ')[0]}</button>
  </div>`; },

's-book': () => `
  <div class="top"><button class="back" onclick="nav('s-profile')">‹</button><h2>Book with ${(window._h&&window._h.name)||'Meera R.'}</h2><p>Choose how you'd like to work together</p></div>
  <div style="height:14px"></div>
  ${DATA.bookingOptions.map((o,i)=>`<div class="opt ${i===0?'active':''}" onclick="selOpt(this)"><div><h5>${o.t}</h5><p>${o.d}</p></div><div class="price">${o.p}</div></div>`).join('')}
  <div class="sec-title"><h3>Pick a time</h3></div>
  <div class="body" style="padding-top:0">
    <span class="slot active" onclick="selSlot(this)">Today 6:00 PM</span><span class="slot" onclick="selSlot(this)">Today 7:30 PM</span>
    <span class="slot" onclick="selSlot(this)">Tomorrow 9 AM</span><span class="slot" onclick="selSlot(this)">Tomorrow 5 PM</span>
  </div>
  <div class="body"><button class="btn" onclick="nav('s-pay')">Continue to payment</button></div>`,

's-pay': () => `
  <div class="top"><button class="back" onclick="nav('s-book')">‹</button><h2>Secure payment</h2><p>Held safely until after your session</p></div>
  <div class="body">
    <div class="card plain"><div class="info">
      <div class="kv"><span class="k">Session with Meera R.</span><span class="v">₹1,800</span></div>
      <div class="kv"><span class="k">Wallet credit applied</span><span class="v">− ₹550</span></div>
      <div class="kv"><span class="k">To pay now</span><span class="v" style="color:var(--violet-d)">₹1,250</span></div>
    </div></div>
    <div class="opt active" onclick="selOpt(this)"><div><h5>UPI</h5><p>GPay / PhonePe / any UPI app</p></div><span>●</span></div>
    <div class="opt" onclick="selOpt(this)"><div><h5>Card</h5><p>Credit / debit</p></div><span>○</span></div>
    <button class="btn" onclick="nav('s-confirm')">Pay ₹1,250</button>
    <p style="font-size:10.5px;color:var(--muted);text-align:center;margin-top:8px">🔒 Funds are held in escrow and released to the healer 24h after the session. Full refund on no-show.</p>
  </div>`,

's-confirm': () => `
  <div class="top teal"><h2>You're booked ✨</h2><p>A calm space is reserved for you</p></div>
  <div class="body center" style="padding-top:24px">
    <div class="avatar a1" style="width:70px;height:70px;margin:0 auto 12px;font-size:24px">MR</div>
    <h3 style="font-size:17px">Session with Meera R.</h3>
    <p style="color:var(--muted);font-size:13px;margin:6px 0 18px">Today, 6:00 PM · 45 min · Video</p>
    <button class="btn teal" onclick="nav('s-call')">Join in-app video</button><div style="height:10px"></div>
    <button class="btn ghost sm" onclick="nav('s-journey')">Go to my journey</button>
  </div>`,

's-call': () => `
  <div class="callui">
    <div class="who2" style="margin-top:20px"><div class="avatar a1 big">MR</div><h3>Meera R.</h3><p style="opacity:.7;font-size:12px">In-app healing session · 44:58</p>
      <p style="opacity:.6;font-size:11px;margin-top:8px">No Zoom links — the call runs inside Sukoon.</p></div>
    <div class="callctrl"><div>🎤</div><div>📷</div><div class="end" onclick="nav('s-confirm')">✕</div></div>
  </div>`,

's-journey': () => `
  <div class="top"><h2>My journey</h2><p>Your healing, all in one place</p></div>
  <div style="height:16px"></div>
  <div class="stat">
    <div class="box"><div class="n">₹550</div><div class="l">Wallet credit</div></div>
    <div class="box"><div class="n">7🔥</div><div class="l">Day streak</div></div>
    <div class="box"><div class="n">3/10</div><div class="l">To free session</div></div>
  </div>
  <div class="banner" style="background:linear-gradient(135deg,#6C5CE7,#a17ff0)" onclick="nav('s-learn')">
    <h4>21-Day Calm Journey</h4><div class="prog"><span style="width:38%"></span></div><p>Day 8 of 21 · today: 10-min energy meditation</p></div>
  <div class="sec-title"><h3>Healing journal</h3><a onclick="toast('New entry (prototype)')">+ Add</a></div>
  <div class="review"><p>"Slept better after yesterday's session. Felt lighter in the morning."</p><div class="who">Day 7 · you</div></div>
  <div class="sec-title"><h3>Upcoming</h3></div>
  <div class="list-item" onclick="nav('s-confirm')"><span class="dot"></span><div class="li-main"><h5>Session with Meera R.</h5><p>Today · Video</p></div><span class="li-time">6:00 PM</span></div>
  <div class="row"><button class="btn ghost sm" onclick="nav('s-wallet')">Wallet</button><button class="btn ghost sm" onclick="nav('s-membership')">Membership</button></div>`,

's-wallet': () => `
  <div class="top"><button class="back" onclick="nav('s-journey')">‹</button><h2>Wallet</h2><p>Top up once, book faster</p></div>
  <div class="body"><div class="card plain center"><div class="info"><div class="l" style="color:var(--muted);font-size:12px">Balance</div><div class="n" style="font-size:30px;color:var(--violet-d)">₹550</div></div></div></div>
  <div class="sec-title"><h3>Add credit (get a bonus)</h3></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Load ₹5,000</h5><p>Get ₹5,500 credit (+10% bonus)</p></div><span class="price">₹5,000</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Load ₹2,000</h5><p>Get ₹2,150 credit (+7.5%)</p></div><span class="price">₹2,000</span></div>
  <div class="body"><button class="btn" onclick="toast('Wallet topped up (prototype)')">Add credit</button></div>`,

's-membership': () => `
  <div class="top"><button class="back" onclick="nav('s-journey')">‹</button><h2>Membership</h2><p>For regular healing</p></div>
  <div style="height:12px"></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Calm Monthly · ₹1,999</h5><p>2 sessions + full course library + priority booking</p></div><span>●</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Calm Plus · ₹3,499</h5><p>4 sessions + unlimited courses + 1 team session</p></div><span>○</span></div>
  <div class="body"><button class="btn" onclick="toast('Subscribed (prototype)')">Start membership</button>
    <p style="font-size:10.5px;color:var(--muted);text-align:center;margin-top:8px">Session credits refresh monthly.</p></div>`,

's-rewards': () => `
  <div class="top"><h2>Rewards</h2><p>The more you heal, the more you get</p></div>
  <div class="sec-title"><h3>Your tier</h3></div>
  ${DATA.tiers.map(t=>`<div class="opt ${t.cur?'active':''}"><div><h5>${t.t}${t.cur?' · current':''}</h5><p>${t.d}</p></div><span>${t.cur?'★':''}</span></div>`).join('')}
  <div class="sec-title"><h3>Punch card</h3></div>
  <div class="banner" style="background:linear-gradient(135deg,#f0a202,#f6c453)"><h4>3 of 10 sessions</h4><div class="prog" style="background:rgba(255,255,255,.4)"><span style="width:30%;background:#fff"></span></div><p>Your 10th session is free 🎁</p></div>
  <div class="sec-title"><h3>More ways to earn</h3></div>
  <div class="list-item" onclick="toast('Referral link copied (prototype)')"><span class="dot violet"></span><div class="li-main"><h5>Refer a friend</h5><p>Give ₹300, get ₹300</p></div><span class="li-time">Share</span></div>
  <div class="list-item" onclick="nav('s-learn')"><span class="dot"></span><div class="li-main"><h5>Finish your journey</h5><p>Unlock a free course</p></div><span class="li-time">›</span></div>`,

's-learn': () => `
  <div class="top"><h2>Learn & grow</h2><p>Courses, programs & self-practice</p></div>
  <div style="height:14px"></div>
  ${DATA.courses.map(c=>`<div class="course" onclick="toast('Course preview (prototype)')"><div class="bimg ${c.img==='a1'?'':''}" style="background:linear-gradient(135deg,${c.img==='a2'?'#20A39E,#4fd1c5':c.img==='a3'?'#f0a202,#f6c453':'#6C5CE7,#20A39E'})"></div><div class="cb"><span class="pill">${c.tag}</span><h4>${c.t}</h4><p>${c.d}</p><button class="btn sm">${c.cta}</button></div></div>`).join('')}`,

's-bookings': () => `
  <div class="top"><h2>Bookings</h2><p>Upcoming & past</p></div>
  <div class="sec-title"><h3>Upcoming</h3></div>
  <div class="list-item" onclick="nav('s-confirm')"><span class="dot"></span><div class="li-main"><h5>Meera R. · Stress</h5><p>Today · Video</p></div><span class="li-time">6:00 PM</span></div>
  <div class="sec-title"><h3>Past</h3></div>
  <div class="list-item" onclick="nav('s-profile')"><span class="dot violet"></span><div class="li-main"><h5>Meera R. · Sleep</h5><p>Rate & rebook</p></div><span class="li-time">★</span></div>
  <div class="list-item" onclick="nav('s-profile')"><span class="dot violet"></span><div class="li-main"><h5>Priya T. · Emotional</h5><p>Completed</p></div><span class="li-time">✓</span></div>`,

's-messages': () => `
  <div class="top"><button class="back" onclick="nav('s-profile')">‹</button><h2>Messages</h2><p>Chat with your healer</p></div>
  <div class="body">
    <div class="review"><p>Hi Aarav, looking forward to our session this evening 🙏</p><div class="who">Meera · 2:10 PM</div></div>
    <div class="review" style="background:var(--violet-l)"><p>Thank you! Slightly anxious today, hoping it helps.</p><div class="who">You · 2:14 PM</div></div>
    <div class="search" style="margin:14px 0 0">💬 <input placeholder="Type a message (prototype)"></div>
  </div>`,

/* ---------------- HEALER ---------------- */
'h-dash': () => `
  <div class="top teal"><h2>Hi, Meera 🌸</h2><p>Here's your practice today</p></div>
  <div style="height:16px"></div>
  <div class="stat">
    <div class="box"><div class="n">₹42.6k</div><div class="l">This month</div></div>
    <div class="box"><div class="n">28</div><div class="l">Sessions</div></div>
    <div class="box"><div class="n">4.9★</div><div class="l">Rating</div></div>
  </div>
  <div class="sec-title"><h3>Today's sessions</h3><a onclick="nav('h-cal')">Calendar</a></div>
  <div class="list-item" onclick="nav('h-clients')"><span class="dot"></span><div class="li-main"><h5>Aarav S. · Stress</h5><p>New client · via platform</p></div><span class="li-time">6:00 PM</span></div>
  <div class="list-item" onclick="nav('h-clients')"><span class="dot violet"></span><div class="li-main"><h5>Anjali M. · Package</h5><p>Your own client · 3/5</p></div><span class="li-time">7:30 PM</span></div>
  <div class="banner" style="background:linear-gradient(135deg,#6C5CE7,#a17ff0)">
    <h4>Grow your practice</h4><p>Share your profile link — clients book through you.</p>
    <div class="center"><div class="qr"></div><div style="font-size:11px;opacity:.95;margin-bottom:8px">sukoon.app/h/meera-r</div></div>
    <button class="btn sm" style="background:#fff;color:var(--violet-d)" onclick="toast('Link copied (prototype)')">Copy my link</button>
  </div>
  <div class="row"><button class="btn ghost sm" onclick="nav('h-import')">Import my clients</button><button class="btn ghost sm" onclick="nav('h-case')">Team case</button></div>
  <div style="height:12px"></div>`,

'h-import': () => `
  <div class="top teal"><button class="back" onclick="nav('h-dash')">‹</button><h2>Bring your clients</h2><p>Move your existing book onto Sukoon</p></div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">Your existing clients stay yours — <b>0% commission</b>. You just get the tools: booking, video, notes, reminders and payments in one place.</p></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Import from contacts</h5><p>We'll send them your booking link</p></div><span>●</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Upload a list (CSV)</h5><p>Name + phone/email</p></div><span>○</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Share to WhatsApp group</h5><p>One tap · your link + QR</p></div><span>○</span></div>
  <div class="body"><button class="btn teal" onclick="toast('Invites sent (prototype)')">Send invites</button></div>`,

'h-cal': () => `
  <div class="top teal"><h2>Calendar</h2><p>Availability & bookings</p></div>
  <div class="sec-title"><h3>This week</h3><a onclick="toast('Edit availability (prototype)')">Edit slots</a></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Mon · 3 booked</h5><p>6 slots open</p></div><span class="li-time">›</span></div>
  <div class="list-item"><span class="dot amber"></span><div class="li-main"><h5>Tue · fully booked</h5><p>5 sessions</p></div><span class="li-time">›</span></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Wed · 2 booked</h5><p>7 slots open</p></div><span class="li-time">›</span></div>
  <div class="list-item" onclick="nav('h-case')"><span class="dot violet"></span><div class="li-main"><h5>Thu · Intensive (team)</h5><p>You + 2 co-healers · 1 case</p></div><span class="li-time">›</span></div>`,

'h-clients': () => `
  <div class="top teal"><h2>Clients</h2><p>History, notes & follow-ups</p></div><div style="height:8px"></div>
  ${DATA.clients.map(c=>`<div class="card" onclick="toast('Client notes & session history (prototype)')"><div class="avatar ${c.av}">${c.init}</div><div class="info"><h4>${c.name}</h4><div class="role">${c.meta}</div><div class="meta"><span class="rating">${c.tagr}</span><span class="price" style="color:${c.src==='platform'?'var(--teal)':'var(--violet-d)'}">${c.tagl}</span></div></div></div>`).join('')}
  <div class="body"><button class="btn ghost sm teal" onclick="toast('Follow-up reminder set (prototype)')">Set follow-up reminder</button></div>`,

'h-earn': () => `
  <div class="top teal"><h2>Earnings</h2><p>Payouts & fees</p></div>
  <div style="height:16px"></div>
  <div class="stat"><div class="box"><div class="n">₹42.6k</div><div class="l">This month</div></div><div class="box"><div class="n">₹6.3k</div><div class="l">Pending payout</div></div></div>
  <div class="sec-title"><h3>How your fees work</h3></div>
  <div class="card plain"><div class="info"><h4>Your own clients</h4><p class="role">₹0 commission — you pay only your monthly plan. Tools, video & payments included.</p></div></div>
  <div class="card plain"><div class="info"><h4>Clients we bring you</h4><p class="role">15% on platform-introduced sessions → drops to 10% as your on-platform volume grows.</p></div></div>
  <div class="card plain"><div class="info"><h4>Introducer rewards</h4><p class="role">Earn 3% when a client you introduced buys a course or books another healer (12 months).</p></div></div>
  <div class="body"><button class="btn teal" onclick="toast('Withdraw (prototype)')">Withdraw to bank / UPI</button>
  <div style="height:10px"></div><button class="btn ghost sm" onclick="nav('h-plan')">My subscription plan</button></div>`,

'h-plan': () => `
  <div class="top teal"><button class="back" onclick="nav('h-earn')">‹</button><h2>My plan</h2><p>Tools that run your practice</p></div>
  <div style="height:12px"></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Starter · ₹499/mo</h5><p>Bookings, payments, basic profile</p></div><span>○</span></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Pro · ₹999/mo</h5><p>+ video, CRM, packages, analytics, badge</p></div><span>●</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Studio · ₹1,499/mo</h5><p>+ apprentices, team cases, priority placement</p></div><span>○</span></div>
  <div class="body"><button class="btn teal" onclick="toast('Plan updated (prototype)')">Choose plan</button></div>`,

'h-profile': () => `
  <div class="top teal"><h2>My profile</h2><p>What seekers see</p></div>
  <div class="body center" style="padding-top:20px"><div class="avatar a1" style="width:72px;height:72px;margin:0 auto 10px;font-size:24px">MR</div>
    <h3>Meera R. <span class="badge b-verif">✓ Verified</span></h3><p style="color:var(--muted);font-size:12.5px;margin-top:4px">Certified Pranic Healer · 9 yrs</p></div>
  <div class="sec-title"><h3>Certifications</h3><a onclick="toast('Upload certificate (prototype)')">Add</a></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>CPH — World Pranic Healing</h5><p>Verified · 2016</p></div><span class="li-time">✓</span></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Pranic Psychotherapy</h5><p>Verified · 2019</p></div><span class="li-time">✓</span></div>
  <div class="sec-title"><h3>My packages</h3><a onclick="toast('Edit packages (prototype)')">Edit</a></div>
  <div class="list-item"><div class="li-main"><h5>Single · 45 min</h5></div><span class="li-time">₹1,800</span></div>
  <div class="list-item"><div class="li-main"><h5>5-session package</h5></div><span class="li-time">₹8,100</span></div>
  <div class="body"><button class="btn ghost sm teal" onclick="nav('h-apprentice')">+ Manage apprentices</button></div>`,

'h-apprentice': () => `
  <div class="top teal"><button class="back" onclick="nav('h-profile')">‹</button><h2>Apprentices</h2><p>Train the next generation</p></div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">Apprentices heal <b>under you</b>. Seekers see "Trainee under Meera R." — they inherit your trust. Earnings split three ways: apprentice, you, platform.</p></div>
  <div class="card plain"><div class="avatar a5">DV</div><div class="info"><h4>Divya V. <span class="badge b-new">Trainee</span></h4><div class="role">Under you · 14 sessions · 4.8★</div><div class="meta"><span class="rating">Graduates in 6 sessions</span><span class="price">70/20/10 split</span></div></div></div>
  <div class="body"><button class="btn teal" onclick="toast('Invite apprentice (prototype)')">+ Add an apprentice</button></div>`,

'h-case': () => `
  <div class="top teal"><button class="back" onclick="nav('h-dash')">‹</button><h2>Team case room</h2><p>For complex, high-intensity cases</p></div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">Some cases need more than one healer. Form a circle, share notes, cover shifts, and split the payout automatically.</p></div>
  <div class="card plain"><div class="info"><h4>Case · "R.M." — intensive support</h4><div class="role">Lead: you · Co-healers: Priya T., Suresh K.</div>
    <div class="tags" style="margin-top:6px"><span class="tag">Shared notes</span><span class="tag">Shift rota</span><span class="tag">Split 40/30/30</span></div></div></div>
  <div class="sec-title"><h3>Shift coverage</h3></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Mon–Wed · You</h5><p>Morning energy work</p></div><span class="li-time">✓</span></div>
  <div class="list-item"><span class="dot violet"></span><div class="li-main"><h5>Thu–Fri · Priya T.</h5><p>Emotional support</p></div><span class="li-time">✓</span></div>
  <div class="body"><button class="btn teal" onclick="toast('Invite co-healer (prototype)')">+ Invite a co-healer</button></div>`,

/* ---------------- ADMIN ---------------- */
'a-verify': () => `
  <div class="top dark"><h2>Verification queue</h2><p>Keep supply trustworthy</p></div>
  <div class="sec-title"><h3>Pending review</h3></div>
  <div class="card plain"><div class="avatar a5">DV</div><div class="info"><h4>Divya V.</h4><div class="role">Uploaded: CPH certificate + instructor name</div>
    <div class="row" style="padding:8px 0 0"><button class="btn sm teal" onclick="toast('Approved (prototype)')">Verify</button><button class="btn sm ghost" onclick="toast('Requested docs (prototype)')">Ask docs</button></div></div></div>
  <div class="sec-title"><h3>Verification tiers</h3></div>
  <div class="list-item"><span class="dot amber"></span><div class="li-main"><h5>Docs submitted</h5><p>Certificate uploaded</p></div><span class="li-time">1</span></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Foundation-verified</h5><p>Confirmed with issuing centre</p></div><span class="li-time">2</span></div>
  <div class="list-item"><span class="dot violet"></span><div class="li-main"><h5>Vouched by senior</h5><p>Personally recommended</p></div><span class="li-time">3</span></div>`,

'a-reviews': () => `
  <div class="top dark"><h2>Review moderation</h2><p>Keep feedback honest</p></div>
  <div class="review"><p>"Wonderful, calming session — highly recommend."</p><div class="who">Flagged: none · auto-approved</div>
    <div class="row" style="padding:8px 0 0"><button class="btn sm teal" onclick="toast('Kept (prototype)')">Keep</button><button class="btn sm ghost" onclick="toast('Hidden (prototype)')">Hide</button></div></div>
  <div class="review"><p>"Promised to cure my illness…"</p><div class="who">⚠ Flagged: medical claim — needs review</div>
    <div class="row" style="padding:8px 0 0"><button class="btn sm" onclick="toast('Removed (prototype)')">Remove</button><button class="btn sm ghost" onclick="toast('Warned healer (prototype)')">Warn healer</button></div></div>`,

'a-analytics': () => `
  <div class="top dark"><h2>Platform analytics</h2><p>Attribution & leakage watch</p></div>
  <div style="height:16px"></div>
  <div class="stat"><div class="box"><div class="n">126</div><div class="l">Active healers</div></div><div class="box"><div class="n">2,940</div><div class="l">Sessions / mo</div></div><div class="box"><div class="n">₹1.2L</div><div class="l">Take / mo</div></div></div>
  <div class="sec-title"><h3>Attribution (per healer–client pair)</h3></div>
  <div class="list-item"><span class="dot"></span><div class="li-main"><h5>Platform-introduced</h5><p>Commission applies</p></div><span class="li-time">41%</span></div>
  <div class="list-item"><span class="dot violet"></span><div class="li-main"><h5>Healer-owned</h5><p>Subscription only</p></div><span class="li-time">59%</span></div>
  <div class="sec-title"><h3>Leakage signals</h3></div>
  <div class="list-item"><span class="dot amber"></span><div class="li-main"><h5>Cancel→rebook spikes</h5><p>2 healers flagged this week</p></div><span class="li-time">Review</span></div>`,

/* ---------------- B2B ---------------- */
'b-corporate': () => `
  <div class="top" style="background:linear-gradient(160deg,#3b82f6,#7aa9f7)"><h2>Corporate & hospital</h2><p>Wellbeing programs for teams</p></div>
  <div class="body"><p style="font-size:13px;color:#4a4363;line-height:1.6">Bulk wellbeing sessions and workshops for employees and patients — framed as <b>stress, sleep and emotional wellbeing support</b>, never medical treatment.</p></div>
  <div class="opt active" onclick="selOpt(this)"><div><h5>Employee wellbeing</h5><p>Monthly sessions + stress workshops</p></div><span>›</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Hospital integrative program</h5><p>Complementary support alongside care</p></div><span>›</span></div>
  <div class="opt" onclick="selOpt(this)"><div><h5>Webinars & camps</h5><p>Mental Health Day, onboarding, retreats</p></div><span>›</span></div>
  <div class="body"><button class="btn" style="background:#3b82f6" onclick="toast('Request a proposal (prototype)')">Request a proposal</button>
  <p style="font-size:10.5px;color:var(--muted);text-align:center;margin-top:8px">Complementary wellbeing, not medical advice.</p></div>`
};
