'use client'
import React from 'react'
import { Avatar, Badge, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import Cart from './Cart'
import { useCart, useCartPurchase } from '@/hooks'
import Yesicon from '@/components/Yesicon'
import { COLORS_ENT, ICONS } from '@/contants'
import { EUserType } from '@/types'
import { useRouter } from 'next/navigation'
import ROUTES from '@/app/routes'

function Header () {
  const { data: session } = useSession()
  const user = session?.user
  const { push } = useRouter()

  const { cart: { items }, setShowCart, showCart } = useCart()
  const { cartPurchase: { items: itemsInPurchase } } = useCartPurchase()
  const hasItemsInCart = items.length > 0
  const hasItemsInCartPurchase = itemsInPurchase.length > 0
  const colorUserType = user?.type === EUserType.admin
    ? COLORS_ENT.userType.admin.nextui
    : user?.type === EUserType.seller ? COLORS_ENT.userType.seller.nextui : COLORS_ENT.userType.superadmin.nextui

  const notifications = [
    {
      key: crypto.randomUUID(),
      label: 'Producto por agotarse',
      image: 'https://cdn-icons-png.flaticon.com/512/5166/5166939.png',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.',
      handle: () => push(`${ROUTES.products}`)
    }
  ]
  if (hasItemsInCart) {
    notifications.unshift({
      key: crypto.randomUUID(),
      label: 'Venta inconclusa',
      image: 'https://cdn-icons-png.flaticon.com/512/5408/5408490.png',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.',
      handle: () => setShowCart(true)
    })
  }
  if (hasItemsInCartPurchase) {
    notifications.unshift({
      key: crypto.randomUUID(),
      label: 'Compra inconclusa',
      image: 'https://cdn-icons-png.flaticon.com/512/3847/3847867.png',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In distinctio ab tempore animi hic repudiandae, nam esse ut fugit labore.',
      handle: () => push(`${ROUTES.purchases}/new`)
    })
  }

  const hasNotifications = notifications.length > 0

  return (
    <>
      <header className='flex items-center justify-between h-[5rem] bg-myLight rounded-xl p-5 text-myDark'>
        <span>Hola <strong>{user?.names}</strong></span>
        <div className='flex gap-5 items-center'>
          <Badge content={items.length} shape='circle' color='danger' isInvisible={!hasItemsInCart}>
            <Button
              onPress={() => setShowCart(true)}
              radius='full'
              isIconOnly
              aria-label='Carrito de venta'
              variant='light'
            >
              <Yesicon fontSize={20} icon={ICONS.cart} />
            </Button>
          </Badge>
          <Dropdown placement='bottom-end' className='max-w-sm'>
            <Badge content={notifications.length} shape='circle' color='danger' isInvisible={!hasNotifications}>
              <DropdownTrigger>
                <Button
                  radius='full'
                  isIconOnly
                  aria-label='Notificaciones'
                  variant='light'
                >
                  <Yesicon fontSize={20} icon={ICONS.notifications} />
                </Button>
              </DropdownTrigger>
            </Badge>
            <DropdownMenu variant='faded' aria-label='notifications' items={notifications}>
              <DropdownSection title='Notificaciones'>
                {
                  notifications.map((item) => (
                    <DropdownItem
                      key={item.key}
                      onPress={() => item.handle()}
                      description={<p className='line-clamp-2'>{item.description}</p>}
                      startContent={<Image width={30} height={30} src={item.image} alt='image' />}
                    >
                      {item.label}
                    </DropdownItem>
                  ))
                }
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                size='sm'
                isBordered
                as='button'
                className='transition-transform'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{user?.email}</p>
                <Chip radius='md' className='mt-1' color={colorUserType}>{user?.type}</Chip>
              </DropdownItem>
              <DropdownItem key='settings'>
                My Settings
              </DropdownItem>
              <DropdownItem key='team_settings'>Team Settings</DropdownItem>
              <DropdownItem key='analytics'>
                Analytics
              </DropdownItem>
              <DropdownItem key='system'>System</DropdownItem>
              <DropdownItem key='configurations'>Configurations</DropdownItem>
              <DropdownItem key='help_and_feedback'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem onPress={() => signOut()} key='logout' color='danger'>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
      <Cart isOpen={showCart} toggleOpen={setShowCart} />
    </>
  )
}
export default Header
