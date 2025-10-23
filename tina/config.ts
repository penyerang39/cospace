// TinaCMS Disabled - Minimal config
export default {
  authProvider: null,
  contentApiUrlOverride: '/api/tina/gql',
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
      static: true,
    },
  },
  schema: {
    collections: [],
  },
};