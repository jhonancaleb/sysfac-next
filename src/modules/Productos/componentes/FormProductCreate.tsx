/* eslint-disable react/jsx-closing-tag-location */
'use client'
import { useCategory } from '@/modules/Categories/hooks'
import { Category, ESaleFor, EStateProduct, ProductToDB } from '@/types'
import { AutocompleteItem, Autocomplete, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useProduct } from '../hooks'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'
import toast from 'react-hot-toast'

type FormData = {
  name: string,
  image: FileList,
  inventaryMin: string,
  priceSale: string,
  unit: string,
  saleFor: ESaleFor,
  isActive: string,
  categoryId: string
}

function FormProductCreate () {
  const { push } = useRouter()
  const { dataCategories: { categories, isLoading } } = useCategory()
  const { addProduct } = useProduct()
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState('')
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false)
  const [categorySelected, setCategorySelected] = React.useState<Category>({} as Category)

  const handleSubmitForm = handleSubmit(() => setShowModal(true))

  const handleConfirm = async () => {
    const { name, inventaryMin, priceSale, unit, saleFor, isActive } = watch()
    const data: ProductToDB = {
      name,
      categoryId: categorySelected.id,
      inventaryMin: parseInt(inventaryMin),
      priceSale: parseFloat(priceSale),
      unit,
      saleFor,
      isActive: isActive === EStateProduct.active
    }
    setIsLoadingDelete(true)
    const res = await addProduct(data)
    setIsLoadingDelete(false)
    if (res?.ok) push(ROUTES.products)
    else toast.error(res?.message ?? '')
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex gap-3 flex-col'>
        <div className='flex gap-3 flex-wrap'>
          <Input
            label='Nombre'
            variant='underlined'
            placeholder='Nombre del producto'
            className='w-full md:max-w-sm'
            color={errors.name ? 'danger' : 'default'}
            errorMessage={errors.name?.message}
            {...register('name', { required: 'Nombre requerido' })}
          />
          <Input
            variant='underlined'
            className='w-full md:max-w-sm'
            label='Precio de venta S/'
            placeholder='Defina el precio'
            color={errors.priceSale ? 'danger' : 'default'}
            errorMessage={errors.priceSale?.message}
            {...register('priceSale', {
              required: 'Precio requerido',
              pattern: {
                value: /^(\d+)(\.\d{1,2})?$/,
                message: 'Costo inválido'
              }
            })}
          />
          <Input
            variant='underlined'
            className='w-full md:max-w-sm'
            label='Mínimo en inventario'
            placeholder='Cantidad mínima'
            color={errors.inventaryMin ? 'danger' : 'default'}
            errorMessage={errors.inventaryMin?.message}
            {...register('inventaryMin', {
              required: {
                value: true,
                message: 'Mínimo requerido'
              },
              pattern: {
                value: /^[1-9]\d*$/,
                message: 'Ingrese un número entero válido'
              }
            })}
          />
          <Input
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Unidad'
            placeholder='Unidad de venta'
            color={errors.unit ? 'danger' : 'default'}
            errorMessage={errors.unit?.message}
            {...register('unit', {
              required: 'Unidad requerida',
              validate: (v) => isNaN(Number(v)) || 'Unidad inválida'
            })}
          />
          <Select
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Venta por:'
            placeholder='Venta por'
            color={errors.saleFor ? 'danger' : 'default'}
            errorMessage={errors.saleFor?.message}
            defaultSelectedKeys={[ESaleFor.quantity]}
            items={Object.entries(ESaleFor)}
            {...register('saleFor', {
              required: 'Seleccione una opcíon',
              validate: (v) => {
                const isOptionSaleFor = v === ESaleFor.quantity || v === ESaleFor.unit
                return isOptionSaleFor || 'Entrada inválida'
              }
            })}
          >
            {
              ([_, item]) => <SelectItem key={item} value={item}>{item}</SelectItem>
            }
          </Select>
          <Select
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Estado'
            placeholder='Indique el estado'
            color={errors.isActive ? 'danger' : 'default'}
            errorMessage={errors.isActive?.message}
            items={Object.entries(EStateProduct)}
            defaultSelectedKeys={[EStateProduct.active]}
            {...register('isActive', {
              required: 'Seleccione una opcíon',
              validate: (v) => {
                const isOptionStateProduct = Object.values(EStateProduct).includes(v as EStateProduct)
                return isOptionStateProduct || 'Entrada inválida'
              }
            })}
          >
            {
              ([_, state]) => <SelectItem key={state} value={state}>{state}</SelectItem>
            }
          </Select>
          <Autocomplete
            className='w-full md:max-w-sm'
            variant='underlined'
            label='Categoría'
            placeholder='Seleccione la categoría'
            color={errors.categoryId ? 'danger' : 'default'}
            errorMessage={errors.categoryId?.message}
            defaultItems={categories}
            isLoading={isLoading}
            onSelectionChange={(key) => {
              const cat = categories.find(cat => cat.id === Number(key))
              setCategorySelected(prev => cat ?? prev)
            }}
            {...register('categoryId', {
              required: 'Seleccione una opción',
              validate: (v) => {
                const isOptionCategory = categories.some(cat => cat.id === categorySelected.id)
                return isOptionCategory || 'Entrada inválida'
              }
            })}
          >
            {
              (cat) => (
                <AutocompleteItem key={cat.id} value={cat.id}>{cat.name}</AutocompleteItem>
              )
            }
          </Autocomplete>
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
              className='cursor-pointer absolute z-20 w-full h-full top-0 left-0'
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
                : <p className='text-default'>Click o arrastre aquí</p>
            }
          </div>
          {!!errors.image && <small className='text-danger text-xs -mt-3'>Seleccione una imagen</small>}
        </div>
        <Button type='submit' color='primary' className='w-full md:w-min'>Crear producto</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de crear el producto?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button isLoading={isLoadingDelete} color='primary' onPress={handleConfirm}>
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
export default FormProductCreate
