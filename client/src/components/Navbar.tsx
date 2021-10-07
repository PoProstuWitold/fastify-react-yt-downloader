import React from 'react'

interface NavbarProps {

}

const Navbar: React.FC<NavbarProps> = () => {
    return (
        <header className="pb-3 mb-4 border-bottom">
        <a
            href="/"
            className="d-flex align-items-center text-dark text-decoration-none"
        >
            <span className="fs-4 p-4 bold">Fastify React YT Downloader</span>
        </a>
        </header>
    )
}

export default Navbar