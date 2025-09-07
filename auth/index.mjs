// install with: npm install googleapis express
import express from "express";
import { google } from "googleapis";

const app = express();

// replace with your actual client_id, client_secret, and redirect
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3000/oauth2callback"; // must match Google Console

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Step 1: redirect user to consent screen
app.get("/auth", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // ensures refresh_token is returned
    prompt: "consent", // force showing consent to get refresh_token every time
    scope: ["https://www.googleapis.com/auth/gmail.addons.current.message.readonly https://www.googleapis.com/auth/gmail.metadata https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/gmail.insert https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/gmail.addons.current.message.action https://www.googleapis.com/auth/gmail.modify https://mail.google.com/ https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.settings.sharing https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.addons.current.message.metadata https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/gmail.addons.current.action.compose"],
  });
  res.redirect(url);
});

// Step 2: handle callback and exchange code for tokens
app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    // tokens contains { access_token, refresh_token, scope, token_type, expiry_date }
    res.json(tokens);
  } catch (err) {
    console.error("Error exchanging code for tokens:", err);
    res.status(500).send("Auth failed");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
  console.log("Start auth flow at: http://localhost:3000/auth");
});
