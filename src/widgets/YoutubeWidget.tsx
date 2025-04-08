import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function YouTubeWidget() {
  const [videoUrl, setVideoUrl] = useState("");
  const [channelData, setChannelData] = useState<any>(null);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [loading, setLoading] = useState(false);

  const extractVideoId = (url: string) => {
    const regExp =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const handlePlay = async () => {
    setLoading(true);
    setVideoUrl("");
    setChannelData(null);

    const directId = extractVideoId(inputValue);
    if (directId) {
      setVideoUrl(`https://www.youtube.com/embed/${directId}`);
      setShowInput(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          inputValue
        )}&key=${YOUTUBE_API_KEY}`
      );
      const data = await res.json();
      const item = data.items?.[0];
      if (!item) throw new Error("No results");

      if (item.id.kind === "youtube#video") {
        setVideoUrl(`https://www.youtube.com/embed/${item.id.videoId}`);
      } else if (item.id.kind === "youtube#channel") {
        setChannelData({
          title: item.snippet.title,
          description: item.snippet.description,
          channelId: item.id.channelId,
          thumbnail: item.snippet.thumbnails.high.url,
        });
      }
      setShowInput(false);
    } catch (err) {
      alert("Failed to fetch YouTube results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: '"Kode Mono", monospace' }} className="fixed bottom-6 left-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 z-50 space-y-5 transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-800">
          📺 Binge Watch Here
        </h2>
        <button
          onClick={() => {
            setVideoUrl("");
            setChannelData(null);
            setShowInput(true);
            setInputValue("");
          }}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {videoUrl && (
        <div className="aspect-video rounded-xl overflow-hidden shadow-inner border border-gray-200">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video"
          ></iframe>
        </div>
      )}

      {channelData && (
        <div className="flex gap-4 border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <img
            src={channelData.thumbnail}
            alt={channelData.title}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">{channelData.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {channelData.description}
            </p>
            <a
              href={`https://youtube.com/channel/${channelData.channelId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 flex items-center gap-1 mt-2 text-sm hover:underline"
            >
              Visit Channel <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {showInput && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search or paste YouTube link..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <button
            onClick={handlePlay}
            disabled={loading}
            className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load"}
          </button>
        </div>
      )}

      {!showInput && !videoUrl && !channelData && (
        <button
          onClick={() => setShowInput(true)}
          className="w-full text-sm text-blue-600 hover:underline transition"
        >
          + Add Another
        </button>
      )}
    </div>
  );
}
