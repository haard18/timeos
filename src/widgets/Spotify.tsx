import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

const defaultPlaylists = [
  {
    name: "Lo-fi Beats",
    url: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=Zn_AkweuQiuO5u0Ugee7og",
  },
  {
    name: "Deep Focus",
    url: "https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ",
  },
  {
    name: "Coding Mode",
    url: "https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j?si=f02Nop7kSrWZbGwnGjw1pw",
  },
];

export default function SpotifyWidget() {
  const [link, setLink] = useState("");
  const [embedUrl, setEmbedUrl] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("spotify-link");
    if (saved) {
      const id = extractSpotifyId(saved);
      if (id) {
        setEmbedUrl(makeEmbedUrl(saved, id));
        setLink(saved);
      }
    }
  }, []);

  const extractSpotifyId = (url: string) => {
    const match = url.match(/spotify\.com\/(track|playlist|album)\/([a-zA-Z0-9]+)/);
    return match ? match[2] : null;
  };

  const makeEmbedUrl = (url: string, id: string) => {
    if (url.includes("/track/")) return `https://open.spotify.com/embed/track/${id}`;
    if (url.includes("/playlist/")) return `https://open.spotify.com/embed/playlist/${id}`;
    if (url.includes("/album/")) return `https://open.spotify.com/embed/album/${id}`;
    return "";
  };

  const handleLoad = (url: string) => {
    const id = extractSpotifyId(url);
    if (!id) return alert("Invalid Spotify URL");
    const embed = makeEmbedUrl(url, id);
    setEmbedUrl(embed);
    setLink(url);
    localStorage.setItem("spotify-link", url);
    setShowInput(false);
  };

  return (
    <div style={{ fontFamily: '"Kode Mono", monospace' }} className="fixed bottom-6 left-6 bg-white shadow-xl border rounded-xl p-4 w-96 z-50">
      <h2 className="text-lg font-semibold mb-3 flex items-center justify-between">
        🎧 Spotify Player
        <button
          onClick={() => setShowInput(!showInput)}
          className="p-1 bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          <Plus size={16} />
        </button>
      </h2>

      {showInput && (
        <div className="mb-2">
          <input
            type="text"
            placeholder="Paste Spotify link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-2 border rounded text-sm mb-2"
          />
          <button
            onClick={() => handleLoad(link)}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded w-full"
          >
            Load
          </button>
        </div>
      )}

      {!showInput && (
        <div className="flex flex-col gap-1 mb-2 text-sm">
          {defaultPlaylists.map((playlist) => (
            <button
              key={playlist.url}
              onClick={() => handleLoad(playlist.url)}
              className="text-left px-3 py-1 border rounded hover:bg-gray-100"
            >
              {playlist.name}
            </button>
          ))}
        </div>
      )}

      {embedUrl && (
        <iframe
          src={embedUrl}
          width="100%"
          height="80"
          allow="encrypted-media"
          allowTransparency
          frameBorder="0"
          className="rounded"
        ></iframe>
      )}
    </div>
  );
}
