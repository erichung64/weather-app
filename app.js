window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");

	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition
		(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/28f208809d3a6459d53d83c259f387ee/${lat},${long}`;

			fetch(api)
				.then(response =>{
					return response.json();
				})
				.then(data => {
					const { temperature, summary, icon } = data.currently;
					//set dom elements from the api
					temperatureDescription.textContent = summary;
					temperatureDegree.textContent = temperature;
					locationTimezone.textContent = data.timezone;
						//set Icons
						setIcons(icon, document.querySelector('.icon'));
				});
		});


	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});