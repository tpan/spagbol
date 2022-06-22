import OpenAI from 'openai';


export default async function generateRecipe(req, res) {
    if (req.method === "POST") {
        console.log(req)
    }
    return console.log(req)
};