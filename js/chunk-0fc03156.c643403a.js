(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fc03156"],{"159d":function(e,t,c){"use strict";c.r(t);var i=c("7a23"),l={class:"table mt-4"},a=Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",null,"購買時間"),Object(i["i"])("th",null,"Email"),Object(i["i"])("th",null,"購買款項"),Object(i["i"])("th",null,"應付金額"),Object(i["i"])("th",null,"是否付款"),Object(i["i"])("th",null,"編輯")])],-1),n={class:"list-unstyled"},r={class:"text-right"},d={class:"form-check form-switch"},o={key:0},s={key:1},b={class:"btn-group"};function u(e,t,c,u,O,j){var p=Object(i["D"])("Loading"),m=Object(i["D"])("OrderModal"),h=Object(i["D"])("DeleteModal"),f=Object(i["D"])("Pagination");return Object(i["u"])(),Object(i["e"])(i["a"],null,[Object(i["i"])(p,{active:O.isLoading},null,8,["active"]),Object(i["i"])("table",l,[a,Object(i["i"])("tbody",null,[(Object(i["u"])(!0),Object(i["e"])(i["a"],null,Object(i["B"])(O.orders,(function(t,c){return Object(i["u"])(),Object(i["e"])(i["a"],{key:c},[O.orders.length?(Object(i["u"])(),Object(i["e"])("tr",{key:0,class:{"text-secondary":!t.is_paid}},[Object(i["i"])("td",null,Object(i["G"])(e.$filters.date(t.create_at)),1),Object(i["i"])("td",null,[t.user?(Object(i["u"])(),Object(i["e"])("span",{key:0,textContent:Object(i["G"])(t.user.email)},null,8,["textContent"])):Object(i["f"])("",!0)]),Object(i["i"])("td",null,[Object(i["i"])("ul",n,[(Object(i["u"])(!0),Object(i["e"])(i["a"],null,Object(i["B"])(t.products,(function(e,t){return Object(i["u"])(),Object(i["e"])("li",{key:t},Object(i["G"])(e.product.title)+" 數量："+Object(i["G"])(e.qty)+" "+Object(i["G"])(e.product.unit),1)})),128))])]),Object(i["i"])("td",r,Object(i["G"])(t.total),1),Object(i["i"])("td",null,[Object(i["i"])("div",d,[Object(i["P"])(Object(i["i"])("input",{class:"form-check-input",type:"checkbox",id:"paidSwitch".concat(t.id),"onUpdate:modelValue":function(e){return t.is_paid=e},onChange:function(e){return j.updateOrder(t)}},null,40,["id","onUpdate:modelValue","onChange"]),[[i["J"],t.is_paid]]),Object(i["i"])("label",{class:"form-check-label",for:"paidSwitch".concat(t.id)},[t.is_paid?(Object(i["u"])(),Object(i["e"])("span",o,"已付款")):(Object(i["u"])(),Object(i["e"])("span",s,"未付款"))],8,["for"])])]),Object(i["i"])("td",null,[Object(i["i"])("div",b,[Object(i["i"])("button",{class:"btn btn-outline-primary btn-sm",onClick:function(e){return j.openModal(t)}}," 檢視 ",8,["onClick"]),Object(i["i"])("button",{class:"btn btn-outline-danger btn-sm",onClick:function(e){return j.openDelOrderModal(t)}}," 刪除 ",8,["onClick"])])])],2)):Object(i["f"])("",!0)],64)})),128))])]),Object(i["i"])(m,{order:O.tempOrder,onUpdateOrder:j.updateOrder,ref:"orderModal"},null,8,["order","onUpdateOrder"]),Object(i["i"])(h,{item:O.tempOrder,ref:"delModal",onDelItem:j.delOrder},null,8,["item","onDelItem"]),Object(i["i"])(f,{pages:O.pagination,onEmitPages:j.getOrders},null,8,["pages","onEmitPages"])],64)}var O=c("5530"),j=(c("99af"),c("a15b"),c("1799")),p=(c("b0c0"),{class:"modal fade",id:"productModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"}),m={class:"modal-dialog modal-xl",role:"document"},h={class:"modal-content border-0"},f=Object(i["i"])("div",{class:"modal-header bg-dark text-white"},[Object(i["i"])("h5",{class:"modal-title",id:"exampleModalLabel"},[Object(i["i"])("span",null,"訂單細節")]),Object(i["i"])("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),g={class:"modal-body"},y={class:"row"},v={class:"col-md-4"},k=Object(i["i"])("h3",null,"用戶資料",-1),M={class:"table"},x={key:0},G=Object(i["i"])("th",{style:{width:"100px"}},"姓名",-1),w=Object(i["i"])("th",null,"Email",-1),_=Object(i["i"])("th",null,"電話",-1),D=Object(i["i"])("th",null,"地址",-1),P={class:"col-md-8"},C=Object(i["i"])("h3",null,"訂單細節",-1),$={class:"table"},L=Object(i["i"])("th",{style:{width:"100px"}},"訂單編號",-1),E=Object(i["i"])("th",null,"下單時間",-1),U=Object(i["i"])("th",null,"付款時間",-1),B={key:0},J={key:1},S=Object(i["i"])("th",null,"付款狀態",-1),q={key:0,class:"text-success"},I={key:1,class:"text-muted"},V=Object(i["i"])("th",null,"總金額",-1),F=Object(i["i"])("h3",null,"選購商品",-1),z={class:"table"},A=Object(i["i"])("thead",null,[Object(i["i"])("tr")],-1),H={class:"text-end"},K={class:"modal-footer"},N=Object(i["i"])("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Q(e,t,c,l,a,n){return Object(i["u"])(),Object(i["e"])("div",p,[Object(i["i"])("div",m,[Object(i["i"])("div",h,[f,Object(i["i"])("div",g,[Object(i["i"])("div",y,[Object(i["i"])("div",v,[k,Object(i["i"])("table",M,[a.tempOrder.user?(Object(i["u"])(),Object(i["e"])("tbody",x,[Object(i["i"])("tr",null,[G,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.user.name),1)]),Object(i["i"])("tr",null,[w,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.user.email),1)]),Object(i["i"])("tr",null,[_,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.user.tel),1)]),Object(i["i"])("tr",null,[D,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.user.address),1)])])):Object(i["f"])("",!0)])]),Object(i["i"])("div",P,[C,Object(i["i"])("table",$,[Object(i["i"])("tbody",null,[Object(i["i"])("tr",null,[L,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.id),1)]),Object(i["i"])("tr",null,[E,Object(i["i"])("td",null,Object(i["G"])(a.tempOrder.create_at),1)]),Object(i["i"])("tr",null,[U,Object(i["i"])("td",null,[a.tempOrder.paid_date?(Object(i["u"])(),Object(i["e"])("span",B,Object(i["G"])(e.$filters.date(a.tempOrder.paid_date)),1)):(Object(i["u"])(),Object(i["e"])("span",J,"時間不正確"))])]),Object(i["i"])("tr",null,[S,Object(i["i"])("td",null,[a.tempOrder.is_paid?(Object(i["u"])(),Object(i["e"])("strong",q,"已付款")):(Object(i["u"])(),Object(i["e"])("span",I,"尚未付款"))])]),Object(i["i"])("tr",null,[V,Object(i["i"])("td",null,Object(i["G"])(e.$filters.currency(a.tempOrder.total)),1)])])]),F,Object(i["i"])("table",z,[A,Object(i["i"])("tbody",null,[(Object(i["u"])(!0),Object(i["e"])(i["a"],null,Object(i["B"])(a.tempOrder.products,(function(t){return Object(i["u"])(),Object(i["e"])("tr",{key:t.id},[Object(i["i"])("th",null,Object(i["G"])(t.product.title),1),Object(i["i"])("td",null,Object(i["G"])(t.qty)+" / "+Object(i["G"])(t.product.unit),1),Object(i["i"])("td",H,Object(i["G"])(e.$filters.currency(t.final_total)),1)])})),128))])])])])]),Object(i["i"])("div",K,[N,Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=function(t){return e.$emit("update-order",a.tempOrder)})}," 確認 ")])])])],512)}var R=c("e0ae"),T={name:"OrderModal",props:{order:{type:Object,default:function(){return{}}}},data:function(){return{modal:"",tempOrder:{},isPaid:!1}},mixins:[R["a"]],watch:{order:function(){this.tempOrder=this.order,this.isPaid=this.tempOrder.is_paid}}};T.render=Q;var W=T,X=c("ec05"),Y={name:"Orders",components:{Pagination:j["a"],OrderModal:W,DeleteModal:X["a"]},inject:["emitter"],data:function(){return{isLoading:!1,orders:{},tempOrder:{},pagination:{},currentPage:1}},created:function(){this.getOrders()},methods:{getOrders:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.currentPage=t;var c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("liang-api","/admin/orders?page=").concat(t);this.isLoading=!0,this.axios.get(c).then((function(t){t.data.success&&(console.log("getOrders: ",t.data),e.orders=t.data.orders,e.pagination=t.data.pagination,e.isLoading=!1)})).catch((function(e){return console.log(e)}))},openModal:function(e){console.log("openModal: ",e),this.tempOrder=Object(O["a"])({},e),this.$refs.orderModal.showModal()},updateOrder:function(e){var t=this,c="".concat("https://vue3-course-api.hexschool.io","/api/").concat("liang-api","/admin/order/").concat(e.id),i={is_paid:e.is_paid};this.axios.put(c,{data:i}).then((function(e){console.log("updateOrder: ",e.data),t.$refs.orderModal.hideModal(),e.data.success?(t.getOrders(t.currentPage),t.emitter.emit("push-message",{style:"success",title:"更新成功"})):t.emitter.emit("push-message",{style:"danger",title:"更新失敗",content:e.data.message.join("、")})}))},openDelOrderModal:function(e){console.log("openDelOrderModal: ",e),this.tempOrder=Object(O["a"])({},e),this.$refs.delModal.showModal()},delOrder:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io","/api/").concat("liang-api","/admin/order/").concat(this.tempOrder.id);this.axios.delete(t).then((function(t){e.$refs.delModal.hideModal(),t.data.success?(console.log("delOrder: ",t.data),e.getOrders(e.currentPage),e.emitter.emit("push-message",{style:"success",title:"更新成功"})):e.emitter.emit("push-message",{style:"danger",title:"更新失敗",content:t.data.message.join("、")})})).catch((function(e){return console.log(e)}))}}};Y.render=u;t["default"]=Y},b0c0:function(e,t,c){var i=c("83ab"),l=c("9bf2").f,a=Function.prototype,n=a.toString,r=/^\s*function ([^ (]*)/,d="name";i&&!(d in a)&&l(a,d,{configurable:!0,get:function(){try{return n.call(this).match(r)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-0fc03156.c643403a.js.map