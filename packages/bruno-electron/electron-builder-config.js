require('dotenv').config({ path: process.env.DOTENV_PATH });

const config = {
  appId: 'com.usebruno.app.cakil',
  productName: 'Cakil',
  electronVersion: '21.1.1',
  directories: {
    buildResources: 'resources',
    output: 'out'
  },
  files: ['**/*'],
  afterSign: 'notarize.js',
  mac: {
    artifactName: '${name}_${version}_${arch}_${os}.${ext}',
    category: 'public.app-category.developer-tools',
    target: [
      {
        target: 'dmg',
        arch: ['x64', 'arm64']
      },
      {
        target: 'zip',
        arch: ['x64', 'arm64']
      }
    ],
    icon: 'resources/icons/mac/icon.icns',
    hardenedRuntime: true,
    identity: 'Anoop MD (W7LPPWA48L)',
    entitlements: 'resources/entitlements.mac.plist',
    entitlementsInherit: 'resources/entitlements.mac.plist'
  },
  linux: {
    artifactName: '${name}_${version}_${arch}_linux.${ext}',
    icon: 'resources/icons/png',
    target: ['AppImage', 'deb', 'rpm', 'snap', 'tar.gz']
  },
  win: {
    artifactName: '${name}_${version}_${arch}_win.${ext}',
    icon: 'resources/icons/png',
    // target x64
    target: [
      {
        target: 'nsis',
        arch: ['x64']
      },
      {
        target: 'zip',
        arch: ['x64']
      }
    ],
    //certificateFile: `${process.env.WIN_CERT_FILEPATH}`,
    //certificatePassword: `${process.env.WIN_CERT_PASSWORD}`
  }
};

module.exports = config;
