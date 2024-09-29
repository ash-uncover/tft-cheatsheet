import React from 'react'

import './_app-page.css'

const AppPage = ({ className, children }) => {
  // Rendering
  const classArray = ['app-page']
  if (className) {
    classArray.push(className)
  }
  return (
    <div className={classArray.join(' ')}>
      <div className='app-page-content'>
        {children}
      </div>
    </div>
  )
}

export default AppPage
