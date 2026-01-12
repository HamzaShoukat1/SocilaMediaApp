import { type ProfileItem } from "../../types"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


export default function FoodPartnerProfilePage() {

  const {id} = useParams()
  const [profile, setprofile] = useState<ProfileItem | null>(null)
  const [videos, setvideos] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8020/api/v1/partner/${id}`,{
      withCredentials:true
    }).then(res=> {
        const {foodPartner,foodItembyFoodPartner} = res.data.data
      setprofile(foodPartner)
      setvideos(foodItembyFoodPartner)
      console.log(res.data)
    })


  }, [id])
  



 return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta bg-black text-white">

                    <img className="profile-avatar " src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className=" flex gap-3 font-semibold">
                        <h1 className=" " title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="" title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                {/* <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile?.totalMeals}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.customersServed}</span>
                    </div>
                </div> */}
            </section>

            <hr className="profile-sep" />

            <section className="profile-grid" aria-label="Videos">
                {videos.map((v:any) => (
                    <div key={v._id} className="profile-grid-item">


                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted ></video>


                    </div>
                ))}
            </section>
        </main>

    )
}
