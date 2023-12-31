export const {
  NEXT_PUBLIC_API_URL,
  API_URL,
  NEXTAUTH_URL,
  NEXT_PUBLIC_IGV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} = process.env

export const IGV = 18

export const NEXTUI_COLORS = {
  default: '#3f3f46',
  primary: '#006FEE',
  secondary: '#9353d3',
  success: '#17c964',
  danger: '#f31260',
  warning: '#f5a524'
}

export const ICONS = {
  // matertial
  options: 'simple-line-icons:options-vertical',
  password: 'carbon:password',
  show: 'clarity:eye-show-line',
  hidden: 'formkit:hidden',
  user: 'ph:user',
  plus: 'ph:plus-bold',
  logout: 'material-symbols:logout-rounded',
  dashboard: 'material-symbols:dashboard-outline',
  search: 'ri:search-line',
  delete: 'material-symbols:delete-outline-rounded',
  edit: 'lucide:edit',
  view: 'iconamoon:link-external-light',
  cart: 'mdi:cart-outline',
  notifications: 'material-symbols:notifications-active-outline',
  time: 'mdi:timer-outline',
  clean: 'mingcute:broom-line',
  tag: 'mdi:tag-arrow-right-outline',
  ticket: 'bi:ticket-detailed',
  // entities
  products: 'system-uicons:box-open',
  categories: 'material-symbols:list',
  transactions: 'ri:exchange-cny-line',
  suppliers: 'ph:user-list-bold',
  locations: 'ph:warehouse',
  clients: 'fluent:people-28-regular',
  users: 'material-symbols:manage-accounts-outline',
  sales: 'mdi:cart-outline',
  purchases: 'ri:exchange-cny-line'
}

type typeColor = {
  hex: string,
  nextui: 'primary' | 'warning' | 'success' | 'danger' | 'secondary' | 'default'
}

export const COLORS_ENT: {
  [key: string] : {
    [key: string]: typeColor
  }
} = {
  userType: {
    admin: {
      hex: NEXTUI_COLORS.primary,
      nextui: 'primary'
    },
    superadmin: {
      hex: NEXTUI_COLORS.warning,
      nextui: 'warning'
    },
    seller: {
      hex: NEXTUI_COLORS.success,
      nextui: 'success'
    }
  },
  userState: {
    active: {
      hex: NEXTUI_COLORS.primary,
      nextui: 'primary'
    },
    inactive: {
      hex: NEXTUI_COLORS.danger,
      nextui: 'danger'
    }
  },
  saleFor: {
    quantity: {
      hex: NEXTUI_COLORS.secondary,
      nextui: 'secondary'
    },
    unit: {
      hex: NEXTUI_COLORS.warning,
      nextui: 'warning'
    }
  },
  locationType: {
    warehouse: {
      hex: NEXTUI_COLORS.secondary,
      nextui: 'secondary'
    },
    store: {
      hex: NEXTUI_COLORS.default,
      nextui: 'default'
    }
  },
  stateProduct: {
    active: {
      hex: NEXTUI_COLORS.primary,
      nextui: 'primary'
    },
    inactive: {
      hex: NEXTUI_COLORS.danger,
      nextui: 'danger'
    }
  },
  stateProductUnit: {
    stock: {
      hex: NEXTUI_COLORS.primary,
      nextui: 'primary'
    },
    sold: {
      hex: NEXTUI_COLORS.success,
      nextui: 'success'
    },
    damaged: {
      hex: NEXTUI_COLORS.danger,
      nextui: 'danger'
    }
  },
  operationType: {
    buy: {
      hex: NEXTUI_COLORS.success,
      nextui: 'success'
    },
    sell: {
      hex: NEXTUI_COLORS.danger,
      nextui: 'danger'
    }
  }
}

Object.freeze(COLORS_ENT)
Object.freeze(NEXTUI_COLORS)
Object.freeze(ICONS)
Object.freeze(API_URL)
Object.freeze(NEXTAUTH_URL)
Object.freeze(NEXT_PUBLIC_API_URL)
Object.freeze(NEXT_PUBLIC_IGV)
