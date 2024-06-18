import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Resume = () => {
  const { role } = useParams();
  const [resumes, setResumes] = useState(null);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/resume/get/${role}`);
        setResumes(response.data);

        const photoPromises = response.data.map(async (res) => {
          if (res.photoName) {
            const imageResponse = await axios.get(`http://localhost:8080/image/${res.photoName}`, { responseType: 'arraybuffer' });
            const base64Image = btoa(
              new Uint8Array(imageResponse.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return { [res.id]: `data:${imageResponse.headers['content-type']};base64,${base64Image}` };
          }
          return { [res.id]: null };
        });

        const photoResults = await Promise.all(photoPromises);
        const photoMap = photoResults.reduce((acc, photo) => ({ ...acc, ...photo }), {});
        setPhotos(photoMap);
      } catch (error) {
        console.error('Error fetching resume', error);
      }
    };

    fetchResume();
  }, [role]);

  return (
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
        <div className="mx-auto max-w-2xl sm:py-48 lg:py-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {role.charAt(0).toUpperCase() + role.slice(1)} Resumes
            </h1>
          </div>
        </div>
        {resumes ? (
          resumes.map((res) => {
            const developerFeatures = [
              { name: 'Qualifications:', description: res.qualifications },
              { name: 'Tech Skills', description: res.techSkills },
              { name: 'Business Impact', description: res.businessImpact },
              { name: 'Email', description: res.email },
            ];

            const tutorFeatures = [
              { name: 'Courses Taken', description: res.coursesTaught },
              { name: 'Years Of Experience', description: res.yearsOfExperience },
              { name: 'Email', description: res.email },
            ];

            const features = role === 'developer' ? developerFeatures : tutorFeatures;

            return (
              <div
                className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8 border-zinc-950	border-solid	border-b-8	"
                key={res.id}
              >
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {res.firstName + ' ' + res.lastName}
                  </h2>
                  <p className="mt-4 text-gray-500 text-2xl">
                    {res.workExperience}
                  </p>
                  <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                    {features.map((feature) => (
                      <div key={feature.name} className="border-t border-gray-200 pt-4">
                        <dt className="font-medium text-gray-900 text-3xl">{feature.name}</dt>
                        <dd className="mt-2 text-2xl text-gray-500">{feature.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="sm:gap-6 lg:gap-8">
                  {photos[res.id] ? (
                    <img
                      src={photos[res.id]}
                      alt={`${res.firstName} ${res.lastName}`}
                      className="rounded-lg bg-gray-100"
                    />
                  ) : (
                    <p>No photo available</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
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
  );
};

export default Resume;
