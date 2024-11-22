import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Bancos",
        path: "/bancos",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Categorias",
        path: "/categorias",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Cartões",
        path: "/cartoes",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Transações",
        path: "/transacoes",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },

]

export default SidebarData;