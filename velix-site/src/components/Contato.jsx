import { forwardRef, useState } from "react";
import emailjs from "@emailjs/browser";
import contactBg from "../assets/contact-bg.png";
import whatsappIcon from "../assets/whatsapp.png";
import "./Contato.css";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;
const EMAILJS_TEMPLATE_CONFIRM = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const WHATSAPP_LINK = "https://wa.link/zni9fc";

const EMPTY_FORM = { nome: "", email: "", tel: "", msg: "" };

const Contato = forwardRef(function Contato(_props, ref) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const setField = (key) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const missing = {
      nome: !form.nome.trim(),
      email: !form.email.trim(),
      tel: !form.tel.trim(),
      msg: !form.msg.trim(),
    };
    if (missing.nome || missing.email || missing.tel || missing.msg) {
      setErrors(missing);
      return;
    }

    setStatus("sending");
    const params = { nome: form.nome, email: form.email, telefone: form.tel, mensagem: form.msg };
    // TEMPORARY - forces every send to fail so the "Falha ao enviar" button
    // state can be tested live. Remove this line once testing is done.
    const TEST_SERVICE_ID = "TEST_FORCED_FAILURE";
    try {
      // Sent together, but only the admin notification has to succeed for the
      // submission to count - the confirmation to the visitor is best-effort
      // so a bad address on their end doesn't make a real lead look failed.
      const [adminResult] = await Promise.allSettled([
        emailjs.send(TEST_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, params, EMAILJS_PUBLIC_KEY),
        emailjs.send(TEST_SERVICE_ID, EMAILJS_TEMPLATE_CONFIRM, params, EMAILJS_PUBLIC_KEY),
      ]);
      if (adminResult.status === "rejected") throw adminResult.reason;
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const errClass = (key) => `field__input ${errors[key] ? "has-error" : ""}`;

  return (
    <section ref={ref} id="contato" className="contato">
      <img src={contactBg} alt="" className="contato__bg" aria-hidden="true" />

      <div className="contato__heading">
        <h2>Fale Conosco!</h2>
        <p>
          Tem uma ideia ou um desafio?
          <br />
          Envie uma mensagem e descubra como a VELIX pode transformar seu projeto em resultados.
        </p>
      </div>

      <div className="contato__body">
        <div className="contato__info">
          <span className="contato__info-title">Contato</span>

          <span className="contato__label">Email:</span>
          <span className="contato__value">velixtech.ceo@gmail.com</span>

          <span className="contato__label">Telefone:</span>
          <span className="contato__value">+55 (61) 98255-4750</span>

          <span className="contato__label contato__label--center">Se preferir, chame direto no WhatsApp.</span>

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="contato__whatsapp">
            <img src={whatsappIcon} alt="" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>

        <form className="contato__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" placeholder="Nome" value={form.nome} onChange={setField("nome")} className={errClass("nome")} />
          <span className="field__error">{errors.nome ? "Campo obrigatório" : ""}</span>

          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="velixtech.ceo@gmail.com" value={form.email} onChange={setField("email")} className={errClass("email")} />
          <span className="field__error">{errors.email ? "Campo obrigatório" : ""}</span>

          <label htmlFor="tel">Telefone</label>
          <input id="tel" type="tel" placeholder="+55 (61) 98255-4750" value={form.tel} onChange={setField("tel")} className={errClass("tel")} />
          <span className="field__error">{errors.tel ? "Campo obrigatório" : ""}</span>

          <label htmlFor="msg">Mensagem</label>
          <textarea id="msg" placeholder="Mensagem..." value={form.msg} onChange={setField("msg")} className={errClass("msg")} />
          <span className="field__error">{errors.msg ? "Campo obrigatório" : ""}</span>

          <button
            type="submit"
            disabled={status === "sending"}
            className={`contato__submit ${status === "sent" ? "contato__submit--success" : ""} ${status === "error" ? "contato__submit--error" : ""}`}
          >
            {status === "sent" ? "Enviado com sucesso!" : status === "error" ? "Falha ao enviar" : "ENVIAR"}
          </button>
        </form>
      </div>
    </section>
  );
});

export default Contato;
