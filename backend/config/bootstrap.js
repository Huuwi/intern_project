const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

module.exports.bootstrap = async function (done) {
  sails.after('hook:http:loaded', () => {
    const swaggerPath = path.resolve(__dirname, '../docs/swagger.yaml');
    const swaggerDocument = YAML.load(swaggerPath);
    // console.log(swaggerDocument);

    sails.hooks.http.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Test route
    sails.hooks.http.app.get('/test', (req, res) => res.send('Hello from bootstrap'));

    sails.log.info(' Swagger UI available at http://localhost:1337/docs');
  });

  return done();
};
