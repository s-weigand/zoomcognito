import OptionsSync from 'webext-options-sync'

export default new OptionsSync({
  defaults: {
    username: 'zoom_user',
    autoAcceptUserAgreement: false,
    zoomUrlPrefix: '',
    blockClientDownload: true,
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
})
