import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAppContext } from '../context/AppContext';
import { Search, Filter, Trash2, Edit2 } from 'lucide-react';
import clsx from 'clsx';

export const Transactions = () => {
  const { transactions, role, deleteTransaction } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' ? true : tx.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Transactions</h1>
          <p className="text-sm text-textMuted mt-1">Manage and view all your financial records.</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-textMuted" />
            <input 
              type="text" 
              placeholder="Search description or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-textMuted" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-background sticky top-0 z-10 z-0">
              <tr>
                <th className="px-6 py-3 font-medium text-textMuted border-b border-border">Date</th>
                <th className="px-6 py-3 font-medium text-textMuted border-b border-border">Description</th>
                <th className="px-6 py-3 font-medium text-textMuted border-b border-border">Category</th>
                <th className="px-6 py-3 font-medium text-textMuted border-b border-border text-right">Amount</th>
                {role === 'Admin' && <th className="px-6 py-3 font-medium text-textMuted border-b border-border text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={role === 'Admin' ? 5 : 4} className="px-6 py-12 text-center text-textMuted">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4 text-textMuted">{tx.date}</td>
                    <td className="px-6 py-4 font-medium text-text">{tx.description}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-background border border-border">
                        {tx.category}
                      </span>
                    </td>
                    <td className={clsx(
                      "px-6 py-4 text-right font-medium",
                      tx.type === 'income' ? 'text-success' : 'text-text'
                    )}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    {role === 'Admin' && (
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-textMuted hover:text-primary transition-colors rounded hover:bg-primary/10">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => deleteTransaction(tx.id)}
                            className="p-1.5 text-textMuted hover:text-danger transition-colors rounded hover:bg-danger/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
