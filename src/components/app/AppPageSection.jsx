import React from 'react'

import './_app-page.scss'

const AppPageSection = ({ className, children }) => {
  // Rendering
  const classArray = ['app-page-section']
  if (className) {
    classArray.push(className)
  }
  return (
    <div className={classArray.join(' ')}>
      {children}
    </div>
  )
}

export default AppPageSection
