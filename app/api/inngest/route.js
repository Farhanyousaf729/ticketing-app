import { serve } from "inngest/next";
import {inngest, userCreated, userDeleted, userUpdated } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
   userCreated , userUpdated, userDeleted
  ],
});