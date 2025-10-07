import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }) => {
    const textColor = score > 70 ? 'text-caribbeangreen-400'
            : score > 49
        ? 'text-yellow-200' : 'text-red';

    return (
        <div className="display-flex flex-row justify-between items-center p-4">
            <div className="flex justify-between w-full items-center">
                <div className="flex flex-row items-center justify-center gap-2 bg">
                    <p className="text-2xl">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-2xl">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

const Summary = ({ feedback }) => {
    const gradientClass = feedback?.ATS?.score > 69
    ? 'from-caribbeangreen-500'
    : feedback?.ATS?.score  > 49
      ? 'from-yellow-100'
      : 'from-red';
    return (
        <div className={`bg-gradient-to-b ${gradientClass} to-richblack-200 rounded-2xl shadow-md w-full `}>
            <div className="flex flex-row items-center p-4 gap-8">
                <ScoreGauge score={feedback.overallScore||55} />

                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>
            
            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
            <Category title="Content" score={feedback.content.score} />
            <Category title="Structure" score={feedback.structure.score} />
            <Category title="Skills" score={feedback.skills.score} />

        </div>
    )
}
export default Summary
