"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1276],{7633:function(e,l,t){t.r(l);t.d(l,{default:function(){return BillingPage}});
var n=t(52676),r=t(75271),a=t(53405),o=t(78451);

function BillingPage(){
var intl=(0,o.useIntl)();
var fm=function(id){return intl.formatMessage({id:id})};
var _React$useState1=r.useState("overview"),activeTab=_React$useState1[0],setActiveTab=_React$useState1[1];
var _React$useState2=r.useState(null),data=_React$useState2[0],setData=_React$useState2[1];
var _React$useState3=r.useState(true),loading=_React$useState3[0],setLoading=_React$useState3[1];
var _React$useState4=r.useState("all"),selectedTenant=_React$useState4[0],setSelectedTenant=_React$useState4[1];
var _React$useState5=r.useState({}),rateConfig=_React$useState5[0],setRateConfig=_React$useState5[1];
var _React$useState6=r.useState({}),budgetConfig=_React$useState6[0],setBudgetConfig=_React$useState6[1];

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
fetch("/v2/billing/rates",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenant:selectedTenant,config:rateConfig})}).then(function(){alert(fm("billing.rates.saved"))})
}

function saveBudget(){
fetch("/v2/billing/budget",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({tenant:selectedTenant,config:budgetConfig})}).then(function(){alert(fm("billing.budget.saved"))})
}

var tenants=data&&data.tenants?data.tenants:[];
var summary2=data&&data.summary?data.summary:{};
var models2=data&&data.models?data.models:[];
var history=data&&data.history?data.history:[];
var rates=data&&data.rates?data.rates:{};
var daily=data&&data.daily?data.daily:[];

var tenantSelector=(0,n.jsxs)("div",{style:{marginBottom:16,display:"flex",alignItems:"center",gap:12},children:[(0,n.jsx)("span",{children:fm("billing.tenant.select")+":"}),(0,n.jsx)("select",{value:selectedTenant,onChange:function(e){setSelectedTenant(e.target.value)},style:{padding:"6px 12px",borderRadius:6,border:"1px solid #d9d9d9",minWidth:200},children:[(0,n.jsx)("option",{value:"all",children:fm("billing.tenant.all")}),tenants.map(function(t2){return(0,n.jsx)("option",{value:t2.id,children:t2.name},t2.id)})]})]});

var tabItems=[{key:"overview",label:fm("billing.tab.overview")},{key:"details",label:fm("billing.tab.details")},{key:"rates",label:fm("billing.tab.rates")},{key:"budget",label:fm("billing.tab.budget")},{key:"history",label:fm("billing.tab.history")}];

var tabBar=(0,n.jsx)("div",{style:{display:"flex",gap:0,borderBottom:"1px solid #f0f0f0",marginBottom:20},children:tabItems.map(function(item){return(0,n.jsx)("div",{onClick:function(){setActiveTab(item.key)},style:{padding:"12px 20px",cursor:"pointer",borderBottom:activeTab===item.key?"2px solid #1890ff":"2px solid transparent",color:activeTab===item.key?"#1890ff":"#666",fontWeight:activeTab===item.key?500:400,transition:"all 0.3s"},children:item.label},item.key)})});

var overviewContent=(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:24},children:[(0,n.jsxs)("div",{style:{padding:20,background:"linear-gradient(135deg,#667eea 0%,#764ba2 100%)",borderRadius:12,color:"#fff"},children:[(0,n.jsx)("div",{style:{fontSize:14,opacity:0.8},children:fm("billing.summary.totalCost")}),(0,n.jsx)("div",{style:{fontSize:28,fontWeight:700,marginTop:8},children:"$"+(summary2.total_cost||0).toFixed(2)})]}),(0,n.jsxs)("div",{style:{padding:20,background:"linear-gradient(135deg,#f093fb 0%,#f5576c 100%)",borderRadius:12,color:"#fff"},children:[(0,n.jsx)("div",{style:{fontSize:14,opacity:0.8},children:fm("billing.summary.totalTokens")}),(0,n.jsx)("div",{style:{fontSize:28,fontWeight:700,marginTop:8},children:(summary2.total_tokens||0).toLocaleString()})]}),(0,n.jsxs)("div",{style:{padding:20,background:"linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)",borderRadius:12,color:"#fff"},children:[(0,n.jsx)("div",{style:{fontSize:14,opacity:0.8},children:fm("billing.summary.totalRequests")}),(0,n.jsx)("div",{style:{fontSize:28,fontWeight:700,marginTop:8},children:(summary2.total_requests||0).toLocaleString()})]}),(0,n.jsxs)("div",{style:{padding:20,background:"linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)",borderRadius:12,color:"#fff"},children:[(0,n.jsx)("div",{style:{fontSize:14,opacity:0.8},children:fm("billing.summary.activeModels")}),(0,n.jsx)("div",{style:{fontSize:28,fontWeight:700,marginTop:8},children:summary2.active_models||0})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0"},children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.daily.title")}),(0,n.jsx)("div",{style:{display:"flex",alignItems:"flex-end",gap:4,height:120},children:daily.map(function(d2,i){var maxCost=Math.max.apply(null,daily.map(function(x){return x.cost}))||1;var h=Math.max(4,d2.cost/maxCost*100);return(0,n.jsx)("div",{title:d2.date+": $"+d2.cost.toFixed(2),style:{flex:1,height:h+"%",background:"linear-gradient(to top,#667eea,#764ba2)",borderRadius:"4px 4px 0 0",minWidth:4,cursor:"pointer"}},i)})})]})]});

var detailsContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.details.title")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.model")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.tokens")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.requests")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.cost")})]})}),(0,n.jsx)("tbody",{children:models2.map(function(m2,i){return(0,n.jsxs)("tr",{style:{borderBottom:"1px solid #f0f0f0"},children:[(0,n.jsx)("td",{style:{padding:"12px 16px"},children:m2.name}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:m2.tokens.toLocaleString()}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:m2.requests}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right",color:"#1890ff"},children:"$"+m2.cost.toFixed(2)})]},i)})})]})]});

var ratesContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.rates.title")}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.rates.current")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse",marginTop:12},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.model")}),(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.rates.input")}),(0,n.jsx)("th",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.rates.output")})]})}),(0,n.jsx)("tbody",{children:Object.keys(rates).map(function(k,i){return(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{style:{padding:"10px 16px",borderBottom:"1px solid #f0f0f0"},children:k}),(0,n.jsx)("td",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:"$"+rates[k].input+"/1K"}),(0,n.jsx)("td",{style:{padding:"10px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:"$"+rates[k].output+"/1K"})]},i)})})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0"},children:[(0,n.jsx)("h4",{children:fm("billing.rates.custom")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("input",{placeholder:fm("billing.rates.modelName"),onChange:function(e){setRateConfig(Object.assign({},rateConfig,{model:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,flex:1}}),(0,n.jsx)("input",{placeholder:fm("billing.rates.inputRate"),onChange:function(e){setRateConfig(Object.assign({},rateConfig,{input:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:120}}),(0,n.jsx)("input",{placeholder:fm("billing.rates.outputRate"),onChange:function(e){setRateConfig(Object.assign({},rateConfig,{output:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:120}}),(0,n.jsx)(a.ZP,{type:"primary",onClick:saveRates,children:fm("billing.rates.save")})]})]})]}); 

var budgetContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.budget.title")}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.monthly")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("span",{children:"$"}),(0,n.jsx)("input",{type:"number",placeholder:"1000",value:budgetConfig.monthly||"",onChange:function(e){setBudgetConfig(Object.assign({},budgetConfig,{monthly:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:150}}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.monthlyHint")})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.threshold")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("input",{type:"number",placeholder:"80",value:budgetConfig.threshold||"",onChange:function(e){setBudgetConfig(Object.assign({},budgetConfig,{threshold:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6,width:100}}),(0,n.jsx)("span",{children:"%"}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.thresholdHint")})]})]}),(0,n.jsxs)("div",{style:{background:"#fff",padding:20,borderRadius:12,border:"1px solid #f0f0f0",marginBottom:16},children:[(0,n.jsx)("h4",{children:fm("billing.budget.overdue")}),(0,n.jsxs)("div",{style:{display:"flex",gap:12,marginTop:12,alignItems:"center"},children:[(0,n.jsx)("select",{value:budgetConfig.overdueAction||"warn",onChange:function(e){setBudgetConfig(Object.assign({},budgetConfig,{overdueAction:e.target.value}))},style:{padding:"8px 12px",border:"1px solid #d9d9d9",borderRadius:6},children:[(0,n.jsx)("option",{value:"warn",children:fm("billing.budget.actionWarn")}),(0,n.jsx)("option",{value:"limit",children:fm("billing.budget.actionLimit")}),(0,n.jsx)("option",{value:"block",children:fm("billing.budget.actionBlock")})]}),(0,n.jsx)("span",{style:{color:"#999"},children:fm("billing.budget.overdueHint")})]})]}),(0,n.jsx)("div",{style:{marginTop:16},children:(0,n.jsx)(a.ZP,{type:"primary",onClick:saveBudget,children:fm("billing.budget.save")})})]});

var historyContent=(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{style:{marginBottom:16},children:fm("billing.history.title")}),(0,n.jsxs)("table",{style:{width:"100%",borderCollapse:"collapse"},children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{style:{background:"#fafafa"},children:[(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"left",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.period")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.amount")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"center",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.status")}),(0,n.jsx)("th",{style:{padding:"12px 16px",textAlign:"right",borderBottom:"1px solid #f0f0f0"},children:fm("billing.history.tokens")})]})}),(0,n.jsx)("tbody",{children:history.map(function(h2,i){var statusColor=h2.status==="paid"?"#52c41a":h2.status==="pending"?"#faad14":"#f5222d";return(0,n.jsxs)("tr",{style:{borderBottom:"1px solid #f0f0f0"},children:[(0,n.jsx)("td",{style:{padding:"12px 16px"},children:h2.period}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:"$"+h2.amount.toFixed(2)}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"center"},children:(0,n.jsx)("span",{style:{padding:"2px 8px",borderRadius:4,background:statusColor+"20",color:statusColor,fontSize:12},children:fm("billing.status."+h2.status)})}),(0,n.jsx)("td",{style:{padding:"12px 16px",textAlign:"right"},children:h2.tokens.toLocaleString()})]},i)})})]})]});

var content=activeTab==="overview"?overviewContent:activeTab==="details"?detailsContent:activeTab==="rates"?ratesContent:activeTab==="budget"?budgetContent:historyContent;

if(loading)return(0,n.jsx)("div",{style:{padding:40,textAlign:"center"},children:fm("billing.loading")});

return(0,n.jsx)("div",{className:"containerWrapper___I6mPo",children:(0,n.jsxs)("div",{className:"contentWrapper___dmsnP",style:{padding:24},children:[tenantSelector,(0,n.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20},children:[(0,n.jsx)("h2",{style:{margin:0},children:fm("billing.title")}),(0,n.jsx)(a.ZP,{type:"primary",onClick:exportPDF,children:fm("billing.export.btn")})]}),tabBar,content]})})
}}}]);