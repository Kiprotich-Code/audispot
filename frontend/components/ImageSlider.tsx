"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Interface for image data from the API
interface ImageData {
  title: string;
  image: string; // URL for the image
  uploaded_at: string; // Date the image was uploaded
}

export default function ImageSlider(): JSX.Element {
  // State to keep track of the image data
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Fetch images from the API using Axios
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/slider_images/");
        setImages(response.data); // Assuming `response.data` is an array of objects with `title`, `image`, and `uploaded_at`
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    if (!isHovered && images.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isHovered, images]);

  const handleMouseOver = (): void => setIsHovered(true);
  const handleMouseLeave = (): void => setIsHovered(false);

  if (images.length === 0) {
    return <p>Loading...</p>; // Display a loading state until images are fetched
  }

  return (
    <section className="md:max-w-4xl w-full py-8 mx-auto">
      {images.length > 0 ? (
        <div className="relative w-full px-4 md:px-1 mx-auto mt-4">
          <div
            className="relative h-[500px] w-full overflow-hidden group"
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={images[currentIndex]?.image ? `http://127.0.0.1:8000${images[currentIndex].image}` : ""}
              alt={images[currentIndex]?.title || "Image"}
              width={800}
              height={500}
              objectFit="cover"
              className="w-full rounded-lg h-full object-cover transition-all duration-500 ease-in-out cursor-pointer"
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md">
              <h2 className="text-lg font-bold">{images[currentIndex]?.title || "Untitled"}</h2>
              <p className="text-sm">
                {images[currentIndex]?.uploaded_at
                  ? new Date(images[currentIndex].uploaded_at).toLocaleDateString()
                  : "Unknown Date"}
              </p>
            </div>
          </div>
          <button
            className="absolute left-12 top-1/2 transform h-[60px] rounded-xl hover:bg-[#1a222f] mx-1 -translate-y-1/2 bg-[#1a222f85] text-white p-2 group"
            onClick={prevSlide}
          >
            <ChevronLeft className="text-gray-400 group-hover:text-white" />
          </button>
          <button
            className="absolute right-12 top-1/2 transform h-[60px] rounded-xl hover:bg-[#1a222f] mx-1 -translate-y-1/2 bg-[#1a222f85] text-white p-2 group"
            onClick={nextSlide}
          >
            <ChevronRight className="text-gray-400 group-hover:text-white" />
          </button>
          <div className="flex justify-center mt-4">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 w-10 mx-1 ${index === currentIndex
                  ? "bg-secondaryColor rounded-xl"
                  : "bg-gray-300 rounded-xl"
                  } transition-all duration-500 ease-in-out`}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}