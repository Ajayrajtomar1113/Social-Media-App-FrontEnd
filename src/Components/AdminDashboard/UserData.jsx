import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const UserData = ({users}) => {
   const post = useSelector((store) => store.post);

    const navigate = useNavigate()
     const handleprofile=(id)=>{
      navigate(`/admin/profile/${id}`);
    }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Users</h2>

          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Post</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>

            <tbody>
              
              {users?.filter((item)=>item.role !== "ADMIN")  
              ?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.firstName} {user.lastName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    {
                      post?.posts?.filter(p => p.user?.id === user.id).length || 0

                    }
                  </td>
                  <td className="p-2">
                    <button className="text-blue-500" onClick={()=>handleprofile(user.id)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default UserData
