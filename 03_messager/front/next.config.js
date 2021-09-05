
// next.config.js는 npm run dev & npm run build 등등 명령어 칠때 한버 쭉 읽힘
// "build": "cross-env ANALYZE=true NODE_ENV=production next build" //next.config.js에서 설정안하고 package.js에서 설정가능 
// 근데 윈도우에서 작동안함. cross-env 설치
// npm i @next/bundle-analyzer cross-env
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });

module.exports = withBundleAnalyzer({
    compress: true, //gzip으로 압축 무조건..브라우저가 압축되어있으면 풀어줌
    webpack(config, { webpack }) {
        
        const prod = process.env.NODE_ENV === 'production';
        
        if(prod) {} //배포용일 때
    
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins: [
                ...config.plugins,
                new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/), //moment locale tree shaking 검색 ㄱ
            ],
            // module: {
            //     ...config.module,
            //     rules: [
            //         ...config.module.rules,
            //     ]
            // }
        }
    }
});