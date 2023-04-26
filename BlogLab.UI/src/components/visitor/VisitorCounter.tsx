import { useState, useEffect } from 'react';
import "./visitorCounter.css"

function VisitorCounter(): JSX.Element {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    setVisitorCount(prevCount => prevCount + 1);
    
    return () => {
      setVisitorCount(0);
    };
  }, []);

  return (
    <div>
      <h2 className='Ziyaret'>Aktif: {visitorCount} Ziyaretçi</h2>
    </div>
  );
}

export default VisitorCounter;