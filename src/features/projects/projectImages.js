const projectImageModules = import.meta.glob('../../assets/images/projects/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  import: 'default',
})

const imageUrlByFileName = Object.fromEntries(
  Object.entries(projectImageModules).map(([path, url]) => [path.split('/').pop(), url])
)

export const resolveProjectImages = (project) => {
  const configuredImages = Array.isArray(project.images) ? project.images : []

  return configuredImages
    .map((imageName) => imageUrlByFileName[imageName])
    .filter(Boolean)
}
