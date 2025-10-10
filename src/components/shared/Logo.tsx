import { Link } from "react-router-dom";

interface Props {
    isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
    return (
        <Link 
            to="/"
            className={`text-2xl font-bold tracking-tighter transition-all ${
				isDashboard && 'hover:scale-105'
			}`}
		>
            <p className="text-white hidden lg:block">
                Tus
                <span className="text-white">Calzados</span>
            </p>

            <p className="flex text-4xl lg:hidden">
                <span className="text-white -skew-x-6">T</span>
                <span className="text-white skew-x-6">C</span>
            </p>
        </Link>
    );
};