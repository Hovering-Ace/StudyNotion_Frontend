import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef(null); // Remove TypeScript type (SVGPathElement)

    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-40 h-20">
                <svg viewBox="0 0 100 50" className="w-full h-full">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            {score < 40 && (
                                <>
                                    <stop offset="0%" stopColor="#f87171" /> {/* red-400 */}
                                    <stop offset="100%" stopColor="#dc2626" /> {/* red-600 */}
                                </>
                            )}
                            {score >= 40 && score < 70 && (
                                <>
                                    <stop offset="0%" stopColor="#facc15" /> {/* yellow-400 */}
                                    <stop offset="100%" stopColor="#f97316" /> {/* orange-500 */}
                                </>
                            )}
                            {score >= 70 && (
                                <>
                                    <stop offset="0%" stopColor="#34d399" /> {/* green-400 */}
                                    <stop offset="100%" stopColor="#059669" /> {/* green-600 */}
                                </>
                            )}
                        </linearGradient>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc with rounded ends */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                    <div className="text-xl font-semibold pt-4">{score}/100</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreGauge;
