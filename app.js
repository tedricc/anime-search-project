function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}

async function search(event) {
  event.preventDefault();
  const form = event.target; // Get the form element from the event object
  const formData = new FormData(form); // Get the form data as a FormData object

  // Access the input value using the input field name
  const searchTerm = formData.get("search__term");

  localStorage.setItem("searchTerm", searchTerm);

  // Here we define our query as a multi-line string
  const query = `
  query ($search: String) { # Define which variables will be used in the query (id)
    Media (search: $search, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      title {
        english
      }
      coverImage {
          extraLarge
      }
    }
  }
  `;

  // Define our query variables and values that will be used in the query request
  // const variables = {
  //   search: "one piece",
  // };

  const variables = {
    search: `${localStorage.getItem("searchTerm")}`,
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

  let title = data.data.Media.title.english;
  let img = data.data.Media.coverImage.extraLarge;

  console.log(title, img);
  console.log(variables);

  let resultsList = document.querySelector(".results__list");

  resultsList.innerHTML = animeHTML(title, img);
}

function showSearchRes(event) {
  event.preventDefault();
  const form = event.target; // Get the form element from the event object
  const formData = new FormData(form); // Get the form data as a FormData object

  // Access the input value using the input field name
  const searchTerm = formData.get("search__term");

  localStorage.setItem("searchTerm", searchTerm);

  window.location.href = `${window.location.origin}/res.html`;
}

function animeHTML(anime, img) {
  return `
  <div class="anime">
    <figure class="anime__img--wrapper">
      <img src="${img}" class="anime__img" alt="" />
    </figure>
    <h3 class="anime__name">${anime}</h3>
  </div>
`;
}
