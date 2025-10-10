import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { 
    HomePage, 
    ClothesPage, 
    AboutPage, 
    ClothePage, 
    RegisterPage, 
    LoginPage, 
    OrdersUserPage, 
    CheackoutPage, 
    ThankyouPage, 
    OrderUserPage,
    DashboardNewProductPage, 
    DashboardProductSlugPage, 
    DashboardOrdersPage, 
    DashboardOrderPage,
    DashboardRepentancePage,
     
    } from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { DashboardProductsPage } from "../pages/dashboard/DashboardProductsPage";
import Terminos from "../pages/Terminos";
import Privacidad from "../pages/Privacidad";
import BotonArrepentimiento from "../pages/BotonArrepentimiento";
import { DashboardRepentancesPage } from "../pages/dashboard/DashboardRepentancesPage";

export const router = createBrowserRouter([
    {

        path: "/",
        element: <RootLayout />,
        children: [
            {   
                index: true,
                element: <HomePage />,
            },

            {   
                path: 'productos',
                element: <ClothesPage />,
            },

            {
                path: 'productos/:slug',
                element: <ClothePage />,
            },

            {   
                path: 'nosotros',
                element: <AboutPage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'registro',
                element: <RegisterPage />,
            },
            {
                path: 'privacidad',
                element: <Privacidad />,
            },
            {
                path: 'terminos',
                element: <Terminos />,
            },
            {
                path: 'boton-arrepentimiento',
                element: <BotonArrepentimiento />,
            },
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        path: '',
                        element: <Navigate to='/account/pedidos' />
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />,
                    },
                    {
                        path: 'pedidos/:id',
                        element: <OrderUserPage />,
                    }
                ],
            },
          
        ],

    },
    {
        path: '/checkout',
        element: <CheackoutPage />,
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankyouPage />,
        
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/dashboard/productos' />
            },
            {
                path: 'productos',
                element: <DashboardProductsPage />,
            },
            {
				path: 'productos/new',
				element: <DashboardNewProductPage />,
			},
            {
                path: 'productos/editar/:slug',
                element: <DashboardProductSlugPage />,
            },
            {
                path: 'ordenes',
                element: <DashboardOrdersPage />,
            },
            {
                path: 'ordenes/:id',
                element: <DashboardOrderPage />,
            },
            {
                path: 'arrepentimientos',
                element: <DashboardRepentancesPage />,
            },
            {
                path: 'arrepentimientos/:id',
                element: <DashboardRepentancePage />,
            }
            
        ],
    },
    
]);