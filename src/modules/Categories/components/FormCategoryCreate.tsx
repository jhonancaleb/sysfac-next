/* eslint-disable react/jsx-closing-tag-location */
'use client'
import ROUTES from '@/app/routes'
import {
  Button, Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCategory } from '../hooks'

type FormData = {
  name: string,
  slug: string,
  image: FileList
}

function FormCategoryCreate () {
  const { push } = useRouter()
  const { addCategory } = useCategory()
  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmitForm = handleSubmit(() => setShowModal(true))
  const handleConfirm = async () => {
    const { name, slug } = watch()
    setIsLoading(true)
    const res = await addCategory({ name, slug })
    setIsLoading(false)
    if (res?.ok) push(ROUTES.categories)
    else toast.error(res?.message ?? '')
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <Input
          variant='underlined'
          label='Nombre'
          placeholder='Escriba el nombre de la categoría'
          color={errors.name ? 'danger' : 'default'}
          isInvalid={!!errors.name}
          errorMessage={!!errors.name && 'Campo requerido'}
          {...register('name', { required: true })}
        />
        <Input
          variant='underlined'
          label='Slug'
          placeholder='Ejm: laptop, pc, mouses,etc'
          color={errors.slug ? 'danger' : 'default'}
          isInvalid={!!errors.slug}
          errorMessage={!!errors.slug && 'Campo requerido'}
          {...register('slug', { required: true })}
        />
        <div className={`relative grid place-items-center w-full h-40 rounded-md border-2  ${errors.image ? 'border-danger' : 'border-default'}  border-dashed bg-default-50`}>
          <label
            onDrop={(e) => {
              e.preventDefault()
              const image = e.dataTransfer.files
              setValue('image', image)
              const imageURL = URL.createObjectURL(image[0])
              setImagePreviewUrl(imageURL)
            }}
            onDragOver={(e) => {
              e.preventDefault()
            }}
            className=' cursor-pointer absolute z-20 w-full h-full top-0 left-0'
          >
            <input
              className='hidden'
              type='file'
              accept='image/*'
              {...register('image', {
                required: true,
                onChange: (e:React.ChangeEvent<HTMLInputElement>) => {
                  const imageURL = URL.createObjectURL(e.target.files![0])
                  setImagePreviewUrl(imageURL)
                }
              })}
            />
          </label>
          {
            imagePreviewUrl
              ? <picture className='relative w-[min(100%,300px)] h-[90%]'>
                <img
                  className='absolute z-10 w-full h-full object-contain'
                  src={imagePreviewUrl}
                  alt='category'
                />
              </picture>
              : <p className='text-default'>Click o arrastre aquí la imagen</p>
            }
        </div>
        {!!errors.image && <small className='text-danger text-xs -mt-3'>Seleccione una imagen</small>}
        <Button className='w-full md:w-min' type='submit' color='primary'>Crear categoría</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Está seguro de crear esta categoría?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button isLoading={isLoading} color='primary' onPress={handleConfirm}>
                  Crear
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormCategoryCreate
