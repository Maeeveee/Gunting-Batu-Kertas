// Animasi shake CSS
const shakeStyle = `
@keyframes rotateRight {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
}
@keyframes rotateLeft {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-90deg); }
}
.rotate-right {
  animation: rotateRight 0.4s forwards;
}
.rotate-left {
  animation: rotateLeft 0.4s forwards;
}
@keyframes resultPop {
  0% { opacity: 0; transform: scale(0.7); }
  60% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}
.result-animate {
  animation: resultPop 0.5s;
}
`;
import { useState } from "react";

const choices = [
    { label: "Gunting", value: "scissors", img: "/scissors.png", imgPlayer: "/scissorsPlayer.png" },
    { label: "Batu", value: "rock", img: "/rock.png", imgPlayer: "/rockPlayer.png" },
    { label: "Kertas", value: "paper", img: "/paper.png", imgPlayer: "/paperPlayer.png" },
];

function getResult(player, computer) {
    if (player === computer) return "Draw";
    if (
        (player === "scissors" && computer === "paper") ||
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock")
    ) {
        return "Menang";
    }
    return "Kalah";
}


export default function Index() {
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [score, setScore] = useState({ menang: 0, draw: 0, kalah: 0 });
    const [serius, setSerius] = useState(false);
    const [showSeriusModal, setShowSeriusModal] = useState(false);
    const [showTaunt, setShowTaunt] = useState(false);

    // Fungsi untuk menentukan pilihan komputer agar selalu menang jika mode serius aktif
    const getComputerChoice = (player) => {
        if (!serius || !player) {
            return choices[Math.floor(Math.random() * 3)].value;
        }
        // Komputer memilih agar selalu menang
        if (player === "scissors") return "rock";
        if (player === "rock") return "paper";
        if (player === "paper") return "scissors";
        return choices[Math.floor(Math.random() * 3)].value;
    };

    const handleClick = (choice) => {
        const comp = getComputerChoice(choice);
        const res = getResult(choice, comp);
        setPlayerChoice(choice);
        setComputerChoice(comp);
        setResult(res);
        setScore((prev) => {
            if (res === "Menang") return { ...prev, menang: prev.menang + 1 };
            if (res === "Draw") return { ...prev, draw: prev.draw + 1 };
            return { ...prev, kalah: prev.kalah + 1 };
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Gunting Batu Kertas</h1>

            <div className="w-full max-w-lg mb-4">
                {/* Mobile & Desktop: horizontal, dengan pemisah */}
                <div className="flex flex-row items-center justify-center gap-4 sm:gap-16">
                    <div className="flex flex-col items-center flex-1">
                        <span className="mb-2 font-semibold text-base sm:text-lg">Anda</span>
                        {playerChoice ? (
                            <img
                                src={choices.find(c => c.value === playerChoice)?.imgPlayer}
                                alt={playerChoice}
                                className={`w-20 h-20 sm:w-24 sm:h-24 object-contain rotate-right`}
                                style={{ transform: 'rotate(90deg)' }}
                                key={playerChoice + '-' + result}
                            />
                        ) : (
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">?</div>
                        )}
                    </div>
                    {/* Pemisah vertikal */}
                    <div className="h-20 sm:h-24 w-px bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center flex-1">
                        <span className="mb-2 font-semibold text-base sm:text-lg">{serius ? "Raja Rizal" : "Komputer"}</span>
                        {computerChoice ? (
                            <img
                                src={choices.find(c => c.value === computerChoice)?.img}
                                alt={computerChoice}
                                className={`w-20 h-20 sm:w-24 sm:h-24 object-contain rotate-left`}
                                style={{ transform: 'rotate(-90deg)' }}
                                key={computerChoice + '-' + result}
                            />
                        ) : (
                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">?</div>
                        )}
                    </div>
                </div>
            </div>
            <style>{shakeStyle}</style>
            <div className="flex justify-center gap-4 sm:gap-8 mb-6 w-full max-w-xs mx-auto">
                {choices.map((c) => (
                    <button
                        key={c.value}
                        className={`focus:outline-none rounded-full border-4 transition-all duration-200 
                            ${playerChoice === c.value ? "border-yellow-400 scale-110" : "border-transparent"}
                            bg-white shadow-md p-2 hover:border-yellow-300 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center`}
                        onClick={() => handleClick(c.value)}
                        aria-label={c.label}
                    >
                        <img
                            src={c.imgPlayer}
                            alt={c.label}
                            className={`w-12 h-12 sm:w-16 sm:h-16 object-contain ${playerChoice === c.value ? "shake" : ""}`}
                            style={{ filter: playerChoice === c.value ? "" : "grayscale(60%)", transform: "rotate(0deg)" }}
                        />
                    </button>
                ))}
            </div>
            <div className="mb-4 w-full max-w-xs mx-auto flex justify-center">
                {result && (
                    <div className="rounded-xl bg-white/80 border border-gray-200 shadow-lg px-4 py-3 w-full text-center animate-fadein">
                        <div className="mb-1 text-base sm:text-lg">
                            <span className="font-semibold text-sky-600">Anda memilih:</span> <b className="text-gray-800">{playerChoice && choices.find(c => c.value === playerChoice).label}</b>
                        </div>
                        <div className="mb-1 text-base sm:text-lg">
                            <span className={`font-semibold ${serius ? 'text-rose-700' : 'text-purple-700'}`}>{serius ? "Raja Rizal" : "Komputer"} memilih:</span> <b className="text-gray-800">{computerChoice && choices.find(c => c.value === computerChoice).label}</b>
                        </div>
                        <div className="mt-2 text-lg">
                            Hasil: <span className={`font-bold px-2 py-1 rounded ${result === 'Menang' ? 'bg-green-100 text-green-700' : result === 'Kalah' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-700'}`}>{result}</span>
                        </div>
                    </div>
                )}
            </div>
            <style>{`
                .animate-fadein{animation:fadein 0.5s;}
                @keyframes fadein{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
                .animate-pop{animation:popModal 0.3s;}
                @keyframes popModal{0%{opacity:0;transform:scale(0.7);}80%{opacity:1;transform:scale(1.05);}100%{opacity:1;transform:scale(1);}}
            `}</style>
            {/* Score Card Atas */}
            <div className="w-full flex justify-center mt-2 mb-4">
                <div className="flex flex-row sm:flex-row gap-2 sm:gap-8 bg-white/90 border border-gray-200 rounded-2xl shadow-lg px-4 py-3 text-base sm:text-xl max-w-xs w-full items-center justify-center">
                    <div className="flex-1 text-center"><span className="block text-xs sm:text-sm font-semibold text-green-700">Menang</span><span className="font-bold text-green-600 text-lg sm:text-xl">{score.menang}</span></div>
                    <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                    <div className="flex-1 text-center"><span className="block text-xs sm:text-sm font-semibold text-gray-700">Draw</span><span className="font-bold text-gray-600 text-lg sm:text-xl">{score.draw}</span></div>
                    <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
                    <div className="flex-1 text-center"><span className="block text-xs sm:text-sm font-semibold text-red-700">Kalah</span><span className="font-bold text-red-600 text-lg sm:text-xl">{score.kalah}</span></div>
                </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row items-center justify-center sm:gap-8 mt-8 w-full max-w-xs mx-auto">
                <button
                    className={`w-full sm:w-auto px-4 py-2 border-2 transition-all duration-200 focus:outline-none font-semibold shadow-lg rounded-xl
                        ${serius
                            ? "bg-gradient-to-r from-rose-700 to-red-600 border-red-700 hover:from-red-800 hover:to-rose-800 text-white"
                            : "bg-gradient-to-r from-gray-700 to-gray-800 border-gray-700 hover:from-gray-800 hover:to-gray-900 text-white"}
                        active:scale-95`}
                    onClick={() => {
                        if (!serius) {
                            setShowSeriusModal(true);
                        } else {
                            setSerius(false);
                            setScore({ menang: 0, draw: 0, kalah: 0 });
                            setShowTaunt(true);
                            setTimeout(() => setShowTaunt(false), 2200);
                        }
                    }}
                >
                    {serius ? "Menyerah Lawan Raja Rizal" : "Lawan Raja Terakhir sang Jenius dari Lahir"}
                </button>
                <button
                    className="w-full sm:w-auto px-4 py-2 border-2 border-yellow-400 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-900 font-semibold rounded-xl shadow-md hover:from-yellow-200 hover:to-yellow-300 hover:border-yellow-500 transition-all duration-200 active:scale-95 focus:outline-none"
                    onClick={() => setScore({ menang: 0, draw: 0, kalah: 0 })}
                >
                    Reset Score
                </button>
            </div>
            {/* Taunt Notification */}
            {showTaunt && (
                <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 bg-rose-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg font-bold animate-pop">
                    Dah dibilangin jangan lawan Sang Raja, masih ajaaa<br/>
                </div>
            )}
            {/* Custom Modal Popup */}
            {showSeriusModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm animate-fadein" onClick={() => setShowSeriusModal(false)}></div>
                    {/* Modal Card */}
                    <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 w-80 max-w-xs flex flex-col items-center animate-pop">
                        <div className="text-2xl mb-2 font-bold text-rose-700">Konfirmasi</div>
                        <div className="mb-4 text-center text-gray-700">Anda serius ingin melawan <span className="font-semibold text-rose-700">Raja Rizal</span>?<br/>Beliau tidak pernah kalah!!</div>
                        <div className="flex gap-3 w-full mt-2">
                            <button
                                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold shadow"
                                onClick={() => {
                                    setSerius(true);
                                    setScore({ menang: 0, draw: 0, kalah: 0 });
                                    setShowSeriusModal(false);
                                }}
                            >Ya</button>
                            <button
                                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold shadow"
                                onClick={() => setShowSeriusModal(false)}
                            >Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}