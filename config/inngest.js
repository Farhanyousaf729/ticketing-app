import { Inngest } from "inngest";
import dbConnect from "./db";
import userModel from "@/models/userModel";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "ticketing-app" });

export const userCreated = inngest.createFunction(
  { id: "User-Created"},{ event: "clerk/user.created" },
  async ({ event }) => {
    const { email_addresses, first_name, last_name, image_url, id } = event.data;
    const UserData = { email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      clerkId: id,
      imgUrl: image_url,
    };
    await dbConnect();
    const User = await userModel.create(UserData);
  }
);

export const userUpdated = inngest.createFunction(
  { id: "User-Updated"},{ event: "clerk/user.updated" },
  async ({ event }) => {
    const { email_addresses, first_name, last_name, image_url, id } = event.data;
    const UserData = { email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      clerkId: id,
      imgUrl: image_url,
    };
    await dbConnect();
    const User = await userModel.findOneAndUpdate({ clerkId: id }, UserData, {
      new: true,
    });
  });

  export const userDeleted = inngest.createFunction(
    { id: "User-Deleted"},{event: "clerk/user.deleted" },
    async ({ event }) => {
        const { id } = event.data;
        await dbConnect();
        const User = await userModel.findOneAndDelete({ clerkId: id });
    })

