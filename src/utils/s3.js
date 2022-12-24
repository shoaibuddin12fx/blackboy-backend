const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint('sfo3.digitaloceanspaces.com');

let s3 = new AWS.S3({
    credentials: {
        accessKeyId: 'DO00XDA7FECYMDHUN2B9',
        secretAccessKey: '0YbL5sGBZ6D4VG2RI+XCizRfU2eCEI9DSQ6FkIEBMzw'
    },
    endpoint: spacesEndpoint
});

export default s3;
