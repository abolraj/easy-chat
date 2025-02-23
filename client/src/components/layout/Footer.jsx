export default function Footer() {
    return (
        <footer className="fixed w-full left-0 bottom-0 p-2 flex flex-wrap gap-3 items-center whitespace-pre">
            2025 &copy; Developed & Designed with
            <svg  className="w-5 mx-3" viewBox="0 0 81.92 81.92" mlns="http://www.w3.org/2000/svg">
                <path d="M74.192 21.88v-7.632H67.16V6.624H51.08v7.624h-7.032v7.632h-6.28v-7.632h-7.04V6.624H14.656v7.624H7.624v7.632H1.336v15.248h6.288v7.632h6.024v7.624h6.032v7.624h7.032v7.632h8.04v7.624h12.312V67.64h8.032v-7.632h7.04v-7.624h6.032V44.76h6.024v-7.632h6.28V21.88z" fill="#E02D2D" />
            </svg>
            by
            <a href="https://abolfazlrajaee.ir" className="text-info text-lg mx-2">
                Abolfazl
            </a>

            <a href="https://laravel.com/" className="text-red-500 text-lg grow text-right">
                Laravel 11.x
            </a>

            🔥

            <a href="https://react.dev/" className="text-cyan-400 text-lg">
                React 19.x
            </a>

        </footer>
    )
}