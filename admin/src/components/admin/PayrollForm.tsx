import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const payrollSchema = z.object({
  employee_id: z.string().min(1, 'Employee is required'),
  period_year: z.number().min(2020).max(2030),
  period_month: z.number().min(1).max(12),
  base_salary: z.number().min(0, 'Base salary must be positive'),
  bonus: z.number().min(0, 'Bonus must be positive').default(0),
  deductions: z.number().min(0, 'Deductions must be positive').default(0),
});

type PayrollFormValues = z.infer<typeof payrollSchema>;

interface Employee {
  id: string;
  employee_id: string;
  base_salary: number;
  department: string;
  position: string;
  profiles?: {
    full_name: string;
  };
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

interface PayrollFormProps {
  payroll?: any;
  onSuccess: () => void;
}

export function PayrollForm({ payroll, onSuccess }: PayrollFormProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const currentDate = new Date();
  const form = useForm<PayrollFormValues>({
    resolver: zodResolver(payrollSchema),
    defaultValues: {
      employee_id: payroll?.employee_id || '',
      period_year: payroll?.period_year || currentDate.getFullYear(),
      period_month: payroll?.period_month || currentDate.getMonth() + 1,
      base_salary: payroll?.base_salary || 0,
      bonus: payroll?.bonus || 0,
      deductions: payroll?.deductions || 0,
    },
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          profiles (full_name)
        `)
        .eq('status', 'active')
        .order('employee_id');

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEmployeeChange = (employeeId: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      form.setValue('base_salary', employee.base_salary);
    }
  };

  const watchedValues = form.watch(['base_salary', 'bonus', 'deductions']);
  const netSalary = watchedValues[0] + watchedValues[1] - watchedValues[2];

  const onSubmit = async (values: PayrollFormValues) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create payroll",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const payrollData = {
        employee_id: values.employee_id,
        period_year: values.period_year,
        period_month: values.period_month,
        base_salary: values.base_salary,
        bonus: values.bonus,
        deductions: values.deductions,
        net_salary: netSalary,
        created_by: user.id,
        status: 'draft' as const,
      };

      // Check if payroll already exists for this employee and period
      const { data: existingPayroll } = await supabase
        .from('payroll')
        .select('id')
        .eq('employee_id', values.employee_id)
        .eq('period_year', values.period_year)
        .eq('period_month', values.period_month)
        .single();

      if (existingPayroll && !payroll) {
        toast({
          title: "Error",
          description: "Payroll already exists for this employee and period",
          variant: "destructive",
        });
        return;
      }

      let result;
      if (payroll) {
        // Update existing payroll
        result = await supabase
          .from('payroll')
          .update(payrollData)
          .eq('id', payroll.id)
          .select();
      } else {
        // Create new payroll
        result = await supabase
          .from('payroll')
          .insert(payrollData)
          .select();
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: `Payroll ${payroll ? 'updated' : 'created'} successfully`,
      });

      onSuccess();
    } catch (error) {
      console.error('Error saving payroll:', error);
      toast({
        title: "Error",
        description: `Failed to ${payroll ? 'update' : 'create'} payroll`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 1; i <= currentYear + 1; i++) {
      years.push(i);
    }
    return years;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  handleEmployeeChange(value);
                }} 
                value={field.value}
                disabled={!!payroll}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      <div className="flex flex-col">
                        <span>{employee.profiles?.full_name}</span>
                        <span className="text-sm text-muted-foreground">
                          ID: {employee.employee_id} | {employee.department} - {employee.position}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="period_year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  value={field.value.toString()}
                  disabled={!!payroll}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {generateYears().map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="period_month"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <Select 
                  onValueChange={(value) => field.onChange(parseInt(value))} 
                  value={field.value.toString()}
                  disabled={!!payroll}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MONTHS.map((month, index) => (
                      <SelectItem key={month} value={(index + 1).toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="base_salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Salary</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter base salary..."
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="bonus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bonus</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter bonus amount..."
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="deductions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deductions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter deduction amount..."
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="p-4 bg-accent rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Net Salary:</span>
            <span className="text-xl font-bold text-primary">
              {formatCurrency(netSalary)}
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-dark"
          >
            {loading ? 'Saving...' : payroll ? 'Update Payroll' : 'Create Payroll'}
          </Button>
        </div>
      </form>
    </Form>
  );
}