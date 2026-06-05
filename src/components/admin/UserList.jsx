export default function UserList({ users }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Users</h2>
      {users.length === 0 ? <p className="text-gray-500">No users</p> :
        <ul>
          {users.map(u => <li key={u.uid} className="py-1">{u.email}</li>)}
        </ul>
      }
    </div>
  );
} 