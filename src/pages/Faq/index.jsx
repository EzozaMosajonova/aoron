import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Faq() {
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionEn, setQuestionEn] = useState('');
  const [questionRu, setQuestionRu] = useState('');
  const [questionDe, setQuestionDe] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const [answerRu, setAnswerRu] = useState('');
  const [answerDe, setAnswerDe] = useState('');
  const [showModal, setShowModal] = useState(false); // Modalni ochish uchun state


  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  //  faq olish
  const getFaq = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/faq")
      .then((res) => res.json())
      .then((item) => {
        setFaq(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getFaq();
  }, []);

  // Modalni ochish
  const openModal = () => {
    setShowModal(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setShowModal(false);
    setQuestionEn('');
    setQuestionRu('');
    setQuestionDe('');
    setAnswerEn('');
    setAnswerRu('');
    setAnswerDe('');
  };

 // Yangi kategoriya qo‘shish
  const AddFaq = (event) => {
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/faq", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        question_en: questionEn,
        question_ru: questionRu,
        question_de: questionDe,
        answer_en: answerEn,
        answer_ru: answerRu,
        answer_de: answerDe
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          toast.success("Faq created successfully")
          closeModal(true)
          getFaq()
        } else {
           toast.error(item?.message?.message)
        }
      })

  }



  // delete
  const deleteFaq = (id) => {
    fetch(`https://back.ifly.com.uz/api/faq/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.data?.message)
          getFaq()
        } else {
          toast.error(res?.message)
        }
      }
      )
  }
  return (
    <div className='p-5'>
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#000957]"></div>
          <span className="ml-3 text-xl text-gray-700">Yuklanmoqda...</span>
        </div>
      ) : (
        <div className='w-full'>
          <div className="mb-8 flex items-center justify-between">
            <h1 className='text-[#000957] font-medium text-xl'>Faq Lists</h1>
            <button
              className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
              onClick={openModal}
            >
              <IoMdAdd className='text-white mr-2' />
              Add
            </button>
          </div>
          <hr className='bg-gray-100 h-0.5 mb-8' />
          <table className="w-full border-collapse table-auto bg-white shadow-md rounded-lg">
            <thead className="bg-[#000957] text-white">
              <tr>
                <th className="border border-gray-300 p-3 text-left">№</th>
                <th className="border border-gray-300 p-3 text-left">Question (EN)</th>
                <th className="border border-gray-300 p-3 text-left">Answer  (EN)</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {faq.length > 0 ? (
                faq.map((faq, index) => (
                  <tr key={faq.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">{faq.question_en}</td>
                    <td className="border border-gray-300 p-3">{faq.answer_en}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className='flex items-center justify-evenly'>
                        <button className="text-[#000957] hover:text-[#000957]">
                          <BorderColorIcon size={24} />
                        </button>
                        <button
                          className="text-[#000957] hover:text-[#000957] cursor-pointer"
                          onClick={() => deleteFaq(faq?.id)}
                        >
                          <RiDeleteBin6Line size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-gray-500">
                    Ma'lumot yo'q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center mt-10 bg-opacity-20 backdrop-blur-sm z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-82">
            <h2 className="text-xl font-semibold mb-2 text-center">Add Faq</h2>

            <form onSubmit={AddFaq}>
              {/* Title EN */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Question (En)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setQuestionEn(e.target.value)}
                  value={questionEn}
                />
              </div>
               {/* Description EN */}
               <div className="mb-2">
                <textarea
                  placeholder="Answer (En)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAnswerEn(e.target.value)}
                  value={answerEn}
                />
              </div>

              {/* Title RU */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Question (Ru)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setQuestionRu(e.target.value)}
                  value={questionRu}
                />
              </div>
              
              {/* Description RU */}
              <div className="mb-2">
                <textarea
                  placeholder="Answer (Ru)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAnswerRu(e.target.value)}
                  value={answerRu}
                />
              </div>

              {/* Title DE */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Question (De)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setQuestionDe(e.target.value)}
                  value={questionDe}
                />
              </div>


              {/* Description DE */}
              <div className="mb-2">
                <textarea
                  placeholder="Answer (De)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAnswerDe(e.target.value)}
                  value={answerDe}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#000957] text-white px-4 py-2 rounded-lg hover:bg-[#001973] transition"
                >
                  {loading ? "Saving..." : "Add"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Faq;
