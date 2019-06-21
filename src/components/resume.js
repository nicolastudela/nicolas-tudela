import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/entry.webpack'

import resume from '../resume.pdf'

const Resume = (props) => {
  const [numPages, setNumPages] = useState(null)

  const onDocumentLoadSuccess = document => {
    const { numPagesDoc } = document
    setNumPages(numPagesDoc)
  }

  return (
    <Document file={resume} onLoadSuccess={props.toggleLoading}>
      <Page pageNumber={1} scale={1.5}/>
    </Document>
  )
}

export default Resume
