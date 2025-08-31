// admin/payroll/index.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PayrollDetail } from "@/components/admin/PayrollDetail";
import { PayrollForm } from "@/components/admin/PayrollForm";
import { useUserRole } from "@/hooks/useUserRole"; // bikin custom hook
import { Button } from "@/components/ui/button";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const role = useUserRole();

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    const { data, error } = await supabase
      .from("payroll")
      .select(`*, employees ( employee_id, department, position, profiles(full_name) )`)
      .order("created_at", { ascending: false });

    if (!error) setPayrolls(data || []);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Payroll Management</h1>

      {/* ADMIN ONLY → bisa tambah payroll */}
      {role === "admin" && (
        <div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close Form" : "Add Payroll"}
          </Button>

          {showForm && (
            <div className="mt-4">
              <PayrollForm onSuccess={() => {
                setShowForm(false);
                fetchPayrolls();
              }} />
            </div>
          )}
        </div>
      )}

      {/* Semua role bisa lihat payroll detail */}
      <div className="space-y-6">
        {payrolls.map((payroll) => (
          <PayrollDetail key={payroll.id} payroll={payroll} />
        ))}
      </div>

      {/* NON-ADMIN Info */}
      {role !== "admin" && (
        <p className="text-sm text-muted-foreground">
          Anda hanya bisa melihat dan mengunduh slip gaji.
        </p>
      )}
    </div>
  );
}

