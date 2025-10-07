import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";
import check from '../../../../assets/icons/check.svg'
import warning from '../../../../assets/icons/warning.svg'

const ScoreBadge = ({ score }) => {
  return (
    <div
      className={`flex gap-2 p-4 text-white rounded-xl `}
    >
      <img
        src={score > 80 ? check : warning}
        alt="score"
        className="size-4"
      />
      <p
        className="ml-1 text-richblack-900 text-2xl"
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips,score }) => {
  const gradientClass = score > 69
    ? 'from-caribbeangreen-500'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-dark';
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className={`bg-gradient-to-b from-blue-100 to-white mt-4 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4`}>
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center justify-center" key={index}>
            <img
              src={tip.type === "good" ? check : warning}
              alt="score"
              className="size-5"
            />
            <p className={tip.type === "good" ? "text-caribbeangreen-700 text-sm" : "text-[#c95f3f] text-sm"}
              >{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 rounded-xl w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={(
              "flex flex-col items-centre justify-center gap-2 rounded-2xl p-4",
              tip.type === "good"
                ? "bg-gradient-to-b from-caribbeangreen-200 to-richblack-50 text-richblack-900 text-sm rounded-md shadow-md"
                : "bg-yellow-50 border border-yellow-200 rounded-md text-richblack-900 text-sm"
            )}
          >
            <div className="flex flex-row gap-2 items-center px-4 mt-2 ">
              <img
                src={
                  tip.type === "good" ? check : warning
                }
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p className="ml-7 mb-2 ">{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips
            } 
            score={feedback.toneAndStyle.score}/>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
