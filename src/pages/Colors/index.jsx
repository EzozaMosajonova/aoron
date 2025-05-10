import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Colors() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colorEn, setColorEn] = useState('');
  const [colorRu, setColorRu] = useState('');
  const [colorDe, setColorDe] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [clickData, setclickData] = useState("")

  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  // Kategoriyalarni olish
  const getColors = () => {
    setLoading(true);
    fetch("https://testaoron.limsa.uz/api/colors")
      .then((res) => res.json())
      .then((item) => {
        setColors(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getColors();
  }, []);

  // Modalni ochish
  const openModal = () => {
    setShowModal(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setShowModal(false);
    setColorEn('');
    setColorRu('');
    setColorDe('');
  };

  // Yangi kategoriya qo‘shish
  const AddColors = (event) => {
    event.preventDefault()
    fetch("https://testaoron.limsa.uz/api/colors", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          toast.success("Colors created successfully")
          closeModal(true)
          getColors()
        } else {
          toast.error(item?.message?.message)
        }
      })

  }


  // delete
  const deleteColors = (id) => {
    fetch(`https://testaoron.limsa.uz/api/colors/${id}`, {
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
          getColors()
        } else {
          toast.error(res?.message)
        }
      }
      )
  }
  // modal
  const editColor = (e) => {
    e.preventDefault()
    fetch(`https://testaoron.limsa.uz/api/colors/${clickData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        color_en: colorEn,
        color_ru: colorRu,
        color_de: colorDe
      })
    }).then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success("Colors edit succesffuly")
          getColors();
          setclickData("")
          setShowModal(false)
        }
        else {
          toast.error("Colors edit failed")
        }
      })
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
            <h1 className='text-[#000957] font-medium text-xl'>Colors Lists</h1>
            <button
              className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
              onClick={() => {
                setShowModal(!showModal)
              }}
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
                <th className="border border-gray-300 p-3 text-left">Color ENG</th>
                <th className="border border-gray-300 p-3 text-left">Color RU</th>
                <th className="border border-gray-300 p-3 text-left">Color DE</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {colors.length > 0 ? (
                colors.map((color, index) => (
                  <tr key={color.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">{color.color_en}</td>
                    <td className="border border-gray-300 p-3">{color.color_ru}</td>
                    <td className="border border-gray-300 p-3">{color.color_de}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className='flex items-center justify-evenly'>
                        <button className="text-[#000957] hover:text-[#000957]">
                          <BorderColorIcon size={24}
                            onClick={() => {
                              setShowModal(!showModal)
                              setclickData(color);
                            }} />
                        </button>
                        <button className="text-[#000957] hover:text-[#000957] cursor-pointer" onClick={() => deleteColors(color?.id)}>
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
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{clickData?.id > 0 ? "Edit Colors " : "Add Colors"}</h2>
            <form onSubmit={clickData?.id > 0 ? editColor : AddColors}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Color (EN):</label>
                <input
                  placeholder='Color in English'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setColorEn(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.color_en : ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Color  (RU):</label>
                <input
                  placeholder='Color in English'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setColorRu(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.color_ru : ""}                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Color  (DE):</label>
                <input
                  placeholder='Farbe auf Deustch'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setColorDe(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.color_de : ""}                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={loading}
                  className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                >
                   {clickData?.id >0 ? "Edit" : "Add"}
                </button>
                <button
                  onClick={closeModal}
                  className="ml-3 bg-gray-300 text-black px-5 py-2 rounded-lg"
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

export default Colors;
