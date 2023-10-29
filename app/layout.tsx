import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import StoryblokBridgeLoader from '@storyblok/react/bridge-loader'
import StoryblokProvider from "../components/StoryblokProvider";

import Page from "@/components/Page"
import Grid from "@/components/Grid"
import Feature from "@/components/Feature"
import Teaser from "@/components/Teaser"

const inter = Inter({ subsets: ['latin'] })

console.log('***** PROCESS ENV IS *****')
console.log(process.env)

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: { region: 'eu' },
  components: {
    feature: Feature,
    grid: Grid,
    page: Page,
    teaser: Teaser
  }
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (process.env.ENABLE_STORYBLOK_LIVE_EDITING === 'true') {
    console.log('layout.tsx: Enabling live-editing')
    return (
      <StoryblokProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </StoryblokProvider>
    )
  } else {
    console.log('layout.tsx: Disabling live-editing')
    return (
      <html lang="en">
        <body>{children}</body>
        <StoryblokBridgeLoader options={{}} />
      </html>
    )
  }
}
