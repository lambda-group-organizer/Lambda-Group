import React from 'react'
import testData from '../../testData/testData.js'

const Dashboard = props => {
  // Hooks
  const [useProjects, setProjects] = useState([]);

  return (
    <div className="ui grid background">
      {/* project list */}
      {useProjects.length === 0 ?
        <div class="ui segment">
          <div class="ui active dimmer">
            <div class="ui text loader">Loading</div>
          </div>
        </div> : useProjects.map(project => {
          return (
            <div className="ui">

            </div>
          )
        })
      }

    </div>)
}

export default Dashboard;

// []