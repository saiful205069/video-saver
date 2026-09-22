import fs from 'fs';
import path from 'path';

const dataFile = path.join(process.cwd(), 'data.json');

export interface AppData {
  stats: {
    visits: number;
    dailyVisits: Record<string, number>;
    monthlyVisits: Record<string, number>;
    searches: number;
    downloads: number;
    recentActivity: Array<{ type: string; url?: string; time: string }>;
  };
  config: {
    siteName: string;
    siteColor: string;
  };
}

const defaultData: AppData = {
  stats: {
    visits: 0,
    dailyVisits: {},
    monthlyVisits: {},
    searches: 0,
    downloads: 0,
    recentActivity: []
  },
  config: {
    siteName: 'VideoSaver',
    siteColor: 'emerald'
  }
};

function getData(): AppData {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify(defaultData, null, 2));
      return defaultData;
    }
    const rawData = fs.readFileSync(dataFile, 'utf-8');
    const parsed = JSON.parse(rawData);
    
    // Migrate old data format to new format if needed
    if (!parsed.stats) {
      return {
        ...defaultData,
        stats: {
          ...defaultData.stats,
          visits: parsed.visits || 0,
          searches: parsed.searches || 0,
          downloads: parsed.downloads || 0,
          recentActivity: parsed.recentActivity || []
        }
      };
    }
    
    // Ensure nested objects exist
    parsed.stats.dailyVisits = parsed.stats.dailyVisits || {};
    parsed.stats.monthlyVisits = parsed.stats.monthlyVisits || {};
    parsed.config = parsed.config || defaultData.config;
    
    return parsed;
  } catch (error) {
    return defaultData;
  }
}

function saveData(data: AppData) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to save data", error);
  }
}

export function trackAction(action: 'visit' | 'search' | 'download', url?: string) {
  const data = getData();
  const date = new Date();
  const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const monthKey = dateKey.substring(0, 7); // YYYY-MM
  
  if (action === 'visit') {
    data.stats.visits += 1;
    data.stats.dailyVisits[dateKey] = (data.stats.dailyVisits[dateKey] || 0) + 1;
    data.stats.monthlyVisits[monthKey] = (data.stats.monthlyVisits[monthKey] || 0) + 1;
  }
  if (action === 'search') data.stats.searches += 1;
  if (action === 'download') data.stats.downloads += 1;
  
  if (action === 'search' || action === 'download') {
    data.stats.recentActivity.unshift({
      type: action,
      url: url || '',
      time: date.toISOString()
    });
    
    if (data.stats.recentActivity.length > 50) {
      data.stats.recentActivity = data.stats.recentActivity.slice(0, 50);
    }
  }
  
  saveData(data);
  return data;
}

export function getAllStats() {
  return getData().stats;
}

export function getConfig() {
  return getData().config;
}

export function updateConfig(newConfig: Partial<AppData['config']>) {
  const data = getData();
  data.config = { ...data.config, ...newConfig };
  saveData(data);
  return data.config;
}
