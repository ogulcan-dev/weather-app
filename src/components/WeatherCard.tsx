import React from 'react';
import Image from 'next/image';

interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, temperature, description, icon, humidity, windSpeed }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2">{city}</h2>
      <div className="relative w-20 h-20">
        <Image
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <p className="text-lg capitalize mb-2">{description}</p>
      <p className="text-4xl font-bold mb-2">{temperature}°C</p>
      <div className="flex justify-between w-full">
        <p>Nem: {humidity}%</p>
        <p>Rüzgar: {windSpeed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
