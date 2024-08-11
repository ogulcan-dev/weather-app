import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

interface ErrorData {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | ErrorData>
) {
  const { city } = req.query;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'Şehir ismi gerekli' });
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    res.status(200).json({
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (error) {
    res.status(500).json({ error: 'Hava durumu verileri alınamadı' });
  }
}
