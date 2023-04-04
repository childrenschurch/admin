const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  axios.get("https://sheetdb.io/api/v1/<YOUR-API-KEY>/search?username=" + username + "&password=" + password)
  .then(function(response) {
    if (response.data.length > 0) {
      swal("Login successful!", "", "success");
    } else {
      swal("Invalid username or password.", "", "error");
    }
  })
  .catch(function(error) {
    swal("An error occurred. Please try again later.", "", "error");
  });
});