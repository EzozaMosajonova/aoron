import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Contact() {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [adressEn, setAdressEn] = useState('');
  const [adressRu, setAdressRu] = useState('');
  const [adressDe, setAdressDe] = useState('');
  const [showModal, setShowModal] = useState(false); // Modalni ochish uchun state

  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  // Kategoriyalarni olish
  const getContact = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/contact")
      .then((res) => res.json())
      .then((item) => {
        setContact(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getContact();
  }, []);

  // Modalni ochish
  const openModal = () => {
    setShowModal(true);
  };

  // Modalni yopish
  const closeModal = () => {
    setShowModal(false);
    setPhone('');
    setEmail('');
    setAdressEn('');
    setAdressRu('');
    setAdressDe('');
  };

  // Yangi kategoriya qo‘shish
  const AddContact = (event) => {
    event.preventDefault()
    fetch("https://back.ifly.com.uz/api/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        phone_number: phone,
        email:email,
        address_en: adressEn,
        address_ru: adressRu,
        address_de: adressDe
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item) {
          toast.success("Contact created successfully")
          closeModal(true)
          getContact()
        } else {
           toast.error(item?.message?.message)
        }
      })

  }


  // delete
  const deleteContact =(id)=>{
    fetch(`https://back.ifly.com.uz/api/contact/${id}` ,{
      method:"DELETE",
      headers:{
        "Content-type" :"application/json",
        "authorization":`Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if (res?.success) {
         toast.success(res?.data?.message)
         getContact()
      }else{
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
            <h1 className='text-[#000957] font-medium text-xl'>Contact Lists</h1>
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
                <th className="border border-gray-300 p-3 text-left">Phone Number</th>
                <th className="border border-gray-300 p-3 text-left">Email</th>
                <th className="border border-gray-300 p-3 text-left">Address (EN)	</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contact.length > 0 ? (
              contact.map((contact, index) => (
                <tr key={contact.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">{contact.phone_number}</td>
                  <td className="border border-gray-300 p-3">{contact.email}</td>
                  <td className="border border-gray-300 p-3">{contact.address_en}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <div className='flex items-center justify-evenly'>
                      <button className="text-[#000957] hover:text-[#000957]">
                        <BorderColorIcon size={24} />
                      </button>
                      <button className="text-[#000957] hover:text-[#000957] cursor-pointer" onClick={()=> deleteContact(contact?.id)}>
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
            <h2 className="text-xl font-semibold mb-2 text-center">Add Contact</h2>

            <form onSubmit={AddContact}>
              {/* Title EN */}
              <div className="mb-2">
                <input
                  type="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>

              {/* Title RU */}
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* adress EN */}
              <div className="mb-2">
                <textarea
                  placeholder="Adress (En)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAdressEn(e.target.value)}
                  value={adressEn}
                />
              </div>

              {/* adress RU */}
              <div className="mb-2">
                <textarea
                  placeholder="Adress (Ru)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAdressRu(e.target.value)}
                  value={adressRu}
                />
              </div>

              {/* adress DE */}
              <div className="mb-2">
                <textarea
                  placeholder="Adress (De)"
                  rows="3"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none resize-none"
                  onChange={(e) => setAdressDe(e.target.value)}
                  value={adressDe}
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

export default Contact;
