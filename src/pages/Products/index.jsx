import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  // Kategoriyalarni olish
  const getProducts = () => {
    setLoading(true);
    fetch("https://back.ifly.com.uz/api/product")
      .then((res) => res.json())
      .then((item) => {
        console.log(item);

        setProducts(item?.data?.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    getProducts();
  }, []);


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
            <h1 className='text-[#000957] font-medium text-xl'>Products Lists</h1>
            <button
              className="flex items-center bg-[#000957] text-white px-5 py-2 rounded-lg"
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
                <th className="border border-gray-300 p-3 text-left">Price</th>
                <th className="border border-gray-300 p-3 text-left">Category</th>
                <th className="border border-gray-300 p-3 text-left">Colors</th>
                <th className="border border-gray-300 p-3 text-left">Sizes</th>
                <th className="border border-gray-300 p-3 text-left">Discount</th>
                <th className="border border-gray-300 p-3 text-left">Materials</th>
                <th className="border border-gray-300 p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 p-3">{index + 1}</td>
                    <td className="border border-gray-300 p-3">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.title_en}
                          className="w-16 h-16 rounded object-cover"
                        />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td className="border border-gray-300 p-3">{product.title_en}</td>
                    <td className="border border-gray-300 p-3">{product.description_en}</td>
                    <td className="border border-gray-300 p-3">{product.price}</td>
                    <td className="border border-gray-300 p-3">{product.category_id}</td>
                    <td className="border border-gray-300 p-3">{product.colors_id}</td>
                    <td className="border border-gray-300 p-3">{product.sizes_id}</td>
                    <td className="border border-gray-300 p-3">{product.discount_id}</td>
                    <td className="border border-gray-300 p-3">
                      {product.materials ? (
                        Object.entries(product.materials).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))
                      ) : (
                        'No materials'
                      )}
                    </td>
                    <td className="border border-gray-300 p-3 text-center">
                      <div className="flex items-center justify-evenly">
                        <button className="text-[#000957] hover:text-[#000957]">
                          <BorderColorIcon size={24} />
                        </button>
                        <button className="text-[#000957] hover:text-[#000957] cursor-pointer">
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
      {/* {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add products</h2>

            <form onSubmit={AddCategory}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category Name (EN):</label>
                <input
                  placeholder='English Name'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setNameEn(e.target.value)}
                  value={nameEn}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category Name (RU):</label>
                <input
                  placeholder='Russian Name'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setNameRu(e.target.value)}
                  value={nameRu}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category Name (DE):</label>
                <input
                  placeholder='German Name'
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setNameDe(e.target.value)}
                  value={nameDe}
                />
              </div>

              <div className="flex justify-end">
                <button
                  disabled={loading}
                  className="bg-[#000957] text-white px-5 py-2 rounded-lg"
                >
                  {loading ? "Saved..." : "Add"}
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
      )} */}
      <ToastContainer />
    </div>
  );
}

export default Products;
