"use client";

import { useCallback, useEffect, useState } from "react";
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Cloud, CloudOff } from "lucide-react";

interface SyncLog {
  id: string;
  type: string;
  status: string;
  message: string | null;
  itemCount: number;
  createdAt: string;
}

interface MoloniStatusResponse {
  configured: boolean;
  lastSync: SyncLog | null;
  recentLogs?: SyncLog[];
}

interface SyncSectionResult {
  synced?: number;
  errors?: string[];
}

interface SyncResult {
  error?: string;
  categories?: SyncSectionResult;
  products?: SyncSectionResult;
}

async function fetchMoloniStatus(): Promise<MoloniStatusResponse> {
  const res = await fetch("/api/admin/moloni/status");
  return (await res.json()) as MoloniStatusResponse;
}

function SyncResultPanel({ result }: { result: SyncResult }) {
  const categoryErrors = result.categories?.errors ?? [];
  const productErrors = result.products?.errors ?? [];

  return (
    <div className={`rounded-xl p-6 mb-6 ${result.error ? "bg-red-50" : "bg-green-50"}`}>
      {result.error ? (
        <div className="flex items-center gap-2 text-red-700">
          <XCircle className="h-5 w-5" />
          <span>{result.error}</span>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Sincronizacao concluida!</span>
          </div>
          <div className="text-sm text-green-600 space-y-1">
            <p>Categorias: {result.categories?.synced || 0} sincronizadas</p>
            <p>Produtos: {result.products?.synced || 0} sincronizados</p>
            {(categoryErrors.length > 0 || productErrors.length > 0) && (
              <div className="mt-2 text-amber-600">
                <p className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  Alguns erros ocorreram:
                </p>
                {categoryErrors.map((error, index) => (
                  <p key={`c-${index}`} className="text-xs ml-5">{error}</p>
                ))}
                {productErrors.map((error, index) => (
                  <p key={`p-${index}`} className="text-xs ml-5">{error}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MoloniPage() {
  const [configured, setConfigured] = useState(false);
  const [lastSync, setLastSync] = useState<SyncLog | null>(null);
  const [recentLogs, setRecentLogs] = useState<SyncLog[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [loading, setLoading] = useState(true);

  const applyStatus = useCallback((data: MoloniStatusResponse) => {
    setConfigured(data.configured);
    setLastSync(data.lastSync);
    setRecentLogs(data.recentLogs || []);
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      applyStatus(await fetchMoloniStatus());
    } catch (err) {
      console.error("Failed to fetch Moloni status", err);
    } finally {
      setLoading(false);
    }
  }, [applyStatus]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refreshStatus();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [refreshStatus]);

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch("/api/admin/moloni/sync", { method: "POST" });
      const data = (await res.json()) as SyncResult;
      setSyncResult(data);
      await refreshStatus();
    } catch {
      setSyncResult({ error: "Sync request failed" });
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return <div className="text-gray-400">A carregar...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Integração Moloni</h1>

      {/* Connection Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {configured ? (
              <Cloud className="h-8 w-8 text-green-500" />
            ) : (
              <CloudOff className="h-8 w-8 text-red-400" />
            )}
            <div>
              <h2 className="font-medium text-gray-900">
                {configured ? "Moloni Configurado" : "Moloni Não Configurado"}
              </h2>
              <p className="text-sm text-gray-500">
                {configured
                  ? "As credenciais da API estão configuradas."
                  : "Adicione as credenciais Moloni às variáveis de ambiente (.env)."}
              </p>
            </div>
          </div>
          {configured && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-2 bg-burgundy text-white px-5 py-2.5 rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "A sincronizar..." : "Sincronizar Agora"}
            </button>
          )}
        </div>
      </div>

      {/* Sync Result */}
      {syncResult && <SyncResultPanel result={syncResult} />}

      {/* Environment Variables Guide */}
      {!configured && (
        <div className="bg-amber-50 rounded-xl p-6 mb-6">
          <h3 className="font-medium text-amber-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Configuração Necessária
          </h3>
          <p className="text-sm text-amber-700 mb-3">
            Adicione as seguintes variáveis ao ficheiro <code className="bg-amber-100 px-1 rounded">.env</code>:
          </p>
          <pre className="bg-amber-100 rounded-lg p-4 text-xs text-amber-900 overflow-x-auto">
{`MOLONI_CLIENT_ID="your-client-id"
MOLONI_CLIENT_SECRET="your-client-secret"
MOLONI_USERNAME="your-email@example.com"
MOLONI_PASSWORD="your-password"
MOLONI_COMPANY_ID="your-company-id"`}
          </pre>
          <p className="text-sm text-amber-700 mt-3">
            Obtenha as credenciais em{" "}
            <a href="https://www.moloni.pt" target="_blank" rel="noopener noreferrer" className="underline">
              moloni.pt
            </a>{" "}
            &rarr; Definições &rarr; Integrações &rarr; API.
          </p>
        </div>
      )}

      {/* Last Sync */}
      {lastSync && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="font-medium text-gray-900 mb-2">Última Sincronização</h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <span className="font-medium">Tipo:</span> {lastSync.type}
            </p>
            <p>
              <span className="font-medium">Estado:</span>{" "}
              <span className={lastSync.status === "success" ? "text-green-600" : "text-red-600"}>
                {lastSync.status === "success" ? "Sucesso" : "Erro"}
              </span>
            </p>
            <p>
              <span className="font-medium">Items:</span> {lastSync.itemCount}
            </p>
            <p>
              <span className="font-medium">Data:</span>{" "}
              {new Date(lastSync.createdAt).toLocaleString("pt-PT")}
            </p>
          </div>
        </div>
      )}

      {/* Sync History */}
      {recentLogs.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-medium text-gray-900">Histórico de Sincronizações</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Data</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Items</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm text-gray-500">
                    {new Date(log.createdAt).toLocaleString("pt-PT")}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900 capitalize">{log.type}</td>
                  <td className="px-6 py-3">
                    {log.status === "success" ? (
                      <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full">
                        <CheckCircle className="h-3 w-3" /> Sucesso
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-red-700 bg-red-50 px-2 py-1 rounded-full">
                        <XCircle className="h-3 w-3" /> Erro
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-900">{log.itemCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
