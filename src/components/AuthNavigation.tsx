import { Link } from "react-router-dom"

// definimos nuestro type para los props.
type AuthNavigationProps = {
    to: string,
    text: string
}


const AuthNavigation = ({ to, text }: AuthNavigationProps) => {
    return (
        <nav className="mt-10">
            <Link className="text-center text-white text-lg block" to={to}>
                {text}
            </Link>
        </nav>
    )
}

export default AuthNavigation