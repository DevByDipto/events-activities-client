

import HandleBlockUser from "@/components/modules/admin/HandleBlockUser";
import getAllHost from "@/services/admin/getAllHost";

const HostTable =async () => {
  const hosts =await getAllHost()
console.log(hosts);

 

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
          {hosts?.map((host, index) => (
            <tr key={host.id} className="border-b text-center">
              <td>{index + 1}</td>
              <td>{host.name || "N/A"}</td>
              <td>{host.email}</td>
              <td>{host.isBlocked ? "Yes" : "No"}</td>

              <td>
                <HandleBlockUser  user={host} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HostTable;
