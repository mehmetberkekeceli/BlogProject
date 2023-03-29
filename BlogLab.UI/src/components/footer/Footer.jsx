import "./footer.css"
const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>{`Copyright © for MBRKCL ${year}`}</footer>;
  };
  
  export default Footer;