const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

// Search by song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  showData(data);
}
//show data into the dom

function showData(data) {
  result.innerHTML = `
  <ul class='songs'>
  ${data.data
    .map(
      (song) => `
  <li>
    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
    <button class='btn' data-artist ='${song.artist.name}' data-songtitle ='${song.title}'>Get Lyrics</button>
    </li>
  `
    )
    .join("")}
  </ul>
  
  `;
  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.perv
        ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">prev</button>`
        : ""
    }
    ${
      data.next
        ? `<button class="btn" onclick="getMoreSongs('${data.next}')">next</button>`
        : ""
    }
    `;
  } else {
    more.innerHTML = "";
  }
}

//get next and prev songs
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();

  showData(data);
}

//Get Lyrics
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `
  <h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>
  `;
  more.innerHTML = "";
}
//Event listeners

//Get lyrics
result.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked.tagName === "BUTTON") {
    const artist = clicked.getAttribute("data-artist");
    const songTitle = clicked.getAttribute("data-songtitle");
    getLyrics(artist, songTitle);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please enter something");
  } else {
    searchSongs(searchTerm);
  }
});
