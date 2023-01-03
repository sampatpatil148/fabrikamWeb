
const https = require('https');

function doRequest(options) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        let responseBody = '';
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
  
        res.on('end', () => {
          resolve(JSON.parse(responseBody));
        });
      });
  
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    });
}

function getMIRURL(type,searchID,sessionId){ 

  const mirUrl = process.env["MIR_ENDPOINT"] || 'recointweeuon2on1-anon.int.reco.microsoft.com';
  const EnvironmentId = process.env['EnvironmentId']||'3a90e016-76bb-4ffa-0011-000000000500';
  const similarID = searchID;
  const ExternalTest = 'ExternalTest';
  let SessionId = sessionId;
  const AlgoTypeRecent = 'RecentViews';
  const AlgoTypeSimilar = 'textual';
  const AlgoTypePAL = 'MF';
  let url;
  switch (type) {
      case 'bestselling':
        url = `https://${mirUrl}/Reco/v1.0/bestselling?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}`;
        break;
      case 'trending':
        url = `https://${mirUrl}/Reco/v1.0/Trending?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}`;
        break;
      //setp 1 to get "based on recent activity"
      case 'recentP':
        url = `https://${mirUrl}/Reco/v1.0/Similar/${similarID}?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}&SessionId=${SessionId}`;
      break;
       //setp 2 to get "based on recent activity"
      case 'recent':
        url = `https://${mirUrl}/Reco/v1.0/Picks?AlgoType=${AlgoTypeRecent}&EnvironmentId=${EnvironmentId}&SessionId=${SessionId}`;
        break;
      case 'new':
          url =  `https://${mirUrl}/Reco/v1.0/new?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}`;
          break;
      case 'relatedProduct':
          url = `https://${mirUrl}/Reco/v1.0/Similar/${similarID}?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}&AlgoType=${AlgoTypeSimilar}`;
      break;
      case 'pal':
          url = `https://${mirUrl}/Reco/v1.0/Similar/${similarID}?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}&AlgoType=${AlgoTypePAL}`;
          break;
      default:
          url = `https://${mirUrl}/Reco/v1.0/bestselling?ClientType=${ExternalTest}&EnvironmentId=${EnvironmentId}`;
  }
  return url;
}
const getData=async(type,searchID,sessionId)=>{
  const MIRURL = getMIRURL(type,searchID,sessionId);
  return await doRequest(MIRURL);
}

module.exports = async function (context, req) {
    let type = (req.query.type || (req.body && req.body.type));
    let searchID = (req.query.searchID || (req.body && req.body.searchID));
    let sessionId = (req.query.sessionId || (req.body && req.body.sessionId));
    const data = await getData(type,searchID,sessionId);
    context.res = {
        headers: {
            "Content-type": "application/json"
        },
        body: {data}
    };
};
module.exports.Mirapi = getData;
