import Link from 'next/link'
import { getRecipe } from '../util/getRecipe'
import { useState } from 'react';
import axios from 'axios';

const Home = (props) => {

  const { recipe } = props
  const [ingredientText, setIngredientText] = useState('');
  const [recipeString, setRecipeString] = useState(JSON.stringify(recipe, null, 2));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  return (
    <div className="flex min-h-screen flex-col justify-center py-2">
      <main className="flex w-full flex-1 flex-col justify-center mx-auto text-center max-w-screen-md">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://github.com/tpan/spagbol">
            SpagBol! 🍝
          </a>
        </h1>
        <p className='mt-2'>Enter a few ingredients and I'll tell you what's for dinner! 👨🏻‍🍳</p>
      
      <div className="mt-4 text-left rounded-lg bg-slate-600 text-white p-5">
        <pre className="whitespace-pre-line">
          {recipeString}
        </pre>
      </div>
      <textarea className='border border-solid border-black rounded-xl outline-none p-5 mt-2' style={{ minHeight: 120 }}
            rows={1 + (ingredientText.split('\n').length)}
            value={ingredientText} onChange={(evt) => setIngredientText(evt.target.value)}
            placeholder={'Gochujang\nChicken\nYogurt'}>
      </textarea>

      <button className='p-4 rounded-lg bg-orange text-black mt-4 mb-8 shadow-lg text-xl font-bold'
            onClick={() => {
              if (ingredientText) {
                const ingredients = ingredientText.split('\n');
                if (ingredients.length < 3) {
                  setErrorMessage('Please enter at least 3 ingredients.');
                  return;
                }

                setLoading(true);
                axios.post('/api/generate-recipe', { ingredients })
                  .then(response => {
                    setLoading(false);
                    setRecipeString(JSON.stringify(response.data, null, 2))
                    setErrorMessage('');
                  })
                  .catch(error => {
                    setLoading(false);
                    setErrorMessage('An error occurred while generating a recipe. Please refresh the page and try again.');
                  });
              }
            }}>
            {
              loading ? 'Generating...' : 'Generate recipe'
            }
          </button>
      </main>
    </div>
  )
}

export async function getServerSideProps() {
  const recipe = await getRecipe();

  return {
    props: {
      recipe
    }
  }
}

export default Home
