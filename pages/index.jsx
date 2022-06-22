import Link from 'next/link'
import { getRecipe } from '../util/getRecipe'

const Home = (props) => {

  const { recipe } = props

  const recipeString = JSON.stringify(recipe, null, 2)
  console.log(recipeString)
  return (
    <div className="flex min-h-screen flex-col justify-center py-2">
      <main className="flex w-full flex-1 flex-col justify-center mx-auto text-center max-w-md">
        <h1 className="text-4xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://github.com/tpan/spagbol">
            SpagBol! 🍝
          </a>
        </h1>
        <p className='mt-2'>What's for dinner?</p>
      
      <div className="mt-5 flex justify-between">
        <Link href="/api">
          <a className="underline font-bold">Developer API /api</a>
        </Link>

        <button type="button">refresh</button>
      </div>

      <div className="mt-4 text-left rounded-lg bg-slate-600 text-white p-5">
        <pre>
          {recipeString}
        </pre>
      </div>
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
