import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


interface ForecastEntry {
    dateTime: string;
    temperature: number;
    description: string;
    icon: string;
}

interface ForecastData {
    city: string;
    forecast: ForecastEntry[];
}

interface ErrorData {
    error: string;
}

export default async function name(req: NextApiRequest, res: NextApiResponse<ForecastData | ErrorData>) {
    const { city } = req.query;

    if(!city || typeof city !== 'string') {
        return res.status(400).json({error: 'Şehir ismi gerekli'})
    }

    try {
        const apiKey = process.env.NEXT_PUBLİC_OPENWEATHERMAP_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        
        const data = response.data;
        const forecast = data.list.map((entry: any) => ({
            dateTime: entry.dt_txt,
            temperature: entry.main.temp,
            description: entry.weather[0].description,
            icon: entry.weather[0].icon
        }));

        res.status(200).json({city: data.city.name, forecast: forecast});
    } catch (error) {
        res.status(400).json({error: 'Hava durumu tahmini alınamadı'});
    }
}