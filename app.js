function search(event) {
  event.preventDefault();
  const form = event.target; // Get the form element from the event object
  const formData = new FormData(form); // Get the form data as a FormData object

  // Access the input value using the input field name
  const searchTerm = formData.get("search__term");

  // Now you can do something with the search term, like performing a search or processing it further
  console.log("Search Term:", searchTerm);
  return searchTerm;
}

// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
let query = `
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
let variables = {
  search: "JJK",
};

// Define the config we'll need for our Api request
let url = "https://graphql.anilist.co",
  options = {
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
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  console.log(data);
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}
