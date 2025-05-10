import React, { useEffect, useState } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast, ToastContainer } from 'react-toastify';
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";


function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [titleEn, setTitleEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionDe, setDescriptionDe] = useState('');
  const [minSell, setMinSell] = useState(0); // boshlang‘ich qiymat
  const [titleRu, setTitleRu] = useState('');
  const [titleDe, setTitleDe] = useState('');
  const [sizes, setSizes] = useState([]);
  const [size, setSize] = useState([]);
  const [colors, setColors] = useState([])
  const [color, setColor] = useState([])
  const [clickData, setclickData] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [discount, setDiscount] = useState([]);
  const [price, setPrice] = useState([]);
  const [discountId, setDiscountId] = useState('');
  const [materials, setMaterials] = useState([{ name: '', value: '' }]);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);




  const imgUrl = "https://testaoron.limsa.uz"

  // Tokenni olish
  const token = localStorage.getItem('accesstoken');

  const handleMaterialChange = (index, field, value) => {
    const updatedMaterials = [...materials];
    updatedMaterials[index][field] = value;
    setMaterials(updatedMaterials);
  };

  const addMaterial = () => {
    setMaterials([...materials, { name: '', value: '' }]);
  };

  const removeMaterial = (index) => {
    const updatedMaterials = materials.filter((_, i) => i !== index);
    setMaterials(updatedMaterials);
  };


  // Kategoriyalarni olish
  const getProducts = () => {
    setLoading(true);
    fetch("https://testaoron.limsa.uz/api/product")
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
    getCategories();
    getSizes();
    getColors();
    getDiscount();
  }, []);
  const getCategories = () => {
    fetch("https://testaoron.limsa.uz/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data?.data || []);
      })
      .catch((err) => {
        console.error("Discount fetch error:", err);
      });
  };
  const getDiscount = () => {
    fetch("https://testaoron.limsa.uz/api/discount")
      .then((res) => res.json())
      .then((data) => {
        setDiscount(data?.data || []);
      })
      .catch((err) => {
        console.error("Discount fetch error:", err);
      });
  };
  const getSizes = () => {
    fetch("https://testaoron.limsa.uz/api/sizes")
      .then((res) => res.json())
      .then((data) => {
        setSizes(data?.data || []);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
  };
  const getColors = () => {
    fetch("https://testaoron.limsa.uz/api/colors")
      .then((res) => res.json())
      .then((data) => {
        setColors(data?.data || []);
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
      });
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
  const AddProducts = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
  
    // Matnli maydonlar
    formData.append('title_en', titleEn.trim());
    formData.append('title_ru', titleRu.trim());
    formData.append('title_de', titleDe.trim());
    formData.append('description_en', descriptionEn.trim());
    formData.append('description_ru', descriptionRu.trim());
    formData.append('description_de', descriptionDe.trim());
    formData.append('price', price);
    formData.append('category_id', categoryId);
    formData.append('min_sell', minSell);
   formData.append('sizes_id', size);
    formData.append('colors_id', color);
    // Obyektlarni JSON qilib qo‘shish
    formData.append('materials', JSON.stringify(materials));
  
    if (discountId) {
      formData.append('discount_id', JSON.stringify(discountId)); // object bo‘lsa
    }
  
    // Fayllar (array sifatida)
    if (file && file.length > 0) {
      Array.from(file).forEach(file => {
        formData.append('files', file); // bir nechta faylni `files` sifatida qo‘shiladi
      });
    }
  
    // API chaqiruvi
    fetch("https://testaoron.limsa.uz/api/product", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        toast.success("Mahsulot muvaffaqiyatli qo‘shildi!");
        closeModal();
        getProducts();
      } else {
        console.error("Xatolik:", data);
        toast.error("Xatolik yuz berdi: " + (data.message?.[0] || "Noma’lum xato"));
      }
    })
    .catch(error => {
      console.error("Tarmoq xatosi:", error);
      toast.error("Tarmoq xatosi");
    });
  };
  
  
  



  // delete
  const deleteProducts = (id) => {
    fetch(`https://testaoron.limsa.uz/api/product/${id}`, {
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
          getProducts()
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
            <h1 className='text-[#000957] font-medium text-xl'>Products Lists</h1>
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
                          src={`${imgUrl}/${product.images}`}
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
                    <td className="border border-gray-300 p-3">{product.category?.name_en}</td>
                    <td className="border border-gray-300 p-3">{product.colors[0]?.color_en}</td>
                    <td className="border border-gray-300 p-3">{product.sizes[0]?.size}</td>
                    <td className="border border-gray-300 p-3">{product.discount?.discount}</td>
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
                        <button className="text-[#000957] hover:text-[#000957] cursor-pointer"
                          onClick={() => deleteProducts(product?.id)}>
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white w-full max-w-2xl max-h-[70vh] p-6 rounded-xl shadow-lg overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3 text-center">
              {clickData?.id > 0 ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={clickData?.id > 0 ? editProducts : AddProducts} className="space-y-3">
              {/* Title EN */}
              <label className="text-gray-700">Product Title (EN):</label>
              <input
                type="text"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setTitleEn(e.target.value)}
                defaultValue={clickData?.title_en || ""}
              />

              {/* Title RU */}
              <label className="text-gray-700">Product Title (RU):</label>
              <input
                type="text"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setTitleRu(e.target.value)}
                defaultValue={clickData?.title_ru || ""}
              />

              {/* Title DE */}
              <label className="text-gray-700">Product Title (DE):</label>
              <input
                type="text"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setTitleDe(e.target.value)}
                defaultValue={clickData?.title_de || ""}
              />

              {/* Description EN */}
              <label className="text-gray-700">Product Description (EN):</label>
              <textarea
                rows="2"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setDescriptionEn(e.target.value)}
                defaultValue={clickData?.description_en || ""}
              />

              {/* Description RU */}
              <label className="text-gray-700">Product Description (RU):</label>
              <textarea
                rows="2"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setDescriptionRu(e.target.value)}
                defaultValue={clickData?.description_ru || ""}
              />

              {/* Description DE */}
              <label className="text-gray-700">Product Description (DE):</label>
              <textarea
                rows="2"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setDescriptionDe(e.target.value)}
                defaultValue={clickData?.description_de || ""}
              />

              {/* Price */}
              <label className="text-gray-700">Price</label>
              <input
                type="number"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={clickData?.price || ""}
              />

              {/* Minimal Sales */}
              <label className="text-gray-700">Minimal sales quantity</label>
              <input
                type="number"
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setMinimalSales(e.target.value)}
                defaultValue={clickData?.minimal_sales || ""}
              />

              {/* Category */}
              <select
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setCategoryId(e.target.value)}
                value={categoryId}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name_en}</option>
                ))}
              </select>

              {/* Sizes */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Sizes</label>
                <div className="grid grid-cols-2 gap-2">
                  {sizes.map((item) => (
                    <label key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={size.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSize([...size, item.id]);
                          } else {
                            setSize(size.filter((id) => id !== item.id));
                          }
                        }}
                        className="mr-2"
                      />
                      {item.size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Colors</label>
                <div className="grid grid-cols-2 gap-2">
                  {colors.map((item) => (
                    <label key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={color.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setColor([...color, item.id]);
                          } else {
                            setColor(color.filter((id) => id !== item.id));
                          }
                        }}
                        className="mr-2"
                      />
                      {item.color_en}
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <select
                required
                className="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                onChange={(e) => setDiscountId(e.target.value)}
                value={discountId}
              >
                <option value="">Select a discount</option>
                {discount.map((disc) => (
                  <option key={disc.id} value={disc.id}>{disc.discount}</option>
                ))}
              </select>

              {/* Materials */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Materials</label>
                {materials.map((material, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      placeholder="Material Name"
                      className="w-1/2 px-2 py-1 border border-gray-300 rounded mr-2"
                      value={material.name}
                      onChange={(e) => handleMaterialChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Material Value"
                      className="w-1/2 px-2 py-1 border border-gray-300 rounded mr-2"
                      value={material.value}
                      onChange={(e) => handleMaterialChange(index, 'value', e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeMaterial(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={addMaterial}
                >
                  Add Material
                </button>
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Upload Image</label>
                <input
                  type="file"
                  className="w-full px-3 py-1.5 border rounded-md text-sm"
                  onChange={(e) => setImages(e.target.files[0])}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm transition"
                >
                  {clickData?.id > 0 ? "Edit" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1.5 rounded-md text-sm transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div >
  );
}

export default Products;
