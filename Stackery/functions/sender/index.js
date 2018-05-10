var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-west-2' //change to your region
});

module.exports = async event => {
  const ports = JSON.parse(process.env.STACKERY_PORTS);
  const functionName = ports[0][0].functionName
  console.dir(ports);
  console.log(functionName)

  lambda.invoke({
    FunctionName: functionName,
    Payload: JSON.stringify(event, null, 2) // pass params
  }, function(error, data) {
    if (error) {
      return error
    }
    if (data.Payload) {
      return data.Payload
    }
  })

}
