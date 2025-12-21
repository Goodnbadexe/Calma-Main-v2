export function runLayoutDiagnostics() {
  const log = () => {
    const vpW = window.innerWidth
    const vpH = window.innerHeight
    const container = document.querySelector('.container') as HTMLElement | null
    const mainEl = document.querySelector('main.main-content') as HTMLElement | null
    const rectC = container?.getBoundingClientRect()
    const rectM = mainEl?.getBoundingClientRect()
    const csC = container ? window.getComputedStyle(container) : null
    const csM = mainEl ? window.getComputedStyle(mainEl) : null
    const bucket = vpW <= 480 ? 'xs' : vpW <= 640 ? 'sm' : vpW >= 1920 ? 'ultra' : vpW >= 1440 ? '2xl' : vpW >= 1280 ? 'xl' : vpW >= 1024 ? 'lg' : vpW >= 768 ? 'md' : 'sm'
    // eslint-disable-next-line no-console
    console.table({
      viewportW: vpW,
      viewportH: vpH,
      breakpoint: bucket,
      containerW: rectC?.width ?? 0,
      containerPadL: csC ? csC.paddingLeft : '0px',
      containerPadR: csC ? csC.paddingRight : '0px',
      containerMaxW: csC ? csC.maxWidth : 'none',
      mainW: rectM?.width ?? 0,
      mainPadL: csM ? csM.paddingLeft : '0px',
      mainPadR: csM ? csM.paddingRight : '0px',
      mainMaxW: csM ? csM.maxWidth : 'none'
    })
  }
  const addDebugClasses = () => {
    document.querySelectorAll('.container, .luxury-section-inner, .content-grid, .projects-grid').forEach((el) => {
      (el as HTMLElement).classList.add('debug-outline')
    })
  }
  const removeDebugClasses = () => {
    document.querySelectorAll('.debug-outline').forEach((el) => {
      (el as HTMLElement).classList.remove('debug-outline')
    })
  }
  log()
  addDebugClasses()
  window.addEventListener('resize', log, { passive: true })
  return () => {
    window.removeEventListener('resize', log)
    removeDebugClasses()
  }
}
