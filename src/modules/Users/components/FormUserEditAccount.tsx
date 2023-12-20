'use client'
import React from 'react'
import { Input, Select, SelectItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { EUserState, EUserType, User } from '@/types'

type FormUserEditAccountFields= {
  username: string,
  type: string,
  state: string,
}

type Props = {
  user: User
}

function FormUserEditAccount ({ user }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormUserEditAccountFields>()
  const [showModal, setShowModal] = React.useState<boolean>(false)

  const handleSubmitFormAccount = handleSubmit((data) => {
    setShowModal(true)
  })

  return (
    <section id='account'>
      <h2 className='title'>Información de la cuenta</h2>
      <form onSubmit={handleSubmitFormAccount}>
        <div className='flex gap-3 flex-wrap'>
          <Input
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba los nombre de usuario'
            label='Username'
            defaultValue={user.username}
            isInvalid={!!errors.username}
            color={errors.username ? 'danger' : 'default'}
            errorMessage={!!errors.username && 'Campo requerido'}
            {...register('username', { required: true })}
          />
          <Select
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Seleccione el tipo'
            label='Tipo de usuario'
            defaultSelectedKeys={[user.type]}
            isInvalid={!!errors.type}
            color={errors.type ? 'danger' : 'default'}
            errorMessage={!!errors.type && 'Campo requerido'}
            {...register('type', { required: true })}
          >
            <SelectItem key={EUserType.admin} value='admin'>Admin</SelectItem>
            <SelectItem key={EUserType.superadmin} value='superadmin'>SuperAdmin</SelectItem>
            <SelectItem key={EUserType.seller} value='vendedor'>vendedor</SelectItem>
          </Select>
          <Select
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Seleccione el estado'
            label='Estado de usuario'
            defaultSelectedKeys={[user.state]}
            isInvalid={!!errors.state}
            color={errors.state ? 'danger' : 'default'}
            errorMessage={!!errors.state && 'Campo requerido'}
            {...register('state', { required: true })}
          >
            <SelectItem key={EUserState.active} value='activo'>Activo</SelectItem>
            <SelectItem key={EUserState.inactive} value='inactivco'>Inactivo</SelectItem>
          </Select>
        </div>
        <Button type='submit' className='w-full md:w-auto mt-4' color='primary'>Actualizar</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>
                  ¿Está seguro de actualizar la información de la cuenta?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={onClose}>
                  Actualizar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  )
}
export default FormUserEditAccount