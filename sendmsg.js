function sendmessage() {
    // Show "Sending" button with green background
    Swal.showLoading();
    Swal.getConfirmButton().classList.add('bg-green-500');
  
    const data = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value,
      datetime: getAfricanDateTime() // Get current date and time in Nairobi
    };
  
    // Send the data to SheetDB using AJAX
    $.ajax({
      url: 'https://sheetdb.io/api/v1/xk4526495z3zp',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(response) {
        // Show success popup and reset button
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully!',
        });
        Swal.getConfirmButton().classList.remove('bg-green-500');
      },
      error: function(xhr, status, error) {
        console.error('Error sending data:', error);
        // Show error popup and reset button
        Swal.fire({
          icon: 'error',
          title: 'Error sending message!',
        });
        Swal.getConfirmButton().classList.remove('bg-green-500');
      }
    });
  }
  
  function getAfricanDateTime() {
    // Get current date and time in Nairobi, Kenya (GMT+3)
    const date = new Date();
    const nairobiOffset = 3 * 60; // Nairobi is GMT+3
    const utcOffset = date.getTimezoneOffset(); // Get UTC offset in minutes
    const localTime = date.getTime() - (utcOffset * 60 * 1000); // Convert to local time
    const nairobiTime = localTime + (nairobiOffset * 60 * 1000); // Add Nairobi offset
    const nairobiDate = new Date(nairobiTime);
    // Format date and time as required by SheetDB API
    const formattedDate = nairobiDate.toISOString().slice(0, 10);
    const formattedTime = nairobiDate.toTimeString().slice(0, 8);
    return formattedDate + ' ' + formattedTime;
  }
  