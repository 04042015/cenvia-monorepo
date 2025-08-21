import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PayrollDetailProps {
  payroll: {
    id: string;
    employee_id: string;
    period_year: number;
    period_month: number;
    base_salary: number;
    bonus: number;
    deductions: number;
    net_salary: number;
    status: string;
    published_at: string | null;
    paid_at: string | null;
    created_at: string;
    employees?: {
      employee_id: string;
      department: string;
      position: string;
      profiles?: {
        full_name: string;
      };
    };
  };
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function PayrollDetail({ payroll }: PayrollDetailProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-success text-success-foreground">Paid</Badge>;
      case 'published':
        return <Badge className="bg-primary text-primary-foreground">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payroll Details</CardTitle>
            {getStatusBadge(payroll.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Employee Name
              </label>
              <p className="font-medium">
                {payroll.employees?.profiles?.full_name || 'Unknown'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Employee ID
              </label>
              <p className="font-medium">{payroll.employees?.employee_id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Department
              </label>
              <p className="font-medium">{payroll.employees?.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Position
              </label>
              <p className="font-medium">{payroll.employees?.position}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Pay Period
              </label>
              <p className="font-medium">
                {MONTHS[payroll.period_month - 1]} {payroll.period_year}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base Salary:</span>
              <span className="font-medium">{formatCurrency(payroll.base_salary)}</span>
            </div>
            {payroll.bonus > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bonus:</span>
                <span className="font-medium text-success">+{formatCurrency(payroll.bonus)}</span>
              </div>
            )}
            {payroll.deductions > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deductions:</span>
                <span className="font-medium text-destructive">-{formatCurrency(payroll.deductions)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Net Salary:</span>
              <span className="text-primary">{formatCurrency(payroll.net_salary)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Created At
            </label>
            <p className="font-medium">
              {new Date(payroll.created_at).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {payroll.published_at && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Published At
              </label>
              <p className="font-medium">
                {new Date(payroll.published_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}
          {payroll.paid_at && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Paid At
              </label>
              <p className="font-medium">
                {new Date(payroll.paid_at).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}