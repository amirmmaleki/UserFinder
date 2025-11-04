import { useState } from "react";
import { users } from "./users";

function App() {
  const [searchName, setSearchName] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const filteredUsers = searchName
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : users;

  const toggleUserSelection = (id: number) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter((userId) => userId !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-6 w-[600px]">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          لیست کاربران
        </h1>

        <input
          type="text"
          placeholder="جستجو با نام"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="grid grid-cols-2 gap-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => toggleUserSelection(user.id)}
              className={`p-2 rounded-lg cursor-pointer text-center transition-all duration-200 text-sm ${
                selectedUserIds.includes(user.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {user.name} <br />
              <span className="text-xs text-gray-500">ID: {user.id}</span>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <p className="text-center text-red-500 mt-4 text-sm">
            کاربری با این نام پیدا نشد.
          </p>
        )}

        {selectedUserIds.length > 0 && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-sm">
            <p className="font-semibold text-green-800 mb-1">انتخاب‌شده‌ها:</p>
            <div className="flex flex-wrap gap-2">
              {selectedUserIds.map((id) => {
                const user = users.find((u) => u.id === id);
                return (
                  <span
                    key={id}
                    className="bg-green-200 px-2 py-1 rounded text-green-900"
                  >
                    {user?.name} (ID: {id})
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
