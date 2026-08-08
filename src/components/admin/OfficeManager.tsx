"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOffice, deleteOffice, updateOffice } from "@/actions/office";
import { Plus, Trash2, Pencil, MapPin, Phone, Mail, Globe, Star, ArrowUpDown } from "lucide-react";

const officeSchema = z.object({
  title: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  mapUrl: z.string().optional(),
  isHeadOffice: z.boolean().default(false),
  order: z.number().default(0),
});

type OfficeFormValues = z.infer<typeof officeSchema>;

export function OfficeManager({ initialOffices }: { initialOffices: any[] }) {
  const [offices, setOffices] = useState(initialOffices);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingOffice, setEditingOffice] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<OfficeFormValues>({
    resolver: zodResolver(officeSchema),
    defaultValues: {
      title: "",
      country: "",
      address: "",
      phone: "",
      email: "",
      mapUrl: "",
      isHeadOffice: false,
      order: 0,
    },
  });

  const resetForm = () => {
    reset({
      title: "",
      country: "",
      address: "",
      phone: "",
      email: "",
      mapUrl: "",
      isHeadOffice: false,
      order: 0,
    });
    setEditingOffice(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (office: any) => {
    setEditingOffice(office);
    reset({
      title: office.title || "",
      country: office.country || "",
      address: office.address || "",
      phone: office.phone || "",
      email: office.email || "",
      mapUrl: office.mapUrl || "",
      isHeadOffice: office.isHeadOffice || false,
      order: office.order ?? 0,
    });
    setShowModal(true);
  };

  const onSubmit = async (values: OfficeFormValues) => {
    setLoading(true);

    if (editingOffice) {
      const res = await updateOffice(editingOffice._id, values);
      if (res.success) {
        setOffices((prev) =>
          prev.map((item) => (item._id === editingOffice._id ? { ...item, ...values } : item))
        );
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    } else {
      const res = await createOffice(values);
      if (res.success) {
        if (res.data) {
          setOffices((prev) => [res.data, ...prev]);
        }
        setShowModal(false);
        resetForm();
      } else {
        alert(res.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch office?")) return;
    const res = await deleteOffice(id);
    if (res.success) {
      setOffices((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Branch Offices & Locations</h2>
          <p className="text-sm text-slate-500">
            Manage global branch addresses, countries, phone numbers, and contact details shown on the Contact page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Branch Office</span>
        </button>
      </div>

      {offices.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500 space-y-3">
          <MapPin className="h-10 w-10 text-slate-400 mx-auto" />
          <p className="text-base font-medium text-slate-700">No branch offices added yet.</p>
          <p className="text-xs text-slate-400">Click "Add Branch Office" to add your first location.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-4">Branch Title & Location</th>
                  <th className="p-4">Address</th>
                  <th className="p-4">Phone & Email</th>
                  <th className="p-4">Headquarter</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {offices.map((office) => (
                  <tr key={office._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{office.title || office.country}</span>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <Globe className="h-3 w-3 text-slate-400" />
                            <span>{office.country}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">
                        {office.address}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1 text-xs">
                        {office.phone && (
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span>{office.phone}</span>
                          </div>
                        )}
                        {office.email && (
                          <div className="flex items-center gap-1.5 text-slate-600">
                            <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{office.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {office.isHeadOffice ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-600 border border-amber-200">
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                          Head Office
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Branch</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => handleOpenEdit(office)}
                          className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(office._id)}
                          className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-elevation space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                {editingOffice ? "Edit Branch Office" : "Add New Branch Office"}
              </h3>
              <p className="text-xs text-slate-500">
                Enter details for this office location to be displayed on the Contact page.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Branch Name / Title (e.g. Dhaka HQ)
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="e.g. Dhaka Corporate HQ"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    {...register("country")}
                    placeholder="e.g. Bangladesh"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  {errors.country && (
                    <span className="text-xs text-red-500">{errors.country.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Address *
                </label>
                <textarea
                  rows={3}
                  {...register("address")}
                  placeholder="e.g. House 45, Road 11, Block D, Banani, Dhaka 1213"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
                {errors.address && (
                  <span className="text-xs text-red-500">{errors.address.message}</span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    {...register("phone")}
                    placeholder="e.g. +880 1700-000000"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="e.g. dhaka@hopeglobalacademy.com"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Google Maps URL / Embed Link
                </label>
                <input
                  type="url"
                  {...register("mapUrl")}
                  placeholder="https://maps.google.com/..."
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isHeadOffice"
                    {...register("isHeadOffice")}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isHeadOffice" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Mark as Global Headquarters
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Order Priority
                  </label>
                  <input
                    type="number"
                    {...register("order", { valueAsNumber: true })}
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-1.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover shadow-sm"
                >
                  {loading ? "Saving..." : editingOffice ? "Update Branch" : "Create Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
