import AWS from 'aws-sdk';
import serverConfig from '../config/serverConfig.js'
// returns the aws s3 object which helps to interect with s3 bucket.
const s3 = new AWS.S3({
    region: serverConfig.AWS_REGION,
    accessKeyId: serverConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: serverConfig.AWS_SECRET_ACCESS_KEY,
});

export default s3;