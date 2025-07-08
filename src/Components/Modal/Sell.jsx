import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { UserAuth } from '../Context/Auth'
import { addDoc, collection } from 'firebase/firestore'
import { fetchFromFireStore, fireStore } from '../Firebase/Firebase'
import Input from '../Input/Input'
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'
import { ItemsContext } from '../Context/Item';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';


const Sell = () => {
    const navigate = useNavigate()
    const itemCtx = ItemsContext();
    const setItems =itemCtx?.setItems
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState(null)

  const auth = UserAuth()

  const handleImageUpload = (event) => {
    if (event.target.files) setImage(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!auth?.user) {
      Swal.fire('Login Required', 'Please login to continue', 'warning')
      return
    }

    setSubmitting(true)

    const readImageAsDataUrl = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const imageUrl = reader.result
          localStorage.setItem(`image_${file.name}`, imageUrl)
          resolve(imageUrl)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    }

    let imageUrl = ''
    if (image) {
      try {
        imageUrl = await readImageAsDataUrl(image)
      } catch (error) {
        console.log(error)
        Swal.fire('Error', 'Failed to read image', 'error')
        return
      }
    }

    const trimmedTitle = title.trim()
    const trimmedCategory = category.trim()
    const trimmedPrice = price.toString().trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription) {
      Swal.fire('Missing Fields', 'All fields are required', 'info')
      setSubmitting(false)
      return
    }

    try {
      await addDoc(collection(fireStore, 'Products'), {
        title,
        category,
        price,
        description,
        imageUrl,
        userId: auth.user.uid,
        userName: auth.user.displayName || 'Anonymous',
        createAt: new Date().toDateString()
      })

      setImage(null)
      setTitle('')
      setCategory('')
      setPrice('')
      setDescription('')

      const datas = await fetchFromFireStore()
      setItems(datas)

      Swal.fire('Success', 'Item added successfully!', 'success')
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Failed to add item to Firestore', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <div className="relative flex items-center justify-center mb-6 py-2 border-b">
      
      <div className="absolute left-0 pl-4">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          className="text-black text-lg cursor-pointer"
        />
      </div>
      <h2 className="text-2xl font-bold">Post your Ad</h2>
    </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <Input setInput={setTitle} placeholder="Title" />
        <Input setInput={setCategory} placeholder="Category" />
        <Input setInput={setPrice} placeholder="Price" />
        <Input setInput={setDescription} placeholder="Description" />

        <div className="pt-2 w-full relative mb-4">
          {image ? (
            <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black rounded-md overflow-hidden">
              <img className="object-contain" src={URL.createObjectURL(image)} alt="preview" />
            </div>
          ) : (
            <div className="relative h-40 sm:h-60 w-full border-2 border-black rounded-md">
              <input
                onChange={handleImageUpload}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <img className="w-12" src={fileUpload} alt="upload" />
                <p className="text-sm pt-2">Click to upload images</p>
                <p className="text-sm pt-1 text-gray-600">SVG, PNG, JPG</p>
              </div>
            </div>
          )}
        </div>

        {submitting ? (
          <div className="w-full flex justify-center pt-4 pb-2">
            <img className="w-32 object-cover" src={loading} alt="loading" />
          </div>
        ) : (
          <button
            type="submit"
            className="w-full p-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#002f34' }}
          >
            Sell Item
          </button>
        )}
      </form>
    </div>
  )
}

export default Sell
