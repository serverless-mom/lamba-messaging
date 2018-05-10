var aws = require('aws-sdk');
var lambda = new aws.Lambda({
  region: 'us-west-2' //change to your region
});
const cfnCR = require('cfn-custom-resource');


module.exports = async event => {
  const ports = JSON.parse(process.env.STACKERY_PORTS);
  const functionName = ports[0][0].functionName

  lambda.invoke({
    FunctionName: functionName,
    Payload: JSON.stringify(event, null, 2) // pass params
  }, function(error, data) {
    console.log('raw data')
    console.dir(data)
    if (error) {
      console.log('lack of success')
    }
    if (data.Payload) {
      console.log('success!')
    } else {
      console.log('data with no payload')
    }
    return cfnCR.sendSuccess('seed', {}, event);
  })

}
