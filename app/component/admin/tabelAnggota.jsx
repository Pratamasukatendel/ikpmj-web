"use client";

import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch"; // Pastikan path import benar

// Contoh data awal, mirip dengan yang ada di gambar Anda
const initialUsers = [
  {
    id: 1,
    name: "Sugiyo",
    userId: "000512",
    contactName: "Broto",
    email: "broto@gmail.com",
    dateAdded: "09/08/2023",
    timeAdded: "07:00",
    isActive: true,
  },
  {
    id: 2,
    name: "Ahmad",
    userId: "000513",
    contactName: "Dian",
    email: "dian@example.com",
    dateAdded: "10/08/2023",
    timeAdded: "08:30",
    isActive: false,
  },
  {
    id: 3,
    name: "Siti",
    userId: "000514",
    contactName: "Eka",
    email: "eka@example.com",
    dateAdded: "11/08/2023",
    timeAdded: "09:00",
    isActive: true,
  },
  {
    id: 4,
    name: "Budi",
    userId: "000515",
    contactName: "Fajar",
    email: "fajar@gmail.com",
    dateAdded: "12/08/2023",
    timeAdded: "10:15",
    isActive: true,
  },
];

export default function TabelAnggota() {
  const [users, setUsers] = useState(initialUsers);

  // Fungsi untuk mengubah status aktif/nonaktif pengguna
  const handleToggle = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
    console.log(
      `Status user ID ${userId} diubah menjadi ${!users.find(
        (u) => u.id === userId
      ).isActive}`
    );
  };

  const handleEdit = (userId) => {
    alert(`Edit user dengan ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    if (
      window.confirm(`Apakah Anda yakin ingin menghapus user ID ${userId}?`)
    ) {
      setUsers(users.filter((user) => user.id !== userId));
      console.log(`User ID ${userId} dihapus.`);
    }
  };

  return (
    <div className="bg-white shadow-md overflow-hidden my-8">
      <table className="min-w-full text-sm">
        <thead className="border-b border-gray-200">
          <tr className="text-gray-500 text-left">
            <th className="p-4 font-semibold">Akun</th>
            <th className="p-4 font-semibold">Email</th>
            <th className="p-4 font-semibold">Data ditambah</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 last:border-0"
            >
              {/* Kolom Akun */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-200"></div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-gray-500">{user.userId}</p>
                  </div>
                </div>
              </td>
              {/* Kolom Email */}
              <td className="p-4">
                <div>
                  <p className="font-medium text-gray-800">
                    {user.contactName}
                  </p>
                  <p className="text-gray-500">{user.email}</p>
                </div>
              </td>
              {/* Kolom Data ditambah */}
              <td className="p-4">
                <div>
                  <p className="font-medium text-gray-800">{user.dateAdded}</p>
                  <p className="text-gray-500">{user.timeAdded}</p>
                </div>
              </td>
              {/* Kolom Status dengan Toggle */}
              <td className="p-4">
                <ToggleSwitch
                  isEnabled={user.isActive}
                  onToggle={() => handleToggle(user.id)}
                />
              </td>
              {/* Kolom Aksi */}
              <td className="p-4">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="font-medium text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
