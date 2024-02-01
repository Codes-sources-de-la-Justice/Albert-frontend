import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import next from '../../../icons/usertools/next.svg'
import previous from '../../../icons/usertools/previous.svg'
import { nextImgDescription, previousImgDescription } from '../../constants/chatbotProps'

export function DisplayMessageTab({
  isDisplayable,
  tabsLen,
  activeTab,
  setActiveTab,
  extraClass,
}) {
  const dispatch = useDispatch()

  useEffect(() => setActiveTab(tabsLen), [tabsLen])
  useEffect(() => {
    dispatch({ type: 'SWITCH_TAB', nextTab: activeTab })
  }, [activeTab])

  const handleClick = (activeTab, setActiveTab, step) => {
    setActiveTab(activeTab + step)
  }

  return (
    <>
      {isDisplayable && (
        <div className={`${extraClass} flex flex-row fr-mb-4w`}>
          {activeTab > 1 && (
            <button
              className="fr-mr-1w"
              onClick={() => handleClick(activeTab, setActiveTab, -1)}
            >
              <img src={previous} alt={previousImgDescription} />
            </button>
          )}
          <p className="streaming-tabs">
            {activeTab} / {tabsLen}
          </p>
          {activeTab < tabsLen && (
            <button
              className="fr-ml-1w"
              onClick={() => handleClick(activeTab, setActiveTab, 1)}
            >
              <img src={next} alt={nextImgDescription} />
            </button>
          )}
        </div>
      )}
    </>
  )
}