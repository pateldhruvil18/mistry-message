"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

type SuggestMessageProps = {
  onSelect: (message: string) => void;
};

export default function SuggestMessage({ onSelect }: SuggestMessageProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateSuggestions = async () => {
    setLoading(true);
    setError("");
    setSuggestions([]);

    try {
      const res = await fetch("/api/suggest-messages", {
        method: "POST",
      });

      if (!res.ok || !res.body) {
        throw new Error("Failed to generate suggestions");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value);
      }

      // ✅ Convert AI response into clean list
      const parsed = text
        .split("||")
        .map((s) => s.trim())
        .filter(Boolean);

      setSuggestions(parsed);
    } catch (err) {
      console.error(err);
      setError("Unable to generate suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        type="button"
        onClick={generateSuggestions}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Generating..." : "Suggest Messages"}
      </Button>

      {error && (
        <p className="text-sm text-red-500 text-center">{error}</p>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-2">
          {suggestions.map((msg, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSelect(msg)}
              className="w-full text-left p-3 border rounded-md hover:bg-gray-100 transition"
            >
              {msg}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
