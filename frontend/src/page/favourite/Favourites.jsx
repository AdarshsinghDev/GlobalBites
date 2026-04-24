import RecipeCard from '../../components/ui/RecipeCard';
import { recipeSamples } from '../../data/mockData';

const Favourites = () => (
  <div className="page section">
    <div className="container">
      <h1 className="text-h1">Saved Recipes</h1>
      <div className="grid-3" style={{ marginTop: 16 }}>
        {recipeSamples.map((r, i) => <RecipeCard key={r.id} recipe={r} index={i} />)}
      </div>
    </div>
  </div>
);

export default Favourites;
