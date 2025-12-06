import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

dotenv.config();

// Simple CORS middleware for all routes
function allowCORS(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
}

const app = express();
app.use(allowCORS);
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5001;

// Utility to truncate checksum
function truncateChecksum(str) {
  if (!str || str.length < 30) return str;
  return str.slice(0, 30) + "...";
}

app.get("/raw/contact/:id", async (req, res) => {
  // Prevent caching
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  const { id } = req.params;
  try {
    const contact = await prisma.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    // Truncate the checkSum field
    const { checkSum, ...rest } = contact;
    res.setHeader("Content-Type", "application/json");
    res.json({ ...rest, checkSum: truncateChecksum(checkSum) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Chameleon Demo Backend running on port ${PORT}`);
});
