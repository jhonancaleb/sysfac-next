'use client'
import { useCartPurchase } from '@/hooks'
import { Supplier } from '@/types'
import { Button, Select, SelectItem, Textarea, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type FormData= {
  supplierId: number,
  comments:string,
}
type Props = {
  suppliers: Supplier[]
}
function FormPurchaseConfirm ({ suppliers }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const { cartPurchase: { items } } = useCartPurchase()
  const hasCartItems = items.length > 0

  const handleSubmitForm = handleSubmit((data) => {
    if (!hasCartItems) {
      toast('Carrito de compras vacio', {
        icon: '⚠️'
      })
      return
    }
    setShowModal(true)
    console.log(data)
  })

  const handleMakeShopping = () => {

  }

  return (
    <>
      <h2 className='title'>Datos adicionales</h2>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-3'>
        <Select
          label='Proveedor'
          placeholder='Elija el proveedor'
          className='w-full md:max-w-sm'
          items={suppliers}
          color={errors.supplierId ? 'danger' : 'default'}
          isInvalid={!!errors.supplierId}
          errorMessage={errors.supplierId && 'Elija un proveedor'}
          {...register('supplierId', {
            required: {
              value: true,
              message: 'Proveedor requerido'
            },
            validate: (v) => {
              const isSupplier = suppliers.some(supplier => supplier.id === Number(v))
              if (isSupplier) return true
              return 'Elija un proveedor'
            },
            setValueAs: (v) => parseInt(v)
          })}
        >
          {
            (item) => (
              <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
            )
          }
        </Select>
        <Textarea
          minRows={3}
          maxRows={6}
          label='Comentarios'
          placeholder='Deje unos comentarios o información adicional como los datos del responsable de la compra'
          {...register('comments')}
        />
        <Button type='submit' className='w-full md:w-min' variant='shadow' color='primary'>Realizar compra</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de realizar al compra?</p>
              </ModalBody>
              <ModalFooter>
                <Button color='default' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={handleMakeShopping}>
                  Hacer compra
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default FormPurchaseConfirm
