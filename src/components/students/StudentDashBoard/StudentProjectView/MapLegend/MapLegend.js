import React, {useState} from 'react'
import styles from './MapLegend.module.scss'

const mapLegend = [
  {
    role : 'androidDeveloper',
    color: '#66ff99',
  },
  {
    role : 'dataEngineer',
    color: '#ff6600',
  },
  {
    role : 'frontEndDeveloper',
    color: '#9966ff',
  },
  {
    role : 'frontEndFrameWorkDeveloper',
    color: '#ff3300',
  },
  {
    role : 'machineLearningEngineer',
    color: '#ff3399',
  },
  {
    role : 'projectLead',
    color: '#ffff00',
  },
  {
    role : 'uXDesigner',
    color: '#669999',
  },
  {
    role : 'webBackEndDeveloper',
    color: '#0000ff',
  },
  {
    role : 'webUiDeveloper',
    color: '#600666',
  },
]

const MapLegend = () => {
  const [legend] = useState(mapLegend)
  return (
    <div className={styles.legendContainer}>
      <div className={styles.mapTitle}>Role Legend</div>
      <div className={styles.single}>
        {legend.map(single => (
          <>
            <h3 className={styles.role}>{single.role}</h3>
            <div style={{color: `${single.color}`}}>color</div>
        </>
        ))}
      </div>
    </div>
  )
}

export default MapLegend;
