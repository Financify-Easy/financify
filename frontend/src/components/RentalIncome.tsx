import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, FileText, User, DollarSign, PlusCircle, Upload } from "lucide-react";

export function RentalIncome() {
  const [properties, setProperties] = useState<{
    id: number;
    address: string;
    tenant: string;
    rent: number;
    statements: { name: string; url: string }[];
  }[]>([]);
  const [form, setForm] = useState({
    address: "",
    tenant: "",
    rent: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);

  // Add new property
  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.address || !form.tenant || !form.rent) return;
    setProperties([
      ...properties,
      {
        id: Date.now(),
        address: form.address,
        tenant: form.tenant,
        rent: parseFloat(form.rent),
        statements: [],
      },
    ]);
    setForm({ address: "", tenant: "", rent: "" });
  };

  // Upload statement/payment for a property
  const handleUpload = (e: React.FormEvent, propertyId: number) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploadingId(propertyId);
    setTimeout(() => {
      setProperties(props =>
        props.map(p =>
          p.id === propertyId
            ? {
                ...p,
                statements: [
                  ...p.statements,
                  { name: selectedFile.name, url: URL.createObjectURL(selectedFile) },
                ],
              }
            : p
        )
      );
      setUploadingId(null);
      setSelectedFile(null);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Home className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rental Income</h1>
          <p className="text-gray-600">Track your property investments, tenants, and rental payments</p>
        </div>
      </div>

      {/* Add Property Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5" />
            Add Property
          </CardTitle>
          <CardDescription>Add a new rental property</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col md:flex-row gap-2" onSubmit={handleAddProperty}>
            <Input
              placeholder="Property Address"
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            />
            <Input
              placeholder="Tenant Name"
              value={form.tenant}
              onChange={e => setForm(f => ({ ...f, tenant: e.target.value }))}
            />
            <Input
              placeholder="Monthly Rent ($)"
              type="number"
              value={form.rent}
              onChange={e => setForm(f => ({ ...f, rent: e.target.value }))}
            />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>

      {/* Properties List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.length === 0 && (
          <Card>
            <CardContent className="text-gray-400 py-8 text-center">No properties added yet.</CardContent>
          </Card>
        )}
        {properties.map(property => (
          <Card key={property.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="w-5 h-5 text-blue-600" />
                {property.address}
              </CardTitle>
              <CardDescription>Tenant: <User className="inline w-4 h-4 mr-1" />{property.tenant}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold">${property.rent.toLocaleString()} / month</span>
              </div>
              {/* Upload statement/payment */}
              <form className="flex gap-2 mb-2" onSubmit={e => handleUpload(e, property.id)}>
                <Input type="file" accept="application/pdf,image/*" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />
                <Button type="submit" disabled={uploadingId === property.id || !selectedFile}>
                  {uploadingId === property.id ? "Uploading..." : "Upload Statement"}
                </Button>
              </form>
              <div className="font-semibold mb-1">Statements & Payments</div>
              <ul className="space-y-2">
                {property.statements.map((file, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                      {file.name}
                    </a>
                  </li>
                ))}
                {property.statements.length === 0 && <li className="text-gray-400">No statements uploaded yet.</li>}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 