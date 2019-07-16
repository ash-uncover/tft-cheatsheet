
/**  */
export const alwaysResolve = (result, timer) => new Promise((resolve) => {
  if (Number.isNaN(timer) || !timer) {
    resolve(result)
  } else {
    setTimeout(() => resolve(result), timer)
  }
})

/**  */
export const alwaysReject = (error, timer) => new Promise((resolve, reject) => {
  if (Number.isNaN(timer) || !timer) {
    reject(error)
  } else {
    setTimeout(() => reject(error), timer)
  }
})

/**  */
export const delayed = (promise, timer = 500) => Promise.all([promise, alwaysResolve(null, timer)])
  .then(result => alwaysResolve(result[0]))
  .catch(error => alwaysReject(error))

const PromisesUtils = {
  alwaysResolve,
  alwaysReject,
  delayed
}
export default PromisesUtils
