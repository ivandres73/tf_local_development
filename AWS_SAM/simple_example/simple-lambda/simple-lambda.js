exports.handler = async function (event, context) {
  console.log("hello Applaudo");
  console.log("EVENT: " + JSON.stringify(event, null, null));
  return {
    statusCode: 200,
  };
};
