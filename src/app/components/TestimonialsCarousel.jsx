'use client';
import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

const testimonials = [
  {
    name: 'Rafiq',
    image: 'https://i.pravatar.cc/150?img=11',
    feedback: 'I traded guitar lessons for coding help — SkillSwap is brilliant!',
  },
  {
    name: 'Sarah',
    image: 'https://i.pravatar.cc/150?img=12',
    feedback: 'I learned yoga from someone while teaching them Photoshop!',
  },
  {
    name: 'John',
    image: 'https://i.pravatar.cc/150?img=13',
    feedback: 'I found a French tutor and helped him with React. Amazing platform!',
  },
  {
    name: 'Mei',
    image: 'https://i.pravatar.cc/150?img=14',
    feedback: 'Great way to learn and grow without spending money.',
  },
];

export default function TestimonialsCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
  });

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-2">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div ref={sliderRef} className="keen-slider">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="keen-slider__slide bg-gray-100 p-6 rounded-xl shadow text-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 mx-auto rounded-full mb-4 object-cover"
              />
              <p className="text-gray-700 italic mb-2">“{testimonial.feedback}”</p>
              <p className="text-sm font-medium text-gray-900">– {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
