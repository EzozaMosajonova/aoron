import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [positionEn, setPositionEn] = useState('');
  const [positionRu, setPositionRu] = useState('');
  const [positionDe, setPositionDe] = useState('');
  const [images, setImages] = useState();
  const [showModal, setShowModal] = useState(false);
  const [clickData, setclickData] = useState("")
  const imgUrl = "https://back.ifly.com.uz/image";


  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  // Kategoriyalarni olish
  const getTeam = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/team-section")
      .then((res) => res.json())
      .then((item) => {
        setTeam(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getTeam();
  }, []);


  // Modalni yopish
  const closeModal = () => {
    setShowModal(false);
    setName('');
    setPositionEn('');
    setPositionRu('');
    setPositionDe('');
  };

  // Yangi kategoriya qo‘shish
  const AddTeam = (event) => {
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/team-section", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        image: images.toString(),
        full_name: name,
        position_en: positionEn,
        position_ru: positionRu,
        position_de: positionDe
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          toast.success("Team created successfully")
          closeModal(true)
          getTeam()
        } else {
          toast.error(item?.message?.message)
        }
      })

  }


  // delete
  const deleteTeam = (id) => {
    fetch(`https://back.ifly.com.uz/api/team-section/${id}`, {
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
          getTeam()
        } else {
          toast.error(res?.message)
        }
      }
      )
  }
  // modal
  const editTeam = (e) => {
    e.preventDefault()
    fetch(`https://back.ifly.com.uz/api/team-section/${clickData?.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        image: images.toString(),
        full_name: name,
        position_en: positionEn,
        position_ru: positionRu,
        position_de: positionDe
      })
    }).then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(" Team edit succesffuly")
          getTeam();
          setclickData("")
          setShowModal(false)
        }
        else {
          toast.error(" Team edit failed")
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
            <h1 className='text-[#000957] font-medium text-xl'>Team Lists</h1>
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
                <th className="border border-gray-300 p-3 text-left">Images</th>
                <th className="border border-gray-300 p-3 text-left">Full Name</th>
                <th className="border border-gray-300 p-3 text-left">Position</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {team.length > 0 ? (
                team.map((team, index) => (
                  <tr key={team.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">
                      <img
                        src={`${imgUrl}/${team.image}`}
                        alt={team.full_name}
                        className="w-16 rounded-[50%] h-16 mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 p-3">{team.full_name}</td>
                    <td className="border border-gray-300 p-3">{team.position_en}</td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className='flex items-center justify-evenly'>
                        <button className="text-[#000957] hover:text-[#000957]">
                          <BorderColorIcon size={24} onClick={() => {
                            setShowModal(!showModal)
                            setclickData(team);
                          }} />
                        </button>
                        <button className="text-[#000957] hover:text-[#000957] cursor-pointer" onClick={() => deleteTeam(team?.id)}>
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
            <h2 className="text-xl font-semibold mb-4">{clickData?.id > 0 ? "Edit Team " : "Add Team"}</h2>
            <form onSubmit={clickData?.id > 0 ? editTeam : AddTeam}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={clickData?.id > 0 ? clickData?.full_name : ""}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Positin (EN):</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setPositionEn(e.target.value)}
                  defaultValue={clickData?.id > 0 ? clickData?.position_en : ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Position (RU):</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setPositionRu(e.target.value)}
                  defaultValue={clickData?.id > 0 ? clickData?.position_ru : ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Position (DE):</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setPositionDe(e.target.value)}
                  defaultValue={clickData?.id > 0 ? clickData?.position_de : ""}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Image:</label>
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setImages(e.target.files[0])}
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={loading}
                  className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                >
                  {clickData?.id > 0 ? "Edit" : "Add"}
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

export default Team;
