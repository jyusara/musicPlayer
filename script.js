const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");
const heroDiv = document.querySelector(".hero-img");
const sectionContainer = document.querySelector("section");
const bodyContainer = document.querySelector("body");
const emblemDiv = document.querySelector(".emblem");
const albumTitleSpan = document.querySelector(".album-title");
const texts = document.querySelectorAll(".text");
const albumNum = document.querySelector(".album-num");
const spotifyWidget = document.querySelector(".spotify-widget iframe");
const albums = [
    {
		album: "I Can Do It With a Broken Heart",
		emblem: "Favorite Songs",
		"bg-color": ["#f687ff", "#0D1827"],
		"accent-color": "#f687ff",
		url:
			"https://i.ytimg.com/vi/9FATWaY68ic/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD10vA1_ks6DJnPzVmLt-AoQkQvdg",
		spotify:
			"https://open.spotify.com/embed/track/2fPvQfGQEZOKtJ9qXeL4x8?utm_source=generator"
	},
    {
		album: "Who's Afraid of Little Old Me?",
		emblem: "Favorite Songs",
		"bg-color": ["#0396FF", "#0D1827"],
		"accent-color": "#0396FF",
		url: "https://i.guim.co.uk/img/media/b1a95b419f4d6f430bf440ccb7d64c8b3557ead4/0_127_1080_648/master/1080.jpg?width=465&dpr=1&s=none",
		spotify:
			"https://open.spotify.com/embed/track/2d8UxVNhJinc8uat9PoM9y?utm_source=generator"
	},
    {
		album: "So Long, London",
		emblem: "Favorite Songs",
		"bg-color": ["#3df5a7", "#0D1827"],
		"accent-color": "#3df5a7",
		url:
			"https://i1.sndcdn.com/artworks-yPSHwwtZa3J2C1RT-UeT0Og-t500x500.jpg",
		spotify:
			"https://open.spotify.com/embed/track/3Vevii7qKqrmW8CcyzBHDl?utm_source=generator"
	},	
	{
		album: "I Look in People's Windows",
		emblem: "Favorite Songs",
		"bg-color": ["#EFEA4D", "#0D1827"],
		"accent-color": "#EFEA4D",
		url:
			"https://i.ytimg.com/vi/9FATWaY68ic/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD10vA1_ks6DJnPzVmLt-AoQkQvdg",
		spotify:
			"https://open.spotify.com/embed/track/1Zai5UJ2di3qEuR2HeT2s8?utm_source=generator"
	},
    {
		album: "Fornight",
		emblem: "Favorite Songs",
		"bg-color": ["#F03826", "#0D1827"],
		"accent-color": "#F03826",
		url: "https://i.guim.co.uk/img/media/b1a95b419f4d6f430bf440ccb7d64c8b3557ead4/0_127_1080_648/master/1080.jpg?width=465&dpr=1&s=none",
		spotify:
			"https://open.spotify.com/embed/track/6dODwocEuGzHAavXqTbwHv?utm_source=generator"
	},
    
];

scrollLeft.addEventListener("click", () => handleClickScroll(-1));
scrollRight.addEventListener("click", () => handleClickScroll(1));
heroDiv.addEventListener("animationend", () => {
	heroDiv.classList.remove("album-transition");
	document.addEventListener("keydown", handleKeyScroll);
	scrollLeft.disabled = false;
	scrollRight.disabled = false;
	scrollLeft.classList.remove("key-press-hover-left");
	scrollRight.classList.remove("key-press-hover-right");

	for (const text of texts) text.classList.add("show-texts");
});

const handleClickScroll = (val) => {
	if (index + val >= 0 && index + val < albums.length) {
		updateDisplay((index += val));
	
       
	}
};

const handleKeyScroll = (e) => {
	if (e.key == "ArrowLeft") {
		scrollLeft.classList.add("key-press-hover-left");
		handleClickScroll(-1);
		
	}
	if (e.key == "ArrowRight") {
		scrollRight.classList.add("key-press-hover-right");
		handleClickScroll(1);
		
	}
};





let index = 0;

const updateDisplay = (index) => {
	let DELIMITER = "";


	const album = albums[index];

	for (const text of texts) text.classList.remove("show-texts");
	emblemDiv.innerHTML = "";
	scrollLeft.disabled = true;
	scrollRight.disabled = true;
	document.removeEventListener("keydown", handleKeyScroll);

	sectionContainer.id = `hero-${album.album.toLowerCase().replace(" ", "-")}`;
	bodyContainer.style.background = `linear-gradient(180deg, ${album["bg-color"][0]} 0%, ${album["bg-color"][1]} 100%)`;
	heroDiv.style.backgroundImage = `url(${album.url})`;
	albumTitleSpan.textContent = album.album;
	spotifyWidget.src = album.spotify;

	const number = index + 1;
	albumNum.innerText = number >= 10 ? number + "." : `0${number}.`;
	albumNum.style.color = album["accent-color"];

	if (index === 4) scrollRight.classList.add("hide-arrow");
	else scrollRight.classList.remove("hide-arrow");

	createEmblem(album.emblem, DELIMITER[0] || undefined).forEach((node) =>
		emblemDiv.append(node)
	);

	if (index === 0) {
		// Ocultar el botón de desplazamiento hacia la izquierda cuando estás en la primera canción
		scrollLeft.classList.add("hide-arrow");
	} else {
		// Mostrar el botón de desplazamiento hacia la izquierda cuando no estás en la primera canción
		scrollLeft.classList.remove("hide-arrow");
	}

	heroDiv.classList.add("album-transition");
    

    
};

const createEmblem = (string, delimiter = "•") => {
	const spans = [];

	string = string.trim().replaceAll(" ", delimiter) + delimiter;
	const numChars = string.length;
	const degVal = 90 / (numChars / 4);

	string.split("").forEach((char, idx) => {
		const span = document.createElement("span");
		span.innerText = char;
		span.style.transform = `rotate(${180 - degVal * idx}deg)`;
		if (char === delimiter) span.style.color = albums[index]["accent-color"];
		spans.push(span);
	});

	return spans;
};

updateDisplay(index);

