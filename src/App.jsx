import { useState, useEffect, useReducer, useRef } from "react";

const I = {
  Search: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Settings: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  MapPin: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  Phone: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  Globe: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>,
  Star: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Plus: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  X: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Trash: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>,
  Comment: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
  Clock: (s=12) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  DB: (s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>,
  Down: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Chev: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  Bldg: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>,
  Send: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  Filter: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Zap: (s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Check: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Eye: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Warn: (s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  Refresh: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>,
  Copy: (s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
};

const STS_DEF = [
  { id:"new", label:"Novo", color:"#818cf8", bg:"#818cf820" },
  { id:"contacted", label:"Contatado", color:"#fbbf24", bg:"#fbbf2420" },
  { id:"negotiating", label:"Negociando", color:"#38bdf8", bg:"#38bdf820" },
  { id:"converted", label:"Convertido", color:"#34d399", bg:"#34d39920" },
  { id:"lost", label:"Perdido", color:"#f87171", bg:"#f8717120" },
];
const BR_UF = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];
const uid = () => Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const fmtD = d => { try { return new Date(d).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}); } catch{return d;} };

const init = { leads:[], neighborhoods:[], statuses:STS_DEF, config:{googleApiKey:"",supabaseUrl:"",supabaseKey:"",supabaseTable:"leads"}, history:[] };
function reducer(st,a){switch(a.type){
  case"LOAD":return{...init,...a.p};case"CFG":return{...st,config:{...st.config,...a.p}};
  case"ADD_HOOD":return{...st,neighborhoods:[...st.neighborhoods,a.p]};case"RM_HOOD":return{...st,neighborhoods:st.neighborhoods.filter(n=>n.id!==a.p)};
  case"ADD_LEADS":{const ids=new Set(st.leads.map(l=>l.place_id));return{...st,leads:[...st.leads,...a.p.filter(l=>!ids.has(l.place_id))]}}
  case"SET_STS":return{...st,leads:st.leads.map(l=>l.id===a.p.id?{...l,status:a.p.status}:l)};
  case"ADD_CMT":return{...st,leads:st.leads.map(l=>l.id===a.p.lid?{...l,comments:[...(l.comments||[]),a.p.c]}:l)};
  case"DEL_CMT":return{...st,leads:st.leads.map(l=>l.id===a.p.lid?{...l,comments:(l.comments||[]).filter(c=>c.id!==a.p.cid)}:l)};
  case"DEL_LEAD":return{...st,leads:st.leads.filter(l=>l.id!==a.p)};case"CLEAR":return{...st,leads:[]};
  case"ADD_S":return{...st,statuses:[...st.statuses,a.p]};case"RM_S":return{...st,statuses:st.statuses.filter(s=>s.id!==a.p)};
  case"HIST":return{...st,history:[a.p,...st.history.slice(0,19)]};default:return st;
}}

function StatusDrop({status,statuses,onChange}){
  const[open,setOpen]=useState(false);const ref=useRef(null);
  const s=statuses.find(x=>x.id===status)||statuses[0]||{label:status,color:"#888",bg:"#8882"};
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h)},[]);
  return(<div ref={ref} style={{position:"relative"}}><button onClick={()=>setOpen(!open)} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 12px",borderRadius:8,fontSize:12,fontWeight:600,color:s.color,background:s.bg,border:`1px solid ${s.color}33`,cursor:"pointer",whiteSpace:"nowrap"}}><span style={{width:7,height:7,borderRadius:"50%",background:s.color}}/>{s.label} {I.Chev(10)}</button>
    {open&&<div style={{position:"absolute",top:"calc(100% + 4px)",right:0,zIndex:99,background:"#1c1c38",border:"1px solid #33335a",borderRadius:10,padding:4,minWidth:150,boxShadow:"0 16px 48px rgba(0,0,0,0.5)"}}>
      {statuses.map(x=><button key={x.id} onClick={()=>{onChange(x.id);setOpen(false)}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",padding:"7px 12px",border:"none",borderRadius:6,background:status===x.id?"#2a2a50":"transparent",color:"#ddd",fontSize:12,cursor:"pointer"}}><span style={{width:8,height:8,borderRadius:"50%",background:x.color}}/>{x.label}</button>)}
    </div>}</div>);
}

function LeadCard({lead,statuses,dispatch}){
  const[det,setDet]=useState(false);const[cmts,setCmts]=useState(false);const[cmt,setCmt]=useState("");
  const rows=[lead.formatted_address||lead.vicinity?{icon:I.MapPin(),val:lead.formatted_address||lead.vicinity}:null,lead.formatted_phone_number?{icon:I.Phone(),val:lead.formatted_phone_number,cp:true}:null,lead.international_phone_number&&lead.international_phone_number!==lead.formatted_phone_number?{icon:I.Phone(),val:lead.international_phone_number,lbl:"Intl"}:null,lead.website?{icon:I.Globe(),val:lead.website,link:true}:null].filter(Boolean);
  const cp=t=>{try{navigator.clipboard.writeText(t)}catch{}};
  const addCmt=()=>{if(!cmt.trim())return;dispatch({type:"ADD_CMT",p:{lid:lead.id,c:{id:uid(),text:cmt.trim(),date:new Date().toISOString()}}});setCmt("")};
  return(
    <div style={{background:"linear-gradient(145deg,#161630,#1a1a3a)",border:"1px solid #2a2a52",borderRadius:14,overflow:"hidden",transition:"border-color .2s,box-shadow .2s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#4a4a80";e.currentTarget.style.boxShadow="0 8px 32px rgba(99,102,241,0.08)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor="#2a2a52";e.currentTarget.style.boxShadow="none"}}>
      <div style={{padding:"14px 16px 10px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
        <div style={{flex:1,minWidth:0}}><h3 style={{margin:0,fontSize:14,fontWeight:700,color:"#f0f0ff",lineHeight:1.35,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{lead.name}</h3>
          {lead.types?.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:5}}>{lead.types.filter(t=>t!=="point_of_interest"&&t!=="establishment").slice(0,3).map(t=><span key={t} style={{fontSize:10,padding:"2px 7px",borderRadius:5,background:"#2a2a52",color:"#9090bb",textTransform:"capitalize"}}>{t.replace(/_/g," ")}</span>)}</div>}
        </div>
        <StatusDrop status={lead.status} statuses={statuses} onChange={s=>dispatch({type:"SET_STS",p:{id:lead.id,status:s}})}/>
      </div></div>
      <div style={{padding:"4px 16px 10px"}}>
        {rows.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5,fontSize:12,color:"#9999bb"}}><span style={{color:"#6366f1",flexShrink:0}}>{r.icon}</span><span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.link?<a href={r.val.startsWith("http")?r.val:`https://${r.val}`} target="_blank" rel="noreferrer" style={{color:"#818cf8",textDecoration:"none"}}>{r.val}</a>:r.val}{r.lbl&&<span style={{marginLeft:4,fontSize:10,color:"#666"}}>({r.lbl})</span>}</span>{r.cp&&<button onClick={()=>cp(r.val)} style={{border:"none",background:"transparent",color:"#555",cursor:"pointer",padding:2}} title="Copiar">{I.Copy(12)}</button>}</div>)}
        <div style={{display:"flex",alignItems:"center",gap:10,marginTop:6,flexWrap:"wrap"}}>
          {lead.rating!=null&&<div style={{display:"flex",alignItems:"center",gap:3}}>{I.Star(13)}<span style={{fontSize:12,fontWeight:700,color:"#fbbf24"}}>{lead.rating}</span>{lead.user_ratings_total!=null&&<span style={{fontSize:11,color:"#6a6a90"}}>({lead.user_ratings_total})</span>}</div>}
          {lead.price_level!=null&&lead.price_level>0&&<span style={{fontSize:12,color:"#34d399",fontWeight:600}}>{"$".repeat(lead.price_level)}</span>}
          {lead.opening_hours!=null&&<span style={{display:"flex",alignItems:"center",gap:3,fontSize:11,color:lead.opening_hours.open_now?"#34d399":"#f87171",fontWeight:500}}>{I.Clock(11)} {lead.opening_hours.open_now?"Aberto":"Fechado"}</span>}
        </div>
        {(lead.search_state||lead.search_city)&&<div style={{display:"flex",gap:6,marginTop:8}}>{lead.search_state&&<span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#34d39918",color:"#34d399",border:"1px solid #34d39930"}}>{lead.search_state}</span>}{lead.search_city&&<span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#38bdf818",color:"#38bdf8",border:"1px solid #38bdf830"}}>{lead.search_city}</span>}{lead.search_neighborhood&&<span style={{fontSize:10,padding:"2px 6px",borderRadius:4,background:"#818cf818",color:"#818cf8",border:"1px solid #818cf830"}}>{lead.search_neighborhood}</span>}</div>}
        <button onClick={()=>setDet(!det)} style={{marginTop:8,padding:"4px 10px",border:"1px solid #2a2a52",borderRadius:6,background:"transparent",color:"#818cf8",fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>{I.Eye(12)} {det?"Ocultar":"Detalhes"}</button>
        {det&&<div style={{marginTop:8,padding:10,background:"#11112244",borderRadius:8,fontSize:11,color:"#8888aa",display:"grid",gap:4}}>
          {lead.place_id&&<div><b style={{color:"#aaa"}}>Place ID:</b> <span style={{wordBreak:"break-all"}}>{lead.place_id}</span></div>}
          {lead.geometry?.location&&<div><b style={{color:"#aaa"}}>Lat/Lng:</b> {typeof lead.geometry.location.lat==="number"?lead.geometry.location.lat.toFixed(6):lead.geometry.location.lat}, {typeof lead.geometry.location.lng==="number"?lead.geometry.location.lng.toFixed(6):lead.geometry.location.lng}</div>}
          {lead.url&&<div><b style={{color:"#aaa"}}>Maps:</b> <a href={lead.url} target="_blank" rel="noreferrer" style={{color:"#818cf8"}}>Abrir Google Maps</a></div>}
          {lead.captured_at&&<div><b style={{color:"#aaa"}}>Capturado:</b> {fmtD(lead.captured_at)}</div>}
          {lead.search_query&&<div><b style={{color:"#aaa"}}>Busca:</b> {lead.search_query}</div>}
        </div>}
      </div>
      <div style={{borderTop:"1px solid #22224a",padding:"8px 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={()=>setCmts(!cmts)} style={{display:"flex",alignItems:"center",gap:5,border:"none",background:"transparent",color:"#7777aa",fontSize:11,cursor:"pointer",padding:"4px 6px"}}>{I.Comment(13)} {(lead.comments||[]).length} coment.</button>
          <button onClick={()=>{if(confirm("Remover?"))dispatch({type:"DEL_LEAD",p:lead.id})}} style={{display:"flex",alignItems:"center",gap:3,border:"none",background:"transparent",color:"#f8717155",fontSize:11,cursor:"pointer",padding:"4px 6px",borderRadius:4}} onMouseEnter={e=>e.currentTarget.style.color="#f87171"} onMouseLeave={e=>e.currentTarget.style.color="#f8717155"}>{I.Trash(12)} Remover</button>
        </div>
        {cmts&&<div style={{marginTop:8}}>
          {(lead.comments||[]).map(c=><div key={c.id} style={{padding:"6px 8px",marginBottom:4,background:"#11112244",borderRadius:6,borderLeft:"3px solid #6366f1"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:10,color:"#6a6a90"}}>{fmtD(c.date)}</span><button onClick={()=>dispatch({type:"DEL_CMT",p:{lid:lead.id,cid:c.id}})} style={{border:"none",background:"transparent",color:"#f8717155",cursor:"pointer",padding:2}}>{I.X(12)}</button></div><p style={{margin:"3px 0 0",fontSize:12,color:"#c0c0dd",lineHeight:1.4}}>{c.text}</p></div>)}
          <div style={{display:"flex",gap:6,marginTop:6}}><input value={cmt} onChange={e=>setCmt(e.target.value)} placeholder="Comentário..." onKeyDown={e=>e.key==="Enter"&&addCmt()} style={{flex:1,padding:"7px 12px",border:"1px solid #2a2a52",borderRadius:8,background:"#0e0e20",color:"#e0e0e0",fontSize:12,outline:"none"}}/><button onClick={addCmt} style={{padding:"7px 12px",border:"none",borderRadius:8,background:"#6366f1",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center"}}>{I.Send(13)}</button></div>
        </div>}
      </div>
    </div>);
}

export default function App(){
  const[st,dp]=useReducer(reducer,init);
  const[tab,setTab]=useState("search");const[query,setQ]=useState("");const[bizT,setBizT]=useState("");
  const[uf,setUf]=useState("");const[city,setCity]=useState("");const[newH,setNewH]=useState("");
  const[loading,setL]=useState(false);const[results,setR]=useState([]);const[prog,setProg]=useState(null);const[note,setNote]=useState(null);
  const[fSts,setFSts]=useState("all");const[fTxt,setFTxt]=useState("");const[fUf,setFUf]=useState("");const[fCi,setFCi]=useState("");
  const[sTab,setSTab]=useState("api");const[tmpC,setTmpC]=useState(st.config);
  const[nSL,setNSL]=useState("");const[nSC,setNSC]=useState("#818cf8");const[syncing,setSy]=useState(false);const[logs,setLogs]=useState([]);

  useEffect(()=>{try{const d=window._pcrm;if(d){dp({type:"LOAD",p:d});setTmpC(d.config||init.config)}}catch{}},[]);
  useEffect(()=>{window._pcrm=st},[st]);
  const noti=(m,t="ok")=>{setNote({m,t});setTimeout(()=>setNote(null),4000)};
  const log=m=>setLogs(p=>[{t:Date.now(),m},...p.slice(0,49)]);

  const searchPlaces=async()=>{
    if(!st.config.googleApiKey){noti("Configure a API Key nas configurações","err");setTab("settings");return}
    if(!query&&!bizT){noti("Digite um termo de busca","err");return}
    if(!city||!uf){noti("Preencha estado e cidade","err");return}
    setL(true);setR([]);const all=[];
    const term=query||bizT;
    const qs=st.neighborhoods.length>0?st.neighborhoods.map(n=>({q:`${term} em ${n.name}, ${city}, ${uf}, Brasil`,h:n.name})):[{q:`${term} em ${city}, ${uf}, Brasil`,h:null}];
    setProg({c:0,t:qs.length});
    for(let i=0;i<qs.length;i++){
      setProg({c:i+1,t:qs.length});const{q,h}=qs[i];log(`Buscando: "${q}"`);
      try{
        const url=`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(q)}&key=${st.config.googleApiKey}&language=pt-BR&region=br`;
        let data=null;
        try{const r=await fetch(url);if(!r.ok)throw new Error(`HTTP ${r.status}`);data=await r.json();log(`${data.status}: ${data.results?.length||0} resultados`)}
        catch(e){log(`⚠ CORS/Erro: ${e.message}. A API requer um backend proxy.`);noti("A API do Google Places requer um backend proxy (CORS). Veja Config.","err");setL(false);setProg(null);return}
        if(data?.status==="REQUEST_DENIED"){log(`❌ ${data.error_message||"Verifique API key"}`);noti(`API Negada: ${data.error_message||"Verifique sua key"}`,"err");setL(false);setProg(null);return}
        if(data?.status==="OVER_QUERY_LIMIT"){log("❌ Limite excedido");noti("Limite da API excedido","err");break}
        if(data?.results){
          for(const p of data.results){
            let det={};
            try{const dr=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${p.place_id}&fields=name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,types,opening_hours,business_status,geometry,price_level,plus_code,url,vicinity&key=${st.config.googleApiKey}&language=pt-BR`);if(dr.ok){const dd=await dr.json();if(dd.result)det=dd.result}}catch{}
            all.push({...p,...det,id:uid(),status:"new",comments:[],captured_at:new Date().toISOString(),search_query:q,search_state:uf,search_city:city,search_neighborhood:h});
          }
          let nt=data.next_page_token;let pg=1;
          while(nt&&pg<3){log(`Paginando ${pg+1}...`);await new Promise(r=>setTimeout(r,2500));
            try{const nr=await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=${nt}&key=${st.config.googleApiKey}&language=pt-BR`);if(!nr.ok)break;const nd=await nr.json();if(nd.results)nd.results.forEach(p=>all.push({...p,id:uid(),status:"new",comments:[],captured_at:new Date().toISOString(),search_query:q,search_state:uf,search_city:city,search_neighborhood:h}));nt=nd.next_page_token;pg++}catch{break}
          }
        }
      }catch(e){log(`❌ ${e.message}`)}
    }
    const seen=new Set();const uniq=all.filter(r=>{if(seen.has(r.place_id))return false;seen.add(r.place_id);return true});
    setR(uniq);setProg(null);setL(false);dp({type:"HIST",p:{q:qs.map(x=>x.q).join(" | "),n:uniq.length,d:new Date().toISOString()}});
    log(`✅ ${uniq.length} resultados únicos`);uniq.length>0?noti(`${uniq.length} leads encontrados!`):noti("Nenhum resultado","err");
  };

  const importAll=()=>{dp({type:"ADD_LEADS",p:results});noti(`${results.length} leads importados!`);setR([])};

  const syncSupa=async()=>{
    const{supabaseUrl:u,supabaseKey:k,supabaseTable:t}=st.config;
    if(!u||!k){noti("Configure Supabase","err");setTab("settings");setSTab("supabase");return}
    if(!st.leads.length){noti("Sem leads","err");return}
    setSy(true);log(`Sync ${st.leads.length} leads...`);
    try{
      const url=u.replace(/\/+$/,"");
      const body=st.leads.map(l=>({place_id:l.place_id,name:l.name,address:l.formatted_address||l.vicinity||null,phone:l.formatted_phone_number||null,international_phone:l.international_phone_number||null,website:l.website||null,rating:l.rating||null,reviews_count:l.user_ratings_total||null,types:l.types||[],status:l.status,comments:l.comments||[],latitude:l.geometry?.location?.lat||null,longitude:l.geometry?.location?.lng||null,business_status:l.business_status||null,price_level:l.price_level||null,search_state:l.search_state||null,search_city:l.search_city||null,search_neighborhood:l.search_neighborhood||null,captured_at:l.captured_at}));
      const r=await fetch(`${url}/rest/v1/${t}`,{method:"POST",headers:{"Content-Type":"application/json",apikey:k,Authorization:`Bearer ${k}`,Prefer:"resolution=merge-duplicates"},body:JSON.stringify(body)});
      if(r.ok||r.status===201){log("✅ Supabase OK!");noti("Sincronizado com Supabase!")}
      else{const e=await r.text();log(`❌ Supabase ${r.status}: ${e}`);noti(`Erro ${r.status}: ${e.slice(0,120)}`,"err")}
    }catch(e){log(`❌ ${e.message}`);noti(`Conexão falhou: ${e.message}`,"err")}
    setSy(false);
  };

  const exportCSV=()=>{
    if(!st.leads.length){noti("Sem leads","err");return}
    const h=["Nome","Endereço","Telefone","Tel Intl","Website","Rating","Avaliações","Status","Tipos","UF","Cidade","Bairro","Lat","Lng","Capturado"];
    const rows=st.leads.map(l=>[l.name,l.formatted_address||l.vicinity||"",l.formatted_phone_number||"",l.international_phone_number||"",l.website||"",l.rating||"",l.user_ratings_total||"",st.statuses.find(s=>s.id===l.status)?.label||l.status,(l.types||[]).join("; "),l.search_state||"",l.search_city||"",l.search_neighborhood||"",l.geometry?.location?.lat||"",l.geometry?.location?.lng||"",l.captured_at||""]);
    const csv=[h,...rows].map(r=>r.map(c=>`"${(c+"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const b=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8;"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download=`leads_${new Date().toISOString().split("T")[0]}.csv`;a.click();noti("CSV exportado!");
  };

  const allUfs=[...new Set(st.leads.map(l=>l.search_state).filter(Boolean))].sort();
  const allCities=[...new Set(st.leads.filter(l=>!fUf||l.search_state===fUf).map(l=>l.search_city).filter(Boolean))].sort();
  const filtered=st.leads.filter(l=>{
    if(fSts!=="all"&&l.status!==fSts)return false;if(fUf&&l.search_state!==fUf)return false;if(fCi&&l.search_city!==fCi)return false;
    if(fTxt){const t=fTxt.toLowerCase();if(!l.name.toLowerCase().includes(t)&&!(l.formatted_address||"").toLowerCase().includes(t)&&!(l.formatted_phone_number||"").includes(t))return false}return true;
  });
  const counts=st.statuses.reduce((a,s)=>{a[s.id]=st.leads.filter(l=>l.status===s.id).length;return a},{});

  const inp={width:"100%",padding:"10px 14px",border:"1px solid #2a2a52",borderRadius:8,background:"#0e0e20",color:"#e0e0e0",fontSize:13,outline:"none",boxSizing:"border-box"};
  const btnP={padding:"10px 20px",border:"none",borderRadius:8,background:"linear-gradient(135deg,#6366f1,#7c3aed)",color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6,boxShadow:"0 4px 16px rgba(99,102,241,0.25)"};
  const btnS={...btnP,background:"#2a2a52",boxShadow:"none"};
  const tBtn=id=>({padding:"10px 18px",border:"none",borderRadius:8,background:tab===id?"#6366f1":"transparent",color:tab===id?"#fff":"#8888aa",fontSize:13,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6});

  return(
    <div style={{minHeight:"100vh",background:"#0c0c1a",fontFamily:"'DM Sans','Segoe UI',sans-serif",color:"#e0e0e0"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@700&display=swap" rel="stylesheet"/>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}input:focus,select:focus,textarea:focus{border-color:#6366f1!important}::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:#2a2a52;border-radius:3px}select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238888aa' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:32px!important}`}</style>

      {note&&<div style={{position:"fixed",top:20,right:20,zIndex:9999,padding:"12px 20px",borderRadius:10,background:note.t==="err"?"#dc2626":"#059669",color:"#fff",fontSize:13,fontWeight:600,boxShadow:"0 8px 32px rgba(0,0,0,0.4)",animation:"fadeIn .3s",maxWidth:420}}>{note.m}</div>}

      {/* HEADER */}
      <div style={{padding:"14px 24px",borderBottom:"1px solid #1a1a35",background:"#0e0e22",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#6366f1,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(99,102,241,0.3)"}}>{I.Zap(22)}</div>
          <div><h1 style={{margin:0,fontSize:18,fontWeight:700,fontFamily:"'Space Mono',monospace",background:"linear-gradient(90deg,#818cf8,#c084fc)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>PLEADS CRM</h1><span style={{fontSize:10,color:"#5555aa",letterSpacing:"0.1em"}}>POWER LEAD CAPTURE</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{padding:"4px 12px",borderRadius:8,background:"#6366f118",color:"#818cf8",fontSize:12,fontWeight:600,border:"1px solid #6366f130"}}>{st.leads.length} leads</span>
          <button onClick={exportCSV} style={{...btnS,padding:"8px 14px",fontSize:12}}>{I.Down(14)} CSV</button>
        </div>
      </div>

      {/* TABS */}
      <div style={{padding:"8px 24px",borderBottom:"1px solid #1a1a35",display:"flex",gap:4,background:"#0d0d1e"}}>
        <button onClick={()=>setTab("search")} style={tBtn("search")}>{I.Search(16)} Buscar</button>
        <button onClick={()=>setTab("leads")} style={tBtn("leads")}>{I.Bldg(15)} Leads ({st.leads.length})</button>
        <button onClick={()=>setTab("settings")} style={tBtn("settings")}>{I.Settings(16)} Config</button>
      </div>

      <div style={{padding:24,maxWidth:1440,margin:"0 auto"}}>

        {/* ══ SEARCH ══ */}
        {tab==="search"&&<div>
          <div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:20,marginBottom:16}}>
            <h2 style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#c0c0dd",display:"flex",alignItems:"center",gap:8}}>{I.MapPin(18)} Localização</h2>
            <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:12}}>
              <div><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Estado *</label><select value={uf} onChange={e=>setUf(e.target.value)} style={inp}><option value="">Selecione...</option>{BR_UF.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
              <div><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Cidade *</label><input value={city} onChange={e=>setCity(e.target.value)} placeholder="Ex: Joinville" style={inp}/></div>
            </div>
            <div style={{marginTop:14}}>
              <label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Bairros <span style={{color:"#6366f1"}}>(multiplica buscas, supera limite 60 resultados)</span></label>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input value={newH} onChange={e=>setNewH(e.target.value)} placeholder="Nome do bairro..." onKeyDown={e=>{if(e.key==="Enter"&&newH.trim()){dp({type:"ADD_HOOD",p:{id:uid(),name:newH.trim()}});setNewH("")}}} style={{...inp,flex:1}}/>
                <button onClick={()=>{if(newH.trim()){dp({type:"ADD_HOOD",p:{id:uid(),name:newH.trim()}});setNewH("")}}} style={{...btnP,padding:"10px 14px"}}>{I.Plus()}</button>
              </div>
              {st.neighborhoods.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                {st.neighborhoods.map(n=><span key={n.id} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:6,background:"#818cf815",color:"#a5b4fc",fontSize:12,border:"1px solid #818cf830"}}>{n.name}<button onClick={()=>dp({type:"RM_HOOD",p:n.id})} style={{border:"none",background:"transparent",color:"#f87171",cursor:"pointer",padding:0,lineHeight:1}}>{I.X(12)}</button></span>)}
                <span style={{fontSize:11,color:"#6366f1",alignSelf:"center"}}>{st.neighborhoods.length} bairro(s) × 60 = até {st.neighborhoods.length*60} resultados</span>
              </div>}
            </div>
          </div>

          <div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:20,marginBottom:16}}>
            <h2 style={{margin:"0 0 14px",fontSize:15,fontWeight:700,color:"#c0c0dd",display:"flex",alignItems:"center",gap:8}}>{I.Search(18)} Buscar no Google Places</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 220px auto",gap:12,alignItems:"end"}}>
              <div><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Termo *</label><input value={query} onChange={e=>setQ(e.target.value)} placeholder="Ex: restaurantes, dentistas..." onKeyDown={e=>{if(e.key==="Enter")searchPlaces()}} style={inp}/></div>
              <div><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Tipo</label><select value={bizT} onChange={e=>setBizT(e.target.value)} style={inp}><option value="">Qualquer</option><option value="restaurant">Restaurantes</option><option value="dentist">Dentistas</option><option value="doctor">Médicos</option><option value="lawyer">Advogados</option><option value="gym">Academias</option><option value="beauty_salon">Salões</option><option value="bakery">Padarias</option><option value="pharmacy">Farmácias</option><option value="hotel">Hotéis</option><option value="car_repair">Oficinas</option><option value="real_estate_agency">Imobiliárias</option><option value="accounting">Contabilidade</option><option value="pet_store">Pet Shops</option><option value="store">Lojas</option><option value="school">Escolas</option></select></div>
              <button onClick={searchPlaces} disabled={loading} style={{...btnP,opacity:loading?.6:1,cursor:loading?"wait":"pointer",height:42}}>{I.Search(16)} {loading?"Buscando...":"Buscar"}</button>
            </div>
            {prog&&<div style={{marginTop:14}}><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#7777aa",marginBottom:4}}><span>Consulta {prog.c}/{prog.t}</span><span>{Math.round(prog.c/prog.t*100)}%</span></div><div style={{height:4,background:"#1a1a35",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#6366f1,#7c3aed)",width:`${prog.c/prog.t*100}%`,transition:"width .3s"}}/></div></div>}
            {logs.length>0&&<div style={{marginTop:14,maxHeight:120,overflow:"auto",padding:10,background:"#0a0a18",borderRadius:8,border:"1px solid #1a1a35"}}>{logs.slice(0,10).map((l,i)=><div key={l.t+""+i} style={{fontSize:11,color:l.m.startsWith("❌")?"#f87171":l.m.startsWith("✅")?"#34d399":l.m.startsWith("⚠")?"#fbbf24":"#6a6a90",marginBottom:2,fontFamily:"monospace"}}>{l.m}</div>)}</div>}
          </div>

          <div style={{background:"#fbbf2410",border:"1px solid #fbbf2430",borderRadius:12,padding:16,marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
            <span style={{color:"#fbbf24",flexShrink:0,marginTop:2}}>{I.Warn(18)}</span>
            <div style={{fontSize:12,color:"#ccc",lineHeight:1.6}}>
              <b style={{color:"#fbbf24"}}>Importante:</b> A Google Places API não suporta chamadas diretas do navegador (CORS). É necessário um <b>backend proxy</b> (Node.js, Cloud Function, etc). Veja as instruções na aba Config → Google Places API.
            </div>
          </div>

          {results.length>0&&<div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:20}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <h2 style={{margin:0,fontSize:15,fontWeight:700,color:"#c0c0dd"}}>{results.length} resultados</h2>
              <div style={{display:"flex",gap:8}}><button onClick={()=>setR([])} style={{...btnS,padding:"8px 14px",fontSize:12}}>{I.X(14)} Limpar</button><button onClick={importAll} style={{...btnP,fontSize:12}}>{I.Down(14)} Importar ao CRM</button></div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:14}}>{results.map(l=><LeadCard key={l.id} lead={l} statuses={st.statuses} dispatch={a=>{if(a.type==="SET_STS")setR(p=>p.map(x=>x.id===a.p.id?{...x,status:a.p.status}:x));if(a.type==="ADD_CMT")setR(p=>p.map(x=>x.id===a.p.lid?{...x,comments:[...(x.comments||[]),a.p.c]}:x));if(a.type==="DEL_CMT")setR(p=>p.map(x=>x.id===a.p.lid?{...x,comments:(x.comments||[]).filter(c=>c.id!==a.p.cid)}:x));if(a.type==="DEL_LEAD")setR(p=>p.filter(x=>x.id!==a.p))}}/>)}</div>
          </div>}

          {st.history.length>0&&!results.length&&!loading&&<div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:20}}>
            <h3 style={{margin:"0 0 10px",fontSize:14,fontWeight:600,color:"#7777aa"}}>Histórico</h3>
            {st.history.slice(0,6).map((h,i)=><div key={i} style={{padding:"6px 0",borderBottom:"1px solid #1a1a35",fontSize:12,display:"flex",justifyContent:"space-between",color:"#6a6a90"}}><span style={{color:"#9999bb"}}>{h.q.length>70?h.q.slice(0,70)+"...":h.q}</span><span>{h.n} res. • {fmtD(h.d)}</span></div>)}
          </div>}
        </div>}

        {/* ══ LEADS ══ */}
        {tab==="leads"&&<div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:16}}>
            <div onClick={()=>setFSts("all")} style={{padding:"14px 10px",borderRadius:12,cursor:"pointer",textAlign:"center",background:fSts==="all"?"linear-gradient(135deg,#6366f1,#7c3aed)":"#12122a",border:`1px solid ${fSts==="all"?"#6366f150":"#2a2a52"}`,transition:"all .15s"}}><div style={{fontSize:24,fontWeight:700,fontFamily:"'Space Mono',monospace"}}>{st.leads.length}</div><div style={{fontSize:11,color:fSts==="all"?"#e0e0ff":"#7777aa",marginTop:2}}>Total</div></div>
            {st.statuses.map(s=><div key={s.id} onClick={()=>setFSts(fSts===s.id?"all":s.id)} style={{padding:"14px 10px",borderRadius:12,cursor:"pointer",textAlign:"center",background:fSts===s.id?s.bg:"#12122a",border:`1px solid ${fSts===s.id?s.color+"44":"#2a2a52"}`,transition:"all .15s"}}><div style={{fontSize:24,fontWeight:700,color:s.color,fontFamily:"'Space Mono',monospace"}}>{counts[s.id]||0}</div><div style={{fontSize:11,color:"#7777aa",marginTop:2}}>{s.label}</div></div>)}
          </div>

          <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{flex:"1 1 220px",position:"relative"}}><input value={fTxt} onChange={e=>setFTxt(e.target.value)} placeholder="Buscar nome, endereço, telefone..." style={{...inp,paddingLeft:38}}/><span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#5555aa"}}>{I.Search(16)}</span></div>
            <div style={{flex:"0 0 130px"}}><select value={fUf} onChange={e=>{setFUf(e.target.value);setFCi("")}} style={inp}><option value="">Todos UFs</option>{allUfs.map(s=><option key={s} value={s}>{s}</option>)}</select></div>
            <div style={{flex:"0 0 180px"}}><select value={fCi} onChange={e=>setFCi(e.target.value)} style={inp}><option value="">Todas cidades</option>{allCities.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
            <button onClick={syncSupa} disabled={syncing} style={{...btnS,padding:"10px 16px",opacity:syncing?.6:1}}>{syncing?I.Refresh(14):I.DB(14)} {syncing?"Sincronizando...":"Sync Supabase"}</button>
            {st.leads.length>0&&<button onClick={()=>{if(confirm("Remover TODOS?"))dp({type:"CLEAR"})}} style={{...btnS,padding:"10px 14px",color:"#f87171"}}>{I.Trash(14)} Limpar</button>}
          </div>

          {(fSts!=="all"||fUf||fCi||fTxt)&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:"#7777aa"}}>Filtros:</span>
            {fSts!=="all"&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:"#818cf818",color:"#818cf8",border:"1px solid #818cf830"}}>{st.statuses.find(s=>s.id===fSts)?.label}</span>}
            {fUf&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:"#34d39918",color:"#34d399",border:"1px solid #34d39930"}}>{fUf}</span>}
            {fCi&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:"#38bdf818",color:"#38bdf8",border:"1px solid #38bdf830"}}>{fCi}</span>}
            {fTxt&&<span style={{fontSize:11,padding:"2px 8px",borderRadius:5,background:"#fbbf2418",color:"#fbbf24",border:"1px solid #fbbf2430"}}>"{fTxt}"</span>}
            <button onClick={()=>{setFSts("all");setFUf("");setFCi("");setFTxt("")}} style={{fontSize:11,border:"none",background:"transparent",color:"#f87171",cursor:"pointer",textDecoration:"underline"}}>Limpar</button>
          </div>}

          {filtered.length===0?<div style={{textAlign:"center",padding:60,color:"#5555aa"}}><div style={{fontSize:40,marginBottom:8}}>📋</div><p style={{fontSize:14}}>{st.leads.length===0?"Nenhum lead. Vá para Buscar!":"Nenhum lead com esses filtros."}</p>{st.leads.length>0&&<button onClick={()=>{setFSts("all");setFUf("");setFCi("");setFTxt("")}} style={{...btnS,margin:"12px auto",padding:"8px 16px",fontSize:12}}>Limpar filtros</button>}</div>
          :<><div style={{fontSize:12,color:"#6a6a90",marginBottom:10}}>Mostrando {filtered.length} de {st.leads.length}</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(350px,1fr))",gap:14}}>{filtered.map(l=><LeadCard key={l.id} lead={l} statuses={st.statuses} dispatch={dp}/>)}</div></>}
        </div>}

        {/* ══ SETTINGS ══ */}
        {tab==="settings"&&<div>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {[{id:"api",label:"Google Places API",icon:I.Search(14)},{id:"supabase",label:"Supabase",icon:I.DB(14)},{id:"statuses",label:"Status",icon:I.Filter(14)}].map(t=><button key={t.id} onClick={()=>setSTab(t.id)} style={{padding:"8px 16px",border:`1px solid ${sTab===t.id?"#6366f1":"#2a2a52"}`,borderRadius:8,background:sTab===t.id?"#6366f118":"transparent",color:sTab===t.id?"#a5b4fc":"#7777aa",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}>{t.icon} {t.label}</button>)}
          </div>

          {sTab==="api"&&<div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:24}}>
            <h2 style={{margin:"0 0 6px",fontSize:16,fontWeight:700,color:"#c0c0dd"}}>Google Places API</h2>
            <p style={{margin:"0 0 20px",fontSize:12,color:"#7777aa"}}>Obtenha em <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" style={{color:"#818cf8"}}>console.cloud.google.com</a></p>
            <div style={{marginBottom:16}}><label style={{fontSize:12,color:"#9999bb",marginBottom:6,display:"block",fontWeight:600}}>API Key</label><input value={tmpC.googleApiKey} onChange={e=>setTmpC(p=>({...p,googleApiKey:e.target.value}))} placeholder="AIzaSy..." type="password" style={inp}/></div>
            <div style={{padding:16,background:"#0a0a18",borderRadius:10,marginBottom:16,fontSize:12,color:"#8888aa",lineHeight:1.7}}>
              <b style={{color:"#fbbf24"}}>⚠ APIs necessárias:</b><div style={{marginTop:8}}>✦ Places API ✦ Places API (New) - recomendado</div>
              <div style={{marginTop:12,padding:12,background:"#dc262615",borderRadius:8,border:"1px solid #dc262630",color:"#f87171"}}><b>🔒 CORS:</b><div style={{marginTop:4,color:"#ccc"}}>A API requer um backend proxy. Use Node.js Express, Vercel/Netlify Functions, ou Supabase Edge Functions.</div></div>
              <div style={{marginTop:12,padding:12,background:"#05966915",borderRadius:8,border:"1px solid #05966930"}}><b style={{color:"#34d399"}}>💡 Proxy Node.js:</b>
                <pre style={{marginTop:6,padding:10,background:"#08081a",borderRadius:6,fontSize:11,color:"#a5b4fc",overflow:"auto",whiteSpace:"pre-wrap"}}>{`const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/api/places/search', async (req, res) => {
  const { query } = req.query;
  const KEY = process.env.GOOGLE_API_KEY;
  const url = \`https://maps.googleapis.com/maps/api/place/textsearch/json?query=\${encodeURIComponent(query)}&key=\${KEY}&language=pt-BR\`;
  const r = await fetch(url);
  res.json(await r.json());
});

app.get('/api/places/details', async (req, res) => {
  const { place_id } = req.query;
  const KEY = process.env.GOOGLE_API_KEY;
  const url = \`https://maps.googleapis.com/maps/api/place/details/json?place_id=\${place_id}&fields=name,formatted_address,formatted_phone_number,international_phone_number,website,rating,user_ratings_total,types,opening_hours,business_status,geometry,price_level,plus_code,url,vicinity&key=\${KEY}&language=pt-BR\`;
  const r = await fetch(url);
  res.json(await r.json());
});

app.listen(3001);`}</pre></div>
            </div>
            <button onClick={()=>{dp({type:"CFG",p:tmpC});noti("Salvo!")}} style={btnP}>{I.Check(14)} Salvar</button>
          </div>}

          {sTab==="supabase"&&<div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:24}}>
            <h2 style={{margin:"0 0 6px",fontSize:16,fontWeight:700,color:"#c0c0dd"}}>Supabase</h2>
            <p style={{margin:"0 0 20px",fontSize:12,color:"#7777aa"}}>Conecte ao <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{color:"#34d399"}}>Supabase</a> para persistir leads.</p>
            <div style={{display:"grid",gap:14}}>
              <div><label style={{fontSize:12,color:"#9999bb",marginBottom:6,display:"block",fontWeight:600}}>URL do Projeto</label><input value={tmpC.supabaseUrl} onChange={e=>setTmpC(p=>({...p,supabaseUrl:e.target.value}))} placeholder="https://xxx.supabase.co" style={inp}/><span style={{fontSize:10,color:"#5555aa"}}>Settings → API → URL</span></div>
              <div><label style={{fontSize:12,color:"#9999bb",marginBottom:6,display:"block",fontWeight:600}}>Chave anon</label><input value={tmpC.supabaseKey} onChange={e=>setTmpC(p=>({...p,supabaseKey:e.target.value}))} placeholder="eyJ..." type="password" style={inp}/><span style={{fontSize:10,color:"#5555aa"}}>Settings → API → anon public</span></div>
              <div><label style={{fontSize:12,color:"#9999bb",marginBottom:6,display:"block",fontWeight:600}}>Tabela</label><input value={tmpC.supabaseTable} onChange={e=>setTmpC(p=>({...p,supabaseTable:e.target.value}))} placeholder="leads" style={inp}/></div>
            </div>
            <div style={{padding:16,background:"#0a0a18",borderRadius:10,marginTop:16,marginBottom:16,fontSize:12,color:"#8888aa"}}>
              <b style={{color:"#34d399"}}>SQL para criar tabela:</b>
              <pre style={{marginTop:8,padding:12,background:"#08081a",borderRadius:8,fontSize:11,color:"#a5b4fc",overflow:"auto",whiteSpace:"pre-wrap"}}>{`CREATE TABLE leads (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  place_id TEXT UNIQUE,
  name TEXT NOT NULL,
  address TEXT, phone TEXT, international_phone TEXT,
  website TEXT, rating REAL, reviews_count INTEGER,
  types JSONB DEFAULT '[]', status TEXT DEFAULT 'new',
  comments JSONB DEFAULT '[]',
  latitude REAL, longitude REAL,
  business_status TEXT, price_level INTEGER,
  search_state TEXT, search_city TEXT, search_neighborhood TEXT,
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE INDEX idx_leads_place_id ON leads(place_id);`}</pre>
            </div>
            <div style={{padding:12,background:"#fbbf2410",borderRadius:8,marginBottom:16,border:"1px solid #fbbf2430",fontSize:12,color:"#ccc"}}><b style={{color:"#fbbf24"}}>Checklist:</b> 1) Crie a tabela 2) RLS habilitado com policy 3) Use chave anon 4) URL sem barra final</div>
            <button onClick={()=>{dp({type:"CFG",p:tmpC});noti("Supabase salvo!")}} style={btnP}>{I.Check(14)} Salvar</button>
          </div>}

          {sTab==="statuses"&&<div style={{background:"#12122a",border:"1px solid #2a2a52",borderRadius:14,padding:24}}>
            <h2 style={{margin:"0 0 6px",fontSize:16,fontWeight:700,color:"#c0c0dd"}}>Status do Pipeline</h2>
            <p style={{margin:"0 0 20px",fontSize:12,color:"#7777aa"}}>Customize os status dos seus leads.</p>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
              {st.statuses.map(s=><div key={s.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#0e0e20",borderRadius:8,border:"1px solid #2a2a52"}}><span style={{width:16,height:16,borderRadius:4,background:s.color,flexShrink:0}}/><span style={{flex:1,fontSize:13,fontWeight:600,color:"#c0c0dd"}}>{s.label}</span><code style={{fontSize:10,color:"#5555aa",background:"#0a0a18",padding:"2px 6px",borderRadius:4}}>{s.id}</code>{st.statuses.length>2&&<button onClick={()=>dp({type:"RM_S",p:s.id})} style={{border:"none",background:"transparent",color:"#f8717155",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.color="#f87171"} onMouseLeave={e=>e.currentTarget.style.color="#f8717155"}>{I.Trash()}</button>}</div>)}
            </div>
            <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
              <div style={{flex:1}}><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Novo status</label><input value={nSL} onChange={e=>setNSL(e.target.value)} placeholder="Ex: Em Análise" style={inp}/></div>
              <div><label style={{fontSize:11,color:"#7777aa",marginBottom:4,display:"block"}}>Cor</label><input type="color" value={nSC} onChange={e=>setNSC(e.target.value)} style={{width:44,height:42,border:"1px solid #2a2a52",borderRadius:8,background:"#0e0e20",cursor:"pointer",padding:2}}/></div>
              <button onClick={()=>{if(!nSL.trim())return;dp({type:"ADD_S",p:{id:nSL.trim().toLowerCase().replace(/\s+/g,"_"),label:nSL.trim(),color:nSC,bg:nSC+"20"}});setNSL("");noti("Status adicionado!")}} style={btnP}>{I.Plus(14)} Adicionar</button>
            </div>
          </div>}
        </div>}
      </div>
    </div>);
}
