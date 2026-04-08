import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserData = ({ users }) => {

  const post = useSelector((store) => store.post);
  const navigate = useNavigate();

  const handleprofile = (id) => {
    navigate(`/admin/profile/${id}`);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">

      <h2 className="text-xl font-bold mb-4 text-gray-700">Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">

          {/* HEADER */}
          <thead className="bg-gray-100 uppercase text-md">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Posts</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {users?.filter((item) => item.role !== "ADMIN")
              ?.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >

                  <td className="p-3 font-medium text-gray-800">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="p-3 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-3 text-gray-700 font-semibold">
                    {
                      post?.posts?.filter(p => p.user?.id === user.id).length || 0
                    }
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleprofile(user.id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UserData;