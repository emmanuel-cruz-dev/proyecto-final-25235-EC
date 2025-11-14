import { useState } from "react";
import { toast } from "react-toastify";

export const useNewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const notify = (name) => toast.success(`¡Gracias por suscribirte ${name}!`);

  const handleSubmit = (e) => {
    e.preventDefault();
    notify(email);
    setEmail("");
  };

  return { email, setEmail, handleSubmit };
};
