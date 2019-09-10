import React, {useState} from 'react'
import styles from './MapLegend.module.scss'

const mapLegend = [
  {
    role : 'Android Dev',
    color: '#66ff99',
  },
  {
    role : 'Data Engineer',
    color: '#ff6600',
  },
  {
    role : 'Front-end Dev',
    color: '#9966ff',
  },
  {
    role : 'Front-end Frame',
    color: '#ff3300',
  },
  {
    role : 'Machine Learning',
    color: '#ff3399',
  },
  {
    role : 'Project Lead',
    color: '#ffff00',
  },
  {
    role : 'UX Designer',
    color: '#669999',
  },
  {
    role : 'Web Back-end Dev',
    color: '#0000ff',
  },
  {
    role : 'Web UI Dev',
    color: '#600666',
  },
]

const MapLegend = () => {
  const [legend] = useState(mapLegend)
  return (
    <div className={styles.legendContainer}>
      <div className={styles.mapTitle}>Role Legend</div>
      <div className={styles.singleContainer}>
        {legend.map(single => (
          <div className={styles.single}>
            <h3 className={styles.role}>{single.role}</h3>
              <div className={styles.dot} style={{backgroundColor: `${single.color}`}}></div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default MapLegend;
