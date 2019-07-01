import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = resource => {
  const [resources, setResources] = useState([])

  const fetchResources = () => {
    axios.get().then(res => {
      setResources(res.data)
    }).catch(err => console.log(err))
  }

  useEffect(fetchResources, [resource])
  return resources;
}