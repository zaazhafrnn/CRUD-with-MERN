import React from "react"
import Image from '../winnie.jpeg';
import { PiGithubLogoBold } from "react-icons/pi";

const Hero = () => {
    const data = ({
        title: 'Hello, welcome',
        desc: `Welcome to my portfolio website! Explore the projects I've worked on, and get in touch with me.
        Feel free to take a look around, and don't hesitate to connect with me on GitHub.`,
        image: Image,
    });

    return (
        <div className="min-h-screen sm:min-w-screen-l md:min-w-screen-lg flex items-center bg-neutral-100 text-[#2e2e2e]">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row">
                <div className="lg:w-7/12 lg:pr-8 lg:self-center order-2 lg:order-1 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">{data.title}</h1>
                    <p className="text-lg mb-8 text-[#555555]">
                        {data.desc}
                    </p>
                    <a href="https://github.com/zaazhafrnn" rel="" className="flex items-center text-black hover:text-blue-500  justify-center lg:justify-start">
                        <PiGithubLogoBold />
                    </a>
                </div>


                <div className="lg:w-5/12 md:w-1/2 sm:w-1/3 mx-auto mb-8 lg:mx-0 order-1 lg:order-2 mt-8 lg:mt-0">
                    <img src={data.image} alt='' className="mx-auto lg:mx-0 rounded-full border-solid border-4 border-[#2d2e32] w-2/5 md:w-1/2 sm:w-2/3 scale-x-[-1]"  />
                </div>
            </div>
        </div>
    )
}

export default Hero;