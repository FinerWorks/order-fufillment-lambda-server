const finerworksService = require("../helpers/finerworks-service");
const debug = require("debug");
const log = debug("app:getUserPaymentToken");
log("Payment Tokens");
exports.getUserPaymentToken = async (req, res) => {
  try {
    const reqBody = JSON.parse(JSON.stringify(req.query));
    if (!reqBody || !reqBody.payment_profile_id) {
      res.status(400).json({
        statusCode: 400,
        status: false,
        message: "Bad Request",
      });
    } else {
      const { payment_profile_id } = req.query;
      log("Request comes to get payment token for", JSON.stringify(reqBody));
      const requestPayload = {
        payment_profile_id: payment_profile_id,
      };
      console.log("requestPayload",requestPayload);
      const getInformation = await finerworksService.GET_PAYMENT_TOKEN(
        requestPayload
      );
      res.status(200).json({
        statusCode: 200,
        status: true,
        payment_tokens: getInformation?.payment_tokens,
      });
    }
  } catch (err) {
    log("Error while fetching all the orders", JSON.stringify(err), err);
    res.status(400).json({
      statusCode: 400,
      status: true,
      payment_tokens: [],
    });
  }
};


exports.getCompanyInfo = async (req, res) => {
  try {
    // Prepare the request payload with only the necessary credentials
   
    console.log("came herererererere")
    // Perform the API call
    const response = await finerworksService.GET_COMPANY_INFO();

    // Return the response from the external API
    res.status(200).json({
      statusCode: 200,
      status: true,
      data: response.data,
    });
  } catch (err) {
    console.error("Error while fetching company info:", err);
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: "Internal Server Error",
    });
  }
};

function urlDecodeJSON(data) {
  const decodedJsonString = decodeURIComponent(data);
  const decodedJsonObject = JSON.parse(decodedJsonString);
  return decodedJsonObject;
}
function urlEncodeJSON(data) {
  const jsonString = JSON.stringify(data);
  const encodedString = encodeURIComponent(jsonString);
  return encodedString;
}
