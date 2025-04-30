import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Discount() {
  const [discount, setDiscount] = useState([]);
  const [loading, setLoading] = useState(true);
  const[clickData , setclickData]=useState("")
  const [discountValue, setDiscountValue] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [finishedAt, setFinishedAt] = useState('');
  const [status, setStatus] = useState(false);
  const imgUrl = "https://back.ifly.com.uz/api/images";

  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('accesstoken');

  const getDiscount = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/discount")
      .then((res) => res.json())
      .then((item) => {
        setDiscount(item?.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getDiscount();
  }, []);



  const closeModal = () => {
    setShowModal(false);
    setDiscountValue('');
    setStartedAt('');
    setFinishedAt('');
    setStatus(false);
  };

  const AddDiscount = (event) => {
    event.preventDefault();
    fetch("https://back.ifly.com.uz/api/discount", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        discount: Number(discountValue),
        started_at: startedAt,
        finished_at: finishedAt,
        status: status
      })
    })
      .then((res) => res.json())
      .then((item) => {
        if (item.success) {
          toast.success("Discount created successfully");
          closeModal();
          getDiscount();
        } else {
          toast.error(item?.message?.message || "Error occurred");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  const deleteDiscount = (id) => {
    fetch(`https://back.ifly.com.uz/api/discount/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success) {
          toast.success(res?.data?.message);
          getDiscount();
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("Delete error");
      });
  };
  // modal
  const editDiscount = (e) =>{
    e.preventDefault()
    fetch(`https://back.ifly.com.uz/api/discount/${clickData?.id}`,{
      method:"PATCH" ,
      headers:{
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({
        discount: Number(discountValue),
        started_at: startedAt,
        finished_at: finishedAt,
        status: status
      })
    }).then((res)=>res.json())
    .then((elem)=>{
      if (elem?.success) {
        toast.success(" Discount edit succesffuly")
        getDiscount();
        setclickData("")
        setShowModal(false)
      }
      else{
        toast.error(" Discount edit failed")
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
            <h1 className='text-[#000957] font-medium text-xl'>Discount Lists</h1>
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
                <th className="border border-gray-300 p-3 text-left">Discount (%)</th>
                <th className="border border-gray-300 p-3 text-left">Started Date</th>
                <th className="border border-gray-300 p-3 text-left">Finished Date</th>
                <th className="border border-gray-300 p-3 text-left">Status</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {discount.length > 0 ? (
              discount.map((discount, index) => (
                <tr key={discount.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="border border-gray-300 p-3">{index + 1}</td>
                  <td className="border border-gray-300 p-3">{discount.discount}</td>
                  <td className="border border-gray-300 p-3">{discount.started_at}</td>
                  <td className="border border-gray-300 p-3">{discount.finished_at}</td>
                  <td className="border border-gray-300 p-3">
                    <span className={!!discount.status ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {!!discount.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    <div className='flex items-center justify-evenly'>
                      <button className="text-[#000957] hover:text-[#000957]">
                        <BorderColorIcon size={24} 
                        onClick={()=>{
                          setShowModal(!showModal)
                          setclickData(discount);
                        }} />
                      </button>
                      <button className="text-[#000957] hover:text-[#000957] cursor-pointer" onClick={() => deleteDiscount(discount?.id)}>
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
            <h2 className="text-xl font-semibold mb-4">{clickData?.id>0 ? "Edit Discount ": "Add Discount"}</h2>
            <form onSubmit={clickData?.id>0 ? editDiscount : AddDiscount}>
              <div className="mb-4">
                <input
                  type="number"
                  placeholder="Discount"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setDiscountValue(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.discount : ""}
                />
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setStartedAt(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.startedAt : ""}
                />
              </div>

              <div className="mb-4">
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setFinishedAt(e.target.value)}
                  defaultValue={clickData?.id>0 ? clickData?.finishedAt : ""}
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  defaultValue={clickData?.id>0 ? clickData?.status : ""}
                />
                <label className="text-gray-700 font-medium">Active</label>
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

export default Discount;
