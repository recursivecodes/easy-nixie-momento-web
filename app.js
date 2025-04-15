//import { TopicClient, TopicConfigurations, CredentialProvider } from 'https://esm.run/@gomomento/sdk-web@1.111.0';

document.addEventListener('DOMContentLoaded', async () => {
  const configRequest = await fetch('config.json');
  const config = await configRequest.json();
  const momentoPublishEndpoint = config.momentoPublishEndpoint;
  const tokenVendingMachineUrl = config.tokenVendingMachineUrl;
  const publishBtn = document.getElementById('publishBtn');
  const valueInput0 = document.getElementById('value_0');
  const valueInput1 = document.getElementById('value_1');
  const valueInput2 = document.getElementById('value_2');
  const valueInput3 = document.getElementById('value_3');
  const valueInput4 = document.getElementById('value_4');
  const valueInput5 = document.getElementById('value_5');
  const colorInput = document.getElementById('color');
  const statusDiv = document.getElementById('status');

  // Function to show status messages
  function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.className = 'status ' + (isError ? 'error' : 'success');
    statusDiv.style.display = 'block';

    // Hide status after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }

  // Function to fetch Momento token
  async function fetchMomentoToken() {
    try {
      const response = await fetch(tokenVendingMachineUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error('Error fetching token:', error);
      showStatus('Failed to fetch authentication token: ' + error.message, true);
      throw error;
    }
  }

  async function publishTopic(msg) {
    const response = await fetch(`${momentoPublishEndpoint}/topics/demo-cache/arduino-topic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': token,
      },
      body: JSON.stringify(msg),
    });
    if (response.ok) {
      return { is_success: true };
    }
    else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  };

  // Initialize Momento when the page loads
  const token = (await fetchMomentoToken()).authToken;

  // Handle publish button click
  publishBtn.addEventListener('click', async function () {
    const value_0 = valueInput0.value.trim() || 0;
    const value_1 = valueInput1.value.trim() || 0;
    const value_2 = valueInput2.value.trim() || 0;
    const value_3 = valueInput3.value.trim() || 0;
    const value_4 = valueInput4.value.trim() || 0;
    const value_5 = valueInput5.value.trim() || 0;
    const color = colorInput.value;

    // Validate input
    if (!value_0 || !value_1 || !value_2 || !value_3 || !value_4 || !value_5) {
      showStatus('Please enter a value for each position', true);
      return;
    }
    // Create message payload
    const payload = {
      value: String(`${value_5}${value_4}${value_3}${value_2}${value_1}${value_0}`),
      color: Number(color),
    };
    try {
      const response = await publishTopic(payload);
      if (response?.is_success) {
        showStatus('Message published successfully!');
        console.log('Published message:', payload);
      }
    }
    catch (error) {
      showStatus('Error publishing message: ' + error.message, true);
      console.error('Error:', error);
    }
    /* to use the Momento SDK to publish, uncomment this
    try {
      // Create a topic client
      const topicClient = new TopicClient({
        configuration: TopicConfigurations.Browser.v1(),
        credentialProvider: CredentialProvider.fromString({
          authToken: token,
        }),
      });
      // Publish to the topic
      const response = await topicClient.publish('demo-cache', 'arduino-topic', payload);
      if (response?.is_success) {
        showStatus('Message published successfully!');
        console.log('Published message:', payload);
      }
      else {
        showStatus(`Failed to publish: ${response.toString()}`, true);
        console.error('Publish error:', response);
      }
    }
    catch (error) {
      showStatus('Error publishing message: ' + error.message, true);
      console.error('Error:', error);
    }
    */
  });
});