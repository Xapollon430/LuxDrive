document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the form, the submit button, and the car name element
  const contactForm = document.getElementById("contact_form");
  const submitButton = document.getElementById("send_message");
  const carNameElement = document.getElementById("car_name"); // Add this line

  // Add an event listener to the form for the submit event
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Collect the form data
    const formData = new FormData(contactForm);

    // Create an object to store the form data
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    // Additional fields (Name, Email, Phone, Car Name)
    formDataObject.Name = document.querySelector('input[name="Name"]').value;
    formDataObject.Email = document.querySelector('input[name="Email"]').value;
    formDataObject.Phone = document.querySelector('input[name="Phone"]').value;
    formDataObject.CarName = carNameElement.textContent; // Add this line

    // Send a POST request to localhost:3000
    fetch("https://lux-drive-gamma.vercel.app/send-dropoff-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(formDataObject), // Convert form data to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response here (e.g., show success or error message)
        console.log(data);
        // You can add more code here to handle the response as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
