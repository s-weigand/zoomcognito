import fs from 'fs'

/**
 * Updates the manifest for firefox,
 * with options that cause errors in chrome
 */
const updateManifestFireFox = () => {
  const distManifestPath = 'distribution/manifest.json'

  const originalManifest = JSON.parse(fs.readFileSync(distManifestPath, 'utf8'))

  const fireFoxSpecifficSettings = {
    browser_specific_settings: {
      gecko: {
        id: '{4c41a03e-022f-4334-b0ab-46632140b494}',
        strict_min_version: '67.0',
      },
    },
  }
  originalManifest.permissions = [...originalManifest.permissions, 'privacy']
  const updatedManifest = { ...originalManifest, ...fireFoxSpecifficSettings }
  fs.writeFileSync(distManifestPath, JSON.stringify(updatedManifest))
}

updateManifestFireFox()
