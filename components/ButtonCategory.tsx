import React, { useState } from "react";
import styled from "styled-components";


type KategoryItem = {
  category: string;
};

type CategoryProps = {
  categories: KategoryItem[];
  onCategorySelect: (category: string) => void;
};

export default function CategorySelector({ categories, onCategorySelect }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("terbaru");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  }

  return (
    <div>
      {categories.map((cat, i) => (
        <PilihanKategory
          key={i}
          category={cat.category}
          isSelected={cat.category === selectedCategory}
          onSelect={handleCategorySelect}
        />
      ))}
    </div>
  );
}

type PilihanKategoryProps = {
  category: string;
  isSelected: boolean;
  onSelect: (category: string) => void;
};

function PilihanKategory({ category, isSelected, onSelect }: PilihanKategoryProps) {
  const Button = styled.button`
    background: ${isSelected ? 'rgb(var(--secondary))' : 'rgb(var(--secondaryBackground))'};
    color: ${isSelected ? 'rgb(var(--textSecondary))' : 'rgb(var(--text))'};
    border: none;
    border-radius: 12px;
    box-shadow: 0 5px 5px rgba(10, 10, 10, 0.1);
    white-space: nowrap;
    margin: 1rem;
    padding: 1rem;
    size-text: 10px;
    font-size: 2rem;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 6px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.2);
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  `;
  return (
    <Button
      onClick={() => onSelect(category)}>
      {category.toLocaleUpperCase()}
    </Button>
  );
}
