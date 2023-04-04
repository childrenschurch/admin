(function() {
  // Get form input fields
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let message = document.querySelector("#message");
  let submitButton = document.querySelector("#submit-button");

  // Add event listener to submit button
  submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // Check if any input field is empty
    if (name.value.trim() === "" || email.value.trim() === "" || phone.value.trim() === "" || message.value.trim() === "") {
      // Show error message
      alert("Please fill in all fields.");
      return;
    }
    
    // Disable submit button and show loading indicator
    submitButton.disabled = true;
    submitButton.innerHTML = "Sending...";
    
    // Construct data object
    let data = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      date: new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })
    };
    
    
    // Send data to SheetDB API
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://sheetdb.io/api/v1/xk4526495z3zp", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    
    // Handle response from SheetDB API
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Show success message
          let successMessage = document.createElement("div");
          successMessage.className = "alert alert-success";
          successMessage.innerHTML = "Message sent successfully!";
          document.querySelector("body").appendChild(successMessage);
      
          // Clear form input fields
          name.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";
        } else {
          // Show error message
          let errorMessage = document.createElement("div");
          errorMessage.className = "alert alert-danger";
          errorMessage.innerHTML = "Sorry! An error occurred";
          document.querySelector("body").appendChild(errorMessage);
      
          // Clear form input fields
          name.value = "";
          email.value = "";
          phone.value = "";
          message.value = "";
        }
        
        // Enable submit button and hide loading indicator
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
      }
    };
  });
})();
