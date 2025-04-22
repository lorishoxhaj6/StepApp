type NavIconProps = {
    src: string;
    alt: string;
  };
  
  const NavIcon: React.FC<NavIconProps> = ({ src, alt }) => {
    return <img src={src} alt={alt} className="h-[35px] w-[35px]" />;
  };

export default NavIcon;
  