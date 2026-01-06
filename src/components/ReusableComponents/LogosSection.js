import React from 'react';
import vegan from '../assets/imgs/vegan.png';
import sulfate from '../assets/imgs/sulfate.png';
import derm from '../assets/imgs/derm.png';
import cruelty from '../assets/imgs/cruelty.png';

const LogosSection = () => {
  return (
    <section className="logos-section">
      <img className="crueltyFreeLogos" src={vegan} alt="vegan logo" />
      <img className="crueltyFreeLogos" src={sulfate} alt="sulfate free logo" />
      <img className="crueltyFreeLogos" src={cruelty} alt="cruelty free logo" />
      <img className="crueltyFreeLogos" src={derm} alt="dermatologist tested logo" />
    </section>
  );
};

export default LogosSection;

