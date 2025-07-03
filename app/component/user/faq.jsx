"use client";

import Image from "next/image";
import { useState } from "react";

const faqs = [
  {
    question: "Apa itu IKPMJ?",
    answer:
      "Resikel adalah aplikasi yang membantu kamu mengelola sampah dengan cara yang lebih baik dan ramah lingkungan. Dengan Resikel, kamu bisa memilah sampah lebih mudah dan mendapatkan informasi penting tentang pengelolaan limbah.",
  },
  {
    question: "Kenapa Harus IKPMJ?",
    answer:
      "Sampah adalah barang-barang yang tidak terpakai lagi, seperti sisa makanan, kemasan, dan barang-barang yang sudah tidak digunakan. Pengelolaan sampah yang baik sangat penting untuk kesehatan dan kebersihan lingkungan.",
  },
  {
    question: "Bagaimana cara Bergabung Ke dalam IKPMJ?",
    answer: {
      "Sampah Organik": [
        "Sisa makanan, kulit buah, dan sayuran.",
        "Daun dan ranting.",
      ],
      "Sampah Anorganik": ["Plastik, kertas, dan logam."],
      "Sampah Berbahaya": ["Limbah medis dan baterai."],
      "Sampah Elektronik": ["Perangkat elektronik yang tidak terpakai."],
      "Sampah Sisa Konstruksi": ["Material seperti kayu dan beton."],
    },
  },
  {
    question: "Apa itu pengolahan sampah?",
    answer:
      "Pengolahan sampah meliputi pengumpulan, pemilahan, dan daur ulang untuk mengurangi dampak negatifnya terhadap lingkungan. Proses ini penting agar sampah yang bisa didaur ulang tidak menjadi limbah yang mencemari lingkungan.",
  },
  {
    question: "Bagaimana cara menggunakan Resikel?",
    answer:
      "Kamu bisa mengunjungi situs web Resikel dan membuat akun untuk mendapatkan akses penuh. Di sana, kamu akan menemukan panduan tentang cara mengelola sampah dan lokasi tempat pembuangan sampah terdekat.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="text-center py-20 px-8 lg:px-24">
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
