import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState('')

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function onSearchChange(e) {
    setSearchInput(e.target.value)
  }
  const itemsToDisplay = items.filter((item) => {
    const isAllCategory = selectedCategory === "All"
    const matchesCategory = isAllCategory ? true : item.category === selectedCategory
    const matchesSearch = item.name.toUpperCase().includes(searchInput.toUpperCase())
    return matchesCategory && matchesSearch
  });

  const onItemFormSubmit = (formData) => {
    setItems((prev)=>{
      return [...prev, formData]
    })
  }

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} search={searchInput} onSearchChange={onSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
