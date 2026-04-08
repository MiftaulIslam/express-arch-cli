export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: '{{projectName}} API',
    version: '1.0.0',
    description: 'Generated API docs'
  },
  paths: {
    '/api/v1/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': {
            description: 'Healthy response'
          }
        }
      }
    }
  }
};
