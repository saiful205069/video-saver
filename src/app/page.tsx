'use client';

import { useState, useEffect } from 'react';
import { Download, ArrowRight, Loader2, Video } from 'lucide-react';
import { FaFacebook, FaXTwitter, FaYoutube, FaInstagram, FaTiktok, FaVimeo, FaVk, FaReddit, FaPinterest, FaThreads, FaFileVideo, FaFileAudio, FaFilm } from 'react-icons/fa6';
import { SiDailymotion, SiXiaohongshu } from 'react-icons/si';

interface Format {
  format_id: string;
  ext: string;
  resolution: string;
  filesize?: number;
  url: string;
  vcodec: string;
  acodec: string;
  protocol?: string;
  format_note?: string;
}

interface VideoInfo {
  title: string;
  thumbnail: string;
  duration_string: string;
  formats: Format[];
}

type PlatformType = 'default' | 'pinterest' | 'facebook' | 'youtube' | 'instagram' | 'tiktok' | 'reddit' | 'dailymotion' | 'threads' | 'vk' | 'vimeo' | 'xiaohongshu';

const platformDetails: Record<PlatformType, any> = {
  default: {
    title: 'Free Online Video Downloader',
    placeholder: 'Paste your video link here',
    description: 'VideoSaver is a free online video downloader that lets you save videos from multiple platforms in original HD quality - without a watermark, without logging in, and without installing any app. Just paste a link, click Download, and the file is saved straight to your phone or computer. It works in any browser on iPhone, iPad, Android, Windows and Mac, so you can keep the videos you love available offline at any time.',
    icon: null,
  },
  pinterest: {
    title: 'Pinterest Video Downloader - Download HD Videos Without Watermark',
    placeholder: 'Paste your Pinterest video link here',
    description: 'VideoSaver is a free online Pinterest video downloader that lets you save Pinterest videos, images and GIFs in original HD quality - without a watermark, without logging in, and without installing any app. Just paste a Pin link, click Download, and the file is saved straight to your phone or computer. It works in any browser on iPhone, iPad, Android, Windows and Mac, so you can keep the Pins you love available offline at any time.\n\nPinterest is full of short recipe clips, DIY and craft tutorials, workout routines, fashion lookbooks and design inspiration - but the app itself gives you no easy way to save that content to your device. VideoSaver fills that gap: it turns any public Pin link into a downloadable file in a few seconds, completely free.',
    icon: <FaPinterest className="w-56 h-56 text-[#E60023] bg-white rounded-3xl shadow-sm" />
  },
  facebook: {
    title: 'Facebook Video Downloader - Download FB Videos in HD',
    placeholder: 'Paste your Facebook video link here',
    description: 'VideoSaver is a free online Facebook video downloader that lets you save Facebook videos in original HD quality - without a watermark, without logging in, and without installing any app. Just paste a FB link, click Download, and the file is saved straight to your phone or computer.',
    icon: <FaFacebook className="w-56 h-56 text-[#1877F2]" />
  },
  youtube: {
    title: 'YouTube Video Downloader - Download HD Videos',
    placeholder: 'Paste your YouTube video link here',
    description: 'VideoSaver is a free online YouTube video downloader that lets you save YouTube videos in original HD quality - without a watermark, without logging in, and without installing any app.',
    icon: <FaYoutube className="w-56 h-56 text-[#FF0000]" />
  },
  instagram: {
    title: 'Instagram Video Downloader - Download IG Reels & Videos',
    placeholder: 'Paste your Instagram video link here',
    description: 'VideoSaver is a free online Instagram video downloader that lets you save IG videos in original HD quality - without a watermark, without logging in, and without installing any app.',
    icon: <FaInstagram className="w-56 h-56 text-[#E4405F]" />
  },
  tiktok: {
    title: 'TikTok Video Downloader - Download Without Watermark',
    placeholder: 'Paste your TikTok video link here',
    description: 'VideoSaver is a free online TikTok video downloader that lets you save TikTok videos without watermark in HD.',
    icon: <FaTiktok className="w-56 h-56 text-black" />
  },
  reddit: {
    title: 'Reddit Video Downloader - Download Reddit Videos with Audio',
    placeholder: 'Paste your Reddit video link here',
    description: 'VideoSaver is a free online Reddit video downloader that lets you save Reddit videos with sound in original HD quality. Just paste a Reddit link, click Download, and the file is saved straight to your phone or computer.',
    icon: <FaReddit className="w-56 h-56 text-[#FF4500]" />
  },
  dailymotion: {
    title: 'Dailymotion Video Downloader - Download HD Videos',
    placeholder: 'Paste your Dailymotion video link here',
    description: 'VideoSaver is a free online Dailymotion video downloader that lets you save Dailymotion videos in original HD quality - without a watermark, without logging in, and without installing any app.',
    icon: <SiDailymotion className="w-56 h-56 text-[#0066dc]" />
  },
  threads: {
    title: 'Threads Video Downloader - Download Threads Videos',
    placeholder: 'Paste your Threads video link here',
    description: 'VideoSaver is a free online Threads video downloader that lets you save Threads videos in original HD quality. Just paste a Threads link and click Download.',
    icon: <FaThreads className="w-56 h-56 text-black" />
  },
  vk: {
    title: 'VK Video Downloader - Download VK Videos',
    placeholder: 'Paste your VK video link here',
    description: 'VideoSaver is a free online VK video downloader that lets you save VKontakte videos in original HD quality. Just paste a VK link and click Download.',
    icon: <FaVk className="w-56 h-56 text-[#0077FF]" />
  },
  vimeo: {
    title: 'Vimeo Video Downloader - Download HD Videos',
    placeholder: 'Paste your Vimeo video link here',
    description: 'VideoSaver is a free online Vimeo video downloader that lets you save Vimeo videos in original HD quality - without a watermark.',
    icon: <FaVimeo className="w-56 h-56 text-[#1AB7EA]" />
  },
  xiaohongshu: {
    title: 'Xiaohongshu Video Downloader - Download Without Watermark',
    placeholder: 'Paste your Xiaohongshu video link here',
    description: 'VideoSaver is a free online Xiaohongshu (Little Red Book) video downloader that lets you save videos without a watermark in original HD quality.',
    icon: <SiXiaohongshu className="w-56 h-56 text-[#FF2442]" />
  }
};

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [platform, setPlatform] = useState<PlatformType>('default');
  
  // Ad simulation state
  const [adUrl, setAdUrl] = useState<string | null>(null);
  const [adCountdown, setAdCountdown] = useState(0);
  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const LANGUAGES = [
    { name: 'العربية', flagUrl: 'https://flagcdn.com/w20/sa.png', code: 'ar' },
    { name: 'Deutsch', flagUrl: 'https://flagcdn.com/w20/de.png', code: 'de' },
    { name: 'English', flagUrl: 'https://flagcdn.com/w20/gb.png', code: 'en' },
    { name: 'Español', flagUrl: 'https://flagcdn.com/w20/es.png', code: 'es' },
    { name: 'Français', flagUrl: 'https://flagcdn.com/w20/fr.png', code: 'fr' },
    { name: 'हिन्दी', flagUrl: 'https://flagcdn.com/w20/in.png', code: 'hi' },
    { name: 'Bahasa Indonesia', flagUrl: 'https://flagcdn.com/w20/id.png', code: 'id' },
    { name: 'Italiano', flagUrl: 'https://flagcdn.com/w20/it.png', code: 'it' },
    { name: '日本語', flagUrl: 'https://flagcdn.com/w20/jp.png', code: 'ja' },
    { name: '한국어', flagUrl: 'https://flagcdn.com/w20/kr.png', code: 'ko' },
    { name: 'Polski', flagUrl: 'https://flagcdn.com/w20/pl.png', code: 'pl' },
    { name: 'Português', flagUrl: 'https://flagcdn.com/w20/br.png', code: 'pt' },
    { name: 'Русский', flagUrl: 'https://flagcdn.com/w20/ru.png', code: 'ru' },
    { name: 'ไทย', flagUrl: 'https://flagcdn.com/w20/th.png', code: 'th' },
    { name: 'Türkçe', flagUrl: 'https://flagcdn.com/w20/tr.png', code: 'tr' },
    { name: 'Українська', flagUrl: 'https://flagcdn.com/w20/ua.png', code: 'uk' },
    { name: 'Tiếng Việt', flagUrl: 'https://flagcdn.com/w20/vn.png', code: 'vi' },
    { name: '简体中文', flagUrl: 'https://flagcdn.com/w20/cn.png', code: 'zh-CN' },
  ];
  
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[2]);
  const currentPlatform = platformDetails[platform];

  const [siteName, setSiteName] = useState('VideoSaver');

  useEffect(() => {
    // Fetch config for siteName
    fetch('/api/track?action=get_config')
      .then(res => res.json())
      .then(data => {
        if (data.siteName) setSiteName(data.siteName);
      })
      .catch(console.error);

    // Track visit
    fetch('/api/track?action=visit').catch(console.error);

    // Check if we have a saved language in the cookie
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(c => c.trim().startsWith('googtrans='));
    
    if (googtransCookie) {
      const code = googtransCookie.split('=')[1].split('/')[2];
      const foundLang = LANGUAGES.find(l => l.code === code);
      if (foundLang) setSelectedLanguage(foundLang);
    }

    // Inject Google Translate script if not already present
    if (!document.getElementById('google-translate-script')) {
      const addScript = document.createElement('script');
      addScript.id = 'google-translate-script';
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(addScript);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false
        }, 'google_translate_element');
      };
    }
  }, []);

  const handlePlatformChange = (p: PlatformType) => {
    setPlatform(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePremiumDownload = (e: React.MouseEvent, targetUrl: string) => {
    e.preventDefault();
    setAdUrl(targetUrl);
    setAdCountdown(5); // 5 seconds ad

    const interval = setInterval(() => {
      setAdCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setAdUrl(null); // Close ad modal
          // Trigger the download automatically via navigation to avoid popup blockers
          window.location.href = targetUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const res = await fetch(`/api/info?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch video information');
      }

      setVideoInfo(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getBestFormats = (formats: Format[]) => {
    return formats
      .filter(f => 
        (f.ext === 'mp4' || f.ext === 'm4a' || f.resolution === 'audio only') && 
        (!f.vcodec || f.vcodec === 'none' || f.vcodec === 'unknown' || f.vcodec.startsWith('avc') || f.vcodec.includes('h264') || f.vcodec.includes('mp4v')) &&
        !f.url.includes('.m3u8')
      )
      .sort((a, b) => {
        const heightA = parseInt(a.resolution?.split('x')[1] || '0');
        const heightB = parseInt(b.resolution?.split('x')[1] || '0');
        if (heightB !== heightA) return heightB - heightA;
        
        // If same resolution, prefer the one with audio
        if (a.acodec !== 'none' && b.acodec === 'none') return -1;
        if (a.acodec === 'none' && b.acodec !== 'none') return 1;
        return 0;
      })
      .slice(0, 15);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div onClick={() => handlePlatformChange('default')} className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-80 blur-[2px]"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-green-600 to-emerald-400 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-500 shadow-lg"></div>
              <svg className="w-5 h-5 text-white z-10 relative drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tighter drop-shadow-sm">
              {siteName}
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#how-to-use" className="text-gray-600 hover:text-green-500 font-medium transition-colors">How to use</a>
          </nav>
        </div>
      </header>

      {/* Main Hero Section - Modern Unique Design */}
      <main className="relative bg-gradient-to-br from-slate-50 via-white to-green-50/30 py-20 px-4 overflow-hidden">
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Centered Modern Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 max-w-4xl mx-auto leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 drop-shadow-sm">
            {currentPlatform.title}
          </h1>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto text-lg">
            Fast, secure, and completely free. Download your favorite videos in original HD quality without any watermarks.
          </p>
          
          {/* Modern Pill-shaped Input Form */}
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl md:rounded-full bg-white p-2 border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <input 
                type="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={currentPlatform.placeholder}
                className="flex-1 px-6 py-4 md:py-5 outline-none text-gray-700 text-lg bg-transparent rounded-full"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 text-white font-bold py-4 md:py-5 px-10 rounded-xl md:rounded-full transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
                <span>{loading ? 'Processing...' : 'Download'}</span>
              </button>
            </form>
            
            <p className="mt-4 text-[13px] text-gray-400 text-center font-medium">
              By using our service you accept our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 transition-colors hover:underline">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 transition-colors hover:underline">Privacy Policy</a>
            </p>

            {/* Trust Badges in a sleek row */}
            <div className="mt-10 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm bg-white/60 backdrop-blur-md py-3 px-8 rounded-full border border-gray-100 shadow-sm">
              <a href="#how-to-use" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <span className="text-[10px]">▶</span>
                </div>
                <span className="font-semibold text-gray-700">Tutorial</span>
              </a>
              
              <div className="w-px h-4 bg-gray-300 hidden md:block"></div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="font-medium text-gray-800">Norton</span> Safe Web
              </div>
              
              <div className="w-px h-4 bg-gray-300 hidden md:block"></div>
              
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400 text-lg drop-shadow-sm">★★★★★</div>
                <span className="font-bold text-gray-800">4.8</span>
                <span className="text-gray-500">/ 5 (21k+ reviews)</span>
              </div>
            </div>
          </div>

          {/* State Indicators */}
      <div className="max-w-3xl mx-auto mt-10 px-4">
        {loading && (
          <div className="text-center py-10">
            <Loader2 className="animate-spin h-10 w-10 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 font-medium text-lg">Fetching video details, please wait...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {videoInfo && !loading && (
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:w-1/2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={videoInfo.thumbnail} alt="Thumbnail" className="w-full rounded-md shadow-sm object-cover aspect-video" />
            </div>
            <div className="md:w-1/2 flex flex-col">
              <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{videoInfo.title}</h3>
              <p className="text-gray-500 mb-4 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Duration: {videoInfo.duration_string || 'Unknown'}
              </p>
              
              <div className="space-y-3 mt-auto max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <h4 className="font-semibold text-gray-700 mb-2">Available Downloads:</h4>
                {getBestFormats(videoInfo.formats).map((format, idx) => {
                  const isSilentVideo = format.vcodec !== 'none' && format.acodec === 'none';
                  const filename = encodeURIComponent(videoInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.' + format.ext);
                  const downloadUrl = isSilentVideo 
                    ? `/api/download-hq?url=${encodeURIComponent(url)}&formatId=${format.format_id}&filename=${filename}&merge=true`
                    : `/api/download-hq?url=${encodeURIComponent(url)}&formatId=${format.format_id}&filename=${filename}&merge=false`;

                  const height = parseInt(format.resolution?.split('x')[1] || '0');
                  let isPremium = height > 720;
                  
                  // For platforms like Facebook where resolution might be 'unknown' but format_id is 'hd'
                  if (
                    format.format_id?.toLowerCase() === 'hd' || 
                    format.format_note?.toLowerCase().includes('4k') ||
                    format.resolution?.toLowerCase().includes('4k') ||
                    format.resolution?.toLowerCase().includes('1080')
                  ) {
                    isPremium = true;
                  }

                  return (
                  <a 
                    key={idx}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setDownloadingFormatId(format.format_id);
                      setTimeout(() => setDownloadingFormatId(null), 15000);
                      
                      if (isPremium) {
                        handlePremiumDownload(e, downloadUrl);
                      } else {
                        window.location.href = downloadUrl;
                      }
                    }}
                    className={`flex items-center justify-between w-full p-3 border rounded-md transition-colors group ${downloadingFormatId === format.format_id ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-500 hover:bg-green-50'}`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 group-hover:text-green-700 flex items-center gap-2">
                        {format.ext.toUpperCase()} {format.resolution !== 'audio only' ? format.resolution : ''}
                        {isPremium && <span className="bg-yellow-100 text-yellow-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Premium</span>}
                      </span>
                      <span className="text-xs text-gray-500">
                        {format.vcodec !== 'none' && format.acodec !== 'none' ? 'Video + Audio' : 
                         isSilentVideo ? 'HQ Video (Audio will be merged!)' : 
                         'Audio Only'}
                      </span>
                    </div>
                    <div className={`px-4 py-2 rounded font-medium transition-colors flex items-center gap-2 ${downloadingFormatId === format.format_id ? 'bg-green-600 text-white cursor-wait' : 'bg-green-500 text-white group-hover:bg-green-600'}`}>
                      {downloadingFormatId === format.format_id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Download'
                      )}
                    </div>
                  </a>
                )})}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Description & Animated Logo Area */}
          <div className="mt-24 flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(8,_112,_184,_0.04)] border border-gray-50">
            <div className="flex-1 text-gray-600 text-lg leading-relaxed space-y-6">
              {currentPlatform.description.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="first-letter:text-2xl first-letter:font-bold first-letter:text-emerald-500">{paragraph}</p>
              ))}
            </div>
            
            {currentPlatform.icon && (
              <div className="hidden md:flex justify-center items-center shrink-0 transition-transform duration-500 hover:scale-105 hover:-translate-y-2 drop-shadow-2xl">
                {currentPlatform.icon}
              </div>
            )}
          </div>

          {/* How to Use Section */}
          <section id="how-to-use" className="mt-32 max-w-5xl mx-auto text-center scroll-mt-24">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              How to Download {platform === 'default' ? 'Videos' : platform.charAt(0).toUpperCase() + platform.slice(1) + ' Videos'} Without Watermark with {siteName}
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Here&apos;s how to download high-quality, watermark-free videos with {siteName}:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col text-left">
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 h-48 flex items-center justify-center relative mb-6">
                  <div className="w-full max-w-[200px] h-28 border-2 border-gray-100 rounded-lg bg-gray-50 flex flex-col overflow-hidden relative shadow-sm">
                    <div className="h-5 bg-white border-b border-gray-100 w-full flex items-center px-2 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-gray-200"></div><div className="w-2 h-2 rounded-full bg-gray-200"></div><div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-3 relative">
                      <div className="w-full h-6 bg-white border border-gray-200 rounded-full flex items-center px-2">
                        <span className="text-[8px] text-gray-400">https://www.video.url/...</span>
                      </div>
                      <div className="w-10 h-6 bg-gray-100 mt-2 flex items-center justify-center text-gray-300">▶</div>
                      <div className="absolute bg-[#5c8deb] text-white text-[10px] font-bold px-3 py-1 rounded shadow-md right-4 top-5 flex items-center gap-1 z-10">
                        Copy
                        <svg className="w-3 h-3 text-white absolute -bottom-2 -right-2 transform -rotate-12 drop-shadow-md" fill="currentColor" viewBox="0 0 320 512"><path d="M0 55.2V426c0 12.2 9.9 22 22 22c4.6 0 8.9-1.4 12.5-3.9l70.4-48.1 47 113.8c3.2 7.8 11 12.8 19.5 12.8 12.2 0 22-9.9 22-22 0-3.3-.7-6.5-2.1-9.3L144.3 377h97.7c12.2 0 22-9.9 22-22 0-5.7-2.2-11.2-6.2-15.4L51.4 39.8C42.8 30.5 28.5 29.5 18.7 37.1 7.2 45.9 0 50.3 0 55.2z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">Step 1: Copy the Video URL</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Select the video you wish to download, tap the share button to copy its URL, and proceed to {siteName}.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col text-left">
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 h-48 flex items-center justify-center relative mb-6">
                  <div className="w-full max-w-[200px] flex flex-col items-center bg-gray-50/50 p-4 border border-gray-50 rounded-lg">
                    <div className="text-gray-300 font-bold text-sm mb-3">{siteName}</div>
                    <div className="w-full h-8 border-2 border-gray-100 rounded-md bg-white flex items-center shadow-sm">
                      <div className="h-full w-full px-2 flex items-center overflow-hidden">
                        <span className="text-[8px] text-gray-400">https://www.video.url/...</span>
                      </div>
                      <div className="h-full w-10 bg-[#5c8deb] flex items-center justify-center text-white relative flex-shrink-0">
                        <ArrowRight className="w-3 h-3" />
                        <svg className="w-3 h-3 text-white absolute -bottom-2 -right-2 transform -rotate-12 drop-shadow-md z-10" fill="currentColor" viewBox="0 0 320 512"><path d="M0 55.2V426c0 12.2 9.9 22 22 22c4.6 0 8.9-1.4 12.5-3.9l70.4-48.1 47 113.8c3.2 7.8 11 12.8 19.5 12.8 12.2 0 22-9.9 22-22 0-3.3-.7-6.5-2.1-9.3L144.3 377h97.7c12.2 0 22-9.9 22-22 0-5.7-2.2-11.2-6.2-15.4L51.4 39.8C42.8 30.5 28.5 29.5 18.7 37.1 7.2 45.9 0 50.3 0 55.2z"/></svg>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full mt-3">
                      <div className="h-5 w-1/3 bg-gray-100 rounded-sm"></div>
                      <div className="h-5 w-1/3 bg-gray-100 rounded-sm"></div>
                      <div className="h-5 w-1/3 bg-gray-100 rounded-sm"></div>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">Step 2: Enter the Video URL</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Paste the copied video URL into the input field on the {siteName} homepage and click download.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col text-left">
                <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 h-48 flex items-center justify-center relative mb-6">
                  <div className="w-full max-w-[200px] border-2 border-gray-100 rounded-lg bg-white p-3 flex flex-col items-center shadow-sm">
                    <div className="text-gray-300 text-[10px] font-bold mb-2">{siteName}</div>
                    <div className="w-full h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mb-3 rounded-sm">
                      <div className="w-6 h-6 text-gray-300">▶</div>
                    </div>
                    <div className="w-full h-7 bg-[#5c8deb] rounded text-white text-[10px] font-bold flex items-center justify-center relative">
                      Download
                      <svg className="w-3 h-3 text-white absolute -bottom-2 right-4 transform -rotate-12 drop-shadow-md z-10" fill="currentColor" viewBox="0 0 320 512"><path d="M0 55.2V426c0 12.2 9.9 22 22 22c4.6 0 8.9-1.4 12.5-3.9l70.4-48.1 47 113.8c3.2 7.8 11 12.8 19.5 12.8 12.2 0 22-9.9 22-22 0-3.3-.7-6.5-2.1-9.3L144.3 377h97.7c12.2 0 22-9.9 22-22 0-5.7-2.2-11.2-6.2-15.4L51.4 39.8C42.8 30.5 28.5 29.5 18.7 37.1 7.2 45.9 0 50.3 0 55.2z"/></svg>
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-3">Step 3: Start the Download</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Click the download button to begin saving the video. Select your preferred video format and quality from the options provided.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Google Ad Simulation Modal */}
      {adUrl && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="bg-gray-100 p-3 text-xs text-gray-500 flex justify-between items-center border-b border-gray-200">
              <span className="flex items-center gap-1">Ad <span className="text-[10px] border border-gray-300 px-1 rounded">i</span></span>
              <span className="font-medium">Sponsored</span>
            </div>
            <div className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl shadow-lg mb-6 animate-pulse">
                💰
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Unlocking Premium Quality</h3>
              <p className="text-gray-600 mb-8 text-sm">Please support us by viewing this ad. Your high-quality download will begin automatically.</p>
              
              <div className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full font-bold">
                <Loader2 className="h-5 w-5 animate-spin" />
                Wait {adCountdown} seconds...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links Top Cards */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div onClick={() => handlePlatformChange('facebook')} className="bg-[#e9f5ed] py-4 px-6 rounded-md flex items-center gap-3 cursor-pointer hover:bg-green-100 transition-colors">
            <FaFacebook className="text-[#1877F2] text-2xl" />
            <span className="font-semibold text-gray-700">facebook.com</span>
          </div>
          <div onClick={() => handlePlatformChange('instagram')} className="bg-[#e9f5ed] py-4 px-6 rounded-md flex items-center gap-3 cursor-pointer hover:bg-green-100 transition-colors">
            <FaInstagram className="text-[#E4405F] text-2xl" />
            <span className="font-semibold text-gray-700">instagram.com</span>
          </div>
          <div onClick={() => handlePlatformChange('youtube')} className="bg-[#e9f5ed] py-4 px-6 rounded-md flex items-center gap-3 cursor-pointer hover:bg-green-100 transition-colors">
            <FaYoutube className="text-[#FF0000] text-2xl" />
            <span className="font-semibold text-gray-700">youtube.com</span>
          </div>
          <div onClick={() => handlePlatformChange('tiktok')} className="bg-[#e9f5ed] py-4 px-6 rounded-md flex items-center gap-3 cursor-pointer hover:bg-green-100 transition-colors">
            <FaTiktok className="text-black text-2xl" />
            <span className="font-semibold text-gray-700">tiktok.com</span>
          </div>
        </div>
      </section>

      {/* All Resources Grid */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">All resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('dailymotion'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded text-white"><SiDailymotion className="text-xl" /></div>
            <span className="font-medium">dailymotion.com</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('vimeo'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-[#1AB7EA] rounded text-white"><FaVimeo className="text-xl" /></div>
            <span className="font-medium">vimeo.com</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('vk'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-[#4680C2] rounded text-white"><FaVk className="text-xl" /></div>
            <span className="font-medium">vk.com</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('tiktok'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-black rounded text-white"><FaTiktok className="text-xl" /></div>
            <span className="font-medium">tiktok.com</span>
          </a>

          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('reddit'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500] rounded text-white"><FaReddit className="text-xl" /></div>
            <span className="font-medium">reddit.com</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('pinterest'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-[#E60023] rounded text-white"><FaPinterest className="text-xl" /></div>
            <span className="font-medium">pinterest.com</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('threads'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-black rounded text-white"><FaThreads className="text-xl" /></div>
            <span className="font-medium">Threads</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('xiaohongshu'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-[#FE2C55] rounded text-white"><SiXiaohongshu className="text-xl" /></div>
            <span className="font-medium">xiaohongshu.com</span>
          </a>

          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><FaFileVideo className="text-xl" /></div>
            <span className="font-medium">MP4 Converter</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><FaFileAudio className="text-xl" /></div>
            <span className="font-medium">MP4 to MP3</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><FaFilm className="text-xl" /></div>
            <span className="font-medium">MOV to MP4</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><span className="text-xs font-bold">GIF</span></div>
            <span className="font-medium">MP4 to GIF</span>
          </a>

          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><span className="text-xs font-bold">MKV</span></div>
            <span className="font-medium">MKV to MP4</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded text-white"><span className="text-[10px] font-bold">WEBM</span></div>
            <span className="font-medium">WEBM to MP4</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded text-white"><span className="text-xs font-bold">TXT</span></div>
            <span className="font-medium">YouTube Transcript</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
            <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded text-white"><span className="text-xs font-bold">CC</span></div>
            <span className="font-medium">YouTube Subtitles</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-10">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between">
            {/* Logo and Copyright */}
            <div className="mb-8 lg:mb-0 lg:w-1/4">
              <div className="flex items-center gap-3 mb-4 group cursor-pointer" onClick={() => handlePlatformChange('default')}>
                <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl rotate-45 group-hover:rotate-90 transition-transform duration-500 opacity-80 blur-[2px]"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-green-600 to-emerald-400 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-500 shadow-lg"></div>
                  <svg className="w-5 h-5 text-white z-10 relative drop-shadow-md" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 tracking-tighter drop-shadow-sm">
                  {siteName}
                </span>
              </div>
              <p className="text-sm text-gray-500">© 2008-2026</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">Developer by Saiful</p>
              
              {/* Language Selector */}
              <div className="relative mt-2">
                <button 
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#f0f0f0] hover:bg-[#e0e0e0] border border-[#ccc] rounded text-sm text-[#0066cc] transition-colors w-fit"
                >
                  <img src={(selectedLanguage as any).flagUrl} alt={selectedLanguage.name} className="w-4 h-3 object-cover shadow-sm" />
                  <span>{selectedLanguage.name}</span>
                </button>
                
                {languageMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLanguageMenuOpen(false)}></div>
                    <div className="absolute bottom-full left-0 mb-1 w-48 bg-[#f0f0f0] border border-[#ccc] shadow-lg rounded-sm overflow-hidden z-50 py-1">
                      <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        {LANGUAGES.map((lang, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedLanguage(lang);
                              setLanguageMenuOpen(false);
                              document.cookie = `googtrans=/en/${lang.code}; path=/;`;
                              document.cookie = `googtrans=/en/${lang.code}; path=/; domain=${window.location.hostname};`;
                              window.location.reload();
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#e0e0e0] flex items-center gap-2 text-[13px] text-[#0066cc]"
                          >
                            <img src={lang.flagUrl} alt={lang.name} className="w-4 h-3 object-cover shadow-sm" />
                            <span>{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Links Columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:w-3/4">
              <div className="flex flex-col space-y-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube to mp4</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube Shorts</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube Mp3</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">ssYouTube</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">iPhone</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">APP</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube Transcript</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('youtube'); }} className="text-sm text-gray-600 hover:text-green-500">YouTube Subtitles</a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('instagram'); }} className="text-sm text-gray-600 hover:text-green-500">Instagram</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('instagram'); }} className="text-sm text-gray-600 hover:text-green-500">IG stories</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('instagram'); }} className="text-sm text-gray-600 hover:text-green-500">Instagram reels</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('instagram'); }} className="text-sm text-gray-600 hover:text-green-500">Instagram viewer</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('threads'); }} className="text-sm text-gray-600 hover:text-green-500">Threads</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('vk'); }} className="text-sm text-gray-600 hover:text-green-500">VK</a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('tiktok'); }} className="text-sm text-gray-600 hover:text-green-500">TikTok</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('tiktok'); }} className="text-sm text-gray-600 hover:text-green-500">TikTok mp4</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('tiktok'); }} className="text-sm text-gray-600 hover:text-green-500">TikTok mp3</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('reddit'); }} className="text-sm text-gray-600 hover:text-green-500">Reddit</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('dailymotion'); }} className="text-sm text-gray-600 hover:text-green-500">Dailymotion</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('facebook'); }} className="text-sm text-gray-600 hover:text-green-500">Facebook</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('vimeo'); }} className="text-sm text-gray-600 hover:text-green-500">Vimeo</a>
                <a href="#how-to-use" className="text-sm text-gray-600 hover:text-green-500">How to</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('pinterest'); }} className="text-sm text-gray-600 hover:text-green-500">Pinterest</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('xiaohongshu'); }} className="text-sm text-gray-600 hover:text-green-500">Xiaohongshu</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">APK</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">FAQ</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">Install</a>
              </div>
              <div className="flex flex-col space-y-3">
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">Mp4 Converter</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">MP4 to MP3</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">MOV to MP4</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">MP4 to GIF</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">MKV to MP4</a>
                <a href="#" onClick={(e) => { e.preventDefault(); handlePlatformChange('default'); }} className="text-sm text-gray-600 hover:text-green-500">WEBM to MP4</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500 mt-4">For webmasters</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">Feedback</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">API</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">Advertising</a>
                <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-green-500">Terms of Service</a>
                <a href="#" className="text-sm text-gray-600 hover:text-green-500">EULA</a>
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-green-500">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

