// Portfolio.js
import React from 'react';
import ProjectImage1 from '../Screenshot 2024-01-03 at 21-08-45 StarPro an Effective Way for Project Management.png';
import { PiGithubLogoBold } from "react-icons/pi";
import { PiArrowSquareOutBold } from "react-icons/pi";

const Portfolio = () => {
  return (
    <div className="bg-gray-100 py-16 lg:text-left md:text-center">
      <div className="max-w-4xl mx-auto">
        <p className="text-blue-500 mb-4 font-bold">PORTFOLIO</p>
        <h2 className="mb-12 text-2xl font-bold">Here's some web I've built 📝</h2>

        {/* Project 1 */}
        <div className="flex flex-col lg:flex-row bg-white rounded-lg p-6 mb-8">
          <div className="lg:w-1/2 lg:pr-6 mb-4 lg:mb-0">
            <img src={ProjectImage1} alt="Project 1" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="lg:w-1/2 text-center">
            <h3 className="text-xl font-bold mb-6">Management Project StarPro 📚</h3>
            <p className="text-gray-600 mb-4 text-center">Case study assignment aimed at how to increase productivity effectively with an ebook that requires logging in with email first</p>
            <div className="mb-4 flex justify-center items-center">
              <div className="bg-white text-black px-5 py-2 shadow-xl mx-4">HTML</div>
              <div className="bg-white text-black px-5 py-2 shadow-xl mx-4">Tailwind CSS</div>
            </div>
            <div className="flex space-x-4 justify-center">
              <a href="https://github.com/zaazhafrnn/starpro.github.io.git" className="flex items-center hover:text-blue-500">
                <span className="mr-2">Code</span>
                <PiGithubLogoBold />
              </a>
              <a href="https://zaazhafrnn.github.io/starpro.github.io/" className="flex items-center hover:text-blue-500">
                <span className="mr-2">Live Demo</span>
                <PiArrowSquareOutBold />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
