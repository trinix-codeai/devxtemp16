import { Worker } from "bullmq";
import { redis } from "./lib/redis.js";

const worker = new Worker(
  "notifications",
  async (job) => {
    if (job.name === "send-booking-confirmation") {
      console.log(`Queued confirmation for booking ${job.data.bookingId} -> ${job.data.customerEmail}`);
    }
  },
  { connection: redis },
);

worker.on("failed", (job, error) => {
  console.error("Notification job failed", job?.id, error.message);
});

console.log("Notification worker started");
