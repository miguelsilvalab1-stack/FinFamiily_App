import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { defaultCategories } from '../data/defaultCategories';

export const useCategories = () => {
  const [categories, setCategories] = useState(defaultCategories);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const savedCategories = storage.getCategories();
    if (savedCategories) {
      setCategories(savedCategories);
    } else {
      storage.saveCategories(defaultCategories);
      setCategories(defaultCategories);
    }
  };

  const saveCategories = (newCategories) => {
    const success = storage.saveCategories(newCategories);
    if (success) {
      setCategories(newCategories);
    }
    return success;
  };

  const getCategoriesByType = (tipo) => {
    return categories[tipo] || [];
  };

  const getSubcategories = (tipo, categoria) => {
    const typeCategories = categories[tipo] || [];
    const found = typeCategories.find(c => c.categoria === categoria);
    return found ? found.subcategorias : [];
  };

  const addCategory = (tipo, categoria, subcategorias = []) => {
    const newCategories = { ...categories };
    if (!newCategories[tipo]) {
      newCategories[tipo] = [];
    }
    newCategories[tipo].push({ categoria, subcategorias });
    return saveCategories(newCategories);
  };

  const updateCategory = (tipo, oldName, newName, subcategorias) => {
    const newCategories = { ...categories };
    const index = newCategories[tipo].findIndex(c => c.categoria === oldName);
    if (index !== -1) {
      newCategories[tipo][index] = {
        categoria: newName,
        subcategorias: subcategorias || newCategories[tipo][index].subcategorias
      };
      return saveCategories(newCategories);
    }
    return false;
  };

  const deleteCategory = (tipo, categoria) => {
    const newCategories = { ...categories };
    newCategories[tipo] = newCategories[tipo].filter(c => c.categoria !== categoria);
    return saveCategories(newCategories);
  };

  const addSubcategory = (tipo, categoria, subcategoria) => {
    const newCategories = { ...categories };
    const catIndex = newCategories[tipo].findIndex(c => c.categoria === categoria);
    if (catIndex !== -1) {
      newCategories[tipo][catIndex].subcategorias.push(subcategoria);
      return saveCategories(newCategories);
    }
    return false;
  };

  const deleteSubcategory = (tipo, categoria, subcategoria) => {
    const newCategories = { ...categories };
    const catIndex = newCategories[tipo].findIndex(c => c.categoria === categoria);
    if (catIndex !== -1) {
      newCategories[tipo][catIndex].subcategorias =
        newCategories[tipo][catIndex].subcategorias.filter(s => s !== subcategoria);
      return saveCategories(newCategories);
    }
    return false;
  };

  const resetToDefault = () => {
    return saveCategories(defaultCategories);
  };

  return {
    categories,
    getCategoriesByType,
    getSubcategories,
    addCategory,
    updateCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory,
    resetToDefault
  };
};
