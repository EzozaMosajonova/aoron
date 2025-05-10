import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';

function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [positionEn, setPositionEn] = useState('');
  const [positionRu, setPositionRu] = useState('');
  const [positionDe, setPositionDe] = useState('');
  const [images, setImages] = useState();
  const [showModal, setShowModal] = useState(false);
  const [clickData, setClickData] = useState(null);
  const imgUrl = 'https://testaoron.limsa.uz';
  const token = localStorage.getItem('accesstoken');

  useEffect(() => {
    if (!token) {
      toast.error('Token topilmadi. Iltimos, qayta login qiling.');
      return;
    }
    getTeam();
  }, [token]);

  const getTeam = () => {
    setLoading(true);
    fetch('https://testaoron.limsa.uz/api/team-section')
      .then((res) => res.json())
      .then((item) => {
        setTeam(item?.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Team ro‘yxatini olishda xatolik.');
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setName('');
    setPositionEn('');
    setPositionRu('');
    setPositionDe('');
    setImages();
    setClickData(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = clickData
      ? `https://testaoron.limsa.uz/api/team-section/${clickData.id}`
      : 'https://testaoron.limsa.uz/api/team-section';
    const method = clickData ? 'PATCH' : 'POST';

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
       'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: name,
        position_en: positionEn,
        position_ru: positionRu,
        position_de: positionDe,
        image: imgUrl
      })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          console.log(imgUrl)
          toast.success(
            clickData ? 'Team muvaffaqiyatli tahrirlandi' : 'Team muvaffaqiyatli yaratildi'
          );
          getTeam();
          closeModal();
        } else {
          console.log(imgUrl)
          toast.error(res?.message?.message || 'Xatolik yuz berdi');
        }
      })
      .catch(() => {
        toast.error(clickData ? 'Tahrirlashda xatolik' : 'Yaratishda xatolik');
      });
  };

  const deleteTeam = (id) => {
    fetch(`https://testaoron.limsa.uz/api/team-section/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toast.success('Team muvaffaqiyatli o‘chirildi');
          getTeam();
        } else {
          toast.error(res?.message || 'O‘chirishda xatolik');
        }
      })
      .catch(() => {
        toast.error('O‘chirishda xatolik yuz berdi');
      });
  };

  const openModal = (data = null) => {
    setShowModal(true);
    if (data) {
      setClickData(data);
      setName(data.full_name);
      setPositionEn(data.position_en);
      setPositionRu(data.position_ru);
      setPositionDe(data.position_de);
    } else {
      setClickData(null);
      setName('');
      setPositionEn('');
      setPositionRu('');
      setPositionDe('');
    }
    setImages(undefined);
  };

  return (
    <div className='p-5'>
      {loading ? (
        <div className='flex items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-[#000957]'></div>
          <span className='ml-3 text-xl text-gray-700'>Yuklanmoqda...</span>
        </div>
      ) : (
        <div className='w-full'>
          <div className='mb-8 flex items-center justify-between'>
            <h1 className='text-[#000957] font-medium text-xl'>Team Lists</h1>
            <button
              className='flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg'
              onClick={() => openModal()}
            >
              <IoMdAdd className='text-white mr-2' />
              Add
            </button>
          </div>
          <hr className='bg-gray-100 h-0.5 mb-8' />
          <table className='w-full border-collapse table-auto bg-white shadow-md rounded-lg'>
            <thead className='bg-[#000957] text-white'>
              <tr>
                <th className='p-3 text-left'>№</th>
                <th className='p-3 text-left'>Image</th>
                <th className='p-3 text-left'>Full Name</th>
                <th className='p-3 text-left'>Position (EN)</th>
                <th className='p-3 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.length > 0 ? (
                team.map((item, index) => (
                  <tr key={item.id} className='border-b hover:bg-gray-50'>
                    <td className='p-3'>{index + 1}</td>
                    <td className='p-3'>
                      <img
                          src={`${imgUrl}/${item.image}`}
                        alt={item.full_name}
                        className='w-16 h-16 rounded-full mx-auto object-cover'
                      />
                    </td>
                    <td className='p-3'>{item.full_name}</td>
                    <td className='p-3'>{item.position_en}</td>
                    <td className='p-3 text-center'>
                      <div className='flex justify-center space-x-4'>
                        <button onClick={() => openModal(item)}>
                          <BorderColorIcon className='text-[#000957]' />
                        </button>
                        <button onClick={() => deleteTeam(item.id)}>
                          <RiDeleteBin6Line className='text-[#000957]' size={22} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='5' className='text-center p-5 text-gray-500'>
                    Ma'lumot yo‘q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-sm z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-semibold mb-4'>
              {clickData ? 'Edit Team' : 'Add Team'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                required
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-2 mb-3 border rounded-lg'
              />
              <input
                type='text'
                required
                placeholder='Position (EN)'
                value={positionEn}
                onChange={(e) => setPositionEn(e.target.value)}
                className='w-full px-4 py-2 mb-3 border rounded-lg'
              />
              <input
                type='text'
                required
                placeholder='Position (RU)'
                value={positionRu}
                onChange={(e) => setPositionRu(e.target.value)}
                className='w-full px-4 py-2 mb-3 border rounded-lg'
              />
              <input
                type='text'
                required
                placeholder='Position (DE)'
                value={positionDe}
                onChange={(e) => setPositionDe(e.target.value)}
                className='w-full px-4 py-2 mb-3 border rounded-lg'
              />
              <input
                type='file'
                onChange={(e) => setImages(e.target.files[0])}
                className='w-full mb-4'
              />
              <div className='flex justify-end space-x-3'>
                <button
                  type='submit'
                  className='bg-[#000957] text-white px-5 py-2 rounded-lg'
                >
                  {clickData ? 'Edit' : 'Add'}
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='bg-gray-300 text-black px-5 py-2 rounded-lg'
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
