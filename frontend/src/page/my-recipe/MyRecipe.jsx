import RecipeCard from '../../components/ui/RecipeCard';
import { recipeSamples } from '../../data/mockData';

const MyRecipe = () => (
  <div className="page section">
    <div className="container">
      <h1 className="text-h1">My Recipes</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Your generated recipes live here for quick access.</p>
      <div className="grid-3" style={{ marginTop: 16 }}>
        {recipeSamples.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
      </div>
    </div>
  </div>
);

export default MyRecipe;
