// Includes
var http = require('../util/http.js').func;
var cache = require('../cache');

// Args
exports.required = ['userid', 'asset'];

// Define
function getProductInfo (userid, asset) {
  var httpOpt = {
    url: '//api.roblox.com/ownership/hasasset?userId=' + userid + '&assetId=' + asset,
    options: {
      resolveWithFullResponse: true,
      method: 'GET'
    }
  };
  return http(httpOpt)
  .then(function (res) {
    if (res.statusCode === 200) {
      return Boolean(res.body);
    } else {
      throw new Error('Asset does not exist');
    }
  });
}

exports.func = function (args) {
  var asset = args.asset;
  var userid = args.userid;
  return cache.wrap('Product', asset + "_" + userid, function () {
    return getProductInfo(userid, asset);
  });
};
