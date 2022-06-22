// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRecipe } from '../../util/getRecipe'

export default async function handler(
  req, res
) {
  const recipe = await getRecipe()
  res.status(200).json(recipe)
}
