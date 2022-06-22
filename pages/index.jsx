import Link from 'next/link'
import { getRecipe } from '../util/getRecipe'
import { useState } from 'react';
import axios from 'axios';

const Home = (props) => {

  const { recipe } = props
  const [ingredientText, setIngredientText] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const recipeString = JSON.stringify(recipe, null, 2)
  return (
    <div className="flex min-h-screen flex-col justify-center py-2">
      <main className="flex w-full flex-1 flex-col justify-center mx-auto text-center max-w-md">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://github.com/tpan/spagbol">
            SpagBol! 🍝
          </a>
        </h1>
        <p className='mt-2'>Enter a few ingredients and I'll tell you what's for dinner! 👨🏻‍🍳</p>
      
      <div className="mt-5 flex justify-between">
        <Link href="/api">
          <a className="underline font-bold">Developer API /api</a>
        </Link>

      </div>
      <div className="mt-4 text-left rounded-lg bg-slate-600 text-white p-5">
        <pre>
          {recipeString}
        </pre>
      </div>
      <textarea className='border border-solid border-black rounded-xl outline-none p-4 w-4/5' style={{ minHeight: 120 }}
            rows={1 + (ingredientText.split('\n').length)}
            value={ingredientText} onChange={(evt) => setIngredientText(evt.target.value)}
            placeholder={'Strawberries\nPasta\nCilantro'}>
      </textarea>

      <button className='speech-bubble-button'
            onClick={() => {
              if (ingredientText) {
                const ingredients = ingredientText.split('\n');
                if (ingredients.length < 2) {
                  setErrorMessage('Please enter at least 2 ingredients.');
                  return;
                }

                setLoading(true);
                axios.post('/api/generate-recipe', { ingredients })
                  .then(response => {
                    setLoading(false);
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
  // const ingredients = 

  return {
    props: {
      // recipe
    }
  }
}

export default Home
