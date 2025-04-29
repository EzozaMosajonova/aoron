import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleEn, setTitleEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionDe, setDescriptionDe] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [titleDe, setTitleDe] = useState('');
  const [images, setImages] = useState();
  const [showModal, setShowModal] = useState(false); // Modalni ochish uchun state


  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  //  News olish
  const getNews = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/news")
      .then((res) => res.json())
      .then((item) => {
        setNews(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getNews();
  }, []);

  // Modalni ochish
  const openModal = () => {
    setShowModal(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setShowModal(false);
    setTitleEn('');
    setTitleRu('');
    setTitleDe('');
    setDescriptionEn('');
    setDescriptionRu('');
    setDescriptionDe('');
  };

  // Yangi kategoriya qo‘shish
  const AddNews = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", images); // Fayl obyekt (File)
    formData.append("title_en", titleEn);
    formData.append("title_ru", titleRu);
    formData.append("title_de", titleDe);
    formData.append("description_en", descriptionEn);
    formData.append("description_ru", descriptionRu);
    formData.append("description_de", descriptionDe);

    fetch("https://back.ifly.com.uz/api/news", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
        // ❗️ Content-Type yozilmaydi! Browser o'zi qo'yadi `multipart/form-data`
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((item) => {
        if (item?.success) {
          toast.success("News created successfully");
          closeModal(true);
          getNews();
        } else {
          toast.error(item?.message?.message || "Xatolik yuz berdi");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        toast.error("Tarmoqda xatolik yuz berdi");
      });
  };



  // delete
  const deleteNews = (id) => {
    fetch(`https://back.ifly.com.uz/api/news/${id}`, {
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
          getNews()
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
            <h1 className='text-[#000957] font-medium text-xl'>News Lists</h1>
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
                <th className="border border-gray-300 p-3 text-left">Images</th>
                <th className="border border-gray-300 p-3 text-left">Title</th>
                <th className="border border-gray-300 p-3 text-left">Description</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 ? (
                news.map((news, index) => (
                  <tr key={news.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">
                      <img
                        src={news.image}
                        alt={news.title_en}
                        className="w-16 rounded-[50%] h-16 mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">{news.title_en}</td>
                    <td className="border border-gray-300 p-3">{news.description_en}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className='flex items-center justify-evenly'>
                        <button className="text-[#000957] hover:text-[#000957]">
                          <BorderColorIcon size={24} />
                        </button>
                        <button
                          className="text-[#000957] hover:text-[#000957] cursor-pointer"
                          onClick={() => deleteNews(news?.id)}
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
            <h2 className="text-xl font-semibold mb-2 text-center">Add News</h2>

            <form onSubmit={AddNews}>
              {/* Title EN */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title (En)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setTitleEn(e.target.value)}
                  value={titleEn}
                />
              </div>

              {/* Title RU */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title (Ru)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setTitleRu(e.target.value)}
                  value={titleRu}
                />
              </div>

              {/* Title DE */}
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Title (De)"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setTitleDe(e.target.value)}
                  value={titleDe}
                />
              </div>

              {/* Description EN */}
              <div className="mb-2">
                <textarea
                  placeholder="Description (En)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  value={descriptionEn}
                />
              </div>

              {/* Description RU */}
              <div className="mb-2">
                <textarea
                  placeholder="Description (Ru)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setDescriptionRu(e.target.value)}
                  value={descriptionRu}
                />
              </div>

              {/* Description DE */}
              <div className="mb-2">
                <textarea
                  placeholder="Description (De)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setDescriptionDe(e.target.value)}
                  value={descriptionDe}
                />
              </div>

              {/* Upload Image */}
              <div className="mb-2">
                <label className="block text-gray-700 mb-2 text-sm">Upload Image:</label>
                <input
                  type="file"
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg"
                  onChange={(e) => setImages(e.target.files[0])}
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

export default News;
