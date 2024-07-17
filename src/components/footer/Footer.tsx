const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center bg-gray-700 text-white h-[50px]">
      © {currentYear} Cloud Hosting
    </div>
  );
};

export default Footer;
