import React, { useState } from 'react';
import axios from 'axios';

const InfoForm=() => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [qualifications, setQualification] = useState('');
  const [role, setRole] = useState('');
  const [techSkills, setTechSkills] = useState('');
  const [businessImpact, setBusinessImpact] = useState('');
  const [coursesTaught, setCoursesTaken] = useState('');
  const [yearsOfExperience, setYearsExperience] = useState(0);
  const [photoName, setPhotoName] = useState('');
  
  const handleSubmit = async (event) => {
      event.preventDefault();

      if (!firstName || !lastName || !email || !role) {
          alert('Please fill in all required fields');
          return;
        }
      
      if (role === 'developer' && (!techSkills || !businessImpact)) {
      alert('Please fill in all required fields for the developer role');
      return;
      }
  
      if (role === 'tutor' && (!coursesTaught || !yearsOfExperience)) {
      alert('Please fill in all required fields for the tutor role');
      return;
      }    
    
      const formData = {
          firstName,
          lastName,
          email,
          workExperience,
          qualifications,
          role,
          techSkills: role === 'developer' ? techSkills : undefined,
          businessImpact: role === 'developer' ? businessImpact : undefined,
          coursesTaught: role === 'tutor' ? coursesTaught : undefined,
          yearsOfExperience: role === 'tutor' ? yearsOfExperience : 0,
          photoName,
      };

      // console.log(formData);
    
      try {
        const response = await axios.post('http://localhost:8080/api/resume/create', formData);
        console.log(response.data);
        alert(response.data);
      } catch (error) {
        console.error(error);
        alert('An error occurred. Please try again later');
      }
    };
  


  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageForm = new FormData();
      imageForm.append('image', file);
      try {
        const res = await axios.post('http://localhost:8080/image', imageForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res.data);
        setPhotoName(res.data); // Set the photo name from response
      } catch (error) {
        console.error('Error uploading photo', error);
        alert('Error uploading photo');
      }
    }
  };
  

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
        <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Create Resume
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 text-3xl">
            This information will be used to Create Resume
            </p>
            </div>
        <form onSubmit={handleSubmit}>
      <div className="space-y-25 px-64 pt-32 pb-32 text-stone-950	">
        <div className="border-b border-gray-900/10  mx-60">
          <h2 className="text-base font-semibold leading-7 text-gray-900 text-stone-950	text-2xl">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-stone-950	text-xl">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950	text-2xl">
                First name
              </label>
              <div className="mt-2 ">
                <input
                  type="text"
                  name="firstName"
                  maxLength="255"
                  onChange={(e) => setFirstName(e.target.value)}
                  id="firstName"
                  autoComplete="firstName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950	text-2xl">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  maxLength="255"
                  onChange={(e) => setLastName(e.target.value)}
                  id="lastName"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950	text-2xl">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  maxLength="255"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="qualifications" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950 text-2xl">
                Qualification (upto 255 characters)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="qualification"
                  onChange={(e) => setQualification(e.target.value)}
                  id="qualifications"
                  maxLength="255"
                  autoComplete="qualifications"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
                  <div className="col-span-full">
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950 text-2xl">
                Years of Experience (0-50)
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="yearsOfExperience"
                  onChange={(e) => setYearsExperience(e.target.value)}                  
                  id="yearsOfExperience"
                  
                  autoComplete="years-of-experience"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="col-span-full">
          <label for="cover-photo" class="block text-sm font-medium leading-6 text-gray-900 text-2xl">Cover photo</label>
          <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div class="text-center">
              <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
              </svg>
              <div class="mt-4 flex text-sm leading-6 text-gray-600">
                <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-sky-950 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-950 focus-within:ring-offset-2 hover:text-sky-950 text-xl">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={handlePhotoChange}/>
                </label>
                <p class="pl-1 text-xl">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600 text-xl">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
            <div className="col-span-full">
              <label htmlFor="workExperience" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950		text-2xl">
                Experience Summary (upto 255 characters)
              </label>
              <p className="mt-3 text-sm leading-6 text-gray-600 text-stone-950		text-2xl">Briefly specify you top Experiences.</p>
              <div className="mt-2">
              <input
                type="text"
                id="workExperience"
                name="workExperience"
                maxLength="255"
                onChange={(e) => setWorkExperience(e.target.value)}
                autoComplete="qualifications"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />

              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 text-stone-950	text-2xl	">
                Role
              </label>
              <div className="mt-2 text-2xl">
                <select
                  id="role"
                  name="role"
                  onChange={handleRoleChange}
                  autoComplete="role"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-2xl sm:leading-6 text-2xl"
                >
                  <option value="" className='text-2xl'>Select Role</option>
                  <option value="developer" className='text-2xl'>Developer</option>
                  <option value="tutor" className='text-2xl'>Tutor</option>
                </select>
                {role === 'developer' && (
                  <>
                  <div className="mt-2 ">
                    <input type="text" name="techSkills" placeholder="Tech Stack" onChange={(e) => setTechSkills(e.target.value)} className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-2xl sm:leading-6 	" />
                  </div>
                    <div className="mt-2">
                    <textarea type="text" name="businessImpact" placeholder="Business Impact" onChange={(e) => setBusinessImpact(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-2xl sm:leading-6 " />
                    </div>
                  </> 
                )}
                {role === 'tutor' && (
                  <>
                  <div className="mt-2 ">
                  <input type="text" name="coursesTaken" placeholder="Courses Taken" onChange={(e) => setCoursesTaken(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-2xl sm:leading-6 text-2xl	"/>
                  </div>
                  <div className="mt-2">
                    <input type="number" name="yearsExperience" min="0" max="50" placeholder="Years of Experience" onChange={(e) => setYearsExperience(e.target.value)} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-2xl sm:leading-6 text-2xl	" />
                  </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

    <div className="mt-6 flex items-center justify-end gap-x-6 space-y-25 px-8  mx-72">
    <button type="button" className="text-sm font-semibold leading-6 text-gray-900 text-stone-950	text-2xl	">
      Cancel
    </button>
    <button
      type="submit"
      className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-2xl	"
    >
      Save
    </button>
  </div>
  </div>
</form>
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


    </>
    
  );
}

export default InfoForm;