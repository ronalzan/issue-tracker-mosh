/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers () {
        return [
            {
                source: '/:path*', //cover all endpoint of this application (include zero or more parameters in the soruce regex)
                headers: [
                    {
                        key: 'referrer-policy',
                        value: 'no-referrer'
                    }
                ]
            }
        ]
    }
};

export default nextConfig;
