"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Apa itu IKPMJ?",
    answer:
      "Ikatan Keluarga Pelajar dan Mahasiswa Jember (IKPMJ) adalah organisasi mahasiswa daerah yang berdedikasi untuk memfasilitasi dan mendukung mahasiswa-mahasiswa asal Jember yang sedang menempuh pendidikan di Yogyakarta.",
  },
  {
    question: "Kenapa Harus IKPMJ?",
    answer:
      "Karena IKPMJ berkomitmen untuk mempererat tali silaturahmi, memberikan dukungan akademik, serta menyelenggarakan berbagai kegiatan sosial dan pengembangan diri untuk semua anggota organisasi.",
  },
  {
    question: "Bagaimana cara Bergabung Ke dalam IKPMJ?",
    answer:
      "Dengan cara menghubungi kontak pengurus atau mengirim email ke email organisasi",
  },
  {
    question: "Siapa yang bisa bergabung dengan IKPMJ?",
    answer:
      "Mahasiswa aktif yang berasal dari Jember dan sedang berkuliah di Yogyakarta",
  },
  {
    question: "Bagaimana cara saya tahu ada kegiatan baru?",
    answer:
      "Kamu bisa mengikuti media sosial resmi atau memeriksa halaman Pengumuman dan Kegiatan di website ini.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-center py-10 px-8 lg:px-24">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 text-justify">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden cursor-pointer"
            onClick={() => toggleFaq(index)}
          >
            <div className="p-4 text-xl font-semibold text-gray-700 flex justify-between items-center">
              <span>{faq.question}</span>
              <span className="w-5 h-5">
                {openIndex === index ? (
                  <Image
                    src="/icons/arrow-up.svg"
                    alt="arrow up"
                    width={20}
                    height={20}
                  />
                ) : (
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="arrow down"
                    width={20}
                    height={20}
                  />
                )}
              </span>
            </div>
            {openIndex === index && (
              <div className="p-4 text-gray-600 font-light bg-white">
                {typeof faq.answer === "object"
                  ? Object.entries(faq.answer).map(([key, value]) => (
                      <div key={key}>
                        <strong>{key}:</strong>
                        <ul className="list-disc ml-5">
                          {value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))
                  : faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
