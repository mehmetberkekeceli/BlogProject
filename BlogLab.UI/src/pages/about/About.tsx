import "./about.css";
import React from "react";
import ProfilePhoto from '../../photos/ProfilePhoto.jpg';

const About: React.FC = () => {
  
  return (
    <div className="about">
      <div className="aboutLeft">
        <div className="aboutItem">
          <img className="aboutProfile" src={ProfilePhoto} alt="Profile" />
          <h1 className="headProfile">MBRKCL JR <i className="fa-solid fa-rocket"></i></h1>
          <p className="text">
            👋 Merhaba ben Berke, 1996 yılı Ankara doğumluyum, Karabük Üniversitesi İşletme mezunuyum,Yönetim Bilişim Sistemleri lisansım devam ediyor.Küçüklüğümden beri genellikle teknoloji , bilgisayar oyunları ve spora ilgiliyim.
            1 yıldır yazılım geliştirme alanıyla ilgileniyorum. İlgimi en çok çeken kısım Web teknolojileri oldu ve bu yolda ilerleyebilmek adına 
            Java eğitimi aldım(Spring,SQL) ve şuan .NET &amp; React üzerine bir proje geliştiriyorum , Kendimi geliştirmeye devam ediyorum.
           <br />
            İletişim = berke.keceli96@gmail.com
          </p>  
          <div className="topIconss">
        <h2 className="follow"> Projelerimi Takip Etmek İster Misin ?</h2>
        <a href="https://github.com/mehmetberkekeceli" target="_blank" rel="noopener noreferrer">
          <i className="fa-brands fa-square-github"></i>
        </a>
      </div> 
        </div>
      </div>

      <div className="aboutRight">
        <div>
          <p className="textVid">
            Profil resmimde ki camper adlı karakterin eğlenceli videosu iyi seyirler.
          </p>
          <iframe className="camper" width="800" height="400" src="https://www.youtube.com/embed/5Cjrp23lBSM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
}

export default About;