import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const WorkExperience = () => {

  const { role } = useParams();
  const [workExperiences, setWorkExperiences] = useState([]);

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/resume/workExperience/${role}`);
        setWorkExperiences(response.data);
      } catch (error) {
        console.error('Error fetching work experiences', error);
      }
    };

    fetchWorkExperiences();
  }, [role]);

  return (
    <>
    <body>
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
             Work Experience for {role}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              List of developers and their work experience
            </p>
          </div>
        </div>
        <div  >
        {workExperiences.map((workExperience, index) => (
             <div className="mt-6 border-t border-gray-100 border-y-8 border-zinc-950		" key={index}> 
                  <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-2xl font-medium leading-6 text-gray-900">Full name</dt>
                      <dd className="mt-1 text-2xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{workExperience.firstName} {workExperience.lastName}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-2xl font-medium leading-6 text-gray-900">Work Experience</dt>
                      <dd className="mt-1 text-2xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {workExperience.workExperience}</dd>
                    </div>
                  </dl>
               </div >
           
        ))}
    </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
    </body>
        <div>
      <ul>

      </ul>
    </div>
    </>

  );
};

export default WorkExperience;