const BackgroundImage = ({ src }: { src: string }) => {
  return (
    <div className="absolute inset-0 z-0">
      <img src={src} alt="background" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"></div>
    </div>
  );
};

export default BackgroundImage;
