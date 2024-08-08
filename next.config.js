const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  assetPrefix: isProd ? '/my-portfolio/' : '',
  trailingSlash: true,
};