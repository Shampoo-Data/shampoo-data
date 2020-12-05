export const Shampoo = (props) => {
  const { name, brand, ingredients } = props;
  return (
    <div className="shampoo">
      <h2>{name}</h2>
      <h4>{brand.name}</h4>
      <p>{ingredients.map(({ name }) => name).join(', ')}</p>
    </div>
  );
};
