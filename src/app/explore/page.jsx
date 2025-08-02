import React from 'react'

export default function ExploreSkills() {
  const popularSkills = [
  { title: 'Graphic Design', emoji: '🎨' },
  { title: 'Web Development', emoji: '💻' },
  { title: 'Yoga', emoji: '🧘' },
  { title: 'Photography', emoji: '📷' },
  { title: 'Public Speaking', emoji: '🗣' },
];

  return (
    <div className='container mx-auto py-8 md:py-12 xl:py-16 flex flex-col justify-center items-center'>
      <div className='flex flex-col md:flex-row gap-2 md:gap-4 lg:gap-10 mx-auto'>
        <div className='md:col-span-2 lg:col-span-3 w-full'>
          <input type="text" className='input w-full'/>
        </div>
        <div className=''>
          <select className='select' value={'select'} name="select" id="">
            <option value="select">select</option>
            <option value="grapchic_design">Graphic Design</option>
            <option value="web_development">Web Development</option>
            <option value="yoga">Yoga</option>
            <option value="photography">Photography</option>
            <option value="public_speaking">Public Speaking</option>
          </select>
        </div>
      </div>
      <div>

      </div>
    </div>
  )
}
