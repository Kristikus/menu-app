const ButtonFilter = ({ filteredCategories }) => {
  return (
    <div>
      {filteredCategories.map((category, i) => {
        return <button key={i}>{category}</button>;
      })}
      <button>Tous</button>
    </div>
  );
};

export default ButtonFilter;
