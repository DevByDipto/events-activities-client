import HandleBlockUser from "@/components/modules/admin/HandleBlockUser";
import getAllHost from "@/services/admin/getAllHost";
import { User } from "@/types";

const HostTable = async () => {
  const hosts = await getAllHost();
  
  // Defensive check to ensure hosts is an array
  const hostsList = Array.isArray(hosts) ? hosts : [];

  return (
    <div className="overflow-x-auto mt-10">
      {hostsList.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No hosts found.</p>
      ) : (
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
            {hostsList.map((host: User, index: number) => (
              <tr key={host.id} className="border-b text-center">
                <td>{index + 1}</td>
                <td>{host.name || "N/A"}</td>
                <td>{host.email}</td>
                <td>{host.isBlocked ? "Yes" : "No"}</td>
                <td>
                  <HandleBlockUser user={host} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostTable;