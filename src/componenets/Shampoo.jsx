export const Shampoo = (props) => {
  const { name, brand, ingredients } = props;
  return (
    <>
      <div className="shampoo">
        <div className="icon">
          <img src="./default.svg" alt="shampoo bottle" />
        </div>
        <div className="info">
          <h2>{name}</h2>
          <h4>{brand.name}</h4>
          <p>{ingredients.map(({ name }) => name).join(', ')}</p>
        </div>
      </div>
      <style jsx>{`
        .shampoo {
          display: grid;
          grid-template-columns: 1fr 3fr;

          border: 1px solid grey;
          padding: 0.75rem;
        }

        .icon {
          height: 100px;
          width: 100px;
        }
      `}</style>
    </>
  );
};
