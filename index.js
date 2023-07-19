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
