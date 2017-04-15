import {categories} from '../../const'

const categoriesMap = categories.reduce((map, cat) => {
  map[cat.id] = cat.name
  return map
}, {})

const singleWorkerDecorator = (worker) => {
  if (!worker.img) {
    worker.img = 'http://semantic-ui.com/images/wireframe/image.png'
  }
  worker.categoriesList = categories.filter(cat => worker.categoryIds.indexOf('' + cat.id) >= 0)
  const categoriesNames = worker.categoryIds.map((catId) => categoriesMap[catId])
  let counter = 0
  let categoryPretty = ''
  categoriesNames.forEach((categoryName) => {
    categoryPretty += categoryName
    counter++
    if (counter < categoriesNames.length) {
      if (counter === 2) {
        categoryPretty += '..'
        return
      }
      categoryPretty += ', '
    }
  })
  worker.categoriesPretty = categoryPretty
  return worker
}

export const decorateWorkers = (workers) => {
  return workers.map(singleWorkerDecorator)
}

export const decorateWorker = singleWorkerDecorator
