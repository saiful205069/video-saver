# VideoSaver - Deployment Guide

## ⚠️ কেন এটি GitHub Pages-এ হোস্ট করা যাবে না?
GitHub Pages শুধুমাত্র **Static Website** (সাধারণ HTML, CSS, JS) সাপোর্ট করে। 
কিন্তু আমাদের এই VideoSaver ওয়েবসাইটটিতে একটি শক্তিশালী **Backend Server** কাজ করছে:
1. `yt-dlp` এবং `ffmpeg` ব্যবহার করে সার্ভারের ভেতরে ভিডিও ও অডিও প্রসেস করা হয়।
2. অ্যাডমিন প্যানেলের ডাটা (ভিজিটর, ডাউনলোড) একটি `data.json` ফাইলে সেভ করা হয়।

GitHub Pages-এ কোনো সার্ভার বা ব্যাকএন্ড সাপোর্ট নেই। তাই সেখানে এটি হোস্ট করলে ওয়েবসাইটের ডিজাইন দেখা যাবে, কিন্তু **ভিডিও ডাউনলোড হবে না** এবং **অ্যাডমিন প্যানেল কাজ করবে না**। Vercel-এর ফ্রি প্ল্যানেও বড় সাইজের ভিডিও ডাউনলোডে টাইমআউট সমস্যা হয়।

---

## 🚀 কোথায় এবং কীভাবে ফ্রিতে হোস্ট করবেন?
এই ধরনের ওয়েবসাইটের জন্য সবচেয়ে পারফেক্ট হলো **Render (render.com)** অথবা **Railway (railway.app)**। এখানে আপনি ফ্রিতে Node.js সার্ভার রান করতে পারবেন।

নিচে **Render**-এ সম্পূর্ণ ফ্রিতে হোস্ট করার নিয়ম দেওয়া হলো:

### ধাপ ১: GitHub-এ কোড আপলোড করা
যেহেতু Render সরাসরি GitHub থেকে কোড নেয়, তাই প্রথমে কোডগুলো আপনার GitHub অ্যাকাউন্টে আপলোড করতে হবে:
1. আপনার GitHub-এ গিয়ে একটি নতুন Repository তৈরি করুন (পাবলিক বা প্রাইভেট)।
2. আপনার প্রজেক্ট ফোল্ডারে টার্মিনাল ওপেন করে নিচের কমান্ডগুলো দিন:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/আপনার-ইউজারনেম/আপনার-রেপো-নাম.git
   git push -u origin main
   ```

### ধাপ ২: Render-এ ডিপ্লয় করা
1. [Render.com](https://render.com)-এ গিয়ে GitHub দিয়ে লগিন/সাইনআপ করুন।
2. ড্যাশবোর্ড থেকে **New +** বাটনে ক্লিক করে **Web Service** সিলেক্ট করুন।
3. `Build and deploy from a Git repository` সিলেক্ট করে **Next** দিন।
4. আপনার GitHub-এর Repository-টি সিলেক্ট করুন।
5. নিচের সেটিংগুলো ঠিকমতো দিন:
   - **Name:** আপনার ওয়েবসাইটের নাম (e.g. video-saver)
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Instance Type:** `Free`
6. এরপর **Create Web Service** বাটনে ক্লিক করুন। 

Render এখন আপনার প্রোজেক্টটি বিল্ড করবে (এতে ৫-১০ মিনিট সময় লাগতে পারে)। বিল্ড কমপ্লিট হলে তারা আপনাকে একটি লাইভ লিংক (যেমন: `video-saver.onrender.com`) দিয়ে দেবে।

### অ্যাডমিন প্যানেলের ডাটা সেভ রাখার জন্য (Persistent Disk)
Render-এর ফ্রি প্ল্যানে সার্ভার রিস্টার্ট হলে `data.json` রিবুট হয়ে যেতে পারে। প্রোডাকশনের জন্য (ভবিষ্যতে) একটি ছোট VPS (যেমন Hostinger, Contabo) কেনা সবচেয়ে ভালো হবে, কারণ ভিডিও ডাউনলোডিং সাইটে প্রচুর CPU পাওয়ার লাগে।

আপাতত টেস্টিং এবং লাইভ করার জন্য Render বা Railway-ই সেরা!
