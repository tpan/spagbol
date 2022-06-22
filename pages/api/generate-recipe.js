const { Configuration, OpenAIApi } = require("openai");
import { supabaseClient } from '../../util/supabaseClient'

export default async function generateRecipe(req, res) {
    if (req.method === "POST") {
        const configuration = new Configuration({
            organization: "org-Z5erv9yk6lMCpQzcAWzWgitA",
            apiKey: process.env.OPENAI_API_KEY,
        });

        let {ingredients} = req.body;

        ingredients = ingredients ?? [];

        const openai = new OpenAIApi(configuration);
        const prompt = `Write a recipe based on these ingredients:\n\nIngredients:\n${ingredients.join('\n')}`

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-002",
                prompt: prompt,
                temperature: 0,
                max_tokens: 500,
            });

            if (completion.data.choices && completion.data.choices.length > 0) {
                const choice = completion.data.choices[0];
                let values = choice.text.split('\n');
                values = values.filter(v => v.trim() != '');
                const name = values[0];
                const instructions = values.slice(1, values.length - 1);
                const { data, error } = await supabaseClient
                  .from('recipes')
                  .insert([
                    {
                      name: name,
                      image_url: null,
                      ingredients: ingredients,
                      instructions: instructions,
                      source: 'openAI Generated'
                    }
                  ]);
                console.log(error)
          
                return res.status(200).json((data || [])[0]);
            }
        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
                console.log(error.response.data);
              } else {
                console.log(error.message);
              }
        }
    }
};