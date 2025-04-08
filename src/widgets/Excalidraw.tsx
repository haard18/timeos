import { X } from "lucide-react";

export default function ExcalidrawWidget() {
  return (
    <div className="fixed bottom-6 right-6 w-[90vw] max-w-5xl h-[600px] bg-white rounded-2xl shadow-xl border p-4 z-50 flex flex-col" style={{ fontFamily: '"Kode Mono", monospace' }}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">✏️ Excalidraw</h2>
        <button className="hover:text-red-500" onClick={() => window.location.reload()}>
          <X size={18} />
        </button>
      </div>

      <iframe
        src="https://excalidraw.com"
        title="Excalidraw"
        className="flex-1 rounded-xl border"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
