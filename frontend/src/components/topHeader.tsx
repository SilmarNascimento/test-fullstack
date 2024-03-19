import uolLogoSvg from "../assets/uolLogo.svg"

export function TopHeader() {
  return (
    <div className='bg-zinc-700 h-20 flex items-center justify-center'>
      <img
        src={uolLogoSvg}
        alt="uol logo imagem SVG"
        className="w-20 h-20"
      />
    </div>
  );
}