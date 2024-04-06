const ButtonFilter = ({ filteredCategories, handleFilterAllCategories, handleFilterCategory }) => {
 
  return (
    <div className="button-container">
      {filteredCategories.map((category, i) => {
        return (
          <button key={i} onClick={() => handleFilterCategory(category)}>
            {category}
          </button>
        );
      })}
      <button onClick={handleFilterAllCategories}>Tous</button>
    </div>
  );
};

export default ButtonFilter;
