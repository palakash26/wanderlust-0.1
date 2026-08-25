import http from "http";
import https from "https";

/**
 * Keep-Alive Cron Utility for Next.js / Node Server
 * Sends a self-ping every 10 minutes to prevent hosting platforms like Render, Glitch, Koyeb
 * from putting the server instance into idle sleep mode.
 */
export function initKeepAliveCron(serverPort: number = 3000) {
  const TEN_MINUTES_MS = 10 * 60 * 1000;

  const pingServer = () => {
    const targetUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.RENDER_EXTERNAL_URL ||
      process.env.APP_URL ||
      process.env.SERVER_URL ||
      "https://tripora-lemon.vercel.app";

    const pingEndpoint = `${targetUrl.replace(/\/$/, "")}/api/ping`;
    const protocol = pingEndpoint.startsWith("https") ? https : http;

    console.log(`[Keep-Alive Cron] ⏰ [${new Date().toLocaleString()}] Sending ping to: ${pingEndpoint}`);

    protocol
      .get(pingEndpoint, (res) => {
        console.log(`[Keep-Alive Cron] ✅ Server response status: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error(`[Keep-Alive Cron] ⚠️ Ping warning: ${err.message}`);
      });
  };

  // Run initial ping after 30 seconds
  setTimeout(pingServer, 30 * 1000);

  // Schedule regular ping every 10 minutes
  const intervalId = setInterval(pingServer, TEN_MINUTES_MS);
  
  console.log("🚀 [Keep-Alive Cron] Service initialized! Ping interval set to 10 minutes.");
  return intervalId;
}
