import Link from "next/link";

export default function Navbar() {
  return (
    <div className="border-b flex justify-between lg:justify-around items-center py-2">

      <Logo />
      <div className="hidden space-x-8 lg:flex mx-8">
        <NavButton url="/about" name="About" />
        <NavButton url="/courses" name="Courses" />
      </div>
      <div className="flex lg:hidden">
        <div className="space-y-2 mx-4">
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
          <span className="block w-8 h-0.5 bg-gray-600 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link href="/">
      <button>
        <div className="border-4 border-black hover:text-white hover:bg-black rounded-lg lg:mx-8 mx-4">
          <span className="text-xl font-bold flex mx-4 my-2 justify-center">
            KH
          </span>
        </div>
      </button>
    </Link>
  );
}

function NavButton({ url, name }) {
  return (
    <Link href={url}>
      <button className="border-4 border-black hover:text-white hover:bg-black rounded-lg">
        <span className="text-xl font-bold flex m-2">{name}</span>
      </button>
    </Link>
  );
}
