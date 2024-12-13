/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"))
const Acadims = lazy(() => import("../pages/Acadims"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Complain = lazy(() => import("../pages/Complain"));
// const Placement = lazy(()=>import("../pages/PLacement"));
const Fees = lazy(() => import("../pages/Fees"));
const NotAvailable = lazy(() => import("../pages/NotAvailable"));
const CampusEvent = lazy(() => import("../pages/CampusEvent"));
const Register = lazy(() => import("../pages/Register"));
import Loader from "../pages/Loader";

export const router = createBrowserRouter([

    {
        path: '/', element:
            <Suspense fallback={<Loader />}>
                <App />
            </Suspense>
        , children: [
            {
                path: '/', element:
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
            },
            {
                path: '/acadims', element:
                    <Suspense fallback={<Loader />}>
                        <Acadims />
                    </Suspense>
            },
            {
                path: '/fees', element:
                    <Suspense fallback={<Loader />}>
                        <Fees />
                    </Suspense>
            },
            // {path : '/placement', element : 
            //  <Suspense fallback={<Loader/>}>
            //  <Placement/>
            // </Suspense>
            // },
            {
                path: '/complain', element:
                    <Suspense fallback={<Loader />}>
                        <Complain />
                    </Suspense>
            },
            {
                path: '/events/:campus', element:
                    <Suspense fallback={<Loader />}>
                        <CampusEvent />
                    </Suspense>
            },
            {
                path: '/*', element:
                    <Suspense fallback={<Loader />}>
                        <NotAvailable />
                    </Suspense>
            },
        ]
    },
    {
        path: '/sign-in', element:
            <Suspense fallback={<Loader />}>
                <SignIn />
            </Suspense>
    },
    {
        path: '/register', element:
            <Suspense fallback={<Loader />}>
                <Register />
            </Suspense>
    },
    {
        path: "*", element:
            <Suspense fallback={<Loader />}>
                <NotFound />
            </Suspense>
    }
])