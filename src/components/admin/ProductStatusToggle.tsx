"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

interface ProductStatusToggleProps {
  active: boolean;
  productId: string;
  productName: string;
}

export default function ProductStatusToggle({
  active,
  productId,
  productName,
}: ProductStatusToggleProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(active);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const nextActive = !isActive;

  async function confirmStatusChange() {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: nextActive }),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(body?.error ?? "Nao foi possivel atualizar o estado.");
      }

      setIsActive(nextActive);
      setIsOpen(false);
      router.refresh();
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Nao foi possivel atualizar o estado.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setIsOpen(true);
        }}
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors ${
          isActive
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
        }`}
      >
        {isActive ? (
          <Eye className="h-3 w-3" />
        ) : (
          <EyeOff className="h-3 w-3" />
        )}
        {isActive ? "Ativo" : "Inativo"}
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`product-status-title-${productId}`}
        >
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2
              id={`product-status-title-${productId}`}
              className="text-lg font-semibold text-gray-900"
            >
              {nextActive ? "Ativar produto" : "Desativar produto"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {nextActive
                ? `Tem a certeza que pretende ativar "${productName}"? O produto volta a aparecer no catalogo publico.`
                : `Tem a certeza que pretende desativar "${productName}"? O produto deixa de aparecer no catalogo publico.`}
            </p>
            {error ? (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={confirmStatusChange}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition-colors disabled:opacity-50 ${
                  nextActive
                    ? "bg-burgundy hover:bg-burgundy/90"
                    : "bg-red-700 hover:bg-red-800"
                }`}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {nextActive ? "Ativar" : "Desativar"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
