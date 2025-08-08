fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
    method: "POST",
    headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: "vRVubt0vCRfoqOBQcY8AbJKSGLsxW3U6",
      client_secret: "u5NuKwrqRBwZ8Xoy"
    })
  })
  .then(response => response.json())
  .then(data => console.log(data))  // The response will contain the access token
  .catch(error => console.error("Error:", error));
  