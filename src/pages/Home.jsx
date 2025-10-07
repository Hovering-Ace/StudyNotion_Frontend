import React from "react"
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
//import HighlightText from "../components/core/homePage/HighlightText"
import Button from "../components/core/homePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/homePage/CodeBlocks"
import Timeline from "../components/core/homePage/Timeline";
import LearningPath from "../components/core/homePage/LearningPath";
import ReviewSlider from "../components/common/ReviewSlider"
import InstructerSection from "../components/core/homePage/InstructerSection"
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/homePage/ExploreMore";
import { TypeAnimation } from "react-type-animation";

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent font-bold">
      {text}
    </span>
  );
};

const Home = () => {
    return (
        <div>

            {/* Section 1 */}
            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
                {/* Become a Instructor Button */}
                <Link to={"/signup"}>
                    <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                        <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                {/* Heading */}
                <div className="text-center text-4xl bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold lg:text-5xl">
                    Empower Your Future with{" "}
                    <TypeAnimation
                        sequence={[
                            "NextGen AI-powered features!", 2000,
                            "Coding Skills!", 2000,
                            "Job-ready courses!", 2000,
                        ]}
                        wrapper="span"
                        cursor={true}
                        repeat={Infinity}
                        style={{ display: "inline-block" }}
                        render={(text) => <HighlightText text={text} />}
                    />
                </div>

                {/* Sub Heading */}
                <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <Button active={true} linkTo="/signup">Learn More</Button>
                    <Button active={false} linkTo="/login">Book Demo!</Button>
                </div>

                <div className="mx-3 my-10 drop-shadow-[15px_15px_white] ">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-blue-400 rounded-full blur-2xl opacity-60 -z-10 pointer-events-none"></div>

                    <video className="mt-4" muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>


                {/* Code Section 1  */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your
                                <HighlightText text={"coding potential"} /> with our online
                                courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        btn1={{
                            btnText: "Try it Yourself",
                            link: "/signup",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }}
                        codeColor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                {/* Code Section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Start
                                <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        btn1={{
                            btnText: "Continue Lesson",
                            link: "/signup",
                            active: true,
                        }}
                        btn2={{
                            btnText: "Learn More",
                            link: "/signup",
                            active: false,
                        }}
                        codeColor={"text-white"}
                        codeblock={`import React from "react";\n import ctaButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>

                <ExploreMore />

            </div>
            {/* section2 */}

            <div className="bg-pure-greys-5 text-richblack-700">

                <div className="homepage_bg h-[310px]">

                    <div className="w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto">

                        <div className="lg:h-[180px] sm:h-[100px]"></div>

                        <div className="flex flex-row gap-7 text-white">

                            <Button active={true} linkTo={"/signup"}>
                                <div className="flex gap-3 items-center">
                                    Explore Full Catalogue <FaArrowRight></FaArrowRight>
                                </div>
                            </Button>

                            <Button active={false} linkTo={"/signup"}>
                                <div>
                                    Learn More!
                                </div>
                            </Button>

                        </div>
                    </div>
                </div>

                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
                    {/* Job that is in Demand - Section 1 */}
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                            Get the skills you need for a{" "}
                            <HighlightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to
                                be a competitive specialist requires more than professional
                                skills.
                            </div>
                            <Button active={true} linkto={"/signup"}>
                                <div className="">Learn More</div>
                            </Button>
                        </div>
                    </div>

                    {/* Timeline Section - Section 2 */}
                    <Timeline />

                    {/* Learning Language Section - Section 3 */}
                    <LearningPath />

                </div>
            </div>

            {/* Section 3 */}
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Become a instructor section */}
                <InstructerSection />
            </div>

            {/* Reviws from Other Learner */}
            <div className="relative mx-auto my-5 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-0 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
            </div>
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-0 lg:max-w-maxContent">
                <ReviewSlider />
            </div>

            <Footer />

        </div >
    )
};
export default Home