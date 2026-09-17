"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function AdminUploadPage() {
  const [file, setFile] = useState(null);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/rag/upload?secret=${encodeURIComponent(secret)}`, {
        method: "POST",
        headers: {
          "x-admin-secret": secret,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setStatus({
        type: "success",
        message: `Successfully ingested "${data.filename}" into RAG Knowledge Base! Created ${data.chunks_created} vector chunks.`,
      });
      setFile(null);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#161616] text-white pt-28 pb-16 px-4 font-jakarta">
      <div className="max-w-2xl mx-auto bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green/20 flex items-center justify-center text-green">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">RAG Knowledge Base Upload</h1>
            <p className="text-sm text-gray-400">Ingest PDF/doc files into Supabase pgvector</p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Admin Upload Secret</label>
            <input
              type="password"
              placeholder="Enter ADMIN_UPLOAD_SECRET"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Document File (PDF / TXT)</label>
            <div className="relative border-2 border-dashed border-white/15 rounded-xl p-8 text-center hover:border-green/50 transition-colors bg-white/[0.02]">
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <FileText className="w-10 h-10 text-gray-400" />
                {file ? (
                  <p className="text-green font-medium">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-300">Click or drag & drop to choose a file</p>
                    <p className="text-xs text-gray-500">Supports PDF, TXT up to 25MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {status && (
            <div
              className={`p-4 rounded-xl flex items-start gap-3 text-sm ${
                status.type === "success" ? "bg-green/10 border border-green/30 text-green" : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-3.5 px-6 rounded-xl font-bold bg-green text-navy hover:bg-[#0aa772] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Ingesting Document...
              </>
            ) : (
              "Ingest into Knowledge Base"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
