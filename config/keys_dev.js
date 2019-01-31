// for mongodb atlas:
// our mongoURI connection string is:
// mongodb: // arman756:<PASSWORD>@devconnectorcluster-shard-00-00-6xumt.mongodb.net:27017,devconnectorcluster-shard-00-01-6xumt.mongodb.net:27017,devconnectorcluster-shard-00-02-6xumt.mongodb.net:27017/test?ssl=true&replicaSet=devConnectorCluster-shard-0&authSource=admin&retryWrites=true
// sw we put it as mongoURI and set the correct password in the place of <PASSWORD>
// mongodb://arman756:arman756@devconnectorcluster-shard-00-00-6xumt.mongodb.net:27017,devconnectorcluster-shard-00-01-6xumt.mongodb.net:27017,devconnectorcluster-shard-00-02-6xumt.mongodb.net:27017/test?ssl=true&replicaSet=devConnectorCluster-shard-0&authSource=admin&retryWrites=true
// **************************************************************************************************************************************/
// make sure to check username, password and database name (here: devConnectorCluster) are as the same as we entered at mongodb website.
// **************************************************************************************************************************************/
module.exports = {
  mongoURI: 'mongodb://arman756:arman756@devConnectorCluster-shard-00-00-6xumt.mongodb.net:27017,devConnectorCluster-shard-00-01-6xumt.mongodb.net:27017,devConnectorCluster-shard-00-02-6xumt.mongodb.net:27017/test?ssl=true&replicaSet=devConnectorCluster-shard-0&authSource=admin&retryWrites=true',
  secretOrKey: 'someSecret'
};

// for mlab:
// module.exports = {
//   mongoURI: 'mongodb://armandomlab:arbamlab756@ds147213.mlab.com:47213/devconnector',
//   secretOrKey: 'someSecret'
// }

// mongoURI is our complete mongoDB database string which has our username and password
// we also have a secret for the JsonWebToken
// we don't want to push this data
// so we add them to ./gitignore 
