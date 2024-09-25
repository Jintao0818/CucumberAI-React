/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Spin } from "antd"


const Main = lazy(() => import('@/pages/Main'))
const Mobile = lazy(() => import('@/pages/Mobile'))
const MobileHome = lazy(() => import('@/pages/Mobile/MobileHome'))
const MobileInstruction = lazy(() => import('@/pages/Mobile/MobileInstruction'))
const MobileResult = lazy(() => import('@/pages/Mobile/MobileResult'))
const MobileSettings = lazy(() => import('@/pages/Mobile/MobileSettings'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<Spin size='large' tip="Loading..." spinning={true} fullscreen />}><Main /></Suspense>
  },
  {
    path: '/mobile',
    element: <Suspense fallback={'Loading...'}><Mobile /></Suspense>,
    children: [
      {
        path: '/mobile',
        element: <Suspense fallback={'Loading...'}><MobileHome /></Suspense>
      },
      {
        path: '/mobile/instruction',
        element: <Suspense fallback={'Loading...'}><MobileInstruction /></Suspense>
      },
      {
        path: '/mobile/result',
        element: <Suspense fallback={'Loading...'}><MobileResult /></Suspense>
      },
      {
        path: '/mobile/settings',
        element: <Suspense fallback={'Loading...'}><MobileSettings /></Suspense>
      },
    ]
  },
  {
    path: '*',
    element: <Suspense fallback={'Loading...'}><NotFound /></Suspense>
  }
])


export default router