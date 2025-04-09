type NavIconProps = {
    src: string;
    alt: string;
  };
  
  const NavIcon: React.FC<NavIconProps> = ({ src, alt }) => {
    return <img src={src} alt={alt} className="h-[28px] w-[28px]" />;
  };

export default NavIcon;
  