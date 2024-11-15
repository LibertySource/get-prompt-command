import "./index.css";

import {
  BedrockAgentClient,
  GetPromptCommand,
} from "@aws-sdk/client-bedrock-agent";

const getPrompt = async function () {

  const outputElement = document.getElementById("output");

  outputElement.value = "";

  // Configure the AWS SDK
  const client = new BedrockAgentClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY, 
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    },
  });

  const input = {
    promptIdentifier: import.meta.env.VITE_PROMPT_ID,
    //promptVersion: promptVersion, // Optional: Omit this to get the DRAFT version
  };

  const command = new GetPromptCommand(input);

  try {
    const response = await client.send(command);
    outputElement!.value = response.variants[0].templateConfiguration?.text.text;
  } catch (error) {
    console.error("Error retrieving prompt:", error);
    throw error;
  }
}

const button = document.querySelector<HTMLDivElement>('#button')

button!.innerHTML = `
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
    Get Prompt 
  </button>
`;

button!.addEventListener('click', () => getPrompt());