const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic();

const VALID_PRIORITIES = ['low', 'medium', 'high'];
const DEFAULT_PRIORITY = 'medium';

async function suggestPriority(title, description) {
  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 10,
      system:
        'Eres un clasificador de urgencia/importancia de tareas. Responde ÚNICAMENTE con una palabra, sin puntuación ni explicaciones: "low", "medium" o "high".',
      messages: [
        {
          role: 'user',
          content: `Título: ${title}\nDescripción: ${description || '(sin descripción)'}`,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const suggestion = textBlock?.text?.trim().toLowerCase();

    return VALID_PRIORITIES.includes(suggestion) ? suggestion : DEFAULT_PRIORITY;
  } catch (err) {
    console.error('Error al obtener prioridad sugerida por IA:', err.message);
    return DEFAULT_PRIORITY;
  }
}

module.exports = { suggestPriority };
