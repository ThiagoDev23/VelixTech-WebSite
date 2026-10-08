import { forwardRef, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import contactBg from "../assets/contact-bg.png";
import whatsappIcon from "../assets/whatsapp.png";
import "./Contato.css";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ADMIN = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;
const EMAILJS_TEMPLATE_CONFIRM = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRM;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const WHATSAPP_LINK = "https://wa.link/zni9fc";

// Browsers have no built-in fetch timeout - on a hung/very slow connection
// (not a clean failure, just no response ever arriving) the submit button
// would otherwise stay on "Enviando..." forever with no way to recover
// short of reloading the page. This bounds the worst case.
const SEND_TIMEOUT_MS = 15000;

const EMPTY_FORM = { nome: "", email: "", tel: "", msg: "" };

const Contato = forwardRef(function Contato(_props, ref) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  // React's `disabled` prop only takes effect after the next render, which
  // isn't synchronous with the raw click event - a fast double-click/tap
  // could fire handleSubmit twice before the DOM actually disables the
  // button. This ref blocks the second call immediately, independent of
  // render timing.
  const isSubmittingRef = useRef(false);

  const setField = (key) => (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
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

    isSubmittingRef.current = true;
    setStatus("sending");
    const params = { nome: form.nome, email: form.email, telefone: form.tel, mensagem: form.msg };

    let timeoutId;
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => reject(new Error("Tempo de envio excedido")), SEND_TIMEOUT_MS);
    });
    // Without this, if the real request wins the race (the common case),
    // the still-pending timeout promise rejects on its own later with
    // nothing listening - an unhandled promise rejection.
    timeoutPromise.catch(() => {});

    try {
      // Sent together, but only the admin notification has to succeed for the
      // submission to count - the confirmation to the visitor is best-effort
      // so a bad address on their end doesn't make a real lead look failed.
      const [adminResult] = await Promise.race([
        Promise.allSettled([
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, params, EMAILJS_PUBLIC_KEY),
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CONFIRM, params, EMAILJS_PUBLIC_KEY),
        ]),
        timeoutPromise,
      ]);
      clearTimeout(timeoutId);
      if (adminResult.status === "rejected") throw adminResult.reason;
      setForm(EMPTY_FORM);
      setErrors({});
      setStatus("sent");
    } catch {
      clearTimeout(timeoutId);
      setStatus("error");
    } finally {
      isSubmittingRef.current = false;
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

          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="contato__whatsapp" aria-label="Chamar no WhatsApp (abre em uma nova aba)">
            <img src={whatsappIcon} alt="" />
            <span aria-hidden="true">Chamar no WhatsApp</span>
          </a>
        </div>

        <form className="contato__form" onSubmit={handleSubmit} noValidate aria-busy={status === "sending"}>
          {/* display:contents keeps this invisible to the flex layout (the
              form's direct children still lay out exactly as before) while
              `disabled` cascades to every field inside at once - greys out
              and blocks editing during the request without clearing
              anything the visitor already typed. */}
          <fieldset disabled={status === "sending"} className="contato__fieldset">
            <label htmlFor="nome">Nome</label>
            <input id="nome" type="text" placeholder="Nome" value={form.nome} onChange={setField("nome")} className={errClass("nome")} aria-invalid={errors.nome ? "true" : "false"} aria-describedby="nome-error" />
            <span id="nome-error" className="field__error" role="alert">{errors.nome ? "Campo obrigatório" : ""}</span>

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="velixtech.ceo@gmail.com" value={form.email} onChange={setField("email")} className={errClass("email")} aria-invalid={errors.email ? "true" : "false"} aria-describedby="email-error" />
            <span id="email-error" className="field__error" role="alert">{errors.email ? "Campo obrigatório" : ""}</span>

            <label htmlFor="tel">Telefone</label>
            <input id="tel" type="tel" placeholder="+55 (61) 98255-4750" value={form.tel} onChange={setField("tel")} className={errClass("tel")} aria-invalid={errors.tel ? "true" : "false"} aria-describedby="tel-error" />
            <span id="tel-error" className="field__error" role="alert">{errors.tel ? "Campo obrigatório" : ""}</span>

            <label htmlFor="msg">Mensagem</label>
            <textarea id="msg" placeholder="Mensagem..." value={form.msg} onChange={setField("msg")} className={errClass("msg")} aria-invalid={errors.msg ? "true" : "false"} aria-describedby="msg-error" />
            <span id="msg-error" className="field__error" role="alert">{errors.msg ? "Campo obrigatório" : ""}</span>
          </fieldset>

          {/* aria-live announces the Enviando.../Enviado/Falha label changes
              to screen readers - previously only sighted users saw the
              button's text change after submit, with no feedback at all
              for the "sending" state (text stayed "Enviar" the whole time). */}
          <button
            type="submit"
            disabled={status === "sending"}
            aria-live="polite"
            aria-atomic="true"
            className={`contato__submit ${status === "sent" ? "contato__submit--success" : ""} ${status === "error" ? "contato__submit--error" : ""}`}
          >
            {status === "sending" ? "Enviando..." : status === "sent" ? "Enviado com sucesso!" : status === "error" ? "Falha ao enviar" : "Enviar"}
          </button>
        </form>
      </div>
    </section>
  );
});

export default Contato;
