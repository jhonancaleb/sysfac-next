'use client'
import React from 'react'
import InputPassword from '@/components/InputPassword'
import { Button, Input, Select, SelectItem, Modal, ModalHeader, ModalBody, ModalFooter, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { EUserState, EUserType, UserToDB } from '@/types'
import { useUser } from '../hooks'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'

type Formdata= {
  username: string,
  password: string,
  confirmPassword: string,
  type: EUserType,
  state: EUserState,
  names: string,
  lastnames: string,
  email: string | null,
  phone: `${number}` | null
}

function FormUserCreate () {
  const { push } = useRouter()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { addUser } = useUser()
  const {
    register, handleSubmit, getValues, watch, formState: {
      errors
    }
  } = useForm<Formdata>()

  const handleSubmitForm = handleSubmit((_data) => {
    setShowModal(true)
  })

  const handleConfirm = async () => {
    const data: UserToDB = watch()
    setIsLoading(true)
    const res = await addUser(data)
    setIsLoading(false)
    if (res?.ok) push(ROUTES.users)
  }

  return (
    <>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-7'>
        <fieldset className='flex flex-wrap gap-3'>
          <legend className='title'>Información personal</legend>
          <Input
            className='w-full md:w-[min(100%,400px)]'
            label='Nombres'
            placeholder='Escribe los nombres'
            variant='underlined'
            isInvalid={!!errors.names}
            errorMessage={!!errors.names && 'Campo requerido'}
            color={errors.names ? 'danger' : 'default'}
            {...register('names', { required: true })}
          />
          <Input
            className='w-full md:w-[min(100%,400px)]'
            label='Apellidos'
            placeholder='Escribe los apellidos'
            variant='underlined'
            isInvalid={!!errors.lastnames}
            errorMessage={!!errors.lastnames && 'Campo requerido'}
            color={errors.lastnames ? 'danger' : 'default'}
            {...register('lastnames', { required: true })}
          />
          <Input
            className='w-full md:w-[min(100%,400px)]'
            label='Correo'
            placeholder='Escribe el correo'
            variant='underlined'
            isInvalid={!!errors.email}
            errorMessage={!!errors.email && 'Correo inválido'}
            color={errors.email ? 'danger' : 'default'}
            {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i })}
          />
          <Input
            className='w-full md:w-[min(100%,400px)]'
            label='Teléfono'
            placeholder='Escribe el número celular'
            variant='underlined'
            isInvalid={!!errors.phone}
            errorMessage={!!errors.phone && 'Telèfono inválido'}
            color={errors.phone ? 'danger' : 'default'}
            {...register('phone', { required: true, min: 900000000, max: 999999999, valueAsNumber: true })}
          />
          {/* <div className='flex flex-wrap gap-3'>
          </div> */}
        </fieldset>
        <fieldset className='flex flex-wrap gap-3'>
          <legend className='title'>Información de la cuenta</legend>
          <Input
            className='w-full md:w-[min(100%,400px)]'
            label='Usuario'
            placeholder='Escribe el nombre de usuario'
            variant='underlined'
            isInvalid={!!errors.username}
            errorMessage={!!errors.username && 'Campo requerido'}
            color={errors.username ? 'danger' : 'default'}
            {...register('username', { required: true })}
          />
          <Select
            className='w-full md:w-[min(100%,400px)]'
            placeholder='Seleccione el tipo'
            label='Tipo de usuario'
            variant='underlined'
            isInvalid={!!errors.type}
            errorMessage={!!errors.type && 'Campo requerido'}
            color={errors.type ? 'danger' : 'default'}
            items={Object.entries(EUserType)}
            {...register('type', { required: true })}
          >
            {
                ([_, value]) => <SelectItem key={value} value={value}>{value}</SelectItem>
              }
          </Select>
          <Select
            className='w-full md:w-[min(100%,400px)]'
            placeholder='Seleccione el estado'
            label='Estado de usuario'
            variant='underlined'
            isInvalid={!!errors.state}
            errorMessage={!!errors.state && 'Campo requerido'}
            color={errors.state ? 'danger' : 'default'}
            items={Object.entries(EUserState)}
            {...register('state', { required: true })}
          >
            {
                ([_, value]) => <SelectItem key={value} value={value}>{value}</SelectItem>
              }
          </Select>
        </fieldset>
        <fieldset className='flex flex-wrap gap-3'>
          <legend className='title'>Contraseña de usuario</legend>
          <InputPassword
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Escriba el la contraseña'
            label='Contraseña'
            isInvalid={!!errors.password}
            errorMessage={!!errors.password && 'Campo requerido'}
            color={errors.password ? 'danger' : 'default'}
            registerUseForm={register('password', { required: true })}
          />
          <InputPassword
            className='w-full md:w-[min(100%,400px)]'
            variant='underlined'
            placeholder='Vuelva a escribir la contraseña'
            label='Confirmar contraseña'
            isInvalid={!!errors.confirmPassword}
            errorMessage={!!errors.confirmPassword && 'No coincide con la contraseña'}
            color={errors.confirmPassword ? 'danger' : 'default'}
            registerUseForm={register('confirmPassword', {
              required: true,
              validate: {
                passwordMatch: (v) => v === getValues('password')
              }
            })}
          />
        </fieldset>
        <Button className='w-full md:w-min' type='submit' color='primary'>Crear usuario</Button>
      </form>
      <Modal placement='top' isOpen={showModal} onOpenChange={setShowModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Confirmación</ModalHeader>
              <ModalBody>
                <p>¿Está seguro de crear este usuario?</p>
                <small><em className='text-warning'>NOTA: Al realizar esta acción esta ofreciendo acceso al sistema.</em></small>
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
export default FormUserCreate
