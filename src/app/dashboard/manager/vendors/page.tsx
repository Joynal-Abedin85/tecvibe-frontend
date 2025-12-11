"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/manager/vendors")
      .then(res => setVendors(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <Card className="shadow-md bg-[var(--color-bgs)] text-[var(--color-texts)]">
      <CardHeader><CardTitle>All Vendors</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Shop</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Area</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map(v => (
              <TableRow key={v.id}>
                <TableCell>{v.user?.name}</TableCell>
                <TableCell>{v.shopname}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>{v.area}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
