"use strict";



function timer(){
	let date=new Date();
	let dates="";
	
	//Hour
	
	dates+="<span class='Hour'>"+fillZero(date.getHours(),2)+"</span>："
	//Minute
	dates+="<span class='Minute'>"+fillZero(date.getMinutes(),2)+"</span>"
	//Second
	if(!$("#opishs").prop("checked")){
		dates+="’<span class='Second'>"+fillZero(date.getSeconds(),2)+"</span>"
	}
	dates+="<br>"
	
	//Year
	let year=date.getFullYear();
	if($("#opisjy").prop("checked")){
		let jy;
		if(year<2019){
			dates+="<span class='Year'>H"+fillZero(year-1988,2)+"</span>"
		}else{
			dates+="<span class='Year'>N"+fillZero(year-2018,2)+"</span>"
		}
		
	}else{
		dates+="<span class='Year'>"+fillZero(year,4)+"</span>"
	}
	//Month
	dates+="/<span class='Month'>"+fillZero(date.getMonth()+1,2)+"</span>/"
	//Day
	dates+="<span class='Date'>"+fillZero(date.getDate(),2)+"</span>"
	
	$("#dc").children("span").html(dates);
}
function fillZero(s,n){
	return ((new Array(n)).join("0")+s).slice(-n)

}
$(document).ready(function(){

let SS_bg="",SS_md="";
for(let i=0;i<document.styleSheets.length;i++){
	if(document.styleSheets[i].href!==null){
		if(document.styleSheets[i].href.match(/backgroundcolor\.css/)){
			SS_bg=document.styleSheets[i];
		}else if(document.styleSheets[i].href.match(/maincolor\.css/)){
			SS_md=document.styleSheets[i];
		}
	}
}
console

setInterval(timer,100)



$('#fontselect').on("click","li",function(){
	$('#fontselect').children().removeClass("selected");
	$(this).addClass("selected");
	$('#dc').removeClass().addClass($(this).attr("data-f"))
	return;
});

$('#hider').on("click",function(){
	if($(this).hasClass("checked")){
		$(this).removeClass("checked");
		$("nav").removeClass("hide");
	}else{
		$(this).addClass("checked");
		$("nav").addClass("hide");
	}
	return;
});

$('input[type="color"]').on("change",function(){
	let name=$(this).attr("name"),color=$(this).val();
	
	if(name=="opcmc"){
		//maincolor
		colorChange(SS_md,color);
	}else if(name=="opcbg"){
		//background-color
		colorChange(SS_bg,color);
	}
	
	return;
});

colorChange(SS_md,$("input[name='opcmc']").val());
colorChange(SS_bg,$("input[name='opcbg']").val());
});

function colorChange(stylesheet,c){
console.log(stylesheet)
	let color=c.replace(/#(..)(..)(..)/,function(str,r,g,b){return ""+parseInt(r,16)+","+parseInt(g,16)+","+parseInt(b,16)});
	let v=stylesheet.cssRules.length;
	for(let i=0;i<v;i++){
		let activerule=stylesheet.cssRules[i];
		for(let s of activerule.style){
			activerule.style[s]=activerule.style[s].replace(/rgba\(\d+,\s*\d+,\s*\d+,/g,"rgba("+color+",").replace(/rgb\(\d+,\s*\d+,\s*\d+\)/g,"rgb("+color+")");
			console.log(s,activerule.style[s])
		}
	}
}
