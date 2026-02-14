import { useState, useEffect } from 'react';
import { useCategories } from '../../hooks/useCategories';
import { validateTransaction } from '../../utils/helpers';

export const TransactionForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const { getCategoriesByType, getSubcategories } = useCategories();

  const [formData, setFormData] = useState({
    tipo: 'despesa',
    valor: '',
    categoria: '',
    subcategoria: '',
    descricao: '',
    data: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});
  const [subcategoriasList, setSubcategoriasList] = useState([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.categoria) {
      const subs = getSubcategories(formData.tipo, formData.categoria);
      setSubcategoriasList(subs);
      if (!subs.includes(formData.subcategoria)) {
        setFormData(prev => ({ ...prev, subcategoria: '' }));
      }
    } else {
      setSubcategoriasList([]);
    }
  }, [formData.categoria, formData.tipo]);

  const handleTipoChange = (tipo) => {
    setFormData({
      ...formData,
      tipo,
      categoria: '',
      subcategoria: ''
    });
    setSubcategoriasList([]);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const transactionData = {
      ...formData,
      valor: parseFloat(formData.valor)
    };

    const validation = validateTransaction(transactionData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(transactionData);

    if (!initialData) {
      setFormData({
        tipo: formData.tipo,
        valor: '',
        categoria: '',
        subcategoria: '',
        descricao: '',
        data: new Date().toISOString().split('T')[0]
      });
    }
  };

  const categoriasList = getCategoriesByType(formData.tipo);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tipo Toggle */}
      <div>
        <label className="label">Tipo de Transação</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleTipoChange('despesa')}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              formData.tipo === 'despesa'
                ? 'bg-expense text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            📤 Despesa
          </button>
          <button
            type="button"
            onClick={() => handleTipoChange('receita')}
            className={`py-3 px-4 rounded-lg font-medium transition-all ${
              formData.tipo === 'receita'
                ? 'bg-income text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            📥 Receita
          </button>
        </div>
      </div>

      {/* Valor */}
      <div>
        <label htmlFor="valor" className="label">
          Valor (€)
        </label>
        <input
          type="number"
          id="valor"
          step="0.01"
          min="0"
          value={formData.valor}
          onChange={(e) => handleChange('valor', e.target.value)}
          className={`input-field ${errors.valor ? 'border-red-500' : ''}`}
          placeholder="0.00"
        />
        {errors.valor && (
          <p className="text-red-500 text-sm mt-1">{errors.valor}</p>
        )}
      </div>

      {/* Categoria */}
      <div>
        <label htmlFor="categoria" className="label">
          Categoria
        </label>
        <select
          id="categoria"
          value={formData.categoria}
          onChange={(e) => handleChange('categoria', e.target.value)}
          className={`input-field ${errors.categoria ? 'border-red-500' : ''}`}
        >
          <option value="">Selecione uma categoria</option>
          {categoriasList.map((cat) => (
            <option key={cat.categoria} value={cat.categoria}>
              {cat.categoria}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>
        )}
      </div>

      {/* Subcategoria */}
      {subcategoriasList.length > 0 && (
        <div>
          <label htmlFor="subcategoria" className="label">
            Subcategoria
          </label>
          <select
            id="subcategoria"
            value={formData.subcategoria}
            onChange={(e) => handleChange('subcategoria', e.target.value)}
            className="input-field"
          >
            <option value="">Selecione uma subcategoria</option>
            {subcategoriasList.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Descrição */}
      <div>
        <label htmlFor="descricao" className="label">
          Descrição (opcional)
        </label>
        <input
          type="text"
          id="descricao"
          value={formData.descricao}
          onChange={(e) => handleChange('descricao', e.target.value)}
          className="input-field"
          placeholder="Ex: Compras semanais..."
        />
      </div>

      {/* Data */}
      <div>
        <label htmlFor="data" className="label">
          Data
        </label>
        <input
          type="date"
          id="data"
          value={formData.data}
          onChange={(e) => handleChange('data', e.target.value)}
          className={`input-field ${errors.data ? 'border-red-500' : ''}`}
        />
        {errors.data && (
          <p className="text-red-500 text-sm mt-1">{errors.data}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button type="submit" className="btn-primary flex-1">
          {initialData ? 'Atualizar' : 'Guardar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
