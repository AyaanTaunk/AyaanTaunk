/* Mock data for the Sukoon prototype. No backend. */
const DATA = {
  concerns: ["All","Stress & anxiety","Sleep","Emotional","Energy","Relationships","Chakra balance","Focus","Spiritual growth","Recovery support"],
  healers: [
    {id:"meera",name:"Meera R.",av:"a1",init:"MR",level:"Certified Pranic Healer (CPH)",yrs:9,lineage:"Trained under Sr. Instructor A. Nair",
     verified:true,vouched:true,rating:4.9,reviews:212,repeat:"78% repeat clients",price:1800,
     tags:["Stress","Sleep","Emotional","Chakra"],
     bio:"Gentle, practical sessions for stress, sleep and emotional balance. Remote sessions worldwide. 500+ sessions completed."},
    {id:"suresh",name:"Suresh K.",av:"a2",init:"SK",level:"Associate Certified Healer (ACPH)",yrs:4,lineage:"Trained under Sr. Instructor R. Rao",
     verified:true,vouched:false,rating:4.7,reviews:86,repeat:"61% repeat clients",price:1200,
     tags:["Energy","Chakra"],bio:"Energy and chakra balancing for fatigue and focus."},
    {id:"priya",name:"Priya T.",av:"a4",init:"PT",level:"Certified · Psychotherapy focus",yrs:12,lineage:"Trained under Sr. Instructor K. Menon",
     verified:true,vouched:true,rating:5.0,reviews:340,repeat:"84% repeat clients",price:2500,
     tags:["Relationships","Grief","Emotional"],bio:"Twelve years of practice with an emotional & relationship focus."}
  ],
  reviews:[
    {t:"Felt calmer after the very first session. Meera explains everything and never over-promises.",w:"Anjali · verified client"},
    {t:"Booked a 5-session package for sleep. Genuinely helped my routine.",w:"Rohan · verified client"}
  ],
  bookingOptions:[
    {t:"Single session · 45 min",d:"One-on-one video healing",p:"₹1,800"},
    {t:"5-session package",d:"Save 10% · prepaid credits",p:"₹8,100"},
    {t:"21-day journey",d:"Guided program + weekly check-ins",p:"₹4,999"},
    {t:"Intensive (team of 3 healers)",d:"For complex, high-intensity cases",p:"₹6,500"}
  ],
  courses:[
    {t:"Intro to Energy Healing",d:"Understand prana, the aura & simple self-care",tag:"FREE · 3 days",cta:"Start free",img:"a1"},
    {t:"21-Day Calm & Sleep",d:"Guided daily practices + weekly live circle",tag:"Program",cta:"₹2,999 · Enroll",img:"a2"},
    {t:"Foundations of Self-Healing",d:"For those who want to practice on themselves",tag:"Learn to heal",cta:"₹4,499 · View",img:"a3"}
  ],
  tiers:[
    {t:"Silver",d:"Priority booking",cur:true},
    {t:"Gold",d:"5% bigger wallet bonus + 1 free course/qtr",cur:false},
    {t:"Platinum",d:"Free monthly session credit",cur:false}
  ],
  clients:[
    {init:"AS",av:"a3",name:"Aarav S.",meta:"New · via platform · Stress",tagr:"1st session today",tagl:"Platform lead",src:"platform"},
    {init:"AM",av:"a4",name:"Anjali M.",meta:"Package · 3 of 5 done",tagr:"Last: 5 days ago",tagl:"Your client",src:"own"},
    {init:"RK",av:"a2",name:"Rohan K.",meta:"Sleep · follow-up due",tagr:"Last: 2 wks ago",tagl:"Your client",src:"own"}
  ]
};
