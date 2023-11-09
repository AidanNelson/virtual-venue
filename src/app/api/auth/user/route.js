import { unsealData } from "iron-session/edge";

export async function GET(req) {
  try {
    const cookie = req.cookies.get("vv-session");
    const decryptedSession = cookie
      ? await unsealData(cookie.value, {
          password: process.env.COOKIE_PASSWORD,
        })
      : null;
    console.log("decrypted session: ", JSON.parse(decryptedSession));
    return Response.json({ user: decryptedSession });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Authentication token is invalid, please log in" },
      { status: 500 },
    );
  }
}
