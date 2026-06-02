export const nigerianStates = { 
  Lagos: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Lekki', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'], 
  Ogun: ['Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Ewekoro', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Oghara', 'Remo North', 'Shagamu'], 
  Oyo: ['Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North East', 'Ibadan North West', 'Ibadan South East', 'Ibadan South West', 'Ibarapa Central', 'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 'Kajola', 'Lagelu', 'Lalupon', 'Ogbomosho North', 'Ogbomosho South', 'Oyo East', 'Oyo West', 'Saki East', 'Saki West', 'Surulere'], 
  // Add more states as needed 
};

export const phoneValidation = (phone: string): boolean => { 
  const phoneRegex = /^0\d{10}$/; // Starts with 0, followed by 10 digits 
  return phoneRegex.test(phone.replace(/\s/g, '')); 
};

export const emailValidation = (email: string): boolean => { 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  return emailRegex.test(email); 
};
