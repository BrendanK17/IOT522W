/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as FoodPrepInventoryImport } from './routes/food-prep-inventory'
import { Route as IndexImport } from './routes/index'
import { Route as UnauthorisedIndexImport } from './routes/unauthorised.index'
import { Route as SignupIndexImport } from './routes/signup.index'
import { Route as LoginIndexImport } from './routes/login.index'
import { Route as FoodPrepDashboardIndexImport } from './routes/food-prep-dashboard.index'
import { Route as DeliveryProfileIndexImport } from './routes/delivery-profile.index'
import { Route as DeliveryDashboardIndexImport } from './routes/delivery-dashboard.index'
import { Route as CustomerIndexImport } from './routes/customer.index'
import { Route as CustomerOrderImport } from './routes/customer.order'
import { Route as CustomerCheckoutImport } from './routes/customer.checkout'

// Create/Update Routes

const FoodPrepInventoryRoute = FoodPrepInventoryImport.update({
  id: '/food-prep-inventory',
  path: '/food-prep-inventory',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UnauthorisedIndexRoute = UnauthorisedIndexImport.update({
  id: '/unauthorised/',
  path: '/unauthorised/',
  getParentRoute: () => rootRoute,
} as any)

const SignupIndexRoute = SignupIndexImport.update({
  id: '/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const LoginIndexRoute = LoginIndexImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRoute,
} as any)

const FoodPrepDashboardIndexRoute = FoodPrepDashboardIndexImport.update({
  id: '/food-prep-dashboard/',
  path: '/food-prep-dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const DeliveryProfileIndexRoute = DeliveryProfileIndexImport.update({
  id: '/delivery-profile/',
  path: '/delivery-profile/',
  getParentRoute: () => rootRoute,
} as any)

const DeliveryDashboardIndexRoute = DeliveryDashboardIndexImport.update({
  id: '/delivery-dashboard/',
  path: '/delivery-dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const CustomerIndexRoute = CustomerIndexImport.update({
  id: '/customer/',
  path: '/customer/',
  getParentRoute: () => rootRoute,
} as any)

const CustomerOrderRoute = CustomerOrderImport.update({
  id: '/customer/order',
  path: '/customer/order',
  getParentRoute: () => rootRoute,
} as any)

const CustomerCheckoutRoute = CustomerCheckoutImport.update({
  id: '/customer/checkout',
  path: '/customer/checkout',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/food-prep-inventory': {
      id: '/food-prep-inventory'
      path: '/food-prep-inventory'
      fullPath: '/food-prep-inventory'
      preLoaderRoute: typeof FoodPrepInventoryImport
      parentRoute: typeof rootRoute
    }
    '/customer/checkout': {
      id: '/customer/checkout'
      path: '/customer/checkout'
      fullPath: '/customer/checkout'
      preLoaderRoute: typeof CustomerCheckoutImport
      parentRoute: typeof rootRoute
    }
    '/customer/order': {
      id: '/customer/order'
      path: '/customer/order'
      fullPath: '/customer/order'
      preLoaderRoute: typeof CustomerOrderImport
      parentRoute: typeof rootRoute
    }
    '/customer/': {
      id: '/customer/'
      path: '/customer'
      fullPath: '/customer'
      preLoaderRoute: typeof CustomerIndexImport
      parentRoute: typeof rootRoute
    }
    '/delivery-dashboard/': {
      id: '/delivery-dashboard/'
      path: '/delivery-dashboard'
      fullPath: '/delivery-dashboard'
      preLoaderRoute: typeof DeliveryDashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/delivery-profile/': {
      id: '/delivery-profile/'
      path: '/delivery-profile'
      fullPath: '/delivery-profile'
      preLoaderRoute: typeof DeliveryProfileIndexImport
      parentRoute: typeof rootRoute
    }
    '/food-prep-dashboard/': {
      id: '/food-prep-dashboard/'
      path: '/food-prep-dashboard'
      fullPath: '/food-prep-dashboard'
      preLoaderRoute: typeof FoodPrepDashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexImport
      parentRoute: typeof rootRoute
    }
    '/signup/': {
      id: '/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/unauthorised/': {
      id: '/unauthorised/'
      path: '/unauthorised'
      fullPath: '/unauthorised'
      preLoaderRoute: typeof UnauthorisedIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/food-prep-inventory': typeof FoodPrepInventoryRoute
  '/customer/checkout': typeof CustomerCheckoutRoute
  '/customer/order': typeof CustomerOrderRoute
  '/customer': typeof CustomerIndexRoute
  '/delivery-dashboard': typeof DeliveryDashboardIndexRoute
  '/delivery-profile': typeof DeliveryProfileIndexRoute
  '/food-prep-dashboard': typeof FoodPrepDashboardIndexRoute
  '/login': typeof LoginIndexRoute
  '/signup': typeof SignupIndexRoute
  '/unauthorised': typeof UnauthorisedIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/food-prep-inventory': typeof FoodPrepInventoryRoute
  '/customer/checkout': typeof CustomerCheckoutRoute
  '/customer/order': typeof CustomerOrderRoute
  '/customer': typeof CustomerIndexRoute
  '/delivery-dashboard': typeof DeliveryDashboardIndexRoute
  '/delivery-profile': typeof DeliveryProfileIndexRoute
  '/food-prep-dashboard': typeof FoodPrepDashboardIndexRoute
  '/login': typeof LoginIndexRoute
  '/signup': typeof SignupIndexRoute
  '/unauthorised': typeof UnauthorisedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/food-prep-inventory': typeof FoodPrepInventoryRoute
  '/customer/checkout': typeof CustomerCheckoutRoute
  '/customer/order': typeof CustomerOrderRoute
  '/customer/': typeof CustomerIndexRoute
  '/delivery-dashboard/': typeof DeliveryDashboardIndexRoute
  '/delivery-profile/': typeof DeliveryProfileIndexRoute
  '/food-prep-dashboard/': typeof FoodPrepDashboardIndexRoute
  '/login/': typeof LoginIndexRoute
  '/signup/': typeof SignupIndexRoute
  '/unauthorised/': typeof UnauthorisedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/food-prep-inventory'
    | '/customer/checkout'
    | '/customer/order'
    | '/customer'
    | '/delivery-dashboard'
    | '/delivery-profile'
    | '/food-prep-dashboard'
    | '/login'
    | '/signup'
    | '/unauthorised'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/food-prep-inventory'
    | '/customer/checkout'
    | '/customer/order'
    | '/customer'
    | '/delivery-dashboard'
    | '/delivery-profile'
    | '/food-prep-dashboard'
    | '/login'
    | '/signup'
    | '/unauthorised'
  id:
    | '__root__'
    | '/'
    | '/food-prep-inventory'
    | '/customer/checkout'
    | '/customer/order'
    | '/customer/'
    | '/delivery-dashboard/'
    | '/delivery-profile/'
    | '/food-prep-dashboard/'
    | '/login/'
    | '/signup/'
    | '/unauthorised/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  FoodPrepInventoryRoute: typeof FoodPrepInventoryRoute
  CustomerCheckoutRoute: typeof CustomerCheckoutRoute
  CustomerOrderRoute: typeof CustomerOrderRoute
  CustomerIndexRoute: typeof CustomerIndexRoute
  DeliveryDashboardIndexRoute: typeof DeliveryDashboardIndexRoute
  DeliveryProfileIndexRoute: typeof DeliveryProfileIndexRoute
  FoodPrepDashboardIndexRoute: typeof FoodPrepDashboardIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
  SignupIndexRoute: typeof SignupIndexRoute
  UnauthorisedIndexRoute: typeof UnauthorisedIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  FoodPrepInventoryRoute: FoodPrepInventoryRoute,
  CustomerCheckoutRoute: CustomerCheckoutRoute,
  CustomerOrderRoute: CustomerOrderRoute,
  CustomerIndexRoute: CustomerIndexRoute,
  DeliveryDashboardIndexRoute: DeliveryDashboardIndexRoute,
  DeliveryProfileIndexRoute: DeliveryProfileIndexRoute,
  FoodPrepDashboardIndexRoute: FoodPrepDashboardIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
  SignupIndexRoute: SignupIndexRoute,
  UnauthorisedIndexRoute: UnauthorisedIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/food-prep-inventory",
        "/customer/checkout",
        "/customer/order",
        "/customer/",
        "/delivery-dashboard/",
        "/delivery-profile/",
        "/food-prep-dashboard/",
        "/login/",
        "/signup/",
        "/unauthorised/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/food-prep-inventory": {
      "filePath": "food-prep-inventory.tsx"
    },
    "/customer/checkout": {
      "filePath": "customer.checkout.tsx"
    },
    "/customer/order": {
      "filePath": "customer.order.tsx"
    },
    "/customer/": {
      "filePath": "customer.index.tsx"
    },
    "/delivery-dashboard/": {
      "filePath": "delivery-dashboard.index.tsx"
    },
    "/delivery-profile/": {
      "filePath": "delivery-profile.index.tsx"
    },
    "/food-prep-dashboard/": {
      "filePath": "food-prep-dashboard.index.tsx"
    },
    "/login/": {
      "filePath": "login.index.tsx"
    },
    "/signup/": {
      "filePath": "signup.index.tsx"
    },
    "/unauthorised/": {
      "filePath": "unauthorised.index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
