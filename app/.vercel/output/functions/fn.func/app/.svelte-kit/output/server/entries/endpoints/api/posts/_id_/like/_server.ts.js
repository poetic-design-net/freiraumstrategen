import { j as json } from "../../../../../../chunks/index.js";
import { c as client } from "../../../../../../chunks/client.js";
const POST = async ({ params }) => {
  try {
    await client.patch(params.id).setIfMissing({ likes: 0 }).inc({ likes: 1 }).commit();
    return json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
export {
  POST
};
