const axios = require('axios');
const apiKey = process.env.OPENAI_API_KEY;
const baseUrl = "https://openrouter.ai/api/v1";

const getRecipe = async (req, res) => {
    // req.params.food es un array de ingredientes, ej: ["pollo", "arroz"]
    // req.params.lg es el idioma, ej: "es" para español

    const languages = {
        "es": "Español",
        "en": "Ingles",
        "ca": "Català",
        "eu": "Euskara",
    }
    
    const { lg, food } = req.body;

    if (!lg || !Array.isArray(food)) {
      return res.status(400).json({ error: "Parámetros inválidos. Asegúrate de enviar 'lg' y 'food' en el cuerpo de la petición." });
    }
    
    const message = `Genera una receta de cocina en ${languages[lg]} con los siguientes ingredientes (no es necesario incluirlos todos): ${food.join(", ")}. con esta estructura: 1. Ingredientes: 2. Instrucciones:
        {
            "title": "Nombre de la receta",
            "description": "Una breve descripción",
            "servings": "Número de personas",
            "ingredients": ["Lista", "de", "ingredientes"],
            "instructions": ["Paso 1", "Paso 2", "Paso 3"],
            "tips": ["Consejo opcional 1", "Consejo opcional 2"]
        }
    `;
    try {
        const response = await axios.post(
          `${baseUrl}/chat/completions`,
          {
            model: "deepseek/deepseek-r1:free",
            messages: [
              {
                role: "user",
                content: message,
              },
            ],
          },
          {
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            }
          }
        );
    
        const raw = response.data.choices[0].message.content;
const jsonString = raw.replace(/```json\n?/, '').replace(/```/, '');
const recipe = JSON.parse(jsonString);
res.status(200).json(recipe);

      } catch (error) {
        res.status(500).json({ error: "Error generating the CV" });
    }
}

module.exports = { getRecipe };