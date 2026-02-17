import { knowledgeBase } from "../data/knowledgeBase";

export const getBotResponse = (input) => {
  const message = input.toLowerCase();

  for (let item of knowledgeBase) {
    const match = item.keywords.some(keyword =>
      message.includes(keyword)
    );

    if (match) {
      return item.response;
    }
  }

  return "No entendí su consulta. ¿Puede describir mejor sus síntomas?";
};
