import "./footer.css";

const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return <footer>{`Copyright © for MBRKCL ${year}`}</footer>;
};

export default Footer;
