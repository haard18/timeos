import { useAtom } from "jotai";
import { spacesAtom,nameAtom, labelsAtom, onboardingCompleteAtom } from "../lib/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import

export default function Onboarding() {
    const [, setName] = useAtom(nameAtom);
    const [spaces, setSpaces] = useAtom(spacesAtom);
    const [labels, setLabels] = useAtom(labelsAtom);
    const [, setOnboardingComplete] = useAtom(onboardingCompleteAtom);
  
    const [nameInput, setNameInput] = useState("");
    const [spaceInput, setSpaceInput] = useState("");
    const [labelInput, setLabelInput] = useState("");
  
    const navigate = useNavigate();
  
    const addSpace = () => {
      if (spaceInput.trim() && !spaces.includes(spaceInput.trim())) {
        setSpaces([...spaces, spaceInput.trim()]);
        setSpaceInput("");
      }
    };
  
    const addLabel = () => {
      if (labelInput.trim() && !labels.includes(labelInput.trim())) {
        setLabels([...labels, labelInput.trim()]);
        setLabelInput("");
      }
    };
  
    const removeSpace = (space: string) =>
      setSpaces(spaces.filter((s) => s !== space));
  
    const removeLabel = (label: string) =>
      setLabels(labels.filter((l) => l !== label));
  
    const handleSubmit = () => {
      if (nameInput.trim() && spaces.length > 0 && labels.length > 0) {
        setName(nameInput.trim());
        setOnboardingComplete(true);
        navigate("/");
      } else {
        alert("Please enter your name, at least one space, and one label.");
      }
    };
  
    return (
      <div className="min-h-screen bg-[#0e0b1e] text-[#f0f0f0] font-mono px-6 py-12" style={{ fontFamily: '"Kode Mono", monospace' }}>
        <div className="max-w-2xl mx-auto space-y-10">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#39ff14] via-[#00ffff] to-[#ff00ff] bg-clip-text text-transparent">
            🔧 Set Up Your Grid
          </h1>
  
          {/* Name */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#00ffff]">
              What's your name, Operator?
            </h2>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1e1c2b] border border-[#2e2c3d] focus:outline-none focus:ring-2 focus:ring-[#00ffff]"
              placeholder="e.g. Neo, Haard, ShadowKitten007"
            />
          </div>
  
          {/* Spaces */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#00ffff]">
              what are you working on mate?
            </h2>
            <div className="flex gap-2 mb-3">
              <input
                value={spaceInput}
                onChange={(e) => setSpaceInput(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1e1c2b] border border-[#2e2c3d] focus:outline-none focus:ring-2 focus:ring-[#39ff14]"
                placeholder="e.g. GoldPesa, Art Lab, Core Team"
              />
              <button
                onClick={addSpace}
                className="bg-[#39ff14] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#33e612]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {spaces.map((s) => (
                <span
                  key={s}
                  onClick={() => removeSpace(s)}
                  className="bg-[#282636] text-[#00ffcc] px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[#383551]"
                >
                  {s} ✕
                </span>
              ))}
            </div>
          </div>
  
          {/* Labels */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-[#00ffff]">
              Labels to tag your time
            </h2>
            <div className="flex gap-2 mb-3">
              <input
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#1e1c2b] border border-[#2e2c3d] focus:outline-none focus:ring-2 focus:ring-[#ff00ff]"
                placeholder="e.g. deep work, priority, flow"
              />
              <button
                onClick={addLabel}
                className="bg-[#ff00ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#e000e0]"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {labels.map((l) => (
                <span
                  key={l}
                  onClick={() => removeLabel(l)}
                  className="bg-[#2b2235] text-[#ff00ff] px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-[#402b50]"
                >
                  {l} ✕
                </span>
              ))}
            </div>
          </div>
  
          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 rounded-xl bg-[#00ffcc] text-black text-lg font-bold hover:bg-[#00e6b8] transition-all shadow-lg"
          >
            Launch Workspace 🚀
          </button>
        </div>
      </div>
    );
  }
