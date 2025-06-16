import Image from "next/image";

const Logo = ({ className = "", width = 120, height = 40 }) => {
   return (
      <div className={`flex items-center justify-center ${className}`}>
         <Image
            src="/assets/icons/logo.svg"
            alt="Aboki"
            width={width}
            height={height}
            className="h-auto"
            priority // Loads the logo faster
         />
      </div>
   );
};

export default Logo;
