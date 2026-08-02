"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1276],{7633:function(e,l,t){t.r(l);t.d(l,{default:function(){return BillingPage}});
var n=t(52676),r=t(75271),a=t(53405),o=t(78451);

function FriendlySelect(props){
var _o=r.useState(false),open=_o[0],setOpen=_o[1];
var ref=r.useRef(null);
r.useEffect(function(){
function onDoc(e){if(ref.current&&!ref.current.contains(e.target)){setOpen(false)}}
document.addEventListener("mousedown",onDoc);
return function(){document.removeEventListener("mousedown",onDoc)}
},[]);
var options=props.options||[];
var cur=null;
for(var i=0;i<options.length;i++){if(String(options[i].value)===String(props.value)){cur=options[i];break}}
var label=cur?cur.label:(props.placeholder||"");
var isPlaceholder=!cur;
var minWidth=props.minWidth||180;
return(0,n.jsxs)("div",{ref:ref,style:Object.assign({position:"relative",display:"inline-block",minWidth:minWidth},props.style||{}),children:[
(0,n.jsxs)("div",{onClick:function(){if(!props.disabled)setOpen(!open)},style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,padding:"5px 12px",border:"1px solid "+(open?"#513CC8":"#d9d9d9"),borderRadius:6,background:props.disabled?"#f5f5f5":"#fff",cursor:props.disabled?"not-allowed":"pointer",boxShadow:open?"0 0 0 2px rgba(81,60,200,0.1)":"none",transition:"all 0.2s",minHeight:22},children:[
(0,n.jsx)("span",{style:{color:isPlaceholder?"#bfbfbf":"#333",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:label}),
(0,n.jsx)("span",{style:{color:"#999",fontSize:12,transform:open?"rotate(180deg)":"none",transition:"transform 0.2s"},children:"\u25be"})
]}),
open?(0,n.jsx)("div",{style:{position:"absolute",top:"calc(100% + 4px)",left:0,right:0,background:"#fff",border:"1px solid #f0f0f0",borderRadius:8,boxShadow:"0 6px 16px rgba(0,0,0,0.12)",zIndex:1000,maxHeight:260,overflowY:"auto",padding:4},children:options.map(function(opt){
var sel=String(opt.value)===String(props.value);
return(0,n.jsxs)("div",{onClick:function(){setOpen(false);if(props.onChange)props.onChange(opt.value)},style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:6,cursor:"pointer",background:sel?"rgba(81,60,200,0.08)":"transparent",color:sel?"#513CC8":"#333",fontWeight:sel?600:400},onMouseEnter:function(e){if(!sel)e.currentTarget.style.background="#f5f5f5"},onMouseLeave:function(e){if(!sel)e.currentTarget.style.background="transparent"},children:[
(0,n.jsx)("span",{style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:opt.label}),
sel?(0,n.jsx)("span",{style:{color:"#513CC8",fontSize:12},children:"\u2713"}):null
]},String(opt.value))
})}):null
]})
}

function FriendlyModal(props){
if(!props.open)return null;
return(0,n.jsx)("div",{onClick:function(e){if(e.target===e.currentTarget&&props.onClose)props.onClose()},style:{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,animation:"none"},children:
(0,n.jsxs)("div",{style:{background:"#fff",borderRadius:12,width:props.width||480,maxWidth:"90vw",maxHeight:"85vh",overflow:"hidden",boxShadow:"0 12px 48px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column"},children:[
(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",borderBottom:"1px solid #f0f0f0"},children:[
(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:10},children:[
props.icon?(0,n.jsx)("span",{style:{fontSize:20},children:props.icon}):null,
(0,n.jsx)("span",{style:{fontSize:16,fontWeight:600,color:"#1a1a2e"},children:props.title})
]}),
(0,n.jsx)("span",{onClick:props.onClose,style:{cursor:"pointer",color:"#999",fontSize:18,lineHeight:1,padding:4},children:"\u2715"})
]}),
(0,n.jsx)("div",{style:{padding:"20px 24px",overflowY:"auto"},children:props.children}),
(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end",gap:12,padding:"12px 24px",borderTop:"1px solid #f0f0f0"},children:[
props.hideCancel?null:(0,n.jsx)(a.ZP,{onClick:props.onClose,children:props.cancelText||"\u53d6\u6d88"}),
(0,n.jsx)(a.ZP,{type:"primary",onClick:props.onOk,children:props.okText||"\u786e\u5b9a"})
]})
]})
})
}

function BillingPage(){
var intl=(0,o.useIntl)();
var fm=function(id){return intl.formatMessage({id:id})};
var _React$useState1=r.useState("overview"),activeTab=_React$useState1[0],setActiveTab=_React$useState1[1];
var _React$useState2=r.useState(null),data=_React$useState2[0],setData=_React$useState2[1];
var _React$useState3=r.useState(true),loading=_React$useState3[0],setLoading=_React$useState3[1];
var _React$useState4=r.useState("all"),selectedTenant=_React$useState4[0],setSelectedTenant=_React$useState4[1];
var _React$useState5=r.useState({}),rateConfig=_React$useState5[0],setRateConfig=_React$useState5[1];
var _React$useState6=r.useState({}),budgetConfig=_React$useState6[0],setBudgetConfig=_React$useState6[1];
var _msModal=r.useState(false),saveRateModal=_msModal[0],setSaveRateModal=_msModal[1];
var _mbModal=r.useState(false),saveBudgetModal=_mbModal[0],setSaveBudgetModal=_mbModal[1];
var _meModal=r.useState(false),editModalOpen=_meModal[0],setEditModalOpen=_meModal[1];
var _meRow=r.useState(null),editingRate=_meRow[0],setEditingRate=_meRow[1];
var _dr=r.useState("all"),dailyRange=_dr[0],setDailyRange=_dr[1];
var _hb=r.useState(-1),hoverBar=_hb[0],setHoverBar=_hb[1];

r.useEffect(function(){fetchData()},[]);

function fetchData(){
setLoading(true);
fetch("/v2/billing/overview",{credentials:"include"}).then(function(res){return res.json()}).then(function(d){setData(d);setLoading(false)}).catch(function(){setLoading(false)})
}

function exportPDF(){
var w=window.open("","_blank");
if(!w)return;
var tenant=selectedTenant==="all"?"":selectedTenant;
var title=fm("billing.export.title");
var period=data&&data.period?data.period.start+" ~ "+data.period.end:"";
var summary=data&&data.summary?data.summary:{};
var models=data&&data.models?data.models:[];
var html="<!DOCTYPE html><html><head><meta charset=utf-8><title>"+title+"</title>";
html+="<style>body{font-family:Arial,sans-serif;padding:40px;color:#333}";
html+="h1{text-align:center;color:#1a1a2e}table{width:100%;border-collapse:collapse;margin:20px 0}";
html+="th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#f5f5f5}";
html+=".header{text-align:center;margin-bottom:30px}.summary{display:flex;gap:20px;margin:20px 0}";
html+=".card{flex:1;padding:15px;border:1px solid #eee;border-radius:8px;text-align:center}";
html+=".amount{font-size:24px;color:#1890ff;font-weight:bold}</style></head><body>";
html+="<div class=header><h1>"+title+"</h1><p>"+fm("billing.export.period")+": "+period+"</p>";
if(tenant)html+="<p>"+fm("billing.export.tenant")+": "+tenant+"</p>";
html+="<p>"+fm("billing.export.generated")+": "+new Date().toLocaleString()+"</p></div>";
html+="<h2>"+fm("billing.tab.overview")+"</h2>";
html+="<table><tr><th>"+fm("billing.summary.totalCost")+"</th><th>"+fm("billing.summary.totalTokens")+"</th><th>"+fm("billing.summary.totalRequests")+"</th><th>"+fm("billing.summary.activeModels")+"</th></tr>";
html+="<tr><td>$"+(summary.total_cost||0).toFixed(2)+"</td><td>"+(summary.total_tokens||0).toLocaleString()+"</td><td>"+(summary.total_requests||0).toLocaleString()+"</td><td>"+(summary.active_models||0)+"</td></tr></table>";
html+="<h2>"+fm("billing.tab.details")+"</h2>";
html+="<table><tr><th>"+fm("billing.model")+"</th><th>"+fm("billing.tokens")+"</th><th>"+fm("billing.requests")+"</th><th>"+fm("billing.cost")+"</th></tr>";
for(var i=0;i<models.length;i++){var m=models[i];html+="<tr><td>"+m.name+"</td><td>"+m.tokens.toLocaleString()+"</td><td>"+m.requests+"</td><td>$"+m.cost.toFixed(2)+"</td></tr>"}
html+="</table>";
html+="<div style=margin-top:50px;text-align:center;color:#999><p>"+fm("billing.export.footer")+"</p></div>";
html+="</body></html>";
w.document.write(html);
w.document.close();
w.print()
}

function saveRates(){
if(!rateConfig.model){return}
fetch("/v2/billing/rates",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenant:selectedTenant,config:rateConfig})}).then(function(){setSaveRateModal(true)})
}

function saveBudget(){
fetch("/v2/billing/budget",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenant:selectedTenant,config:budgetConfig})}).then(function(){setSaveBudgetModal(true)})
}

function openEditRate(model){
var rt=rates[model]||{};
setEditingRate({model:model,input:rt.input,output:rt.output});
setEditModalOpen(true)
}

function saveEditRate(){
if(!editingRate)return;
fetch("/v2/billing/rates",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenant:selectedTenant,config:{model:editingRate.model,input:editingRate.input,output:editingRate.output}})}).then(function(){setEditModalOpen(false);fetchData()})
}

var tenants=data&&data.tenants?data.tenants:[];
var summary2=data&&data.summary?data.summary:{};
var models2=data&&data.models?data.models:[];
var history=data&&data.history?data.history:[];
var rates=data&&data.rates?data.rates:{};
var daily=data&&data.daily?data.daily:[];

var modelOptions=function(){
var seen={};var opts=[];
for(var i=0;i<models2.length;i++){var nm=models2[i].name;if(nm&&!seen[nm]){seen[nm]=1;opts.push({value:nm,label:nm})}}
Object.keys(rates).forEach(function(k){if(!seen[k]){seen[k]=1;opts.push({value:k,label:k})}});
return opts
}();

var tenantOptions=[{value:"all",label:fm("billing.tenant.all")}].concat(tenants.map(function(t2){return{value:t2.id,label:t2.name}}));

var tenantSelector=(0,n.jsxs)("div",{style:{marginBottom:16,display:"flex",alignItems:"center",gap:12},children:[(0,n.jsx)("span",{children:fm("billing.tenant.select")+":"}),(0,n.jsx)(FriendlySelect,{value:selectedTenant,onChange:function(v){setSelectedTenant(v)},options:tenantOptions,minWidth:220})]});

var tabItems=[{key:"overview",label:fm("billing.tab.overview")},{key:"details",label:fm("billing.tab.details")},{key:"rates",label:fm("billing.tab.rates")},{key:"budget",label:fm("billing.tab.budget")},{key:"history",label:fm("billing.tab.history")}];

var tabBar=(0,n.jsx)("div",{style:{display:"flex",gap:0,borderBottom:"1px solid #f0f0f0",marginBottom:20},children:tabItems.map(function(item){return(0,n.jsx)("div",{onClick:function(){setActiveTab(item.key)},style:{padding:"12px 20px",cursor:"pointer",borderBottom:activeTab===item.key?"2px solid #513CC8":"2px solid transparent",color:activeTab===item.key?"#513CC8":"#666",fontWeight:activeTab===item.key?500:400,transition:"all 0.3s"},children:item.label},item.key)})});

var statCards=[{label:fm("billing.summary.totalCost"),value:"$"+(summary2.total_cost||0).toFixed(2),color:"#513CC8",icon:"\ud83d\udcb0"},{label:fm("billing.summary.totalTokens"),value:(summary2.total_tokens||0).toLocaleString(),color:"#2f80ed",icon:"\ud83e\uddee"},{label:fm("billing.summary.totalRequests"),value:(summary2.total_requests||0).toLocaleString(),color:"#13a8a8",icon:"\ud83d\udce1"},{label:fm("billing.summary.activeModels"),value:String(summary2.active_models||0),color:"#52c41a",icon:"\ud83e\udde9"}];

var rangeMap={"7":7,"14":14,"30":30,"all":9999};
var rangeN=rangeMap[dailyRange]||9999;
var dailyView=rangeN>=daily.length?daily:daily.slice(daily.length-rangeN);
var dailyMax=Math.max.apply(null,dailyView.map(function(x){return x.cost}))||1;
var labelStep=Math.max(1,Math.ceil(dailyView.length/8));
var rangeOptions=[{value:"7",label:fm("billing.daily.range7")},{value:"14",label:fm("billing.daily.range14")},{value:"30",label:fm("billing.daily.range30")},{value:"all",label:fm("billing.daily.rangeAll")}];

var overviewContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24},children:statCards.map(function(card,ci){return(0,n.jsxs)("div",{style:{position:"relative",padding:"18px 20px",background:"#fff",borderRadius:10,border:"1px solid #eef0f4",boxShadow:"0 1px 3px rgba(0,0,0,0.04)",overflow:"hidden"},children:[(0,n.jsx)("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:4,background:card.color}}),(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[(0,n.jsx)("span",{style:{fontSize:13,color:"#8c8c8c"},children:card.label}),(0,n.jsx)("span",{style:{width:30,height:30,borderRadius:8,background:card.color+"14",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15},children:card.icon})]}),(0,n.jsx)("div",{style:{fontSize:26,fontWeight:700,marginTop:10,color:"#1f1f1f"},children:card.value})]},ci)})}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:10,border:"1px solid #eef0f4"},children:[(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20},children:[(0,n.jsx)("h3",{style:{margin:0,fontSize:16,color:"#1f1f1f"},children:fm("billing.daily.title")}),(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:8},children:[(0,n.jsx)("span",{style:{fontSize:13,color:"#8c8c8c"},children:fm("billing.daily.range")+":"}),(0,n.jsx)(FriendlySelect,{value:dailyRange,onChange:function(v){setDailyRange(v)},options:rangeOptions,minWidth:130})]})]}),dailyView.length?(0,n.jsx)("div",{style:{display:"flex",alignItems:"flex-end",gap:dailyView.length>20?3:6,height:160,paddingTop:22},children:dailyView.map(function(d2,i){var h=Math.max(3,d2.cost/dailyMax*100);var active=hoverBar===i;return(0,n.jsxs)("div",{onMouseEnter:function(){setHoverBar(i)},onMouseLeave:function(){setHoverBar(-1)},style:{flex:1,minWidth:6,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",alignItems:"center",cursor:"default",position:"relative"},children:[(0,n.jsx)("div",{style:{fontSize:11,fontWeight:active?700:500,color:active?"#513CC8":"#8c8c8c",marginBottom:4,whiteSpace:"nowrap"},children:"$"+(d2.cost||0).toFixed(dailyView.length>20?0:1)}),(0,n.jsx)("div",{style:{width:"100%",maxWidth:36,height:h+"%",background:active?"#3d2ea8":"#513CC8",borderRadius:"4px 4px 0 0",transition:"background 0.15s"}}),(0,n.jsx)("div",{style:{fontSize:10,color:"#bfbfbf",marginTop:6,height:12,whiteSpace:"nowrap"},children:(i%labelStep===0||i===dailyView.length-1)?(d2.date?String(d2.date).slice(5):""):""})]},i)})}):(0,n.jsx)("div",{style:{padding:"40px 0",textAlign:"center",color:"#bfbfbf"},children:fm("billing.daily.empty")})]})]});

var detailsContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.details.title")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.model")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.tokens")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.requests")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.cost")})]})}),(0,n.jsx)("tbody",{children:models2.map(function(m2,i){return(0,n.jsxs)("tr",{style:{borderBottom:"1px solid #f0f0f0"},children:[(0,n.jsx)("td",{style:{padding:"12px 16px"},children:m2.name}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:m2.tokens.toLocaleString()}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:m2.requests}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right",color:"#513CC8"},children:"$"+m2.cost.toFixed(2)})]},i)})})]})]});

var ratesContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.rates.title")}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.rates.current")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",marginTop:12},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.model")}),(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.rates.input")}),(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.rates.output")}),(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"center",borderBottom:"1px solid #f0f0f0"},children:fm("billing.rates.action")})]})}),(0,n.jsx)("tbody",{children:Object.keys(rates).map(function(k,i){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{style:{padding:"10px 16px",borderBottom:"1px solid #f0f0f0"},children:k}),(0,n.jsx)("td",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:"$"+rates[k].input+"/1K"}),(0,n.jsx)("td",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:"$"+rates[k].output+"/1K"}),(0,n.jsx)("td",{style:{padding:"10px 16px",textAlign:"center",borderBottom:"1px solid #f0f0f0"},children:(0,n.jsx)("span",{onClick:function(){openEditRate(k)},style:{color:"#513CC8",cursor:"pointer",fontWeight:500},children:fm("billing.rates.edit")})})]},i)})})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0"},children:[(0,n.jsx)("h4",{children:fm("billing.rates.custom")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)(FriendlySelect,{value:rateConfig.model||"",onChange:function(v){setRateConfig(Object.assign({},rateConfig,{model:v}))},options:modelOptions,placeholder:fm("billing.rates.modelName"),minWidth:200,style:{flex:1}}),(0,n.jsx)("input",{placeholder:fm("billing.rates.inputRate"),value:rateConfig.input||"",onChange:function(e){setRateConfig(Object.assign({},rateConfig,{input:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:120}}),(0,n.jsx)("input",{placeholder:fm("billing.rates.outputRate"),value:rateConfig.output||"",onChange:function(e){setRateConfig(Object.assign({},rateConfig,{output:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:120}}),(0,n.jsx)(a.ZP,{type:"primary",onClick:saveRates,children:fm("billing.rates.save")})]})]})]});

var budgetContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.budget.title")}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.monthly")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("span",{children:"$"}),(0,n.jsx)("input",{type:"number",placeholder:"1000",value:budgetConfig.monthly||"",onChange:function(e){setBudgetConfig(Object.assign({},budgetConfig,{monthly:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:150}}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.monthlyHint")})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.threshold")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("input",{type:"number",placeholder:"80",value:budgetConfig.threshold||"",onChange:function(e){setBudgetConfig(Object.assign({},budgetConfig,{threshold:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:100}}),(0,n.jsx)("span",{children:"%"}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.thresholdHint")})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.overdue")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)(FriendlySelect,{value:budgetConfig.overdueAction||"warn",onChange:function(v){setBudgetConfig(Object.assign({},budgetConfig,{overdueAction:v}))},options:[{value:"warn",label:fm("billing.budget.actionWarn")},{value:"limit",label:fm("billing.budget.actionLimit")},{value:"block",label:fm("billing.budget.actionBlock")}],minWidth:180}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.overdueHint")})]})]}),(0,n.jsx)("div",{style:{marginTop:16},children:(0,n.jsx)(a.ZP,{type:"primary",onClick:saveBudget,children:fm("billing.budget.save")})})]});

var historyContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.history.title")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.period")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.amount")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"center",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.status")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.tokens")})]})}),(0,n.jsx)("tbody",{children:history.map(function(h2,i){var statusColor=h2.status==="paid"?"#52c41a":h2.status==="pending"?"#faad14":"#f5222d";return(0,n.jsxs)("tr",{style:{borderBottom:"1px solid #f0f0f0"},children:[(0,n.jsx)("td",{style:{padding:"12px 16px"},children:h2.period}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:"$"+h2.amount.toFixed(2)}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"center"},children:(0,n.jsx)("span",{style:{padding:"2px 8px",borderRadius:4,background:statusColor+"20",color:statusColor,fontSize:12},children:fm("billing.status."+h2.status)})}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:h2.tokens.toLocaleString()})]},i)})})]})]});

var content=activeTab==="overview"?overviewContent:activeTab==="details"?detailsContent:activeTab==="rates"?ratesContent:activeTab==="budget"?budgetContent:historyContent;

if(loading)return(0,n.jsx)("div",{style:{padding:40,textAlign:"center"},children:fm("billing.loading")});

var saveRateModalEl=(0,n.jsx)(FriendlyModal,{open:saveRateModal,title:fm("billing.rates.saveTitle"),icon:"\u2705",hideCancel:true,okText:fm("billing.modal.ok"),onClose:function(){setSaveRateModal(false)},onOk:function(){setSaveRateModal(false);setRateConfig({});fetchData()},children:(0,n.jsx)("div",{style:{fontSize:14,color:"#333",lineHeight:1.8},children:fm("billing.rates.saved")})});

var saveBudgetModalEl=(0,n.jsx)(FriendlyModal,{open:saveBudgetModal,title:fm("billing.budget.saveTitle"),icon:"\u2705",hideCancel:true,okText:fm("billing.modal.ok"),onClose:function(){setSaveBudgetModal(false)},onOk:function(){setSaveBudgetModal(false)},children:(0,n.jsx)("div",{style:{fontSize:14,color:"#333",lineHeight:1.8},children:fm("billing.budget.saved")})});

var editModalEl=(0,n.jsx)(FriendlyModal,{open:editModalOpen,title:fm("billing.rates.editTitle"),icon:"\u270f\ufe0f",okText:fm("billing.rates.save"),cancelText:fm("billing.modal.cancel"),onClose:function(){setEditModalOpen(false)},onOk:saveEditRate,children:editingRate?(0,n.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{fontSize:13,color:"#666",marginBottom:6},children:fm("billing.model")}),(0,n.jsx)("div",{style:{padding:"8px 12px",background:"#f5f5f5",borderRadius:6,color:"#333",fontWeight:500},children:editingRate.model})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{fontSize:13,color:"#666",marginBottom:6},children:fm("billing.rates.input")+" ($/1K)"}),(0,n.jsx)("input",{type:"number",value:editingRate.input,onChange:function(e){setEditingRate(Object.assign({},editingRate,{input:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:"100%",boxSizing:"border-box"}})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{fontSize:13,color:"#666",marginBottom:6},children:fm("billing.rates.output")+" ($/1K)"}),(0,n.jsx)("input",{type:"number",value:editingRate.output,onChange:function(e){setEditingRate(Object.assign({},editingRate,{output:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:"100%",boxSizing:"border-box"}})]})]}):null});

return(0,n.jsxs)("div",{className:"containerWrapper___I6mPo",children:[(0,n.jsxs)("div",{className:"contentWrapper___dmsnP",style:{padding:24},children:[tenantSelector,(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20},children:[(0,n.jsx)("h2",{style:{margin:0},children:fm("billing.title")}),(0,n.jsx)(a.ZP,{type:"primary",onClick:exportPDF,children:fm("billing.export.btn")})]}),tabBar,content]}),saveRateModalEl,saveBudgetModalEl,editModalEl]})
}}}]);
