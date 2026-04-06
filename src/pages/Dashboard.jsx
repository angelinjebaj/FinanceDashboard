import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAppContext } from '../context/AppContext';
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

export const Dashboard = () => {
  const { transactions } = useAppContext();

  // Basic mock calculations
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // Mock data for charts
  const monthlyData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
  ];

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-sm text-textMuted mt-1">Welcome back! Here's your financial overview.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5 hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-primary">Total Balance</p>
                <h3 className="text-3xl font-bold text-text mt-2">₹{balance.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-primary/20 rounded-xl">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-success flex items-center"><ArrowUpRight className="w-4 h-4 mr-1" /> +2.5%</span>
              <span className="text-textMuted ml-2">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-textMuted">Total Income</p>
                <h3 className="text-3xl font-bold text-text mt-2">₹{totalIncome.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-success/10 rounded-xl">
                <ArrowUpRight className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:-translate-y-1 transition-transform duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-textMuted">Total Expenses</p>
                <h3 className="text-3xl font-bold text-text mt-2">₹{totalExpense.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-danger/10 rounded-xl">
                <ArrowDownRight className="w-6 h-6 text-danger" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Cash Flow Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text)' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="var(--color-success)" strokeWidth={2} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="expense" stroke="var(--color-danger)" strokeWidth={2} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <button className="text-sm text-primary hover:underline">View all</button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {tx.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text">{tx.description}</p>
                      <p className="text-xs text-textMuted">{tx.date}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold ${tx.type === 'income' ? 'text-success' : 'text-text'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
