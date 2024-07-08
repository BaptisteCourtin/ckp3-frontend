import Link from "next/link";
import Image from "next/image";

const navbar = ({ isDarkTheme, setIsDarkTheme }: any) => {
  return (
    <header>
      <nav className="navbar">
        <h1>Checkpoint : frontend</h1>
        <div className="linker">
          <Link href="/">Pays</Link>
          <Link href="/continent/allContinents">Continents</Link>
        </div>
      </nav>
    </header>
  );
};

export default navbar;
