import Amadeus from "amadeus";

const isProd = process.env.NODE_ENV === "production";

const amadeus = new Amadeus({
  clientId: isProd
    ? process.env.AMADEUS_CLIENT_ID
    : process.env.AMADEUS_CLIENT_ID_DEV,
  clientSecret: isProd
    ? process.env.AMADEUS_CLIENT_SECRET
    : process.env.AMADEUS_CLIENT_SECRET_DEV,
});
export default amadeus;
