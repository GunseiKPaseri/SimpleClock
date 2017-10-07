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
	dates+="/<span class='Month'>"+fillZero(date.getMonth(),2)+"</span>/"
	//Day
	dates+="<span class='Date'>"+fillZero(date.getDate(),2)+"</span>"
	
	$("#dc").children("span").html(dates);
}
function fillZero(s,n){
	return ((new Array(n)).join("0")+s).slice(-n)

}
$(document).ready(function(){
setInterval(timer,100)



$('#fontselect').on("click","li",function(){
	$('#fontselect').children().removeClass("selected");
	$(this).addClass("selected");
	$('#dc').removeClass().addClass($(this).attr("data-f"))
	return;
});
});