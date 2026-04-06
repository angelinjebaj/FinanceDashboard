import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useAppContext } from '../../context/AppContext';

export const AddTransactionModal = ({ isOpen, onClose }) => {
  const { addTransaction } = useAppContext();
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    method: 'Credit Card',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTransaction({
        ...formData,
        amount: Number(formData.amount)
      });
      // Reset form
      setFormData({
        description: '', amount: '', type: 'expense', category: 'Food',
        date: new Date().toISOString().split('T')[0], method: 'Credit Card', notes: ''
      });
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-sm font-medium text-textMuted">Type</label>
            <div className="flex bg-background border border-border rounded-lg p-1">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'expense' }})}
                className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${formData.type === 'expense' ? 'bg-card shadow-sm text-text' : 'text-textMuted hover:text-text'}`}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'income' }})}
                className={`flex-1 rounded-md py-1.5 text-sm font-medium transition-colors ${formData.type === 'income' ? 'bg-card shadow-sm text-text' : 'text-textMuted hover:text-text'}`}
              >
                Income
              </button>
            </div>
          </div>

          <div className="space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-sm font-medium text-textMuted">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted font-medium">₹</span>
              <input
                type="number"
                name="amount"
                step="0.01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full bg-background border ${errors.amount ? 'border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'} rounded-lg pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 transition-all`}
              />
            </div>
            {errors.amount && <p className="text-xs text-danger mt-1">{errors.amount}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-textMuted">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="E.g., Groceries from Whole Foods"
            className={`w-full bg-background border ${errors.description ? 'border-danger focus:ring-danger' : 'border-border focus:border-primary focus:ring-primary'} rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all`}
          />
          {errors.description && <p className="text-xs text-danger mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-textMuted">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
            >
              <option value="Food">Food & Dining</option>
              <option value="Utilities">Utilities</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Income">Income / Salary</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-textMuted">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-textMuted">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional details..."
            rows={2}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-6">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Record
          </Button>
        </div>
      </form>
    </Modal>
  );
};
