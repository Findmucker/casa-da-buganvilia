"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

const SETTING_KEYS = [
  { key: "whatsapp_number", label: "Numero WhatsApp", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "address", label: "Morada", type: "text" },
  { key: "opening_hours", label: "Horario", type: "text" },
  { key: "working_days", label: "Dias de funcionamento", type: "text" },
  { key: "instagram_url", label: "Instagram URL", type: "url" },
  { key: "facebook_url", label: "Facebook URL", type: "url" },
  {
    key: "home_visit_description",
    label: "Texto da visita na homepage",
    type: "textarea",
  },
  {
    key: "about_story_text",
    label: "Texto da historia do espaco",
    type: "textarea",
  },
  { key: "about_music_note", label: "Nota de musica", type: "textarea" },
];

interface SettingResponse {
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((response) => response.json())
      .then((data: SettingResponse[]) => {
        const map: Record<string, string> = {};
        data.forEach((setting) => {
          map[setting.key] = setting.value;
        });
        setSettings(map);
      })
      .catch(() => setError("Nao foi possivel carregar as definicoes."));
  }, []);

  async function handleSave() {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    setLoading(false);
    if (!response.ok) {
      setError("Nao foi possivel guardar as definicoes.");
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-gray-900">Definicoes</h1>
      <div className="max-w-3xl space-y-4 rounded-xl bg-white p-6 shadow-sm">
        {SETTING_KEYS.map((setting) => (
          <div key={setting.key}>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {setting.label}
            </label>
            {setting.type === "textarea" ? (
              <textarea
                rows={4}
                value={settings[setting.key] || ""}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    [setting.key]: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            ) : (
              <input
                type={setting.type}
                value={settings[setting.key] || ""}
                onChange={(event) =>
                  setSettings({
                    ...settings,
                    [setting.key]: event.target.value,
                  })
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            )}
          </div>
        ))}

        {error ? (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-burgundy px-6 py-2.5 text-white transition-colors hover:bg-burgundy/90 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saved ? "Guardado" : loading ? "A guardar..." : "Guardar"}
        </button>
      </div>
    </div>
  );
}
