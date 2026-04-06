import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Target, TrendingDown, PiggyBank, BarChart2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useAppContext } from '../context/AppContext';

export const Insights = () => {
  const { transactions } = useAppContext();

  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.keys(expenseData).map(key => ({
    name: key,
    value: expenseData[key]
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Insights</h1>
          <p className="text-sm text-textMuted mt-1">Deep dive into your spending habits.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-textMuted">Highest Spending</p>
              <h4 className="text-lg font-bold text-text">Housing</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
              <PiggyBank className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-textMuted">Savings Rate</p>
              <h4 className="text-lg font-bold text-text">24.5%</h4>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-textMuted">Monthly Goal</p>
              <h4 className="text-lg font-bold text-text">On Track</h4>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-textMuted">Total Logged</p>
              <h4 className="text-lg font-bold text-text">{transactions.length} items</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--color-text)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-textMuted">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spending Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-sm text-text leading-relaxed">
                Your highest spending category currently is <strong className="text-primary">{pieData.length > 0 ? [...pieData].sort((a,b) => b.value - a.value)[0].name : 'N/A'}</strong>. 
                Monitoring this category can have the biggest impact on your budget.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-sm text-text leading-relaxed">
                You log a total of <strong className="text-success">{transactions.filter(t => t.type === 'income').length}</strong> income source(s) and <strong className="text-danger">{transactions.filter(t => t.type === 'expense').length}</strong> expenses. Good job keeping track!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
