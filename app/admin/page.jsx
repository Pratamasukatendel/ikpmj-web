"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../component/admin/sidebar";
import Navbar from "../component/admin/navbar";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalAnggota: "...",
    anggotaAktif: "...",
    kegiatanAktif: "...",
    pengumumanAktif: "...",
    recentKegiatan: [],
    recentPengumuman: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setIsError(false);
      setStatusMessage("Memuat data...");

      try {
        const [totalResponse, activeResponse, kegiatanResponse, pengumumanResponse] =
          await Promise.all([
            fetch("/api/anggota", { cache: "no-store" }),
            fetch("/api/anggota?filterStatus=active", { cache: "no-store" }),
            fetch("/api/kegiatan", { cache: "no-store" }),
            fetch("/api/pengumuman", { cache: "no-store" }),
          ]);

        if (
          !totalResponse.ok ||
          !activeResponse.ok ||
          !kegiatanResponse.ok ||
          !pengumumanResponse.ok
        ) {
          throw new Error("Gagal memuat salah satu data.");
        }

        const totalData = await totalResponse.json();
        const activeData = await activeResponse.json();
        const kegiatanData = await kegiatanResponse.json();
        const pengumumanJSON = await pengumumanResponse.json();
        const pengumumanData = pengumumanJSON.pengumumans || [];

        const normalizedKegiatan = Array.isArray(kegiatanData)
          ? kegiatanData.map((k) => ({
              ...k,
              status: k.status?.toLowerCase() || "",
            }))
          : [];

        const kegiatanAktif = normalizedKegiatan.filter(
          (k) => k.status === "aktif"
        );

        const recentKegiatan = [...normalizedKegiatan]
          .sort(
            (a, b) =>
              new Date(b.tanggal_mulai) - new Date(a.tanggal_mulai)
          )
          .slice(0, 3);

        const normalizedPengumuman = pengumumanData.map((p) => ({
          ...p,
          status: p.status?.toLowerCase() || "",
        }));

        const pengumumanAktif = normalizedPengumuman.filter(
          (p) => p.status === "aktif"
        );

        const recentPengumuman = [...normalizedPengumuman]
          .sort(
            (a, b) =>
              new Date(b.tanggal_publikasi) - new Date(a.tanggal_publikasi)
          )
          .slice(0, 3);

        setStats((prevStats) => ({
          ...prevStats,
          totalAnggota: totalData.total || totalData.length || 0,
          anggotaAktif: activeData.total || activeData.length || 0,
          kegiatanAktif: kegiatanAktif.length,
          recentKegiatan: recentKegiatan,
          pengumumanAktif: pengumumanAktif.length,
          recentPengumuman: recentPengumuman,
        }));

        setStatusMessage("Data berhasil dimuat.");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsError(true);
        setStatusMessage("Gagal memuat data: " + error.message);
        setStats((prevStats) => ({
          ...prevStats,
          totalAnggota: 0,
          anggotaAktif: 0,
          kegiatanAktif: 0,
          pengumumanAktif: 0,
          recentKegiatan: [],
          recentPengumuman: [],
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-7 flex-1">
          <header className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin IKPMJ</h1>
            <p className="text-gray-600 mt-1">
              {isLoading ? "Memuat ringkasan..." : "Ringkasan cepat aktivitas organisasi."}
            </p>
          </header>

          {isError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
              {statusMessage}
            </div>
          )}

          {/* Stat Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Semua Anggota" value={stats.totalAnggota} color="teal" loading={isLoading} />
            <StatCard title="Anggota Aktif" value={stats.anggotaAktif} color="blue" loading={isLoading} />
            <StatCard title="Kegiatan Aktif" value={stats.kegiatanAktif} color="purple" loading={isLoading} />
            <StatCard title="Pengumuman Aktif" value={stats.pengumumanAktif} color="orange" loading={isLoading} />
          </section>

          {/* Quick Actions */}
          <section className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="flex flex-wrap gap-4">
              <QuickAction href="/admin/anggota/tambah" color="green" label="Tambah Anggota Baru" />
              <QuickAction href="/admin/kegiatan/tambah" color="blue" label="Buat Kegiatan Baru" />
              <QuickAction href="/admin/pengumuman/tambah" color="yellow" label="Buat Pengumuman Baru" />
            </div>
          </section>

          {/* Kegiatan & Pengumuman Terbaru */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Kegiatan Terbaru</h2>
              {isLoading ? (
                <p className="text-gray-600">Memuat kegiatan...</p>
              ) : (
                <ul className="space-y-4">
                  {stats.recentKegiatan.length > 0 ? (
                    stats.recentKegiatan.map((item) => (
                      <li key={item._id} className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                        <div className="font-semibold text-gray-700">{item.judul}</div>
                        <div className="text-sm text-gray-500">{formatDate(item.tanggal_mulai)}</div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Tidak ada kegiatan terbaru.</li>
                  )}
                </ul>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Pengumuman Terbaru</h2>
              {isLoading ? (
                <p className="text-gray-600">Memuat pengumuman...</p>
              ) : (
                <ul className="space-y-4">
                  {stats.recentPengumuman.length > 0 ? (
                    stats.recentPengumuman.map((item) => (
                      <li key={item._id} className="border-b pb-2 border-gray-200 last:border-b-0 last:pb-0">
                        <div className="font-semibold text-yellow-600">{item.judul}</div>
                        <div className="text-sm text-gray-500">{formatDate(item.tanggal_publikasi)}</div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">Tidak ada pengumuman terbaru.</li>
                  )}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Komponen Stat Card
function StatCard({ title, value, color, loading }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className={`text-4xl font-bold text-${color}-600`}>
        {loading ? "..." : value}
      </p>
      <p className="text-sm text-gray-500 mt-1">per hari ini</p>
    </div>
  );
}

// Komponen Aksi Cepat
function QuickAction({ href, color, label }) {
  return (
    <Link
      href={href}
      className={`bg-${color}-600 text-white px-6 py-2 rounded-lg hover:bg-${color}-700 transition-colors font-semibold shadow-md flex items-center justify-center gap-2`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 5.25a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-5.25v5.25a.75.75 0 0 1-1.5 0v-5.25H6a.75.75 0 0 1 0-1.5h5.25V6a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </Link>
  );
}
