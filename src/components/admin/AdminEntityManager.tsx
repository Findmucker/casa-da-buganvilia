"use client";

import { useRouter } from "next/navigation";
import { Plus, Save, Trash2, X } from "lucide-react";
import { useState } from "react";

type FieldType = "checkbox" | "number" | "select" | "text" | "textarea";

export interface AdminEntityField {
  key: string;
  label: string;
  type?: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
}

export interface AdminEntityRow {
  id: string;
  title: string;
  subtitle?: string;
  values: Record<string, string | number | boolean | null>;
}

interface AdminEntityManagerProps {
  createLabel: string;
  endpoint: string;
  fields: AdminEntityField[];
  rows: AdminEntityRow[];
  title: string;
}

function emptyForm(fields: AdminEntityField[]) {
  return Object.fromEntries(
    fields.map((field) => [
      field.key,
      field.type === "checkbox" ? true : field.type === "number" ? 0 : "",
    ]),
  ) as Record<string, string | number | boolean>;
}

export default function AdminEntityManager({
  createLabel,
  endpoint,
  fields,
  rows,
  title,
}: AdminEntityManagerProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string | number | boolean>>(
    emptyForm(fields),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = editingId !== null;

  function startCreate() {
    setEditingId(null);
    setError("");
    setForm(emptyForm(fields));
  }

  function startEdit(row: AdminEntityRow) {
    setEditingId(row.id);
    setError("");
    setForm({
      ...emptyForm(fields),
      ...Object.fromEntries(
        Object.entries(row.values).map(([key, value]) => [key, value ?? ""]),
      ),
    });
  }

  async function save() {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(
        isEditing ? `${endpoint}/${editingId}` : endpoint,
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Nao foi possivel guardar.");
      }

      startCreate();
      router.refresh();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Nao foi possivel guardar.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: AdminEntityRow) {
    if (!window.confirm(`Eliminar "${row.title}"?`)) return;
    setError("");

    try {
      const response = await fetch(`${endpoint}/${row.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Nao foi possivel eliminar.");
      }

      if (editingId === row.id) startCreate();
      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Nao foi possivel eliminar.",
      );
    }
  }

  function updateField(field: AdminEntityField, value: string | boolean) {
    setForm((previous) => ({
      ...previous,
      [field.key]: field.type === "number" ? Number(value) : value,
    }));
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button
          type="button"
          onClick={startCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-4 py-2 text-sm text-white transition-colors hover:bg-burgundy/90"
        >
          <Plus className="h-4 w-4" />
          {createLabel}
        </button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                  Item
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row) => (
                <tr
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => startEdit(row)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      startEdit(row);
                    }
                  }}
                  className={`cursor-pointer hover:bg-gray-50 ${
                    editingId === row.id ? "bg-burgundy/5" : ""
                  }`}
                  aria-label={`Editar ${row.title}`}
                >
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{row.title}</p>
                    {row.subtitle ? (
                      <p className="mt-1 text-sm text-gray-500">{row.subtitle}</p>
                    ) : null}
                  </td>
                  <td
                    className="px-6 py-4 text-right"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => remove(row)}
                        className="inline-flex items-center gap-1 text-sm text-red-700 hover:underline"
                      >
                        <Trash2 className="h-4 w-4" />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-400">
                    Sem registos.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-medium text-gray-900">
              {isEditing ? "Editar" : "Criar"}
            </h2>
            {isEditing ? (
              <button
                type="button"
                onClick={startCreate}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Cancelar edicao"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="space-y-4">
            {fields.map((field) => (
              <label key={field.key} className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">
                  {field.label}
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    rows={4}
                    required={field.required}
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  />
                ) : field.type === "select" ? (
                  <select
                    required={field.required}
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  >
                    <option value="">Selecionar...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(form[field.key])}
                    onChange={(event) =>
                      updateField(field, event.target.checked)
                    }
                  />
                ) : (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    step={field.type === "number" ? "0.01" : undefined}
                    required={field.required}
                    value={String(form[field.key] ?? "")}
                    onChange={(event) => updateField(field, event.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                  />
                )}
              </label>
            ))}

            {error ? (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-5 py-2.5 text-sm text-white transition-colors hover:bg-burgundy/90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "A guardar..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
