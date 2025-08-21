import React, { useState, useEffect } from 'react';
import { Plus, Download, Edit, Eye, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PayrollForm } from '@/components/admin/PayrollForm';
import { PayrollDetail } from '@/components/admin/PayrollDetail';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface PayrollRecord {
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
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Payroll() {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState<PayrollRecord | null>(null);
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchPayrollRecords();
  }, [selectedYear, selectedMonth]);

  const fetchPayrollRecords = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('payroll')
        .select(`
          *,
          employees (
            employee_id,
            department,
            position,
            profiles (full_name)
          )
        `)
        .order('period_year', { ascending: false })
        .order('period_month', { ascending: false });

      if (selectedYear) {
        query = query.eq('period_year', parseInt(selectedYear));
      }
      if (selectedMonth) {
        query = query.eq('period_month', parseInt(selectedMonth));
      }

      const { data, error } = await query;

      if (error) throw error;
      setPayrollRecords(data || []);
    } catch (error) {
      console.error('Error fetching payroll records:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payroll records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePublishPayroll = async (id: string) => {
    if (!confirm('Are you sure you want to publish this payroll? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('payroll')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Payroll published successfully",
      });
      
      fetchPayrollRecords();
    } catch (error) {
      console.error('Error publishing payroll:', error);
      toast({
        title: "Error",
        description: "Failed to publish payroll",
        variant: "destructive",
      });
    }
  };

  const handleMarkAsPaid = async (id: string) => {
    if (!confirm('Mark this payroll as paid?')) return;

    try {
      const { error } = await supabase
        .from('payroll')
        .update({ 
          status: 'paid',
          paid_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Payroll marked as paid",
      });
      
      fetchPayrollRecords();
    } catch (error) {
      console.error('Error updating payroll:', error);
      toast({
        title: "Error",
        description: "Failed to update payroll status",
        variant: "destructive",
      });
    }
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i.toString());
    }
    return years;
  };

  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.net_salary, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
          <p className="text-muted-foreground">
            Manage employee salaries and payroll records
          </p>
        </div>
        {isAdmin() && (
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary-dark">
                <Plus className="mr-2 h-4 w-4" />
                Create Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Payroll Record</DialogTitle>
              </DialogHeader>
              <PayrollForm
                onSuccess={() => {
                  setIsCreateDialogOpen(false);
                  fetchPayrollRecords();
                }}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Records
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payrollRecords.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Amount
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPayroll)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollRecords.filter(r => r.status === 'published' || r.status === 'paid').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payrollRecords.filter(r => r.status === 'paid').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Years</SelectItem>
                {generateYears().map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Months</SelectItem>
                {MONTHS.map((month, index) => (
                  <SelectItem key={month} value={(index + 1).toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading payroll records...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No payroll records found for the selected period.
                    </TableCell>
                  </TableRow>
                ) : (
                  payrollRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        <div>
                          {record.employees?.profiles?.full_name || 'Unknown'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ID: {record.employees?.employee_id}
                        </div>
                      </TableCell>
                      <TableCell>
                        {MONTHS[record.period_month - 1]} {record.period_year}
                      </TableCell>
                      <TableCell>{record.employees?.department}</TableCell>
                      <TableCell>{formatCurrency(record.base_salary)}</TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(record.net_salary)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(record.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedPayroll(record)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Payroll Details</DialogTitle>
                              </DialogHeader>
                              {selectedPayroll && (
                                <PayrollDetail payroll={selectedPayroll} />
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {isAdmin() && record.status === 'draft' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePublishPayroll(record.id)}
                              >
                                Publish
                              </Button>
                            </>
                          )}
                          
                          {isAdmin() && record.status === 'published' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsPaid(record.id)}
                              className="text-success hover:text-success"
                            >
                              Mark Paid
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}