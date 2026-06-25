"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

const SETTING_KEYS = [
  { key: "whatsapp_number", label: "Número WhatsApp", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "address", label: "Morada", type: "text" },
  { key: "opening_hours", label: "Horário", type: "text" },
  { key: "instagram_url", label: "Instagram URL", type: "url" },
  { key: "facebook_url", label: "Facebook URL", type: "url" },
];

interface SettingResponse {
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data: SettingResponse[]) => {
        const map: Record<string, string> = {};
        data.forEach((s) => (map[s.key] = s.value));
        setSettings(map);
      });
  }, []);

  async function handleSave() {
    setLoading(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Definições</h1>
      <div className="bg-white rounded-xl p-6 shadow-sm max-w-2xl space-y-4">
        {SETTING_KEYS.map((s) => (
          <div key={s.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{s.label}</label>
            <input
              type={s.type}
              value={settings[s.key] || ""}
              onChange={(e) => setSettings({ ...settings, [s.key]: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-burgundy text-white px-6 py-2.5 rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saved ? "Guardado!" : loading ? "A guardar..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
