const base64Credentials = (username, password) => {
    const credentials = `${username}:${password}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');
    return encodedCredentials;
  };
  
  // Example usage
  const username = 'your_username';
  const password = 'your_password';
  
  const encodedCredentials = base64Credentials(username, password);
  console.log(encodedCredentials);
  