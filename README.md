# Corie

Corie is an innovative solution for managing in-app communications with your users. With just a single line of code, Corie empowers you to seamlessly deliver announcements, blog updates, and targeted messages to your user base.

## Features

- **Simple Integration**: Add Corie to your app with a single script tag.
- **User Segmentation**: Target specific user groups for tailored communications.
- **Customizable Dashboard**: Easily manage and customize your in-app messages.
- **Real-time Updates**: Keep your users informed with instant notifications.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Clerk](https://clerk.dev/) for authentication
- [OpenAI](https://openai.com/) for AI-powered features
- [Vercel KV](https://vercel.com/storage/kv) for key-value storage
- [Tinybird](https://www.tinybird.co/) for real-time analytics

## Getting Started

### Clone the repository

```bash
git clone https://github.com/yourusername/corie.git
cd corie
```

### Install dependencies
```bash
pnpm install
```

### Set up environment variables
Copy the `.env.sample` file to `.env.local` and fill in the required values:

### Run the development server
```bash
pnpm dev
```
This will start the Next.js app on http://localhost:3000.

### Build the platform code
To build the platform code used in the script:
```bash
pnpm build:platform
```

### Run both the app and platform concurrently
To run both the Next.js app and the platform code with hot-reloading:
```bash
pnpm dev:platform
```

## Deployment
Corie is designed to be deployed on Vercel. Follow these steps to deploy your own instance:

1. Push your code to a GitHub repository.
2. Import your project into Vercel.
3. Configure your environment variables in the Vercel dashboard.
4. Deploy!

## Usage
Once deployed, you can integrate Corie into your application by adding the provided script tag to your HTML. This will allow you to manage in-app communications through the Corie dashboard.

1. Log in to your Corie dashboard.
2. Create and customize your announcements.
3. Set up user segments for targeted messaging.
4. Monitor analytics to track the performance of your communications.
