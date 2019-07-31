"use strict";

let context,piNode,poonNode;

let nowSec=0;
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
	
	if($("#opisJIHO").prop("checked") && nowSec != date.getSeconds()){
		if(date.getMinutes()%10==9 && (57<=date.getSeconds() && date.getSeconds()<=59)){
			/* PI */
			piNode = new OscillatorNode(context);
			piNode.connect(context.destination);
			piNode.frequency.value=440;
			piNode.start();
			piNode.stop(context.currentTime + 0.3);
		}else if(date.getMinutes()%10==0 && date.getSeconds()==0){
			/* POOON */
			poonNode = new OscillatorNode(context);
			poonNode.connect(context.destination);
			poonNode.frequency.value=880;
			poonNode.start();
			poonNode.stop(context.currentTime + 2);
		}	
		nowSec=date.getSeconds();
	}

	//Year
	let year=date.getFullYear();
	if($("#opy").val()=="EOJ"){
		let jy;
		if(year<2019){
			dates+="<span class='Year'>H"+fillZero(year-1988,2)+"</span>"
		}else{
			dates+="<span class='Year'>R"+fillZero(year-2018,2)+"</span>"
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
/* ゼロ埋め関数の実装 */
function fillZero(s,n){
	return ((new Array(n)).join("0")+s).slice(-n)
}

$(document).ready(function(){

	try {
		// Fix up for prefixing
		window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
	} catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
let SS_bg="",SS_md="";/* 色の保存関数 */
for(let i=0;i<document.styleSheets.length;i++){
	if(document.styleSheets[i].href!==null){
		if(document.styleSheets[i].href.match(/backgroundcolor\.css/)){
			SS_bg=document.styleSheets[i];
		}else if(document.styleSheets[i].href.match(/maincolor\.css/)){
			SS_md=document.styleSheets[i];
		}
	}
}
/* 時刻更新 */
setInterval(timer,100)


/* フォント変更検出 */
$('#fontselect').on("click","li",function(){
	$('#fontselect').children().removeClass("selected");
	$(this).addClass("selected");
	$('#dc').removeClass().addClass($(this).attr("data-f"))
	return;
});

/* 隠す */
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

/* 色設定の変更検出 */
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

/* 色変更 */
function colorChange(stylesheet,c){
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
