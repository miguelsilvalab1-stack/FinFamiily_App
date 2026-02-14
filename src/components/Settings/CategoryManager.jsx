import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';

export const CategoryManager = () => {
  const {
    categories,
    getCategoriesByType,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory,
    resetToDefault
  } = useCategories();

  const [tipo, setTipo] = useState('despesa');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const categoriasList = getCategoriesByType(tipo);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      alert('Insira um nome para a categoria');
      return;
    }

    const exists = categoriasList.some(c => c.categoria === newCategoryName);
    if (exists) {
      alert('Esta categoria já existe');
      return;
    }

    addCategory(tipo, newCategoryName, []);
    setNewCategoryName('');
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (categoria) => {
    if (confirm(`Tem a certeza que deseja apagar a categoria "${categoria}"?`)) {
      deleteCategory(tipo, categoria);
    }
  };

  const handleAddSubcategory = (categoria) => {
    if (!newSubcategoryName.trim()) {
      alert('Insira um nome para a subcategoria');
      return;
    }

    const cat = categoriasList.find(c => c.categoria === categoria);
    if (cat && cat.subcategorias.includes(newSubcategoryName)) {
      alert('Esta subcategoria já existe');
      return;
    }

    addSubcategory(tipo, categoria, newSubcategoryName);
    setNewSubcategoryName('');
    setShowAddSubcategory(null);
  };

  const handleDeleteSubcategory = (categoria, subcategoria) => {
    if (confirm(`Tem a certeza que deseja apagar a subcategoria "${subcategoria}"?`)) {
      deleteSubcategory(tipo, categoria, subcategoria);
    }
  };

  const handleReset = () => {
    if (confirm('Tem a certeza que deseja repor as categorias predefinidas? Esta ação não pode ser revertida.')) {
      resetToDefault();
      alert('Categorias repostas com sucesso!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Tipo Toggle */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setTipo('despesa')}
          className={`py-3 px-4 rounded-lg font-medium transition-all ${
            tipo === 'despesa'
              ? 'bg-expense text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          📤 Despesas
        </button>
        <button
          onClick={() => setTipo('receita')}
          className={`py-3 px-4 rounded-lg font-medium transition-all ${
            tipo === 'receita'
              ? 'bg-income text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          📥 Receitas
        </button>
      </div>

      {/* Add Category Button */}
      {!showAddCategory ? (
        <button
          onClick={() => setShowAddCategory(true)}
          className="btn-outline w-full"
        >
          + Adicionar Categoria
        </button>
      ) : (
        <div className="card bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold mb-3">Nova Categoria</h3>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nome da categoria"
            className="input-field mb-3"
            autoFocus
          />
          <div className="flex gap-2">
            <button onClick={handleAddCategory} className="btn-primary flex-1">
              Guardar
            </button>
            <button
              onClick={() => {
                setShowAddCategory(false);
                setNewCategoryName('');
              }}
              className="btn-outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {categoriasList.map((cat) => (
          <div key={cat.categoria} className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {cat.categoria}
              </h3>
              <button
                onClick={() => handleDeleteCategory(cat.categoria)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Apagar
              </button>
            </div>

            {/* Subcategories */}
            {cat.subcategorias.length > 0 && (
              <div className="space-y-2 mb-3">
                {cat.subcategorias.map((sub) => (
                  <div
                    key={sub}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {sub}
                    </span>
                    <button
                      onClick={() => handleDeleteSubcategory(cat.categoria, sub)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Subcategory */}
            {showAddSubcategory === cat.categoria ? (
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <input
                  type="text"
                  value={newSubcategoryName}
                  onChange={(e) => setNewSubcategoryName(e.target.value)}
                  placeholder="Nome da subcategoria"
                  className="input-field mb-2"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddSubcategory(cat.categoria)}
                    className="btn-primary flex-1 text-sm py-2"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setShowAddSubcategory(null);
                      setNewSubcategoryName('');
                    }}
                    className="btn-outline text-sm py-2"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddSubcategory(cat.categoria)}
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                + Adicionar Subcategoria
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="btn-outline w-full text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
      >
        Repor Categorias Predefinidas
      </button>
    </div>
  );
};
