
import { useEffect, useState } from "react"
import RealFead from "../components/Reelfeed"
import axios from "axios"
export default function HomePage() {


  const [videos, setvideos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8020/api/v1/food",
      {
        withCredentials: true
      }
    ).then(res => {
      setvideos(res.data.data)
    }).catch(() => { /* noop: optionally handle error */ })
  }, [])


  return (

    <RealFead

      items={videos}
      emptyMessage="No videos Available"


    />

  )
}
