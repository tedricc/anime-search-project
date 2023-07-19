// On homepage search -> stores the search term into local and goes to the result site

function showSearchRes(event) {
  event.preventDefault();
  const form = event.target; // Get the form element from the event object
  const formData = new FormData(form); // Get the form data as a FormData object

  // Access the input value using the input field name
  const searchTerm = formData.get("search__term");

  localStorage.setItem("searchTerm", searchTerm);

  window.location.href = "./res.html";
}

// API code to retrieve data and handle errors

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}

// converts data into html

function animeHTML(res) {
  return `
    <div class="anime">
        <figure class="anime__img--wrapper">
        <img src="${res.coverImage.extraLarge}" class="anime__img" alt="" />
        </figure>
        <h3 class="anime__name">${res.title.romaji}</h3>
    </div>
    `;
}

// runs immediately using index.html search term

async function trending() {
  // Here we define our query as a multi-line string
  const query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search, type: ANIME, isAdult: false, sort: TRENDING_DESC) {
                title {
                    romaji
                }
                coverImage {
                    extraLarge
                }
                popularity
                trending
                description
            }
        }
    }
  `;

  // Define our query variables and values that will be used in the query request
  const variables = {
    page: 1,
    perPage: 8,
  };

  // const variables = {
  //   search: `${searchTerm}`,
  // };

  // Define the config we'll need for our Api request
  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  // Make the HTTP Api request
  let data = await fetch(url, options).then(handleResponse).catch(handleError);

  let trendingList = document.querySelector(".trending__list");

  trendingList.innerHTML = data.data.Page.media
    .sort((a, b) => b.trending - a.trending)
    .map((res) => {
      return animeHTML(res);
    })
    .join("");

  console.log(data.data.Page.media);
}

trending();

async function search(event) {
  event.preventDefault();
  const form = event.target; // Get the form element from the event object
  const formData = new FormData(form); // Get the form data as a FormData object

  // Access the input value using the input field name
  const searchTerm = formData.get("search__term");

  localStorage.setItem("searchTerm", searchTerm);

  await main();
}

// converts data into html

function animeHTML(res) {
  return `
    <div class="anime">
        <figure class="anime__img--wrapper">
        <img src="${res.coverImage.extraLarge}" class="anime__img" alt="" />
        </figure>
        <h3 class="anime__name">${res.title.romaji}</h3>
    </div>
    `;
}

// runs immediately using index.html search term

async function popular() {
  // Here we define our query as a multi-line string
  const query = `
    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
        Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
            }
            media (id: $id, search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
                title {
                    romaji
                }
                coverImage {
                    extraLarge
                }
                popularity
                trending
                description
            }
        }
    }
  `;

  // Define our query variables and values that will be used in the query request
  const variables = {
    page: 1,
    perPage: 8,
  };

  // const variables = {
  //   search: `${searchTerm}`,
  // };

  // Define the config we'll need for our Api request
  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  // Make the HTTP Api request
  let data = await fetch(url, options).then(handleResponse).catch(handleError);

  let popularList = document.querySelector(".popular__list");

  popularList.innerHTML = data.data.Page.media
    .sort((a, b) => b.popularity - a.popularity)
    .map((res) => {
      return animeHTML(res);
    })
    .join("");

  console.log(data.data.Page.media);
}

popular();