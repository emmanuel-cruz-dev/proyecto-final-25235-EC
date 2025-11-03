import { useState } from "react";

export const useNewsletterSubscription = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert(`¡Gracias por suscribirte ${email}!`);
  };

  return { email, setEmail, handleSubmit };
};
