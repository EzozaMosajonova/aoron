import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Sizes() {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sizesValue, setSizesValue] = useState('');
  const [showModal, setShowModal] = useState(false);
    const[clickData , setclickData]=useState("")
  

  const token = localStorage.getItem('accesstoken');

  const getSizes = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/sizes")
      .then((res) => res.json())
      .then((item) => {
        setSizes(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getSizes();
  }, []);


  const closeModal = () => {
    setShowModal(false);
    setSizesValue('');
  };

  const AddSizes = (event) => {
    event.preventDefault();
    fetch("https://back.ifly.com.uz/api/sizes", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        size: sizesValue,
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item.success) {
          toast.success("Sizes created successfully");
          closeModal();
          getSizes();
        } else {
          toast.error(item?.message?.message || "Error occurred");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const deleteSizes = (id) => {
    fetch(`https://back.ifly.com.uz/api/sizes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toast.success("Delete sizes successfully");
          getSizes();
        } else {
          toast.error(res?.message?.message);
        }
      })
      .catch(() => {
        toast.error("Delete error");
      });
  };

  // modal
    const editSizes = (e) =>{
      e.preventDefault()
      fetch(`https://back.ifly.com.uz/api/sizes/${clickData?.id}`,{
        method:"PATCH" ,
        headers:{
          "Content-type":"application/json",
          "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify({
          size: sizesValue,
        })
      }).then((res)=>res.json())
      .then((elem)=>{
        if (elem?.success) {
          toast.success(" Sizes edit succesffuly")
          getSizes();
          setclickData("")
          setShowModal(false)
        }
        else{
          toast.error(" Sizes edit failed")
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
            <h1 className='text-[#000957] font-medium text-xl'>Sizes Lists</h1>
            <button
              className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
              onClick={()=>{
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
                <th className="border border-gray-300 p-3 text-left">Sizes</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sizes.length > 0 ? (
              sizes.map((sizes, index) => (
                <tr key={sizes.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">{sizes.size}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    <div className='flex items-center justify-evenly'>
                      <button className="text-[#000957] hover:text-[#000957]">
                        <BorderColorIcon size={24} 
                           onClick={()=>{
                            setShowModal(!showModal)
                            setclickData(sizes);
                          }} />
                      </button>
                      <button className="text-[#000957] hover:text-[#000957] cursor-pointer" onClick={() => deleteSizes(sizes?.id)}>
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
            <h2 className="text-xl font-semibold mb-4">{clickData?.id>0 ? "Edit Sizes ": "Add Sizes"}</h2>
            <form onSubmit={clickData?.id>0 ? editSizes : AddSizes}>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Sizes"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setSizesValue(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.size : ""}
                />
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
                  type="button"
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

export default Sizes;
