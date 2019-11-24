import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt";
import Mail from "../../lib/Mail";

class CancellationMail {
  get key() {
    return "HelpOrderMail";
  }

  async handle({ data }) {
    const { help_order } = data;

    console.log("A fila executou");

    await Mail.sendMail({
      to: `${help_order.student.name} <${help_order.student.email}>`,
      subject: "Resposta de seu questionamento",
      template: "help_order",
      context: {
        name: help_order.student.name,
        email: help_order.student.email,
        question: help_order.question,
        answer: help_order.answer,
        date: format(
          parseISO(help_order.answer_at),
          "'dia' dd 'de' MMMM 'às' H:mm'h'",
          {
            locale: pt
          }
        )
      }
    });
  }
}

export default new CancellationMail();
