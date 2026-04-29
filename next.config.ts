import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
        ],
    },

    trailingSlash: true,

    // Prevent Next.js from adding automatic trailing-slash redirects
    // which can affect API routes and cause redirect loops.
    // Set to true so Next.js will NOT perform automatic redirects when
    // the trailing slash does/doesn't match the incoming request.
    skipTrailingSlashRedirect: true,

    serverExternalPackages: ["mongoose"],


    experimental: {
        // Другие опции, если необходимо
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

// export default withNextIntl(nextConfig);
// export default withFlowbiteReact(nextConfig);
// in `next.config.ts`
export default withFlowbiteReact(withNextIntl(nextConfig));
