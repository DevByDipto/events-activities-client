

import HandleBlockUser from "@/components/modules/admin/HandleBlockUser";
import getAllUser from "@/services/admin/getAllUser";

const UsersTable =async () => {
  const users =await getAllUser()
  console.log(users);

 

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blocked</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b text-center">
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.isBlocked ? "Yes" : "No"}</td>

              <td>
                <HandleBlockUser  user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
