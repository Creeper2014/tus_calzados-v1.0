import { FaArrowRotateLeft, FaBoxOpen, FaCartShopping, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6"


export const navbarLinks = [
    {
        id: 1,
        title: "Inicio",
        href: "/"
    },  
    {
        id: 2,
        title: "Productos",
        href: "/productos"
    },  
    {
        id: 3,
        title: "Sobre Nosotros",
        href: "/nosotros"
    },
]

export const socialLinks = [
    {
        id: 1,
        title: "TIkTok",
        href: "https://www.tiktok.com/@tuscalzos",
        icon: <FaTiktok />,
    },
    {
        id: 2,
        title: "Instagram",
        href: "https://www.instagram.com/tus_calzadosok/",
        icon: <FaInstagram />,
    },
    {
        id: 3,
        title: "whatsapp",
        href: "https://chat.whatsapp.com/Bg0kDGhCfxjCSWw9kk1NsS",
        icon: <FaWhatsapp />,

    },
]

export const dashboardLinks = [
	{
		id: 1,
		title: 'Productos',
		href: '/dashboard/productos',
		icon: <FaBoxOpen size={25} />,
	},
	{
		id: 2,
		title: 'Ordenes',
		href: '/dashboard/ordenes',
		icon: <FaCartShopping size={25} />,
	},
    {
        id: 3,
        title: 'Arrepentimientos',
        href: '/dashboard/arrepentimientos',
        icon: <FaArrowRotateLeft size={25} />,
    }
];
