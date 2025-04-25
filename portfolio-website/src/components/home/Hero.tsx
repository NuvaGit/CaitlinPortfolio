import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Caitlin O'Brien
                    </h1>
                    <h2 className="text-xl md:text-2xl font-light mb-6">
                        Law with Politics Graduate | Legal Professional
                    </h2>
                    <p className="text-lg mb-8">
                        A dedicated and motivated legal professional with experience in legal research,
                        property management, and a passion for making positive societal change.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/about">
                            <a className="bg-teal-600 hover:bg-opacity-80 transition text-white px-6 py-3 rounded-md font-medium">
                                About Me
                            </a>
                        </Link>
                        <Link href="/contact">
                            <a className="bg-transparent hover:bg-white hover:text-blue-800 transition text-white border-2 border-white px-6 py-3 rounded-md font-medium">
                                Get in Touch
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="md:w-2/5">
                    <div className="bg-white p-2 rounded-lg shadow-lg transform rotate-3">
                        {/* Placeholder if image not ready */}
                        <div className="w-full h-[500px] bg-gray-200 rounded flex items-center justify-center">
                            <p className="text-gray-500">Profile Photo</p>
                        </div>
                        {/* Uncomment when image ready */}
                        {/* 
                        <Image
                            src="/profile-photo.jpg"
                            alt="Caitlin O'Brien"
                            width={400}
                            height={500}
                            className="rounded"
                            priority
                        />
                        */}
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};

export default Hero;
