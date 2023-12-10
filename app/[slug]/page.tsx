import StoryblokWrapper from "@/storyblok/components/StoryblokWrapper";
import { readdir } from "fs/promises";
import path from "path";

/* This is a catch-all for top-level pages. This is to make it easy for users to add new
 * top-level pages just using Storyblok and the storyblok-published github action.
 *
 * When live-editing mode is off (Prod), Next.js dynamic params are disabled, so any
 * routes which aren't statically generated by generateStaticParams will return a 404.
 * Routes are statically generated using the contents of the Storyblok data folder.
 *
 * When live-editing mode is on (Dev/Storyblok branch), Next.js dynamic patams are
 * enabled, so if a route wasn't statically generated, Next.js will try to render it
 * anyway. This means users logged into Storyblok can see their new pages.
 */

export const dynamicParams =
  process.env.ENABLE_STORYBLOK_LIVE_EDITING === "true";

export async function generateStaticParams() {
  // Extract all files from the Storyblok data folder (non-recursive - only the top-level folder)
  const directory = path.join(process.cwd(), "storyblok", "data");
  const files = await readdir(directory);

  // Get rid of the .json extension
  const slugs = files.map((file) => file.substring(0, file.indexOf(".")));
  console.log("Top-level static slugs:", slugs);

  return slugs.map((c) => ({
    slug: c,
  }));
}

// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return (
    <>
      <StoryblokWrapper slug={slug} />
      <p>in the dynamic route</p>
    </>
  );
}