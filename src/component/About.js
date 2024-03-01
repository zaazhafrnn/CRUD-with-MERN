// About.js
import React from 'react';
import { FaHtml5 } from 'react-icons/fa';
import { FaCss3Alt } from 'react-icons/fa';
import { SiJavascript } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";

const About = () => {
  const data = ({
    about: 'about me',
    title : 'short description',
    desc: `Hello, I'm Achmad Zhafran Alysyam. I'm currently in grade 11 and studying at SMKN 10 Surabaya majored in software engineering. 
    I have a passion that always wants to continue learning, especially about software, and that is one of the goals I want.`,
    image: 'https://tost.unja.ac.id/wp-content/uploads/2022/10/pexels-pixabay-459653-scaled.jpg',
  });

  return (
    <div className="bg-white py-16">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center">
        <p className="text-blue-500 font-bold lg:hidden mb-4">{data.about}</p>

        <div className="lg:w-1/2 md:w-5/12 mb-8 lg:mb-0 px-4 lg:px-0">
          <img src={data.image} alt="Laptop" className="w-full rounded-lg shadow-lg" />
        </div>

        <div className="lg:w-1/2 lg:pl-8 lg:pr-8 text-center lg:text-left">
          <p className="text-blue-500 font-bold hidden lg:block mb-4">{data.about}</p>

          <h2 className="text-3xl lg:text-4xl font-bold mb-4">{data.title}</h2>
          <p className="text-md text-gray-700 leading-relaxed">
            {data.desc}
          </p>

          <div className="flex items-center mt-6 lg:justify-start justify-center">
            <p className="text-gray-600 mr-2">Tech Stack |</p>
            <div className="flex space-x-4">
              <FaHtml5 />
              <FaCss3Alt />
              <SiJavascript />
              <SiTailwindcss />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
