// google-setup.js
// Run this once to generate google-token.json

import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

const CREDENTIALS_PATH = "google-credentials.json";
const TOKEN_PATH = "google-token.json";

// Step 1: Load OAuth client credentials
function loadCredentials() {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
        console.error("Missing google-credentials.json");
        process.exit(1);
    }

    const content = fs.readFileSync(CREDENTIALS_PATH);
    return JSON.parse(content).installed;
}

// Step 2: Create OAuth client
function createOAuthClient({ client_id, client_secret, redirect_uris }) {
    return new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
}

// Step 3: Generate the authorization URL
function generateAuthUrl(oauth2Client) {
    const SCOPES = ["https://www.googleapis.com/auth/calendar"];

    return oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        prompt: "consent"
    });
}

// Step 4: Prompt user for the code returned by Google
function promptForCode(authUrl, oauth2Client) {
    console.log("Authorize this app by visiting this URL:");
    console.log(authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter the authorization code: ", (code) => {
        rl.close();

        oauth2Client.getToken(code.trim(), (err, token) => {
            if (err) {
                console.error("Error retrieving access token:", err);
                process.exit(1);
            }

            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token, null, 2));
            console.log("Token stored successfully in google-token.json");
        });
    });
}

// Main process
function main() {
    const credentials = loadCredentials();
    const oauth2Client = createOAuthClient(credentials);

    const authUrl = generateAuthUrl(oauth2Client);
    promptForCode(authUrl, oauth2Client);
}

main();
