interface PDFViewerProps {
  src: string
  title?: string
  height?: number
}

export default function PDFViewer({ src, title, height = 600 }: PDFViewerProps) {
  return (
    <div style={{ width: '100%', maxWidth: '100%' }}>
      <object data={src} type="application/pdf" width="100%" height={height} aria-label={title || 'PDF'}>
        <embed src={src} type="application/pdf" width="100%" height={height} />
        <a href={src} target="_blank" rel="noopener noreferrer">Download PDF</a>
      </object>
    </div>
  )
}
